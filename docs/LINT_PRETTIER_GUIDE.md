# 📝 Comandos ESLint, Prettier e Husky

## 🎯 Comandos npm Disponíveis

### 1️⃣ **Apenas Verificar (sem modificar)**
```bash
npm run lint
```
- ✅ Verifica erros de linting
- ❌ Não corrige nada
- Mostra todos os problemas encontrados

### 2️⃣ **Apenas Formatar com Prettier**
```bash
npm run format
```
- 🎨 Formata código automaticamente
- Modifica: `.ts`, `.tsx`, `.json`, `.html`
- Prettier deixa o código visualmente consistente

### 3️⃣ **Apenas Corrigir Lint**
```bash
npm run lint:fix
```
- 🔧 ESLint corrige problemas automaticamente
- Exemplos: Remove imports não usados, corrige espaçamento
- O que ESLint consegue corrigir automaticamente

### 4️⃣ **Fazer Tudo (Recomendado) ⭐**
```bash
npm run check
```
- ✨ Equivalente a: `npm run format && npm run lint:fix`
- 1. Formata com Prettier
- 2. Corrige ESLint
- **Use isso antes de fazer commit!**

---

## 🪝 Husky (Automático)

Husky roda **automaticamente** antes de cada `git commit`:

```bash
git add .
git commit -m "minha mensagem"  # ← Husky executa lint-staged automaticamente
```

### O que Husky faz:
1. Verifica arquivos que você vai commitar
2. Roda `npm run format` (Prettier)
3. Roda `npm run lint:fix` (ESLint)
4. Se tudo passar ✅ → commit é feito
5. Se falhar ❌ → commit é rejeitado

---

## 📋 Workflow Recomendado

### Antes de Commitar (Opção A - Manual):
```bash
npm run check    # Formata + corrige lint
git add .
git commit -m "minha mensagem"
```

### Ou (Opção B - Deixar Husky Fazer):
```bash
git add .
git commit -m "minha mensagem"  # Husky faz tudo automaticamente
```

---

## 🚀 Resumo Rápido

| Comando | O Que Faz | Modifica Arquivos |
|---------|-----------|-------------------|
| `npm run lint` | Apenas verifica erros | ❌ Não |
| `npm run format` | Prettier formata | ✅ Sim |
| `npm run lint:fix` | ESLint corrige | ✅ Sim |
| `npm run check` | Format + Lint:fix | ✅ Sim |
| `git commit` | Husky roda lint-staged | ✅ Sim (auto) |

---

## ❓ Qual Usar?

- 👨‍💻 **Desenvolvendo**: Use `npm run check` para limpar código antes de commitar
- 🔍 **Apenas verificar**: Use `npm run lint` para ver o que está errado
- 💾 **Commitando**: Pode deixar Husky fazer tudo automaticamente
- 🎨 **Formatação**: Use `npm run format` se só quer formatar


