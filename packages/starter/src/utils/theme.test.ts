import { describe, test, expect, vi, beforeEach } from 'vitest';
import { 
  getCurrentTheme, 
  setTheme, 
  applyTheme, 
  getSystemTheme, 
  initializeTheme, 
  toggleTheme, 
  themeOptions, 
  type ThemeMode 
} from './theme';

// Mock localStorage and matchMedia are already set up in vitest.setup.ts

describe('Theme Utilities', () => {
  let mockLocalStorage: any;
  let mockMatchMedia: any;
  let mockDocumentElement: any;

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
    
    // Get fresh references to mocks
    mockLocalStorage = window.localStorage;
    mockMatchMedia = window.matchMedia;
    
    // Mock document.documentElement
    mockDocumentElement = {
      classList: {
        add: vi.fn(),
        remove: vi.fn(),
        contains: vi.fn(() => false)
      }
    };
    
    Object.defineProperty(document, 'documentElement', {
      value: mockDocumentElement,
      writable: true
    });
  });

  describe('getSystemTheme', () => {
    test('should return "dark" when system prefers dark', () => {
      mockMatchMedia.mockReturnValue({ matches: true });
      
      const result = getSystemTheme();
      
      expect(result).toBe('dark');
      expect(mockMatchMedia).toHaveBeenCalledWith('(prefers-color-scheme: dark)');
    });

    test('should return "light" when system prefers light', () => {
      mockMatchMedia.mockReturnValue({ matches: false });
      
      const result = getSystemTheme();
      
      expect(result).toBe('light');
    });

    test('should return "light" when window is undefined (SSR)', () => {
      const originalWindow = global.window;
      // @ts-ignore
      delete global.window;
      
      const result = getSystemTheme();
      
      expect(result).toBe('light');
      
      global.window = originalWindow;
    });
  });

  describe('getCurrentTheme', () => {
    test('should return stored theme from localStorage', () => {
      mockLocalStorage.getItem.mockReturnValue('dark');
      
      const result = getCurrentTheme();
      
      expect(result).toBe('dark');
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith('theme');
    });

    test('should return "system" when localStorage is empty', () => {
      mockLocalStorage.getItem.mockReturnValue(null);
      
      const result = getCurrentTheme();
      
      expect(result).toBe('system');
    });

    test('should return "system" when window is undefined (SSR)', () => {
      const originalWindow = global.window;
      // @ts-ignore
      delete global.window;
      
      const result = getCurrentTheme();
      
      expect(result).toBe('system');
      
      global.window = originalWindow;
    });
  });

  describe('setTheme', () => {
    test('should save theme to localStorage and apply it', () => {
      setTheme('dark');
      
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
      expect(mockDocumentElement.classList.remove).toHaveBeenCalledWith('dark');
      expect(mockDocumentElement.classList.add).toHaveBeenCalledWith('dark');
    });

    test('should handle light theme', () => {
      setTheme('light');
      
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('theme', 'light');
      expect(mockDocumentElement.classList.remove).toHaveBeenCalledWith('dark');
      expect(mockDocumentElement.classList.add).not.toHaveBeenCalled();
    });

    test('should handle system theme', () => {
      mockMatchMedia.mockReturnValue({ matches: true });
      
      setTheme('system');
      
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('theme', 'system');
      expect(mockDocumentElement.classList.add).toHaveBeenCalledWith('dark');
    });

    test('should do nothing when window is undefined (SSR)', () => {
      const originalWindow = global.window;
      // @ts-ignore
      delete global.window;
      
      setTheme('dark');
      
      // Should not throw and should not call any methods
      expect(mockLocalStorage.setItem).not.toHaveBeenCalled();
      
      global.window = originalWindow;
    });
  });

  describe('applyTheme', () => {
    test('should add dark class for dark theme', () => {
      applyTheme('dark');
      
      expect(mockDocumentElement.classList.remove).toHaveBeenCalledWith('dark');
      expect(mockDocumentElement.classList.add).toHaveBeenCalledWith('dark');
    });

    test('should not add dark class for light theme', () => {
      applyTheme('light');
      
      expect(mockDocumentElement.classList.remove).toHaveBeenCalledWith('dark');
      expect(mockDocumentElement.classList.add).not.toHaveBeenCalled();
    });

    test('should add dark class for system theme when system prefers dark', () => {
      mockMatchMedia.mockReturnValue({ matches: true });
      
      applyTheme('system');
      
      expect(mockDocumentElement.classList.add).toHaveBeenCalledWith('dark');
    });

    test('should not add dark class for system theme when system prefers light', () => {
      mockMatchMedia.mockReturnValue({ matches: false });
      
      applyTheme('system');
      
      expect(mockDocumentElement.classList.add).not.toHaveBeenCalled();
    });

    test('should do nothing when document is undefined (SSR)', () => {
      const originalDocument = global.document;
      // @ts-ignore
      delete global.document;
      
      applyTheme('dark');
      
      // Should not throw
      global.document = originalDocument;
    });
  });

  describe('toggleTheme', () => {
    test('should switch from dark to light', () => {
      mockLocalStorage.getItem.mockReturnValue('dark');
      
      toggleTheme();
      
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('theme', 'light');
    });

    test('should switch from light to dark', () => {
      mockLocalStorage.getItem.mockReturnValue('light');
      
      toggleTheme();
      
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
    });

    test('should switch from system to dark', () => {
      mockLocalStorage.getItem.mockReturnValue('system');
      
      toggleTheme();
      
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
    });

    test('should switch from null (system default) to dark', () => {
      mockLocalStorage.getItem.mockReturnValue(null);
      
      toggleTheme();
      
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
    });
  });

  describe('initializeTheme', () => {
    test('should apply current theme and set up system listener', () => {
      const mockListener = { addEventListener: vi.fn() };
      mockMatchMedia.mockReturnValue(mockListener);
      mockLocalStorage.getItem.mockReturnValue('dark');
      
      initializeTheme();
      
      expect(mockDocumentElement.classList.add).toHaveBeenCalledWith('dark');
      expect(mockListener.addEventListener).toHaveBeenCalledWith('change', expect.any(Function));
    });

    test('should handle system theme changes when current theme is system', () => {
      const mockListener = { addEventListener: vi.fn() };
      mockMatchMedia.mockReturnValue(mockListener);
      mockLocalStorage.getItem.mockReturnValue('system');
      
      initializeTheme();
      
      // Get the change listener function
      const changeListener = mockListener.addEventListener.mock.calls[0]![1];
      
      // Mock system change to dark
      mockMatchMedia.mockReturnValue({ matches: true });
      
      // Call the change listener
      changeListener();
      
      expect(mockDocumentElement.classList.add).toHaveBeenCalledWith('dark');
    });

    test('should do nothing when window is undefined (SSR)', () => {
      const originalWindow = global.window;
      // @ts-ignore
      delete global.window;
      
      initializeTheme();
      
      // Should not throw
      global.window = originalWindow;
    });
  });

  describe('themeOptions', () => {
    test('should provide correct theme options', () => {
      expect(themeOptions).toEqual([
        { value: 'light', label: 'Clair' },
        { value: 'dark', label: 'Sombre' },
        { value: 'system', label: 'Système' },
      ]);
    });

    test('should have valid ThemeMode values', () => {
      themeOptions.forEach(option => {
        expect(['light', 'dark', 'system']).toContain(option.value);
      });
    });

    test('should have unique theme values', () => {
      const values = themeOptions.map(option => option.value);
      const uniqueValues = [...new Set(values)];
      expect(values.length).toBe(uniqueValues.length);
    });
  });

  describe('ThemeMode type validation', () => {
    test('should accept valid theme modes', () => {
      const validModes: ThemeMode[] = ['light', 'dark', 'system'];
      
      validModes.forEach(mode => {
        expect(typeof mode).toBe('string');
        expect(['light', 'dark', 'system']).toContain(mode);
      });
    });
  });
});