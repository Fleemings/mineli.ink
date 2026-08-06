FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY apps/backend/package*.json ./apps/backend/
COPY packages/shared/package*.json ./packages/shared/
RUN npm ci

COPY apps/backend ./apps/backend
COPY packages/shared ./packages/shared
RUN npm run build --workspace @mineli-ink/shared && npm run build --workspace @mineli-ink/backend

FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./
COPY apps/backend/package*.json ./apps/backend/
COPY packages/shared/package*.json ./packages/shared/
RUN npm ci --omit=dev --workspace @mineli-ink/backend --workspace @mineli-ink/shared

COPY --from=builder /app/apps/backend/dist ./apps/backend/dist
COPY --from=builder /app/packages/shared/dist ./packages/shared/dist

RUN addgroup -g 1001 -S app && adduser -S app -u 1001
USER app

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost:3000/health || exit 1

CMD ["node", "apps/backend/dist/server.ts"]