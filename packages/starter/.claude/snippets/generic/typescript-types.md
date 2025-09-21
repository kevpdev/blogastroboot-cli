# Snippets — Types TypeScript

Types et interfaces TypeScript couramment utilisés.

## Types de Base

```typescript
// Union types pour variants
type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type Status = 'success' | 'error' | 'warning' | 'info';

// Types pour couleurs
type ColorScheme = 'light' | 'dark' | 'auto';
type ThemeColor = 'brand' | 'accent' | 'neutral' | 'semantic';
```

## Interfaces Components

```typescript
// Props de base pour composants
interface BaseComponentProps {
  className?: string;
  id?: string;
  'data-testid'?: string;
}

// Props avec children
interface WithChildren {
  children: React.ReactNode;
}

// Props avec slots (Astro)
interface WithSlots {
  children?: any;
  [key: `slot:${string}`]: any;
}

// Props étendues
interface ButtonProps extends BaseComponentProps {
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (event: MouseEvent) => void;
}
```

## Types Utilitaires

```typescript
// Rendre toutes les propriétés optionnelles sauf certaines
type PartialExcept<T, K extends keyof T> = Partial<T> & Pick<T, K>;

// Exemple d'usage
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

type CreateUserInput = PartialExcept<User, 'name' | 'email'>;

// Extraire les valeurs d'un objet
type ValuesOf<T> = T[keyof T];

// Type pour configuration
type Config<T> = {
  [K in keyof T]: T[K];
};
```

## Types pour API

```typescript
// Response type générique
interface ApiResponse<T> {
  data: T;
  status: 'success' | 'error';
  message?: string;
  timestamp: string;
}

// Pagination
interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Error type
interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}
```

## Types pour Content Collections

```typescript
// Schema Astro Content
interface BlogPost {
  title: string;
  description: string;
  pubDate: Date;
  updatedDate?: Date;
  heroImage?: string;
  tags: string[];
  draft: boolean;
  author: string;
}

// Collection entry
interface CollectionEntry<T> {
  id: string;
  slug: string;
  body: string;
  collection: string;
  data: T;
}

type BlogEntry = CollectionEntry<BlogPost>;
```

## Guards de Type

```typescript
// Type guards
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function isNotNullish<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

function hasProperty<K extends string>(
  obj: unknown,
  key: K
): obj is Record<K, unknown> {
  return typeof obj === 'object' && obj !== null && key in obj;
}

// Assert function
function assertIsNumber(value: unknown): asserts value is number {
  if (typeof value !== 'number') {
    throw new Error('Expected number');
  }
}
```

## Types de Gestion d'Erreurs

```typescript
// Types d'erreurs
type ErrorType = 'validation' | 'network' | 'content' | 'system' | 'unknown';

// Interface erreur applicative
interface AppError {
  type: ErrorType;
  message: string;
  details?: string;
  code?: string;
  timestamp: Date;
}

// Classe d'erreur personnalisée
class CustomError extends Error {
  type: ErrorType;
  details?: string;
  code?: string;
  timestamp: Date;

  constructor(type: ErrorType, message: string, details?: string, code?: string) {
    super(message);
    this.type = type;
    this.details = details;
    this.code = code;
    this.timestamp = new Date();
    this.name = 'CustomError';
  }

  toJSON(): AppError {
    return {
      type: this.type,
      message: this.message,
      details: this.details,
      code: this.code,
      timestamp: this.timestamp
    };
  }
}

// Types pour composants d'erreur
interface ErrorComponentProps {
  title?: string;
  message: string;
  type?: 'error' | 'warning' | 'info';
  showError?: boolean;
  dismissible?: boolean;
  class?: string;
}

// Types pour validation
type ValidatorFunction<T> = (value: unknown, fieldName: string) => T;
type AsyncValidatorFunction<T> = (value: unknown, fieldName: string) => Promise<T>;

// Types pour retry logic
interface RetryOptions {
  maxRetries?: number;
  delay?: number;
  context?: string;
}

// Types pour safe execution
type SafeExecuteResult<T> = T | Promise<T>;
type FallbackValue<T> = T | (() => T);
```

## Types d'Événements

```typescript
// Event handlers
type EventHandler<T = Event> = (event: T) => void;
type AsyncEventHandler<T = Event> = (event: T) => Promise<void>;

// Form events
type FormSubmitHandler = EventHandler<SubmitEvent>;
type InputChangeHandler = EventHandler<Event & { target: HTMLInputElement }>;

// Mouse events
type ClickHandler = EventHandler<MouseEvent>;
type HoverHandler = EventHandler<MouseEvent>;
```