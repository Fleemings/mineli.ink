# Backend README

## 📦 Backend API

Backend da aplicação Mineli.ink construído com Express e MongoDB.

### 🚀 Desenvolvimento Local

```bash
cd apps/backend
npm install
npm run dev
```

Acesso: `http://localhost:3000`

### 🐳 Docker

```bash
# Do root do projeto
docker compose up backend

# Ou via Make
make logs-backend
```

### 📝 Estrutura de Pasta

```
apps/backend/
├── src/                 # Código-fonte
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── services/
├── Dockerfile           # Build produção
├── Dockerfile.dev       # Build desenvolvimento
├── .env                 # Variáveis de ambiente
├── package.json
└── server.js            # Entry point
```

### 🔌 Endpoints

Documentar seus endpoints aqui

- `GET /health` - Health check
- `POST /api/auth/login` - Login
- etc...

### 🗄️ Banco de Dados

MongoDB conectado em `mongodb://mongodb:27017`

### 🔐 Autenticação

JWT Token-based authentication

**Token Header:**
```
Authorization: Bearer <token>
```

---

Para mais informações, veja [DOCKER_GUIDE.md](../../docs/DOCKER_GUIDE.md)

