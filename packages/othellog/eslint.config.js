// @ts-check
import antfu from '@antfu/eslint-config'
import pluginOxlint from 'eslint-plugin-oxlint'
import pluginUnicorn from 'eslint-plugin-unicorn'
import { configs as pnpmConfigs } from 'eslint-plugin-pnpm'

/** @type {import('eslint-flat-config-utils').FlatConfigComposer<any, any>} */
export default antfu(
  {
    type: 'lib',

    typescript: true,
    vue: true,
    unocss: false,
    formatters: true,
    pnpm: true,
    jsonc: false,
    yaml: false,

    ignores: [
      '**/*.md',
      '.vscode',
      'dist',
      'node_modules',
    ],
  },
  
  ...pluginOxlint.buildFromOxlintConfigFile('./oxlint.config.ts'),

  // When using pnpm workspaces, enforce that dependencies use catalog references.
  // This ensures dependencies are managed centrally in pnpm-workspace.yaml.
  ...pnpmConfigs.recommended,

  // The eslint-plugin-unicorn package catches common mistakes and enforces modern JavaScript patterns.
  pluginUnicorn.configs.recommended,
  
  {
    name: 'app/unicorn-overrides',
    rules: {
      // === Enable non-recommended rules that add value ===
      'unicorn/better-regex': 'warn',              // Simplify regexes: /[0-9]/ → /\d/
      'unicorn/custom-error-definition': 'error',  // Correct Error subclassing
      'unicorn/no-unused-properties': 'warn',      // Dead code detection
      'unicorn/consistent-destructuring': 'warn',  // Use destructured vars consistently

      // === Disable rules that conflict with project conventions ===
      'unicorn/no-null': 'off',                    // We use null for database values
      'unicorn/filename-case': 'off',              // Vue uses PascalCase, tests use camelCase
      'unicorn/prevent-abbreviations': 'off',      // props, e, Db are fine
      'unicorn/no-array-callback-reference': 'off', // arr.filter(isValid) is fine
      'unicorn/no-await-expression-member': 'off', // (await fetch()).json() is fine
      'unicorn/no-array-reduce': 'off',            // reduce is useful for aggregations
      'unicorn/no-useless-undefined': 'off'        // mockResolvedValue(undefined) for TS
    }
  },

  {
    ignores: [
      '.vscode/**',
      'dist/**',
      'node_modules/**',
    ],
  },
)
