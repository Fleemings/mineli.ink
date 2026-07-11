# Shared Code

Código compartilhado entre Frontend e Backend

## 📁 Estrutura

```
packages/shared/
├── types/           # Tipos TypeScript comuns
├── config/          # Configurações compartilhadas
├── utils/           # Funções utilitárias comuns
├── constants/       # Constantes da aplicação
└── package.json
```

## 🚀 Como Usar

### Importar no Backend

```javascript
const { API_VERSION } = require('@mineli-ink/shared/constants');
```

### Importar no Frontend

```typescript
import { ApiResponse } from '@mineli-ink/shared/types';
```

## 📝 Exemplos

### Types

```typescript
// packages/shared/types/api.ts
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
```

### Constants

```typescript
// packages/shared/constants/index.ts
export const API_VERSION = 'v1';
export const API_BASE_URL = '/api';
```

### Utils

```typescript
// packages/shared/utils/validation.ts
export function validateEmail(email: string): boolean {
  // validation logic
}
```

