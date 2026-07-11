# Frontend README

## 🎨 Frontend Web Application

Frontend da aplicação Mineli.ink construído com Angular 22.

### 🚀 Desenvolvimento Local

```bash
cd apps/frontend
npm install
npm start
```

Acesso: `http://localhost:4200`

### 🐳 Docker

```bash
# Do root do projeto
docker compose up frontend

# Ou via Make
make logs-frontend
```

### 📝 Estrutura de Pasta

```
apps/frontend/
├── src/
│   ├── app/
│   │   ├── services/
│   │   ├── guards/
│   │   ├── core/
│   │   └── shared/
│   ├── environments/        # Environment config
│   ├── styles.sass
│   ├── index.html
│   └── main.ts
├── angular.json             # Angular config
├── tsconfig.json
├── Dockerfile               # Build produção
├── Dockerfile.dev           # Build desenvolvimento
├── nginx.conf
├── docker-entrypoint.sh
├── package.json
└── README.md
```

### 🏗️ Build

**Desenvolvimento:**
```bash
npm start
```

**Produção:**
```bash
npm run build -- --configuration production
```

### 🔌 API Integration

Backend URL configurado em `src/environments/environment.ts`

```typescript
export const environment = {
  apiUrl: 'http://localhost:3000/api',
  // ...
};
```

### 📦 Dependências Principais

- **Angular 22.0.0**
- **Bootstrap 5.3.8**
- **ng-bootstrap 21.0.0**
- **RxJS 7.8.0**

### 🧪 Testes

```bash
npm test
```

### 📄 Linting

```bash
npm run lint
npm run lint:fix
```

### 💅 Formatação

```bash
npm run format
npm run check
```

---

Para mais informações, veja [DOCKER_GUIDE.md](../../docs/DOCKER_GUIDE.md)

