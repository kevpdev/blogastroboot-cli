import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import astro from 'eslint-plugin-astro';
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,ts}'],
    plugins: {
      '@typescript-eslint': typescript,
      'jsx-a11y': jsxA11y,
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        // Node.js globals
        __dirname: 'readonly',
        process: 'readonly',
        global: 'readonly',
        // Browser globals
        window: 'readonly',
        document: 'readonly',
        localStorage: 'readonly',
        // CSS globals
        CSSStyleRule: 'readonly',
        CSSStyleSheet: 'readonly',
        CSSRule: 'readonly',
        // TypeScript globals
        HTMLElementTagNameMap: 'readonly',
      },
    },
    rules: {
      'no-console': ['warn', { allow: ['error'] }],
      '@typescript-eslint/no-unused-vars': 'error',
      'max-lines-per-function': ['warn', { max: 100 }], // Augmenté pour les tests
      'complexity': ['warn', 15], // Augmenté pour les tests
    },
  },
  {
    files: ['**/*.test.{js,ts}', '**/__tests__/**/*.{js,ts}', '**/vitest.*.{js,ts}', '**/*.setup.{js,ts}'],
    rules: {
      'max-lines-per-function': 'off', // Désactiver pour les tests
      'complexity': 'off', // Désactiver pour les tests
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
  ...astro.configs.recommended,
  {
    ignores: ['dist', '.astro', 'node_modules', '.claude/**', '**/*.config.mjs'],
  },
];