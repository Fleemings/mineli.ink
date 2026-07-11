# 📁 Estrutura de Pastas Refatorada

## Visualização da Nova Estrutura

```
mineli-ink/
│
├── 📦 apps/                          # APLICAÇÕES (Services)
│   │
│   ├── 🔌 backend/
│   │   ├── src/                      # TODO: Migrar código de backend/
│   │   ├── Dockerfile
│   │   ├── Dockerfile.dev
│   │   ├── .dockerignore
│   │   ├── .env
│   │   ├── .env.example
│   │   ├── package.json
│   │   ├── server.js
│   │   └── README.md
│   │
│   └── 🎨 frontend/
│       ├── src/                      # TODO: Migrar código de frontend/mineli-ink/src/
│       │   ├── app/
│       │   ├── environments/
│       │   ├── styles.sass
│       │   └── index.html
│       ├── Dockerfile
│       ├── Dockerfile.dev
│       ├── Dockerfile.prod
│       ├── .dockerignore
│       ├── nginx.conf
│       ├── docker-entrypoint.sh
│       ├── angular.json
│       ├── tsconfig.json
│       ├── package.json
│       └── README.md
│
├── 📚 packages/                      # CÓDIGO COMPARTILHADO
│   └── 🔗 shared/
│       ├── types.ts                  # Tipos TypeScript
│       ├── constants.ts              # Constantes
│       ├── utils.ts                  # Funções utilitárias
│       ├── package.json
│       └── README.md
│
├── 📖 docs/                          # DOCUMENTAÇÃO
│   ├── DOCKER_GUIDE.md
│   ├── DOCKER_SETUP.md
│   ├── MONOREPO_GUIDE.md
│   └── QUICK_START.md
│
├── 🐳 Docker Files
│   ├── docker-compose.yml            # Desenvolvimento
│   ├── docker-compose.prod.yml       # Produção
│   └── init-mongo.js                 # Init MongoDB
│
├── ⚙️ Config Files
│   ├── package.json                  # Workspace root ✨ NOVO
│   ├── .npmrc                        # npm config ✨ NOVO
│   ├── Makefile
│   └── .gitignore.docker
│
├── 🔐 Environment Files
│   ├── .env.docker
│   ├── .env.docker.prod
│   └── .gitignore
│
├── 📝 Root Documentation
│   ├── README.md
│   ├── ENVIRONMENT_GUIDE.md
│   ├── DOCKER_CHECKLIST.md
│   └── MONOREPO_GUIDE.md              # ✨ NOVO - Você está aqui
│
└── 🚫 OLD FOLDERS (REMOVER DEPOIS)
    ├── backend/                       # ❌ Mover para apps/backend/
    └── frontend/
        └── mineli-ink/                # ❌ Mover para apps/frontend/
```

---

## ✅ O Que Foi Criado

### Novos Arquivos de Configuração ✨

```
✅ package.json (root)              - Workspace com npm
✅ .npmrc                           - npm configuration
✅ apps/backend/package.json        - Backend workspace
✅ apps/backend/.env                - Backend vars
✅ apps/backend/.env.example        - Backend template
✅ apps/backend/Dockerfile          - Backend prod build
✅ apps/backend/Dockerfile.dev      - Backend dev build
✅ apps/backend/.dockerignore       - Backend ignore
✅ apps/backend/README.md           - Backend docs

✅ apps/frontend/package.json       - Frontend workspace
✅ apps/frontend/Dockerfile         - Frontend prod build (SSR)
✅ apps/frontend/Dockerfile.dev     - Frontend dev build
✅ apps/frontend/Dockerfile.prod    - Frontend prod (nginx)
✅ apps/frontend/.dockerignore      - Frontend ignore
✅ apps/frontend/nginx.conf         - Nginx config
✅ apps/frontend/docker-entrypoint.sh - Entrypoint
✅ apps/frontend/README.md          - Frontend docs

✅ packages/shared/package.json     - Shared workspace
✅ packages/shared/types.ts         - Shared types
✅ packages/shared/constants.ts     - Shared constants
✅ packages/shared/utils.ts         - Shared utils
✅ packages/shared/README.md        - Shared docs

✅ docker-compose.yml               - ATUALIZADO ⬆️
✅ docker-compose.prod.yml          - ATUALIZADO ⬆️
✅ Makefile                         - ATUALIZADO ⬆️
✅ MONOREPO_GUIDE.md                - Este arquivo
```

---

## 🔄 Mudanças Principais

### Package.json (Root)
```diff
- Antes: Cada app tinha seu próprio setup
+ Depois: Workspace centralizador
```

### Docker Compose
```diff
- context: ./backend/
- context: ./frontend/mineli-ink/
+ context: ./apps/backend/
+ context: ./apps/frontend/
```

### Volumes
```diff
- volumes: ./backend/:/app
- volumes: ./frontend/mineli-ink/:/app
+ volumes: ./apps/backend/:/app
+ volumes: ./apps/frontend/:/app
```

---

## 🎯 TODO - Próximas Ações

### 1. **Migrar Código Backend**
```bash
# Mover arquivo do backend
mv backend/server.js apps/backend/
mv backend/controlers apps/backend/src/
mv backend/services apps/backend/src/
mv backend/repositories apps/backend/src/

# Se tiver package-lock.json específico
mv backend/package-lock.json apps/backend/
```

### 2. **Migrar Código Frontend**
```bash
# Mover arquivo do frontend
mv frontend/mineli-ink/src apps/frontend/
mv frontend/mineli-ink/angular.json apps/frontend/
mv frontend/mineli-ink/tsconfig.json apps/frontend/
mv frontend/mineli-ink/public apps/frontend/
```

### 3. **Atualizar Imports**
Se houver imports entre frontend/backend:
```typescript
// Antes
import { something } from '../../../backend/src/types';

// Depois
import { something } from '@mineli-ink/shared/types';
```

### 4. **Remover Pastas Antigas**
```bash
rm -rf backend/
rm -rf frontend/
```

### 5. **Testar Tudo**
```bash
docker compose up
# Verificar se funciona normalmente
```

---

## 📊 Comparação Antes vs Depois

### ANTES ❌
```
mineli-ink/
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   └── server.js
├── frontend/
│   └── mineli-ink/
│       ├── Dockerfile
│       ├── package.json
│       └── src/
├── docker-compose.yml
└── README.md
```

### DEPOIS ✅
```
mineli-ink/
├── apps/
│   ├── backend/
│   │   ├── Dockerfile
│   │   ├── package.json
│   │   └── src/
│   └── frontend/
│       ├── Dockerfile
│       ├── package.json
│       └── src/
├── packages/
│   └── shared/
│       ├── types.ts
│       └── constants.ts
├── package.json (workspace root)
├── docker-compose.yml
└── README.md
```

---

## 🔗 Relacionados

- [MONOREPO_GUIDE.md](MONOREPO_GUIDE.md) - Guia completo
- [DOCKER_GUIDE.md](DOCKER_GUIDE.md) - Docker & Compose
- [QUICK_START.md](QUICK_START.md) - Início rápido
- [package.json](../package.json) - Workspace config

---

**Status:** ✅ Estrutura de Monorepo Criada
**Próximo:** 🔄 Migrar código existente

