# Configuração de Arquivos de Ambiente (Environment)

## 📋 Visão Geral

O projeto está configurado com sistema de arquivos de ambiente para **development** e **production**. Isso permite ter diferentes configurações para cada ambiente sem precisar modificar o código.

## 📁 Estrutura de Arquivos

```
src/
├── environments/
│   ├── environment.ts                 # Configuração para DEVELOPMENT
│   └── environment.production.ts      # Configuração para PRODUCTION
```

## ⚙️ Variáveis de Ambiente Disponíveis

Cada arquivo de ambiente contém as seguintes propriedades:

```typescript
export const environment = {
  production: boolean,        // Indica o modo
  apiUrl: string,            // URL base da API
  apiTimeout: number,        // Timeout das requisições (ms)
  logLevel: string,          // Nível de log (debug, info, warn, error)
  enableMockData: boolean    // Habilita dados mockados
};
```

## 🔄 Como Usar os Arquivos de Ambiente

### 1. Importar em um Serviço

```typescript
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MyService {
  constructor() {
    console.log('API URL:', environment.apiUrl);
  }

  getData() {
    const url = `${environment.apiUrl}/dados`;
    // Sua lógica aqui
  }
}
```

### 2. Usar em um Componente

```typescript
import { Component } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-my-component',
  template: `<p>{{ message }}</p>`
})
export class MyComponent {
  message = environment.production ? 'Produção' : 'Desenvolvimento';
}
```

### 3. Usar no main.ts

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { environment } from './environments/environment';
import { App } from './app/app';

if (environment.production) {
  // Configurações para produção
}

bootstrapApplication(App);
```

## 🚀 Comandos de Build e Serve

### Desenvolvimento
```bash
npm start
# ou
ng serve

# Usa: src/environments/environment.ts
```

### Build para Desenvolvimento
```bash
ng build --configuration development

# Usa: src/environments/environment.ts
```

### Build para Produção
```bash
npm run build
# ou
ng build --configuration production

# Usa: src/environments/environment.production.ts
```

### Watch Mode (Desenvolvimento)
```bash
npm run watch

# Usa: src/environments/environment.ts
```

## 🔧 Personalizar Variáveis de Ambiente

### 1. Adicionar Nova Variável

Edite os arquivos `environment.ts` e `environment.production.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  apiTimeout: 30000,
  logLevel: 'debug',
  enableMockData: false,
  // Nova variável
  featureFlags: {
    newDashboard: true,
    betaFeatures: true
  }
};
```

### 2. Criar Um Tipo para as Variáveis (Recomendado)

Crie um arquivo `src/environments/environment.interface.ts`:

```typescript
export interface Environment {
  production: boolean;
  apiUrl: string;
  apiTimeout: number;
  logLevel: 'debug' | 'info' | 'warn' | 'error';
  enableMockData: boolean;
}
```

Depois, atualize os arquivos de ambiente:

```typescript
import { Environment } from './environment.interface';

export const environment: Environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  apiTimeout: 30000,
  logLevel: 'debug',
  enableMockData: false
};
```

## ✅ Configuração Atual

A configuração no `angular.json` já está pronta:

```json
"fileReplacements": [
  {
    "replace": "src/environments/environment.ts",
    "with": "src/environments/environment.production.ts"
  }
]
```

Isso significa que quando você faz `ng build --configuration production`, o Angular automaticamente substitui o arquivo `environment.ts` pelo `environment.production.ts`.

## 💡 Boas Práticas

1. **Nunca commit de variáveis sensíveis**: Senhas, tokens, etc. devem ser injetos em tempo de build
2. **Use tipagem**: Defina uma interface para suas variáveis de ambiente
3. **Nomes descritivos**: Use nomes claros para suas variáveis
4. **Documente as variáveis**: Adicione comentários explicando cada variável
5. **Mantenha sincronizado**: Certifique-se de manter as mesmas propriedades em ambos os arquivos

## 🔍 Verificar Qual Ambiente Está Sendo Usado

```typescript
import { environment } from '../../environments/environment';

export class DebugComponent {
  environmentInfo = {
    production: environment.production,
    apiUrl: environment.apiUrl,
    mode: environment.production ? '🔒 PRODUÇÃO' : '🔧 DESENVOLVIMENTO'
  };
}
```

## 📚 Referências

- [Angular Environment Documentation](https://angular.io/guide/build#configuring-application-environments)
- [Angular CLI Build Configurations](https://angular.io/cli/build)

