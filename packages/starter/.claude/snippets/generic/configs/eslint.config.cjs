/* eslint-env node */
module.exports = {
  root: true,
  ignorePatterns: ['dist', '.astro', '.vercel', 'node_modules'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'astro', 'jsx-a11y', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:astro/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier',
  ],
  overrides: [
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: { parser: '@typescript-eslint/parser', extraFileExtensions: ['.astro'] },
    },
  ],
  rules: {
    'no-console': ['warn', { allow: ['error'] }],
    'no-unused-vars': 'error',
    'import/order': [
      'warn',
      {
        alphabetize: { order: 'asc', caseInsensitive: true },
        'newlines-between': 'always',
        groups: [['builtin', 'external'], ['internal'], ['parent', 'sibling', 'index']],
      },
    ],
    'max-lines-per-function': ['warn', { max: 60 }],
    complexity: ['warn', 10],
  },
};
