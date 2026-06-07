# Adapters Pattern

Este documento descreve o padrão de Adapters e Injeção de Dependências utilizado no projeto Mynu.

## Visão Geral

O padrão de Adapters permite desacoplar o código de negócio das implementações concretas de serviços externos (autenticação, storage, notificações, etc.). Isso facilita:

- **Testabilidade**: Substituir implementações por mocks em testes
- **Flexibilidade**: Trocar bibliotecas sem alterar código consumidor
- **Manutenibilidade**: Isolar dependências externas em um único ponto

## Estrutura de Pastas

```
src/infra/
├── adapters/
│   └── [adapter-name]/
│       ├── index.ts                    # Re-exporta tipos e hooks
│       ├── types.ts                    # Interface do adapter (contrato)
│       ├── hooks/
│       │   └── use[AdapterName].ts     # Hook para consumir o adapter
│       └── implementation/
│           └── [impl-name]/
│               └── index.ts            # Implementação concreta
└── DI/
    ├── context/
    │   └── DIContext.tsx               # Provider e hook useDI
    ├── di-container.ts                 # Classe DIContainer
    └── types/
        └── index.ts                    # DIKeys e DIValues
```

## Padrão Principal: DI Container com Hooks

Este é o padrão **recomendado** para todos os adapters. Utiliza React Context para injetar dependências e hooks para consumir.

### 1. Definir a Interface (Contrato)

Crie o arquivo `types.ts` com a interface que define o contrato do adapter:

```typescript
// src/infra/adapters/auth/types.ts
export interface AuthServiceImpl {
  signIn(email: string, password: string): Promise<Session | null>;
  signUp(request: SignUpRequest): Promise<Session | null>;
  signOut(): Promise<void>;
  fetchSession(): Promise<Session | null>;
}
```

### 2. Registrar no DI Container

Adicione a chave e o tipo no arquivo de tipos do DI:

```typescript
// src/infra/DI/types/index.ts
export const enum DIKeys {
  AuthService = "AuthService",
  // ... outras chaves
}

export interface DIValues {
  [DIKeys.AuthService]: AuthServiceImpl;
  // ... outros tipos
}
```

### 3. Criar a Implementação

Crie a implementação concreta que satisfaz a interface:

```typescript
// src/infra/adapters/auth/implementation/supabase/index.ts
import { AuthServiceImpl } from "../../types";

async function signIn(email: string, password: string) {
  // implementação específica do Supabase
}

async function signOut() {
  // implementação específica do Supabase
}

// Exporta objeto que implementa a interface
export const supabaseAuth: AuthServiceImpl = {
  signIn,
  signUp,
  signOut,
  fetchSession,
};
```

### 4. Criar o Hook de Consumo

Crie um hook que utiliza `useDI` para acessar o serviço:

```typescript
// src/infra/adapters/auth/hooks/useAuthService.ts
import { useDI } from "@/infra/DI/context";
import { DIKeys } from "@/infra/DI/types";

export const useAuthService = () => useDI(DIKeys.AuthService);
```

### 5. Registrar no Provider

No `_layout.tsx`, registre a implementação no DIProvider:

```tsx
// app/_layout.tsx
<DIProvider
  config={(container) => {
    container.registerService(DIKeys.AuthService, supabaseAuth);
  }}
>
  {children}
</DIProvider>
```

### 6. Consumir nos Componentes

Use o hook nos componentes:

```typescript
function LoginScreen() {
  const authService = useAuthService();

  async function handleLogin() {
    await authService.signIn(email, password);
  }
}
```

## Exceções: Singleton com Setter Function

Para casos específicos onde o serviço precisa ser acessado **fora do contexto React**, utilizamos o padrão singleton com função setter. Este padrão é uma **exceção** e deve ser usado apenas quando necessário.

### Casos de Uso para Exceções

