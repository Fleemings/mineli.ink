# Docker Compose Guide - Mineli.ink

## 🐳 Guia Completo de Containerização

Este guia explica como usar Docker e Docker Compose para executar toda a aplicação Mineli.ink.

---

## 📋 Pré-requisitos

- **Docker**: v20.10+ ([Download](https://www.docker.com/products/docker-desktop))
- **Docker Compose**: v2.0+ (geralmente incluído com Docker Desktop)

### Verificar instalação:
```bash
docker --version
docker compose version
```

---

## 🚀 Inicialização Rápida

### 1. **Desenvolvimento (Uma linha!)**

```bash
# Executar todos os serviços
docker compose up

# Ou em background
docker compose up -d
```

Isso irá iniciar:
- ✅ MongoDB (porta 27017)
- ✅ Backend (porta 3000)
- ✅ Frontend (porta 4200)

### 2. **Verificar Status**

```bash
docker compose ps
```

Expected output:
```
NAME                    STATUS          PORTS
mineli-ink-mongodb      Up (healthy)    27017/tcp
mineli-ink-backend      Up (healthy)    0.0.0.0:3000->3000/tcp
mineli-ink-frontend     Up (healthy)    0.0.0.0:4200->4200/tcp
```

---

## 🌐 Acessar Serviços

| Serviço | URL | Descrição |
|---------|-----|-----------|
| **Frontend** | http://localhost:4200 | Aplicação Angular |
| **Backend** | http://localhost:3000 | API Express |
| **MongoDB** | localhost:27017 | Banco de dados |
| **Health Check (Backend)** | http://localhost:3000/health | Status do backend |

---

## 📝 Variáveis de Ambiente

### Desenvolvimento (`.env.docker`)

O arquivo `.env.docker` já contém as configurações padrão:

```env
NODE_ENV=development
MONGO_ROOT_USER=admin
MONGO_ROOT_PASSWORD=password123
MONGO_INITDB_DATABASE=mineli_ink
```

### Produção (`.env.docker.prod`)

Crie um arquivo `.env.prod` com suas credenciais seguras:

```bash
cp .env.docker.prod .env.prod
# Editar e adicionar seus valores seguros
```

---

## 🛠️ Comandos Comuns

### Iniciar serviços
```bash
# Desenvolvimento
docker compose up

# Desenvolvimento em background
docker compose up -d

# Produção
docker compose -f docker-compose.prod.yml up -d
```

### Parar serviços
```bash
docker compose down

# Com volumes (remove dados do MongoDB)
docker compose down -v
```

### Ver logs
```bash
# Todos os serviços
docker compose logs -f

# Apenas um serviço
docker compose logs -f frontend
docker compose logs -f backend
docker compose logs -f mongodb

# Últimas 100 linhas
docker compose logs --tail=100 frontend
```

### Executar comandos em um container
```bash
# Acessar shell do backend
docker compose exec backend sh

# Executar npm install no backend
docker compose exec backend npm install

# Acessar shell do frontend
docker compose exec frontend sh

# Executar CLI do MongoDB
docker compose exec mongodb mongosh -u admin -p password123
```

### Reconstruir imagens
```bash
# Reconstruir uma imagem específica
docker compose build backend

# Reconstruir todas
docker compose build

# Reconstruir e reiniciar
docker compose up -d --build
```

### Remover dados (limpar cache)
```bash
# Remover volumes (apaga dados do MongoDB)
docker compose down -v

# Remover containers inutilizados
docker system prune

# Remover imagens
docker image prune
```

---

## 🔍 Verificação de Saúde dos Serviços

Cada serviço possui health checks automáticos:

```bash
# Ver status de saúde
docker compose ps

# Verificar logs de health check
docker compose logs mongodb
```

---

## 📦 Estrutura do Projeto

```
mineli.ink/
├── backend/
│   ├── Dockerfile              # Build multi-stage para produção
│   ├── Dockerfile.dev          # Build para desenvolvimento
│   ├── .dockerignore           # Arquivos ignorados no build
│   ├── package.json
│   └── server.js
├── frontend/mineli-ink/
│   ├── Dockerfile              # Build multi-stage produção (SSR)
│   ├── Dockerfile.dev          # Build desenvolvimento (Dev Server)
│   ├── .dockerignore           # Arquivos ignorados no build
│   ├── nginx.conf              # Configuração nginx
│   ├── docker-entrypoint.sh    # Script de entrada
│   └── package.json
├── docker-compose.yml          # Orquestração desenvolvimento
├── docker-compose.prod.yml     # Orquestração produção
├── .env.docker                 # Variáveis desenvolvimento
├── .env.docker.prod            # Variáveis produção (template)
├── init-mongo.js               # Script inicialização MongoDB
└── DOCKER_GUIDE.md             # Este arquivo
```

---

## 🐛 Troubleshooting

### Container não inicia
```bash
# Ver logs detalhados
docker compose logs backend

# Reconstruir
docker compose build backend
docker compose up backend
```

### Porta já em uso
```bash
# Se porta 4200 já está em uso (outro processo)
# Mudar porta no docker-compose.yml:
# ports:
#   - "4201:4200"  # Usar 4201 ao invés de 4200

# Ou parar o processo que usa a porta
lsof -i :4200  # Listar processos na porta
kill -9 <PID>
```

### MongoDB não conecta
```bash
# Verificar se MongoDB está saudável
docker compose ps mongodb

# Ver logs
docker compose logs mongodb

# Reiniciar MongoDB
docker compose restart mongodb
```

### Volumes não persistem
```bash
# Verificar volumes
docker volume ls

# Inspecionar volume específico
docker volume inspect mineli-ink_mongodb_data

# Se volume está corrompido, remover e recriar
docker compose down -v
docker compose up
```

### Frontend não conecta ao Backend
```bash
# Verificar comunicação entre containers
docker compose exec frontend wget -O- http://backend:3000/health

# Verificar DNS dentro do container
docker compose exec frontend nslookup backend

# Verificar rede
docker compose exec backend ifconfig
```

---

## 🔐 Segurança em Produção

### 1. Alterar Credenciais MongoDB
```bash
# Editar .env.prod
MONGO_ROOT_USER=seu_usuario_seguro
MONGO_ROOT_PASSWORD=senha_muito_segura_com_caracteres_especiais
```

### 2. Usar secrets do Docker Compose
```yaml
secrets:
  db_password:
    file: ./secrets/db_password.txt
```

### 3. Habilitar HTTPS
```bash
# Adicionar certificados SSL ao nginx.conf
# Configurar redirecionamento HTTP → HTTPS
```

### 4. Limpar imagens antigas
```bash
docker image prune -a
```

---

## 📊 Monitoramento

### Ver uso de recursos
```bash
docker stats

# Acompanhamento contínuo de um container
docker stats mineli-ink-backend
```

### Criar backup do MongoDB
```bash
# Fazer dump do banco
docker compose exec mongodb mongodump --uri="mongodb://admin:password123@localhost:27017/mineli_ink" --out=/backup

# Copiar para host
docker cp mineli-ink-mongodb:/backup ./backup
```

### Restaurar backup do MongoDB
```bash
# Copiar backup para container
docker cp ./backup mineli-ink-mongodb:/restore

# Restaurar
docker compose exec mongodb mongorestore /restore
```

---

## 🔄 CI/CD Integration

### GitHub Actions Example
```yaml
- name: Build and test with Docker Compose
  run: |
    docker compose build
    docker compose up -d
    docker compose exec -T backend npm test
    docker compose down
```

### Deploy em Produção
```bash
# 1. Build das imagens
docker compose -f docker-compose.prod.yml build

# 2. Push para registry
docker tag backend:latest seu-registry/backend:latest
docker push seu-registry/backend:latest

# 3. Deploy
docker compose -f docker-compose.prod.yml up -d
```

---

## 📚 Referências

- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [MongoDB Docker Hub](https://hub.docker.com/_/mongo)
- [Node.js Docker Best Practices](https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md)

---

## ❓ FAQ

**P: Como mudar a porta do frontend?**
```yaml
# docker-compose.yml
frontend:
  ports:
    - "3000:4200"  # Acessar em http://localhost:3000
```

**P: Como adicionar mais serviços?**
Adicione novo serviço ao `docker-compose.yml`:
```yaml
novo-servico:
  image: imagem:tag
  container_name: meu-servico
  ports:
    - "5000:5000"
  networks:
    - mineli-network
```

**P: Como acessar MongoDB de fora do container?**
```bash
mongosh mongodb://admin:password123@localhost:27017
```

**P: Como fazer rebuild sem perder dados?**
```bash
docker compose up -d --build
# Isso reconstrói as imagens mas mantém os volumes (dados do MongoDB)
```

---

## 📞 Suporte

Se encontrar problemas:

1. Verifique os logs: `docker compose logs`
2. Reconstrua as imagens: `docker compose build --no-cache`
3. Reinicie tudo: `docker compose restart`
4. Comece do zero: `docker compose down -v && docker compose up`

---

**Última atualização**: Julho 2026
**Versão do Docker**: v20.10+
**Versão do Docker Compose**: v2.0+

