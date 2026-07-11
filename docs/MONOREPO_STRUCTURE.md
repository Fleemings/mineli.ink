# Monorepo - Mineli.ink

## Estrutura

```
mineli-ink/
├── apps/
│   ├── backend/       # Express + Mongoose API
│   │   ├── server.js  # Entry point
│   │   ├── package.json
│   │   ├── Dockerfile
│   │   └── Dockerfile.dev
│   └── frontend/      # Angular 22
│       ├── src/
│       ├── package.json
│       ├── angular.json
│       ├── Dockerfile.dev
│       └── Dockerfile.prod
├── packages/
│   └── shared/        # Tipos e constantes
│       ├── index.ts
│       ├── types.ts
│       └── constants.ts
├── package.json       # Workspace root
├── docker-compose.yml
└── Makefile
```

## Workspaces

O root `package.json` define workspaces:
```json
{ "workspaces": ["apps/*", "packages/*"] }
```

Comandos:
```bash
npm install                      # Instala tudo
npm install -w apps/backend      # Instala em workspace específica
npm run dev -w apps/backend      # Roda em workspace específica
npm run build --workspaces --if-present
```

## Shared Package

Importar tipos/constantes compartilhados:

```typescript
import { User, ApiResponse } from '@mineli-ink/shared';
import { HTTP_STATUS } from '@mineli-ink/shared';
```

## Adicionar Nova App

1. Criar pasta em `apps/nova-app/`
2. Criar `package.json` com nome `@mineli-ink/nova-app`
3. Adicionar service no `docker-compose.yml`
4. Rodar `npm install` na raiz

## Comunicação

```
Frontend (4200) → Backend API (3000) → MongoDB (27017)
                       ↑
              @mineli-ink/shared (tipos comuns)
```