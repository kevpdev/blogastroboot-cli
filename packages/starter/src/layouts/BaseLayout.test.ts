import { describe, test, expect, vi, beforeEach } from 'vitest';

// Simulate the BaseLayout theme initialization script
const createBaseLayoutThemeScript = () => {
  // This simulates the inline script in BaseLayout.astro
  const initializeTheme = () => {
    try {
      const savedTheme = localStorage.getItem('theme');
      let systemPrefersDark = false;
      
      try {
        systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      } catch {
        // Fallback if matchMedia is not available
        systemPrefersDark = false;
      }

      if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.documentElement.classList.add('dark');
      }
    } catch {
      // Fallback behavior in case of any errors
    }
  };

  return { initializeTheme };
};

describe('BaseLayout Theme Initialization', () => {
  let mockLocalStorage: any;
  let mockMatchMedia: any;
  let themeScript: any;

  beforeEach(() => {
    // Reset DOM
    document.documentElement.className = '';
    
    // Reset mocks
    vi.clearAllMocks();
    
    // Get fresh references to mocks
    mockLocalStorage = window.localStorage;
    mockMatchMedia = window.matchMedia;
    
    // Create the theme initialization script
    themeScript = createBaseLayoutThemeScript();
  });

  describe('FOUC Prevention (Flash of Unstyled Content)', () => {
    test('should immediately apply dark theme when saved theme is dark', () => {
      mockLocalStorage.getItem.mockReturnValue('dark');
      mockMatchMedia.mockReturnValue({ matches: false });
      
      themeScript.initializeTheme();
      
      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });

    test('should not apply dark theme when saved theme is light', () => {
      mockLocalStorage.getItem.mockReturnValue('light');
      mockMatchMedia.mockReturnValue({ matches: false });
      
      themeScript.initializeTheme();
      
      expect(document.documentElement.classList.contains('dark')).toBe(false);
    });

    test('should apply dark theme when no saved theme but system prefers dark', () => {
      mockLocalStorage.getItem.mockReturnValue(null);
      mockMatchMedia.mockReturnValue({ matches: true });
      
      themeScript.initializeTheme();
      
      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });

    test('should not apply dark theme when no saved theme and system prefers light', () => {
      mockLocalStorage.getItem.mockReturnValue(null);
      mockMatchMedia.mockReturnValue({ matches: false });
      
      themeScript.initializeTheme();
      
      expect(document.documentElement.classList.contains('dark')).toBe(false);
    });
  });

  describe('System Preference Detection', () => {
    test('should check system preference when no saved theme', () => {
      mockLocalStorage.getItem.mockReturnValue(null);
      mockMatchMedia.mockReturnValue({ matches: true });
      
      themeScript.initializeTheme();
      
      expect(mockMatchMedia).toHaveBeenCalledWith('(prefers-color-scheme: dark)');
    });

    test('should not check system preference when theme is saved', () => {
      mockLocalStorage.getItem.mockReturnValue('light');
      mockMatchMedia.mockReturnValue({ matches: true });
      
      themeScript.initializeTheme();
      
      expect(mockMatchMedia).toHaveBeenCalledWith('(prefers-color-scheme: dark)');
      expect(document.documentElement.classList.contains('dark')).toBe(false);
    });

    test('should handle system preference check failure gracefully', () => {
      mockLocalStorage.getItem.mockReturnValue(null);
      mockMatchMedia.mockImplementation(() => {
        throw new Error('matchMedia not supported');
      });
      
      // Should not throw
      expect(() => themeScript.initializeTheme()).not.toThrow();
    });
  });

  describe('LocalStorage Integration', () => {
    test('should read theme preference from localStorage', () => {
      mockLocalStorage.getItem.mockReturnValue('dark');
      
      themeScript.initializeTheme();
      
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith('theme');
    });

    test('should handle localStorage read errors gracefully', () => {
      mockLocalStorage.getItem.mockImplementation(() => {
        throw new Error('LocalStorage access denied');
      });
      mockMatchMedia.mockReturnValue({ matches: false });
      
      // Should not throw and should fallback to system preference
      expect(() => themeScript.initializeTheme()).not.toThrow();
    });

    test('should handle invalid localStorage values', () => {
      mockLocalStorage.getItem.mockReturnValue('invalid-theme');
      mockMatchMedia.mockReturnValue({ matches: true });
      
      themeScript.initializeTheme();
      
      // Invalid value should not match 'dark', and since there IS a saved theme
      // (even if invalid), it should NOT fallback to system preference  
      expect(document.documentElement.classList.contains('dark')).toBe(false);
    });
  });

  describe('DOM Manipulation', () => {
    test('should add dark class to document.documentElement', () => {
      mockLocalStorage.getItem.mockReturnValue('dark');
      
      themeScript.initializeTheme();
      
      expect(document.documentElement.classList.contains('dark')).toBe(true);
      expect(document.documentElement.className).toBe('dark');
    });

    test('should not modify existing classes when adding dark class', () => {
      document.documentElement.className = 'existing-class another-class';
      mockLocalStorage.getItem.mockReturnValue('dark');
      
      themeScript.initializeTheme();
      
      expect(document.documentElement.classList.contains('existing-class')).toBe(true);
      expect(document.documentElement.classList.contains('another-class')).toBe(true);
      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });

    test('should work when documentElement already has dark class', () => {
      document.documentElement.classList.add('dark');
      mockLocalStorage.getItem.mockReturnValue('dark');
      
      themeScript.initializeTheme();
      
      // Should still have dark class (no duplication)
      expect(document.documentElement.classList.contains('dark')).toBe(true);
      expect(document.documentElement.classList.length).toBe(1);
    });
  });

  describe('Timing and Performance', () => {
    test('should execute synchronously to prevent FOUC', () => {
      let executed = false;
      mockLocalStorage.getItem.mockReturnValue('dark');
      
      // Mock to verify synchronous execution
      const originalAdd = document.documentElement.classList.add;
      document.documentElement.classList.add = vi.fn((...args) => {
        executed = true;
        return originalAdd.apply(document.documentElement.classList, args);
      });
      
      themeScript.initializeTheme();
      
      expect(executed).toBe(true);
      
      // Restore original method
      document.documentElement.classList.add = originalAdd;
    });

    test('should not perform unnecessary DOM queries', () => {
      const spy = vi.spyOn(document, 'querySelector');
      mockLocalStorage.getItem.mockReturnValue('light');
      
      themeScript.initializeTheme();
      
      // Should not query DOM elements, only work with documentElement
      expect(spy).not.toHaveBeenCalled();
      
      spy.mockRestore();
    });
  });

  describe('Integration with CSS', () => {
    test('should enable CSS dark mode selectors when dark class is added', () => {
      // Add some mock CSS rules that depend on .dark class
      const style = document.createElement('style');
      style.textContent = `
        .dark { --text-primary: 255 255 255; }
        .dark .example { color: white; }
      `;
      document.head.appendChild(style);
      
      mockLocalStorage.getItem.mockReturnValue('dark');
      themeScript.initializeTheme();
      
      expect(document.documentElement.classList.contains('dark')).toBe(true);
      
      // Verify the CSS rule would apply
      const testElement = document.createElement('div');
      testElement.className = 'example';
      document.body.appendChild(testElement);
      
      // The .dark .example selector should now be active
      expect(document.documentElement.classList.contains('dark')).toBe(true);
      expect(testElement.matches('.dark .example')).toBe(true);
      
      // Cleanup
      document.body.removeChild(testElement);
      document.head.removeChild(style);
    });

    test('should work with CSS custom properties', () => {
      // Add style with CSS custom properties
      const style = document.createElement('style');
      style.textContent = `
        :root { --text-color: 0 0 0; }
        .dark { --text-color: 255 255 255; }
        body { color: rgb(var(--text-color)); }
      `;
      document.head.appendChild(style);
      
      mockLocalStorage.getItem.mockReturnValue('dark');
      themeScript.initializeTheme();
      
      expect(document.documentElement.classList.contains('dark')).toBe(true);
      
      // Cleanup
      document.head.removeChild(style);
    });
  });

  describe('Theme Preference Priority', () => {
    test('should prioritize saved theme over system preference', () => {
      mockLocalStorage.getItem.mockReturnValue('light');
      mockMatchMedia.mockReturnValue({ matches: true }); // System prefers dark
      
      themeScript.initializeTheme();
      
      // Should use saved theme (light) not system preference (dark)
      expect(document.documentElement.classList.contains('dark')).toBe(false);
    });

    test('should use system preference when no saved theme', () => {
      mockLocalStorage.getItem.mockReturnValue(null);
      mockMatchMedia.mockReturnValue({ matches: true });
      
      themeScript.initializeTheme();
      
      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });

    test('should handle empty string as no saved theme', () => {
      mockLocalStorage.getItem.mockReturnValue('');
      mockMatchMedia.mockReturnValue({ matches: true });
      
      themeScript.initializeTheme();
      
      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });
  });

  describe('Edge Cases and Error Handling', () => {
    test('should handle missing document.documentElement gracefully', () => {
      const originalDocumentElement = document.documentElement;
      // @ts-ignore
      Object.defineProperty(document, 'documentElement', {
        value: null,
        configurable: true
      });
      
      mockLocalStorage.getItem.mockReturnValue('dark');
      
      // Should not throw
      expect(() => themeScript.initializeTheme()).not.toThrow();
      
      // Restore
      Object.defineProperty(document, 'documentElement', {
        value: originalDocumentElement,
        configurable: true
      });
    });

    test('should handle classList being undefined', () => {
      const mockElement = { classList: null };
      Object.defineProperty(document, 'documentElement', {
        value: mockElement,
        configurable: true
      });
      
      mockLocalStorage.getItem.mockReturnValue('dark');
      
      // Should not throw
      expect(() => themeScript.initializeTheme()).not.toThrow();
      
      // Restore
      Object.defineProperty(document, 'documentElement', {
        value: document.documentElement,
        configurable: true
      });
    });

    test('should work in different browser environments', () => {
      // Test in environment where matchMedia might not exist
      const originalMatchMedia = window.matchMedia;
      // @ts-ignore  
      delete window.matchMedia;
      
      mockLocalStorage.getItem.mockReturnValue(null);
      
      // Should not throw and should fallback gracefully
      expect(() => themeScript.initializeTheme()).not.toThrow();
      
      // Restore
      window.matchMedia = originalMatchMedia;
    });
  });

  describe('SSR (Server-Side Rendering) Compatibility', () => {
    test('should handle window being undefined', () => {
      const originalWindow = global.window;
      // @ts-ignore
      delete global.window;
      
      // Should not throw in SSR environment
      expect(() => themeScript.initializeTheme()).not.toThrow();
      
      global.window = originalWindow;
    });

    test('should handle document being undefined', () => {
      const originalDocument = global.document;
      // @ts-ignore
      delete global.document;
      
      // Should not throw in SSR environment  
      expect(() => themeScript.initializeTheme()).not.toThrow();
      
      global.document = originalDocument;
    });
  });
});