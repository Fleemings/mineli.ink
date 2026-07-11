# 🚀 Quick Start - Mineli.ink Docker

## Um comando para iniciar tudo!

```bash
docker compose up
```

E pronto! 🎉

---

## 📍 O que será iniciado

| Serviço | URL | Porta |
|---------|-----|-------|
| **Frontend** 🎨 | http://localhost:4200 | 4200 |
| **Backend** 🔌 | http://localhost:3000 | 3000 |
| **MongoDB** 🗄️ | localhost:27017 | 27017 |

---

## 🛑 Parar os serviços

```bash
# Parar (dados persistem)
docker compose down

# Parar e remover dados do MongoDB
docker compose down -v
```

---

## 🪵 Logs em tempo real

```bash
# Todos os serviços
docker compose logs -f

# Apenas um serviço
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f mongodb
```

---

## 🔨 Comandos úteis

Se você tem `make` instalado:

```bash
make help              # Ver todos os comandos
make up                # Iniciar (foreground)
make up-d              # Iniciar (background)
make down              # Parar
make logs              # Ver logs
make ps                # Ver status
make build             # Reconstruir imagens
make clean-all         # Limpar tudo
make shell-backend     # Acessar shell do backend
```

---

## ✅ Verificação rápida

```bash
# Ver status de todos os containers
docker compose ps

# Deve mostrar: Up (healthy) para todos os 3 serviços
```

---

## 🐛 Problema comum: Porta já em uso

Se receber erro de porta em uso:

```bash
# Mudar porta no docker-compose.yml
# Linha "ports:" do serviço afetado
# De: "4200:4200"
# Para: "4201:4200"
```

---

## 📚 Documentação Completa

- **DOCKER_GUIDE.md** - Guia completo e detalhado
- **DOCKER_CHECKLIST.md** - Checklist de verificação
- **Makefile** - Atalhos de comandos

---

## 🎯 Acceptance Criteria - Checklist

- ✅ **Dockerfile do Frontend criado** → `frontend/mineli-ink/Dockerfile`
- ✅ **Dockerfile do Backend criado** → `backend/Dockerfile`
- ✅ **Docker Compose criado** → `docker-compose.yml`
- ✅ **MongoDB executando em container** → Serviço "mongodb"
- ✅ **Frontend acessível** → http://localhost:4200
- ✅ **Backend acessível** → http://localhost:3000
- ✅ **Containers comunicam-se corretamente** → Rede "mineli-network"
- ✅ **Persistência do banco através de Volumes** → `mongodb_data` e `mongodb_config`
- ✅ **Ambiente sobe utilizando apenas `docker compose up`** → Verificado ✓

---

## 🚀 Começar agora!

```bash
# 1. Entrar no diretório do projeto
cd /Users/mihome/Documents/mineli-ink/mineli.ink

# 2. Iniciar tudo
docker compose up

# 3. Aguardar (30-40 segundos)

# 4. Acessar
# Frontend: http://localhost:4200
# Backend: http://localhost:3000
# Health: http://localhost:3000/health
```

---

**Tudo pronto!** 🎊

