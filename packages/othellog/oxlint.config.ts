import { defineConfig } from 'oxlint'

export default defineConfig({
  env: {
    browser: true,
    node: true,
  },
  ignorePatterns: ['dist/**', 'node_modules/**', '*.config.js'],
  categories: {
    correctness: 'error',
    suspicious: 'warn',
  },
  rules: {
    'typescript/no-explicit-any': 'error',
    'eslint/no-console': ['error', { allow: ['warn', 'error'] }],
    'no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
  },

})
