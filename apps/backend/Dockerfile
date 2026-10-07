FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/backend/package.json ./apps/backend/package.json

RUN npm ci

COPY apps/backend ./apps/backend

# Requires apps/backend/prisma/schema.prisma to exist and be committed to the repo.
# As of this writing that schema file is still missing (see project notes), so this
# step - and therefore the whole image build - will fail until it is added. This is
# intentional: failing fast here is safer than shipping a build against a stale,
# previously-generated Prisma client.
RUN npm run prisma:generate --workspace @mineli-ink/backend

RUN npm run build --workspace @mineli-ink/backend

FROM node:22-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/apps/backend/dist ./apps/backend/dist
COPY --from=builder /app/apps/backend/prisma ./apps/backend/prisma
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/apps/backend/package.json ./apps/backend/package.json

RUN addgroup -g 1001 -S app && adduser -S app -u 1001
USER app

WORKDIR /app/apps/backend

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost:3000/health || exit 1

CMD ["node", "dist/server.js"]
