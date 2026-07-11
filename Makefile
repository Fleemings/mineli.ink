.PHONY: help up down logs build restart clean test lint

help:
	@echo "📦 Mineli.ink Docker Commands"
	@echo ""
	@echo "🚀 Startup Commands:"
	@echo "  make up              - Start all services"
	@echo "  make up-d            - Start all services in background"
	@echo "  make down            - Stop all services"
	@echo "  make restart         - Restart all services"
	@echo ""
	@echo "🔍 Inspection Commands:"
	@echo "  make ps              - Show running containers"
	@echo "  make logs            - Show logs from all services"
	@echo "  make logs-backend    - Show backend logs"
	@echo "  make logs-frontend   - Show frontend logs"
	@echo "  make logs-mongodb    - Show MongoDB logs"
	@echo ""
	@echo "🔨 Build Commands:"
	@echo "  make build           - Build all images"
	@echo "  make build-backend   - Build backend image"
	@echo "  make build-frontend  - Build frontend image"
	@echo ""
	@echo "🧹 Cleanup Commands:"
	@echo "  make clean           - Stop and remove containers"
	@echo "  make clean-all       - Remove containers, volumes, and images"
	@echo "  make clean-volumes   - Remove volumes (MongoDB data)"
	@echo ""
	@echo "🛠️  Development Commands:"
	@echo "  make shell-backend   - Access backend container shell"
	@echo "  make shell-frontend  - Access frontend container shell"
	@echo "  make shell-mongo     - Access MongoDB shell"
	@echo ""
	@echo "📊 Database Commands:"
	@echo "  make backup-mongo    - Backup MongoDB data"
	@echo "  make restore-mongo   - Restore MongoDB from backup"
	@echo ""

# Startup
up:
	docker compose up

up-d:
	docker compose up -d

down:
	docker compose down

restart:
	docker compose restart

# Inspection
ps:
	docker compose ps

logs:
	docker compose logs -f

logs-backend:
	docker compose logs -f backend

logs-frontend:
	docker compose logs -f frontend

logs-mongodb:
	docker compose logs -f mongodb

# Build
build:
	docker compose build

build-backend:
	docker compose build backend

build-frontend:
	docker compose build frontend

build-no-cache:
	docker compose build --no-cache

# Cleanup
clean:
	docker compose down

clean-all:
	docker compose down -v
	docker rmi mineli-ink-backend mineli-ink-frontend

clean-volumes:
	docker compose down -v

# Development
shell-backend:
	docker compose exec backend sh

shell-frontend:
	docker compose exec frontend sh

# Workspace commands
workspace-install:
	npm install

workspace-build:
	npm run build --workspaces

workspace-dev:
	npm run dev --workspaces

shell-mongo:
	docker compose exec mongodb mongosh -u admin -p password123 admin

# Database
backup-mongo:
	@mkdir -p ./backups
	docker compose exec mongodb mongodump --uri="mongodb://admin:password123@localhost:27017/mineli_ink" --out=/backup
	docker cp mineli-ink-mongodb:/backup ./backups/mongo_$(shell date +%Y%m%d_%H%M%S)
	@echo "✅ Backup created in ./backups"

restore-mongo:
	@if [ -z "$(BACKUP_PATH)" ]; then \
		echo "❌ Error: BACKUP_PATH not specified"; \
		echo "Usage: make restore-mongo BACKUP_PATH=./backups/mongo_20260711_120000"; \
		exit 1; \
	fi
	docker cp $(BACKUP_PATH) mineli-ink-mongodb:/restore
	docker compose exec mongodb mongorestore /restore
	@echo "✅ Backup restored"

# Health checks
health:
	@echo "🏥 Health Check Status:"
	@docker compose ps

# Stats
stats:
	docker stats

# Prune
prune:
	docker system prune -f

prune-all:
	docker system prune -a -f

# Production
prod-up:
	docker compose -f docker-compose.prod.yml up -d

prod-down:
	docker compose -f docker-compose.prod.yml down

prod-logs:
	docker compose -f docker-compose.prod.yml logs -f

prod-build:
	docker compose -f docker-compose.prod.yml build

# Quick setup
setup:
	@echo "🚀 Setting up Mineli.ink..."
	docker compose build
	docker compose up -d
	@echo "✅ Setup complete!"
	@echo "📍 Frontend: http://localhost:4200"
	@echo "📍 Backend: http://localhost:3000"
	@echo "📍 MongoDB: localhost:27017"

# Status
status:
	@echo "📊 System Status:"
	@docker compose ps
	@echo ""
	@echo "🐳 Docker Info:"
	@docker --version
	@docker compose version

