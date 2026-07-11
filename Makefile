.PHONY: help up down logs build restart clean

help:
	@echo "📦 Mineli.ink Commands"
	@echo ""
	@echo "🚀 Deploy (Raspberry Pi):"
	@echo "  make deploy          - Build e iniciar no Pi"
	@echo "  make up              - Iniciar services"
	@echo "  make down            - Parar services"
	@echo "  make restart         - Reiniciar"
	@echo "  make logs            - Ver logs"
	@echo "  make build           - Rebuild imagens"
	@echo ""
	@echo "🛠️  Dev Local:"
	@echo "  make dev-backend     - Iniciar backend local"
	@echo "  make dev-frontend    - Iniciar frontend local"
	@echo "  make install         - Instalar dependências"
	@echo ""
	@echo "🧹 Manutenção:"
	@echo "  make clean           - Parar e remover containers"
	@echo "  make clean-all       - Remover tudo (inclusive dados)"
	@echo "  make status          - Ver estado dos containers"

# Deploy
deploy:
	docker compose build
	docker compose up -d
	@echo "✅ Deploy feito!"
	@echo "📍 App: http://localhost"

up:
	docker compose up -d

down:
	docker compose down

restart:
	docker compose restart

logs:
	docker compose logs -f

build:
	docker compose build

# Dev local
install:
	npm install

dev-backend:
	cd apps/backend && npm run dev

dev-frontend:
	cd apps/frontend && npm start

# Manutenção
clean:
	docker compose down

clean-all:
	docker compose down -v

status:
	@docker compose ps