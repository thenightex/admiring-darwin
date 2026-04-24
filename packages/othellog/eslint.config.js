// @ts-check
import antfu from '@antfu/eslint-config'

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
