export type ErrorType = 'validation' | 'network' | 'content' | 'system' | 'unknown';

export interface AppError {
  type: ErrorType;
  message: string;
  details?: string;
  code?: string;
  timestamp: Date;
}

export class CustomError extends Error {
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

export function createError(type: ErrorType, message: string, details?: string, code?: string): CustomError {
  return new CustomError(type, message, details, code);
}

export function handleError(error: unknown): AppError {
  if (error instanceof CustomError) {
    return error.toJSON();
  }

  if (error instanceof Error) {
    return {
      type: 'unknown',
      message: error.message,
      details: error.stack,
      timestamp: new Date()
    };
  }

  return {
    type: 'unknown',
    message: 'Une erreur inattendue s\'est produite',
    details: String(error),
    timestamp: new Date()
  };
}

export function logError(error: AppError, context?: string): void {
  const logData = {
    ...error,
    context,
    userAgent: typeof globalThis.navigator !== 'undefined' ? globalThis.navigator.userAgent : 'server',
    url: typeof globalThis.window !== 'undefined' ? globalThis.window.location.href : 'unknown'
  };

  globalThis.console.error('[ErrorHandler]', logData);

  // En production, on pourrait envoyer les erreurs à un service de monitoring
  if (typeof globalThis.window !== 'undefined' && import.meta.env.PROD) {
    // Exemple d'envoi vers un service de monitoring
    // sendToMonitoring(logData);
  }
}

export function validateRequired<T>(value: T | null | undefined, fieldName: string): T {
  if (value === null || value === undefined) {
    throw createError('validation', `Le champ ${fieldName} est requis`, `Field: ${fieldName}`);
  }
  return value;
}

export function validateString(value: unknown, fieldName: string, minLength = 0, maxLength = Infinity): string {
  if (typeof value !== 'string') {
    throw createError('validation', `${fieldName} doit être une chaîne de caractères`, `Type: ${typeof value}`);
  }

  if (value.length < minLength) {
    throw createError('validation', `${fieldName} doit contenir au moins ${minLength} caractères`, `Length: ${value.length}`);
  }

  if (value.length > maxLength) {
    throw createError('validation', `${fieldName} doit contenir au maximum ${maxLength} caractères`, `Length: ${value.length}`);
  }

  return value;
}

export function validateArray<T>(value: unknown, fieldName: string): T[] {
  if (!Array.isArray(value)) {
    throw createError('validation', `${fieldName} doit être un tableau`, `Type: ${typeof value}`);
  }
  return value as T[];
}

export function safeExecute<T>(
  fn: () => T | Promise<T>,
  fallback: T,
  context?: string
): T | Promise<T> {
  try {
    const result = fn();
    if (result instanceof Promise) {
      return result.catch((error) => {
        const appError = handleError(error);
        logError(appError, context);
        return fallback;
      });
    }
    return result;
  } catch (error) {
    const appError = handleError(error);
    logError(appError, context);
    return fallback;
  }
}

export async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  delay = 1000,
  context?: string
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      const appError = handleError(error);

      if (attempt === maxRetries) {
        logError(appError, `${context} - Final attempt failed`);
        throw error;
      }

      logError(appError, `${context} - Attempt ${attempt}/${maxRetries} failed, retrying...`);

      // Délai avant la prochaine tentative
      await new Promise(resolve => globalThis.setTimeout(resolve, delay * attempt));
    }
  }

  throw lastError;
}