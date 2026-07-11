# Guia de Desenvolvimento

## Pré-requisitos

- **Node.js** 20+ (desenvolvimento local)
- **Docker** + **Docker Compose** (deploy no Raspberry Pi)

## Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Backend (porta 3000) — precisa de MongoDB local ou remoto
cd apps/backend && npm run dev

# Frontend (porta 4200)
cd apps/frontend && npm start
```

O frontend faz requests para `http://localhost:3000/api` em dev.

## Deploy no Raspberry Pi

```bash
# 1. Criar .env na raiz
cat > .env << EOF
MONGO_USER=admin
MONGO_PASSWORD=sua_senha_segura
JWT_SECRET=seu_jwt_secret_seguro
EOF

# 2. Build e deploy
make deploy
```

A aplicação fica disponível na porta 80 do Pi.

### Arquitetura no Pi

```
Browser → Nginx (porta 80)
              ├── /        → Static files (Angular build)
              └── /api/*   → Proxy para Backend (porta 3000)
                                └── MongoDB (porta 27017, interno)
```

MongoDB e Backend não são expostos externamente — apenas o Nginx na porta 80.

## Variáveis de Ambiente

Criar `.env` na raiz do projeto:

| Variável | Descrição | Default |
|----------|-----------|---------|
| `MONGO_USER` | Usuário MongoDB | admin |
| `MONGO_PASSWORD` | Senha MongoDB | changeme |
| `JWT_SECRET` | Segredo JWT | change_this_secret |

## Lint e Formatação (Frontend)

```bash
cd apps/frontend
npm run check       # Prettier + ESLint (recomendado antes de commit)
npm run lint        # Apenas verificar
npm run format      # Apenas formatar
```

## Shared Package

```typescript
import { User, ApiResponse } from '@mineli-ink/shared';
import { HTTP_STATUS } from '@mineli-ink/shared';
```

## Troubleshooting

**Ver logs no Pi:**
```bash
make logs
docker compose logs backend
```

**Rebuild total:**
```bash
make clean-all
make deploy
```

**MongoDB não inicia no Pi (ARM):**
Use `mongo:7` (não `mongo:7-alpine`) — melhor suporte ARM64.