- **translate**: Usado em schemas Zod, que executam fora de componentes React
- **storage**: Pode ser necessário antes do React Context estar disponível
- **logger**: Usado em qualquer lugar da aplicação, incluindo fora de componentes

### Estrutura da Exceção

```typescript
// src/infra/adapters/translate/types.ts
export interface TranslateImpl {
  t: (key: TranslateKeys) => string;
}

// src/infra/adapters/translate/translate.ts
import { TranslateImpl } from "./types";

export let translate: TranslateImpl;

export function setTranslate(impl: TranslateImpl) {
  translate = impl;
}
```

### Configuração da Exceção

No `_layout.tsx`, configure **antes** do JSX:

```typescript
// app/_layout.tsx
import { setTranslate } from "@/infra/adapters/translate";
import { i18NextImpl } from "@/infra/adapters/translate/implementation/i18next";

// Executa antes do render
setTranslate(i18NextImpl);

export default function RootLayout() {
  return (/* ... */);
}
```

### Consumo da Exceção

Importe diretamente onde necessário:

```typescript
// Em um schema Zod (fora de componente React)
import { translate } from "@/infra/adapters/translate";

export const createSchema = () =>
  z.object({
    name: z.string({
      message: translate.t("profile:PROFILE_VALIDATION_NAME_REQUIRED"),
    }),
  });
```

## DIContainer - Referência da API

### Classe DIContainer

```typescript
class DIContainer {
  // Registra um serviço no container
  registerService<Key extends DIKeys>(key: Key, service: DIValues[Key]): void;

  // Recupera um serviço do container
  getService<Key extends DIKeys>(key: Key): DIValues[Key];
}
```

### Hook useDI

```typescript
// Hook genérico para acessar qualquer serviço
function useDI<Key extends DIKeys>(key: Key): DIValues[Key];

// Uso
const authService = useDI(DIKeys.AuthService);
```

### DIProvider

```tsx
interface DIProviderProps {
  config: (container: DIContainer) => void;
}

// Uso
<DIProvider
  config={(container) => {
    container.registerService(DIKeys.AuthService, supabaseAuth);
    container.registerService(DIKeys.Storage, mmkvImpl);
  }}
>
  {children}
</DIProvider>
```

## Adicionando um Novo Adapter

### Checklist

1. [ ] Criar interface em `types.ts`
2. [ ] Adicionar `DIKeys` e `DIValues` em `src/infra/DI/types/index.ts`
3. [ ] Criar implementação em `implementation/[impl-name]/index.ts`
4. [ ] Criar hook em `hooks/use[AdapterName].ts`
5. [ ] Registrar no `DIProvider` em `app/_layout.tsx`
6. [ ] Exportar hook no `index.ts` do adapter

### Exemplo Completo

```typescript
// 1. types.ts
export interface NotificationServiceImpl {
  schedule(notification: Notification): Promise<void>;
  cancel(id: string): Promise<void>;
}

// 2. DI/types/index.ts
export const enum DIKeys {
  NotificationService = "NotificationService",
}
export interface DIValues {
  [DIKeys.NotificationService]: NotificationServiceImpl;
}

// 3. implementation/expo-notifications/index.ts
export const expoNotificationsImpl: NotificationServiceImpl = {
  schedule: async (notification) => { /* ... */ },
  cancel: async (id) => { /* ... */ },
};

// 4. hooks/useNotificationService.ts
export const useNotificationService = () => useDI(DIKeys.NotificationService);

// 5. _layout.tsx
container.registerService(DIKeys.NotificationService, expoNotificationsImpl);

// 6. index.ts
export * from "./hooks/useNotificationService";
```

## Resumo

| Padrão | Uso | Acesso |
|--------|-----|--------|
| **DI Container (Padrão)** | Serviços usados em componentes React | Via hooks (`useAuthService()`) |
| **Singleton (Exceção)** | Serviços usados fora do React | Import direto (`translate.t()`) |
