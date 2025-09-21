import { describe, test, expect, vi, beforeEach } from 'vitest';
import { getByRole } from '@testing-library/dom';

// Mock theme toggle functionality - simulates the inline script behavior
const createThemeToggleComponent = () => {
  // Create the basic HTML structure
  const toggleHTML = `
    <button 
      id="theme-toggle" 
      class="text-[rgb(var(--text-primary))] hover:bg-[rgb(var(--bg-muted))] hover:text-[rgb(var(--brand-primary))] focus:ring-[rgb(var(--brand-primary))] inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed px-3 py-1.5 text-sm p-2 border border-[rgb(var(--border-primary))]"
      aria-label="Basculer le thème"
      title="Basculer entre thème clair et sombre"
      type="button"
    >
      <!-- Sun icon for light mode -->
      <svg 
        class="sun-icon w-5 h-5 transition-transform duration-200 rotate-0 scale-100" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="5"/>
        <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/>
      </svg>
      
      <!-- Moon icon for dark mode -->
      <svg 
        class="moon-icon w-5 h-5 transition-transform duration-200 absolute rotate-90 scale-0" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
      </svg>
    </button>
  `;

  document.body.innerHTML = toggleHTML;
  
  // Simulate the script functionality
  const themeToggleFunctions = {
    getCurrentTheme: () => {
      if (typeof window === 'undefined') return 'system';
      try {
        return localStorage.getItem('theme') || 'system';
      } catch {
        return 'system';
      }
    },

    getSystemTheme: () => {
      if (typeof window === 'undefined') return 'light';
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    },

    setTheme: (theme: string) => {
      if (typeof window === 'undefined') return;
      
      localStorage.setItem('theme', theme);
      themeToggleFunctions.applyTheme(theme);
    },

    applyTheme: (theme: string) => {
      if (typeof document === 'undefined') return;
      
      const root = document.documentElement;
      
      // Remove existing theme class
      root.classList.remove('dark');
      
      // Apply new theme (only add dark class for dark mode)
      if (theme === 'system') {
        const systemTheme = themeToggleFunctions.getSystemTheme();
        if (systemTheme === 'dark') {
          root.classList.add('dark');
        }
      } else if (theme === 'dark') {
        root.classList.add('dark');
      }
    },

    updateThemeToggle: () => {
      const toggle = document.getElementById('theme-toggle');
      const sunIcon = toggle?.querySelector('.sun-icon');
      const moonIcon = toggle?.querySelector('.moon-icon');
      
      if (!toggle || !sunIcon || !moonIcon) return;
      
      const currentTheme = themeToggleFunctions.getCurrentTheme();
      const isDark = currentTheme === 'dark' || (currentTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
      
      if (isDark) {
        // Show sun icon in dark mode
        sunIcon.classList.remove('rotate-90', 'scale-0');
        sunIcon.classList.add('rotate-0', 'scale-100');
        moonIcon.classList.remove('rotate-0', 'scale-100');  
        moonIcon.classList.add('rotate-90', 'scale-0');
        toggle.setAttribute('aria-label', 'Activer le thème clair');
        toggle.setAttribute('title', 'Passer au thème clair');
      } else {
        // Show moon icon in light mode
        moonIcon.classList.remove('rotate-90', 'scale-0');
        moonIcon.classList.add('rotate-0', 'scale-100');
        sunIcon.classList.remove('rotate-0', 'scale-100');
        sunIcon.classList.add('rotate-90', 'scale-0');
        toggle.setAttribute('aria-label', 'Activer le thème sombre');
        toggle.setAttribute('title', 'Passer au thème sombre');
      }
    },

    toggleTheme: () => {
      const currentTheme = themeToggleFunctions.getCurrentTheme();
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      themeToggleFunctions.setTheme(newTheme);
      themeToggleFunctions.updateThemeToggle();
    }
  };

  // Set up event listener
  const toggle = document.getElementById('theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', themeToggleFunctions.toggleTheme);
    themeToggleFunctions.updateThemeToggle();
  }

  return themeToggleFunctions;
};

