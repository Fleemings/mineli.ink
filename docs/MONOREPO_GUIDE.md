# 🏗️ Monorepo Structure - Mineli.ink

## 📁 Nova Organização (Padrão Moderno)

```
mineli-ink/
├── apps/                           # Aplicações (Services)
│   ├── backend/                    # API Backend
│   │   ├── src/                    # Código-fonte
│   │   ├── Dockerfile              # Build produção
│   │   ├── Dockerfile.dev          # Build desenvolvimento
│   │   ├── .dockerignore
│   │   ├── .env                    # Variáveis backend
│   │   ├── .env.example
│   │   ├── package.json            # Dependências backend
│   │   ├── server.js               # Entry point
│   │   └── README.md
│   │
│   └── frontend/                   # Aplicação Web
│       ├── src/                    # Código-fonte Angular
│       │   ├── app/
│       │   ├── environments/       # Config de ambiente
│       │   ├── styles.sass
│       │   └── index.html
│       ├── Dockerfile              # Build produção
│       ├── Dockerfile.dev          # Build desenvolvimento
│       ├── Dockerfile.prod         # Build nginx produção
│       ├── .dockerignore
│       ├── nginx.conf              # Config nginx
│       ├── docker-entrypoint.sh    # Entry script
│       ├── angular.json
│       ├── tsconfig.json
│       ├── package.json            # Dependências frontend
│       └── README.md
│
├── packages/                       # Código Compartilhado
│   └── shared/                     # Tipos, utils, config comuns
│       ├── types.ts                # Tipos TypeScript
│       ├── constants.ts            # Constantes
│       ├── utils.ts                # Funções utilitárias
│       ├── package.json
│       └── README.md
│
├── docs/                           # Documentação
│   ├── DOCKER_GUIDE.md
│   ├── DOCKER_SETUP.md
│   ├── MONOREPO_GUIDE.md          # Este arquivo
│   └── QUICK_START.md
│
├── package.json                    # Workspace root
├── .npmrc                          # npm config
├── docker-compose.yml              # Dev orchestration
├── docker-compose.prod.yml         # Prod orchestration
├── .env.docker                     # Variáveis dev
├── .env.docker.prod                # Variáveis prod (template)
├── init-mongo.js                   # Script MongoDB
├── Makefile                        # Atalhos
└── README.md                       # Principal
```

---

## 🚀 Vantagens da Nova Estrutura

| Aspecto | Vantagem |
|--------|----------|
| **Escalabilidade** | Fácil adicionar novos apps ou libs |
| **Organização** | Código compartilhado centralizado |
| **Reutilização** | Types, utils, constants comuns |
| **Manutenção** | Estrutura padrão da indústria |
| **CI/CD** | Fácil de monitorar mudanças |
| **Documentação** | README em cada pasta |
| **Isolamento** | Cada app com suas dependências |
| **Performance** | Build otimizado por app |

---

## 📦 Workspaces

### Root package.json
```json
{
  "workspaces": [
    "apps/*",
    "packages/*"
  ]
}
```

Permite:
```bash
npm install              # Instala todas as dependências
npm run dev --workspaces # Roda dev em todos
npm run build --workspaces # Build em todos
```

---

## 🔗 Importar Código Compartilhado

### No Backend (Node.js)
```javascript
const { LoginRequest } = require('@mineli-ink/shared/types');
const { API_VERSION } = require('@mineli-ink/shared/constants');
const { isValidEmail } = require('@mineli-ink/shared/utils');
```

### No Frontend (Angular)
```typescript
import { LoginRequest, ApiResponse } from '@mineli-ink/shared/types';
import { API_VERSION, HTTP_STATUS } from '@mineli-ink/shared/constants';
import { isValidEmail, isStrongPassword } from '@mineli-ink/shared/utils';
```

---

## 📂 Estrutura Detalhada de Cada App

### Backend (apps/backend/)
```
apps/backend/
├── src/
│   ├── routes/           # Express routes
│   ├── controllers/      # Route handlers
│   ├── models/           # MongoDB models
│   ├── services/         # Business logic
│   ├── middleware/       # Express middleware
│   ├── utils/            # Utilitários locais
│   └── app.js            # Express app
├── server.js             # Entry point
├── package.json
└── Dockerfile*
```

### Frontend (apps/frontend/)
```
apps/frontend/
├── src/
│   ├── app/
│   │   ├── components/   # Angular components
│   │   ├── services/     # Angular services
│   │   ├── guards/       # Route guards
│   │   ├── interceptors/ # HTTP interceptors
│   │   ├── core/         # Core module
│   │   └── shared/       # Shared module
│   ├── environments/     # Environment config
│   ├── assets/           # Static assets
│   ├── styles.sass       # Global styles
│   ├── index.html
│   └── main.ts
├── angular.json
├── package.json
└── Dockerfile*
```

### Shared (packages/shared/)
```
packages/shared/
├── types.ts              # Tipos TypeScript
├── constants.ts          # Constantes
├── utils.ts              # Funções utilitárias
├── package.json
└── README.md
```

---

## 🎯 Fluxo de Desenvolvimento

