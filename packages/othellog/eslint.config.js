// @ts-check
import antfu from '@antfu/eslint-config'

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
)
