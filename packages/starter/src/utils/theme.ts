/**
 * Theme utilities for dynamic theming
 * Provides functions to manage theme switching and color scheme detection
 */

export type ThemeMode = 'light' | 'dark' | 'system';

/**
 * Gets the user's preferred color scheme from system
 */
export function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Gets the current theme from localStorage or defaults to system
 */
export function getCurrentTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'system';
  return (localStorage.getItem('theme') as ThemeMode) || 'system';
}

/**
 * Sets the theme and persists it to localStorage
 */
export function setTheme(theme: ThemeMode): void {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem('theme', theme);
  applyTheme(theme);
}

/**
 * Applies the theme to the document
 */
export function applyTheme(theme: ThemeMode): void {
  if (typeof document === 'undefined') return;
  
  const root = document.documentElement;
  
  // Remove existing theme class
  root.classList.remove('dark');
  
  // Apply new theme (only add dark class for dark mode)
  if (theme === 'system') {
    const systemTheme = getSystemTheme();
    if (systemTheme === 'dark') {
      root.classList.add('dark');
    }
  } else if (theme === 'dark') {
    root.classList.add('dark');
  }
}

/**
 * Initialize theme on page load
 */
export function initializeTheme(): void {
  if (typeof window === 'undefined') return;
  
  const currentTheme = getCurrentTheme();
  applyTheme(currentTheme);
  
  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (getCurrentTheme() === 'system') {
      applyTheme('system');
    }
  });
}

/**
 * Toggle between light and dark themes
 */
export function toggleTheme(): void {
  const currentTheme = getCurrentTheme();
  const newTheme: ThemeMode = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
}

/**
 * Get available theme options
 */
export const themeOptions: { value: ThemeMode; label: string }[] = [
  { value: 'light', label: 'Clair' },
  { value: 'dark', label: 'Sombre' },
  { value: 'system', label: 'Système' },
];