### 1. **Setup Inicial**
```bash
# Instalar todas as dependências
npm install

# Ou com yarn/pnpm
yarn install
pnpm install
```

### 2. **Desenvolvimento**
```bash
# Iniciar com Docker
docker compose up

# Ou localmente
cd apps/backend && npm run dev
cd apps/frontend && npm start
```

### 3. **Build**
```bash
# Build tudo
npm run build --workspaces

# Build app específico
cd apps/backend && npm run build
```

### 4. **Deploy**
```bash
# Produção
docker compose -f docker-compose.prod.yml up -d
```

---

## 🔄 Mudanças nos Caminhos Docker

### Antes (Estrutura Antiga)
```dockerfile
# docker-compose.yml
backend:
  build:
    context: ./backend              # ← Aqui
    dockerfile: Dockerfile.dev
```

### Depois (Monorepo)
```dockerfile
# docker-compose.yml
backend:
  build:
    context: ./apps/backend         # ← Aqui
    dockerfile: Dockerfile.dev
```

**Todos os Dockerfiles foram movidos para suas respectivas apps!**

---

## 🛠️ Comandos Úteis

### Workspace
```bash
# Instalar dependências de uma app específica
npm install -w apps/backend
npm install -w apps/frontend
npm install -w packages/shared

# Rodar script em uma app específica
npm run dev -w apps/backend
npm run build -w apps/frontend

# Rodar em todas
npm run build --workspaces
```

### Docker
```bash
# Com a nova estrutura
docker compose up

# Apenas backend
docker compose up backend

# Rebuild
docker compose build
```

### Make
```bash
make help              # Ver todos
make workspace-install # npm install
make workspace-build   # npm run build
```

---

## 🔐 Variáveis de Ambiente

### Root (.env.docker)
Variáveis globais compartilhadas:
```env
MONGO_ROOT_USER=admin
MONGO_ROOT_PASSWORD=password123
```

### Backend (apps/backend/.env)
Variáveis específicas do backend:
```env
NODE_ENV=development
PORT=3000
JWT_SECRET=seu_secret
```

### Frontend (apps/frontend/.env ou environments/)
Variáveis específicas do frontend:
```env
ANGULAR_BACKEND_URL=http://backend:3000/api
```

---

## 📊 Comunicação entre Apps

```
┌─────────────────────────┐
│   Frontend (4200)       │
│   @mineli-ink/frontend  │
└────────────┬────────────┘
             │
             │ HTTP API
             │
┌────────────▼──────────────┐
│   Backend (3000)          │
│   @mineli-ink/backend     │
└────────────┬──────────────┘
             │
             │ Query/Update
             │
┌────────────▼──────────────┐
│   MongoDB (27017)         │
│   Container Service       │
└─────────────────────────────┘

Compartilhado:
┌─────────────────────────────┐
│   @mineli-ink/shared        │
│   Types, Constants, Utils   │
└─────────────────────────────┘
```

---

## 🚦 Status da Migração

| Item | Status | Localização |
|------|--------|-------------|
| Backend | ✅ Migrado | `apps/backend/` |
| Frontend | ✅ Migrado | `apps/frontend/` |
| Shared | ✅ Criado | `packages/shared/` |
| Docker Compose | ✅ Atualizado | `docker-compose.yml` |
| Makefile | ✅ Atualizado | `Makefile` |
| package.json | ✅ Atualizado | Root `package.json` |
| Documentação | ✅ Criada | Este arquivo |

---

## 🔄 Próximos Passos

### 1. **Testar Estrutura**
```bash
docker compose up
```

### 2. **Migrar Código Existente**
- Mover arquivos do antigo `backend/` para `apps/backend/src/`
- Mover arquivos do antigo `frontend/mineli-ink/src/` para `apps/frontend/src/`

### 3. **Adicionar Mais Apps (Futuro)**
```
apps/
├── backend/
├── frontend/
├── admin-panel/       # Nova app
├── cli/               # Nova app
└── scheduler/         # Nova app
```

### 4. **Adicionar Mais Libs Compartilhadas (Futuro)**
```
packages/
├── shared/
├── ui-components/    # Nova lib
├── auth/             # Nova lib
└── database/         # Nova lib
```

---

## 🎓 Referências

- [npm Workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces)
- [Nx Monorepo](https://nx.dev/)
- [Turbo Monorepo](https://turbo.build/repo)
- [pnpm Workspaces](https://pnpm.io/workspaces)

---

## ❓ FAQ

**P: Por que apps/ e packages/?**
A: Padrão de monorepo - apps são aplicações executáveis, packages são bibliotecas compartilhadas.

**P: Como adicionar nova app?**
A: Crie `apps/minha-app/` com seu package.json e estrutura.

**P: Como compartilhar tipos?**
A: Adicione em `packages/shared/types.ts` e importe em ambos os apps.

**P: Afeta o Docker?**
A: Apenas os caminhos mudam - tudo continua funcionando igual.

**P: E o código antigo?**
A: Migre para `apps/backend/src/` e `apps/frontend/src/` gradualmente.

---

**Estrutura finalizada!** 🚀

