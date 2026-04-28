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
    vue: false,
    unocss: false,
    formatters: true,
    pnpm: true,
    jsonc: false,
    yaml: false,

    ignores: [
      '**/*.md',
    ],
  },

  {
    rules: {
      // source: https://alexop.dev/posts/opinionated-eslint-setup-vue-projects/

      // REQUIRED RULES
      // These rules catch real bugs and enforce maintainable code. Enable them on every Vue project.

      // Complex functions are hard to test and understand. This rule limits branching logic per function.
      'complexity': ['warn', { max: 10 }],

      // Nested ternaries are hard to read. Use early returns or separate variables instead.
      'no-nested-ternary': 'error',

      // Type assertions (as Type) bypass TypeScript’s type checker. They hide bugs. Use type guards or proper typing instead.
      // TIL: 'as const' assertions are always allowed, even with assertionStyle: 'never'. Const assertions don’t bypass type checking—they make types more specific.
      '@typescript-eslint/consistent-type-assertions': ['error', {
        assertionStyle: 'never',
      }],

      // TypeScript enums have quirks. They generate JavaScript code, have numeric reverse mappings, and behave differently from union types. Use literal unions or const objects instead.
      'no-restricted-syntax': ['error', {
        selector: 'TSEnumDeclaration',
        message: 'Use literal unions or `as const` objects instead of enums.'
      }],

      // else and else-if blocks increase nesting. Early returns are easier to read and reduce cognitive load.
      'no-restricted-syntax': ['error',
        {
          selector: 'IfStatement > IfStatement.alternate',
          message: 'Avoid `else if`. Prefer early returns or ternary operators.'
        },
        {
          selector: 'IfStatement > :not(IfStatement).alternate',
          message: 'Avoid `else`. Prefer early returns or ternary operators.'
        }
      ],

      // Native try/catch blocks are verbose and error-prone. Use a utility function that returns a result tuple instead.
      // The tryCatch utility returns [error, null] or [null, data], similar to Go’s error handling.
      'no-restricted-syntax': ['error', {
        selector: 'TryStatement',
        message: 'Use tryCatch() from @/lib/tryCatch instead of try/catch. Returns Result<T> tuple: [error, null] | [null, data].'
      }],

      // Vue manages the DOM. Calling document.querySelector bypasses Vue’s reactivity and template refs. Use useTemplateRef() instead.
      // If you’re on Vue 3.5+, the built-in rule already enforces this.
      // TODO: 'vue/prefer-use-template-ref': 'error'

      // Features should not import from other features. This keeps code modular and prevents circular dependencies.
      // If you’re using a feature-based architecture, this rule is essential—see (https://alexop.dev/posts/how-to-structure-vue-projects/) for more on this approach.
      // Unidirectional Flow: The architecture enforces a strict dependency hierarchy. Views orchestrate features, features use shared code, but never the reverse.
      'import-x/no-restricted-paths': ['error', {
        zones: [
          // === CROSS-FEATURE ISOLATION ===
          // Features cannot import from other features
          { target: './src/features/workout', from: './src/features', except: ['./workout'] },
          { target: './src/features/exercises', from: './src/features', except: ['./exercises'] },
          { target: './src/features/settings', from: './src/features', except: ['./settings'] },
          { target: './src/features/timers', from: './src/features', except: ['./timers'] },
          { target: './src/features/templates', from: './src/features', except: ['./templates'] },
          { target: './src/features/benchmarks', from: './src/features', except: ['./benchmarks'] },

          // === UNIDIRECTIONAL FLOW ===
          // Shared code cannot import from features or views
          {
            target: ['./src/components', './src/composables', './src/lib', './src/db', './src/types', './src/stores'],
            from: ['./src/features', './src/views']
          },

          // Features cannot import from views (views are top-level orchestrators)
          { target: './src/features', from: './src/views' }
        ],


      }],

      // Consistent naming makes components easy to find and identify.
      /* TODO
      'vue/multi-word-component-names': ['error', {
        ignores: ['App', 'Layout']
      }],
      'vue/component-definition-name-casing': ['error', 'PascalCase'],
      'vue/component-name-in-template-casing': ['error', 'PascalCase', {
        registeredComponentsOnly: false
      }],
      'vue/match-component-file-name': ['error', {
        extensions: ['vue'],
        shouldMatchCase: true
      }],
      'vue/prop-name-casing': ['error', 'camelCase'],
      'vue/attribute-hyphenation': ['error', 'always'],
      'vue/custom-event-name-casing': ['error', 'kebab-case']
      }
      */

      // Find unused props, refs, and emits before they become tech debt.
      /* TODO
      'vue/no-unused-properties': ['error', {
        groups: ['props', 'data', 'computed', 'methods']
      }],
      'vue/no-unused-refs': 'error',
      'vue/no-unused-emit-declarations': 'error'
      */

      // Hardcoded strings break internationalization. The @intlify/vue-i18n plugin catches them.
      // The attributes option catches hardcoded strings in accessibility attributes too.
      // TODO plugins: { '@intlify/vue-i18n': pluginVueI18n },
      /*
      '@intlify/vue-i18n/no-raw-text': ['error', {
        ignorePattern: '^[-#:()&+×/°′″%]+',
        ignoreText: ['kg', 'lbs', 'cm', 'ft/in', '—', '•', '✓', '›', '→', '·', '.', 'Close'],
        attributes: {
          '/.+/': ['title', 'aria-label', 'aria-placeholder', 'placeholder', 'alt']
        }
      }]
      */

      // Prevent developers from bypassing i18n checks with eslint-disable comments.
      /* TODO
      plugins: {
        '@eslint-community/eslint-comments': pluginEslintComments
      },
      '@eslint-community/eslint-comments/no-restricted-disable': [
        'error',
        '@intlify/vue-i18n/*'
      ]
      */

      // Use named routes instead of hardcoded path strings for maintainability.
      'no-restricted-syntax': ['error',
        {
          selector: 'CallExpression[callee.property.name="push"][callee.object.name="router"] > Literal:first-child',
          message: 'Use named routes with RouteNames instead of hardcoded path strings.'
        },
        {
          selector: 'CallExpression[callee.property.name="push"][callee.object.name="router"] > TemplateLiteral:first-child',
          message: 'Use named routes with RouteNames instead of template literals.'
        }
      ],

      // TODO Ban direct render() or mount() calls in tests. Use a centralized test helper instead. For more on testing strategies in Vue, see (https://alexop.dev/posts/vue3_testing_pyramid_vitest_browser_mode/)
      // This ensures all tests use consistent setup with routing, i18n, and database.
      // files: ['src/**/__tests__/**/*.{ts,spec.ts}'],
      // ignores: ['src/__tests__/helpers/**'],
      /*
      rules: {
        'no-restricted-imports': ['error', {
          paths: [
            {
              name: 'vitest-browser-vue',
              importNames: ['render'],
              message: 'Use createTestApp() from @/__tests__/helpers/createTestApp instead.'
            },
            {
              name: '@vue/test-utils',
              importNames: ['mount', 'shallowMount'],
              message: 'Use createTestApp() instead of mounting components directly.'
            }
          ]
        }]
      }
      */

      // NICE TO HAVE RULES
      // These rules improve code quality but are less critical. Enable them after the must-haves are in place.

      // Use the latest Vue 3.5 APIs for cleaner code.
      /*
      rules: {
        'vue/define-props-destructuring': 'error',
        'vue/prefer-use-template-ref': 'error'
      }
      */

      // Require defineExpose and defineSlots to make component interfaces explicit.
      /*
      rules: {
        'vue/require-expose': 'warn',
        'vue/require-explicit-slots': 'warn'
      }
      */

      // Deep template nesting is hard to read. Extract nested sections into components. This one matters a lot—it helps you avoid ending up with components that are 2000 lines long.
      /*
      rules: {
        'vue/max-template-depth': ['error', { maxDepth: 8 }],
        'vue/max-props': ['error', { maxProps: 6 }]
      }
      */
     
      // Use specific matchers for clearer test failures.
      // files: ['src/**/__tests__/*'],
      /*
      rules: {
        'vitest/prefer-to-be': 'error',
        'vitest/prefer-to-have-length': 'error',
        'vitest/prefer-to-contain': 'error',
        'vitest/prefer-mock-promise-shorthand': 'error'
      }
      */

      // Keep tests organized and readable.
      // files: ['src/**/__tests__/*'],
      /*
      rules: {
        'vitest/consistent-test-it': ['error', { fn: 'it' }],
        'vitest/prefer-hooks-on-top': 'error',
        'vitest/prefer-hooks-in-order': 'error',
        'vitest/no-duplicate-hooks': 'error',
        'vitest/require-top-level-describe': 'error',
        'vitest/max-nested-describe': ['error', { max: 2 }],
        'vitest/no-conditional-in-test': 'warn'
      }
      */

      // Use Vitest Browser locators instead of raw DOM queries.
      // files: ['src/**/__tests__/**/*.{ts,spec.ts}'],
      /*
      rules: {
        'no-restricted-syntax': ['warn', {
          selector: 'CallExpression[callee.property.name=/^querySelector(All)?$/]',
          message: 'Prefer page.getByRole(), page.getByText(), or page.getByTestId() over querySelector. Vitest locators are more resilient to DOM changes.'
        }]
      }
      */


  },

  ...pluginOxlint.buildFromOxlintConfigFile('./.oxlintrc.json'),

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
  }
)