describe('ThemeToggle Component', () => {
  let mockLocalStorage: any;
  let mockMatchMedia: any;
  let themeToggleFunctions: any;

  beforeEach(() => {
    // Reset DOM
    document.body.innerHTML = '';
    document.documentElement.className = '';
    
    // Reset mocks
    vi.clearAllMocks();
    
    // Get fresh references to mocks
    mockLocalStorage = window.localStorage;
    mockMatchMedia = window.matchMedia;
    
    // Create component
    themeToggleFunctions = createThemeToggleComponent();
  });

  describe('DOM Rendering', () => {
    test('should render theme toggle button', () => {
      const toggle = getByRole(document.body, 'button');
      expect(toggle).toBeTruthy();
      expect(toggle.id).toBe('theme-toggle');
    });

    test('should render both sun and moon icons', () => {
      const sunIcon = document.querySelector('.sun-icon');
      const moonIcon = document.querySelector('.moon-icon');
      
      expect(sunIcon).toBeTruthy();
      expect(moonIcon).toBeTruthy();
    });

    test('should have correct initial ARIA attributes', () => {
      const toggle = getByRole(document.body, 'button');
      
      expect(toggle.getAttribute('aria-label')).toBeTruthy();
      expect(toggle.getAttribute('title')).toBeTruthy();
      expect(toggle.getAttribute('type')).toBe('button');
    });

    test('should have proper CSS classes for styling', () => {
      const toggle = getByRole(document.body, 'button');
      
      expect(toggle.classList.contains('inline-flex')).toBe(true);
      expect(toggle.classList.contains('items-center')).toBe(true);
      expect(toggle.classList.contains('justify-center')).toBe(true);
    });
  });

  describe('Icon State Management', () => {
    test('should show moon icon in light mode', () => {
      mockLocalStorage.getItem.mockReturnValue('light');
      mockMatchMedia.mockReturnValue({ matches: false });
      
      themeToggleFunctions.updateThemeToggle();
      
      const sunIcon = document.querySelector('.sun-icon');
      const moonIcon = document.querySelector('.moon-icon');
      
      // Sun should be hidden
      expect(sunIcon?.classList.contains('scale-0')).toBe(true);
      expect(sunIcon?.classList.contains('rotate-90')).toBe(true);
      
      // Moon should be visible
      expect(moonIcon?.classList.contains('scale-100')).toBe(true);
      expect(moonIcon?.classList.contains('rotate-0')).toBe(true);
    });

    test('should show sun icon in dark mode', () => {
      mockLocalStorage.getItem.mockReturnValue('dark');
      mockMatchMedia.mockReturnValue({ matches: true });
      
      themeToggleFunctions.updateThemeToggle();
      
      const sunIcon = document.querySelector('.sun-icon');
      const moonIcon = document.querySelector('.moon-icon');
      
      // Sun should be visible
      expect(sunIcon?.classList.contains('scale-100')).toBe(true);
      expect(sunIcon?.classList.contains('rotate-0')).toBe(true);
      
      // Moon should be hidden
      expect(moonIcon?.classList.contains('scale-0')).toBe(true);
      expect(moonIcon?.classList.contains('rotate-90')).toBe(true);
    });

    test('should show correct icon for system theme based on system preference', () => {
      mockLocalStorage.getItem.mockReturnValue('system');
      mockMatchMedia.mockReturnValue({ matches: true }); // System prefers dark
      
      themeToggleFunctions.updateThemeToggle();
      
      const sunIcon = document.querySelector('.sun-icon');
      
      // Should show sun icon because system prefers dark
      expect(sunIcon?.classList.contains('scale-100')).toBe(true);
    });
  });

  describe('ARIA Label Updates', () => {
    test('should update ARIA labels for light mode', () => {
      mockLocalStorage.getItem.mockReturnValue('light');
      mockMatchMedia.mockReturnValue({ matches: false });
      
      themeToggleFunctions.updateThemeToggle();
      
      const toggle = document.getElementById('theme-toggle');
      
      expect(toggle?.getAttribute('aria-label')).toBe('Activer le thème sombre');
      expect(toggle?.getAttribute('title')).toBe('Passer au thème sombre');
    });

    test('should update ARIA labels for dark mode', () => {
      mockLocalStorage.getItem.mockReturnValue('dark');
      mockMatchMedia.mockReturnValue({ matches: true });
      
      themeToggleFunctions.updateThemeToggle();
      
      const toggle = document.getElementById('theme-toggle');
      
      expect(toggle?.getAttribute('aria-label')).toBe('Activer le thème clair');
      expect(toggle?.getAttribute('title')).toBe('Passer au thème clair');
    });
  });

  describe('Click Interactions', () => {
    test('should toggle from light to dark theme on click', () => {
      mockLocalStorage.getItem.mockReturnValue('light');
      
      const toggle = document.getElementById('theme-toggle');
      toggle?.click();
      
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
    });

    test('should toggle from dark to light theme on click', () => {
      mockLocalStorage.getItem.mockReturnValue('dark');
      
      const toggle = document.getElementById('theme-toggle');
      toggle?.click();
      
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('theme', 'light');
    });

    test('should toggle from system to dark theme on click', () => {
      mockLocalStorage.getItem.mockReturnValue('system');
      
      const toggle = document.getElementById('theme-toggle');
      toggle?.click();
      
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
    });

    test('should apply theme to document element on click', () => {
      mockLocalStorage.getItem.mockReturnValue('light');
      
      const toggle = document.getElementById('theme-toggle');
      toggle?.click();
      
      // Should add dark class when switching to dark
      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });
  });

  describe('Theme Application', () => {
    test('should add dark class for dark theme', () => {
      themeToggleFunctions.applyTheme('dark');
      
      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });

    test('should remove dark class for light theme', () => {
      document.documentElement.classList.add('dark');
      
      themeToggleFunctions.applyTheme('light');
      
      expect(document.documentElement.classList.contains('dark')).toBe(false);
    });

    test('should handle system theme based on system preference', () => {
      mockMatchMedia.mockReturnValue({ matches: true });
      
      themeToggleFunctions.applyTheme('system');
      
      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });
  });

  describe('Accessibility', () => {
    test('should have proper button attributes for screen readers', () => {
      const toggle = getByRole(document.body, 'button');
      
      expect(toggle.getAttribute('aria-label')).toBeTruthy();
      expect(toggle.getAttribute('type')).toBe('button');
    });

    test('should have aria-hidden on decorative icons', () => {
      const sunIcon = document.querySelector('.sun-icon');
      const moonIcon = document.querySelector('.moon-icon');
      
      expect(sunIcon?.getAttribute('aria-hidden')).toBe('true');
      expect(moonIcon?.getAttribute('aria-hidden')).toBe('true');
    });

    test('should update aria-label based on current state', () => {
      const toggle = document.getElementById('theme-toggle');
      
      // Test light mode
      mockLocalStorage.getItem.mockReturnValue('light');
      themeToggleFunctions.updateThemeToggle();
      expect(toggle?.getAttribute('aria-label')).toContain('sombre');
      
      // Test dark mode  
      mockLocalStorage.getItem.mockReturnValue('dark');
      themeToggleFunctions.updateThemeToggle();
      expect(toggle?.getAttribute('aria-label')).toContain('clair');
    });
  });

  describe('Edge Cases', () => {
    test('should handle missing toggle element gracefully', () => {
      document.body.innerHTML = '';
      
      // Should not throw
      expect(() => themeToggleFunctions.updateThemeToggle()).not.toThrow();
    });

    test('should handle missing icons gracefully', () => {
      const toggle = document.getElementById('theme-toggle');
      toggle!.innerHTML = ''; // Remove icons
      
      // Should not throw
      expect(() => themeToggleFunctions.updateThemeToggle()).not.toThrow();
    });

    test('should handle localStorage errors gracefully', () => {
      mockLocalStorage.getItem.mockImplementation(() => {
        throw new Error('LocalStorage error');
      });
      
      // Should not throw and default to system
      expect(() => themeToggleFunctions.getCurrentTheme()).not.toThrow();
    });
  });
});