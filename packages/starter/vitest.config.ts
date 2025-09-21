import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: {
    // Environment for DOM testing
    environment: 'jsdom',
    
    // Test file patterns
    include: ['src/**/*.{test,spec}.{js,ts}'],
    exclude: ['node_modules', 'dist', '.astro'],
    
    // Global test setup
    setupFiles: ['./src/__tests__/setup/vitest.setup.ts'],
    
    // Coverage configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/__tests__/',
        '**/*.d.ts',
        '**/*.config.*',
        'dist/',
        '.astro/'
      ],
      thresholds: {
        global: {
          branches: 70,
          functions: 80,
          lines: 80,
          statements: 80
        }
      }
    },
    
    // Global configurations
    globals: true,
    clearMocks: true,
    restoreMocks: true,
    
    // Timeout for async tests
    testTimeout: 10000,
    
    // Reporter configuration
    reporter: ['verbose'],
    
    // Mock CSS imports
    css: false,
  },
  
  resolve: {
    alias: {
      'astro:content': resolve(__dirname, 'src/__tests__/mocks/astro-content-virtual.ts'),
      'astro:assets': resolve(__dirname, 'src/__tests__/mocks/astro-assets-virtual.ts'),
      '@': resolve(__dirname, './src'),
      '@/components': resolve(__dirname, './src/components'),
      '@/layouts': resolve(__dirname, './src/layouts'),
      '@/utils': resolve(__dirname, './src/utils'),
      '@/config': resolve(__dirname, './src/config'),
      '@/types': resolve(__dirname, './src/types'),
    }
  },
  
  // Esbuild configuration for TypeScript
  esbuild: {
    target: 'node14'
  },
  
  // Define globals for better type support
  define: {
    'import.meta.vitest': 'undefined',
  }
});