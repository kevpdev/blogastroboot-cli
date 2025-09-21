import { describe, test, expect, vi, beforeEach } from 'vitest';
import {
  CustomError,
  createError,
  handleError,
  validateRequired,
  validateString,
  validateArray,
  safeExecute,
  withRetry
} from './error-handler';

describe('error-handler', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock console.error to avoid noise in tests
    vi.spyOn(globalThis.console, 'error').mockImplementation(() => {});
  });

  describe('CustomError', () => {
    test('should create CustomError with all properties', () => {
      const error = new CustomError('validation', 'Test error', 'Details', 'CODE123');

      expect(error.type).toBe('validation');
      expect(error.message).toBe('Test error');
      expect(error.details).toBe('Details');
      expect(error.code).toBe('CODE123');
      expect(error.timestamp).toBeInstanceOf(Date);
      expect(error.name).toBe('CustomError');
    });

    test('should serialize to JSON correctly', () => {
      const error = new CustomError('network', 'Network error');
      const json = error.toJSON();

      expect(json).toMatchObject({
        type: 'network',
        message: 'Network error',
        timestamp: expect.any(Date)
      });
    });
  });

  describe('createError', () => {
    test('should create error with required fields', () => {
      const error = createError('system', 'System failure');

      expect(error).toBeInstanceOf(CustomError);
      expect(error.type).toBe('system');
      expect(error.message).toBe('System failure');
    });

    test('should create error with all fields', () => {
      const error = createError('content', 'Content error', 'Stack trace', 'E404');

      expect(error.type).toBe('content');
      expect(error.message).toBe('Content error');
      expect(error.details).toBe('Stack trace');
      expect(error.code).toBe('E404');
    });
  });

  describe('handleError', () => {
    test('should handle CustomError correctly', () => {
      const customError = new CustomError('validation', 'Validation failed');
      const result = handleError(customError);

      expect(result.type).toBe('validation');
      expect(result.message).toBe('Validation failed');
    });

    test('should handle standard Error correctly', () => {
      const error = new Error('Standard error');
      const result = handleError(error);

      expect(result.type).toBe('unknown');
      expect(result.message).toBe('Standard error');
      expect(result.details).toContain('Error: Standard error');
    });

    test('should handle unknown error types', () => {
      const result = handleError('String error');

      expect(result.type).toBe('unknown');
      expect(result.message).toBe('Une erreur inattendue s\'est produite');
      expect(result.details).toBe('String error');
    });
  });

  describe('validation functions', () => {
    describe('validateRequired', () => {
      test('should return value if not null/undefined', () => {
        expect(validateRequired('test', 'field')).toBe('test');
        expect(validateRequired(0, 'field')).toBe(0);
        expect(validateRequired(false, 'field')).toBe(false);
      });

      test('should throw error for null/undefined', () => {
        expect(() => validateRequired(null, 'testField')).toThrow('Le champ testField est requis');
        expect(() => validateRequired(undefined, 'testField')).toThrow('Le champ testField est requis');
      });
    });

    describe('validateString', () => {
      test('should return string if valid', () => {
        expect(validateString('test', 'field')).toBe('test');
      });

      test('should throw error for non-string', () => {
        expect(() => validateString(123, 'field')).toThrow('field doit être une chaîne de caractères');
      });

      test('should validate minimum length', () => {
        expect(() => validateString('ab', 'field', 3)).toThrow('field doit contenir au moins 3 caractères');
      });

      test('should validate maximum length', () => {
        expect(() => validateString('toolong', 'field', 0, 5)).toThrow('field doit contenir au maximum 5 caractères');
      });
    });

    describe('validateArray', () => {
      test('should return array if valid', () => {
        const arr = [1, 2, 3];
        expect(validateArray(arr, 'field')).toBe(arr);
      });

      test('should throw error for non-array', () => {
        expect(() => validateArray('not array', 'field')).toThrow('field doit être un tableau');
      });
    });
  });

  describe('safeExecute', () => {
    test('should return result when function succeeds', () => {
      const fn = () => 'success';
      const result = safeExecute(fn, 'fallback');

      expect(result).toBe('success');
    });

    test('should return fallback when function throws', () => {
      const fn = () => { throw new Error('Failed'); };
      const result = safeExecute(fn, 'fallback');

      expect(result).toBe('fallback');
      expect(globalThis.console.error).toHaveBeenCalled();
    });

    test('should handle async functions', async () => {
      const fn = async () => 'async success';
      const result = await safeExecute(fn, 'fallback');

      expect(result).toBe('async success');
    });

    test('should handle async function failures', async () => {
      const fn = async () => { throw new Error('Async failed'); };
      const result = await safeExecute(fn, 'fallback');

      expect(result).toBe('fallback');
      expect(globalThis.console.error).toHaveBeenCalled();
    });
  });

  describe('withRetry', () => {
    test('should succeed on first attempt', async () => {
      const fn = vi.fn().mockResolvedValue('success');
      const result = await withRetry(fn, 3, 10);

      expect(result).toBe('success');
      expect(fn).toHaveBeenCalledTimes(1);
    });

    test('should retry on failure and eventually succeed', async () => {
      const fn = vi.fn()
        .mockRejectedValueOnce(new Error('Fail 1'))
        .mockRejectedValueOnce(new Error('Fail 2'))
        .mockResolvedValue('success');

      const result = await withRetry(fn, 3, 10);

      expect(result).toBe('success');
      expect(fn).toHaveBeenCalledTimes(3);
    });

    test('should throw after max retries', async () => {
      const fn = vi.fn().mockRejectedValue(new Error('Always fails'));

      await expect(withRetry(fn, 2, 10)).rejects.toThrow('Always fails');
      expect(fn).toHaveBeenCalledTimes(2);
    });
  });
});