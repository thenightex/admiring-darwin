// @ts-check
import path from 'node:path'
import AutoImport from 'unplugin-auto-import/vite'
import dts from 'unplugin-dts/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    AutoImport({
      dts: 'src/auto-imports.d.ts',
      dirs: [
        './src/composables',
        './src/utils',
      ],
    }),
    dts({
      insertTypesEntry: true,
      bundleTypes: true,
      tsconfigPath: './tsconfig.json',
    }),
  ],
  resolve: {
    alias: {
      '~/': `${path.resolve(import.meta.dirname, 'src')}/`,
    },
  },

  build: {
    lib: {
      entry: path.resolve(import.meta.dirname, 'src/index.ts'),
      name: 'othellog',
      fileName: 'othellog',
    },
    rolldownOptions: {
      // externalize deps that shouldn't be bundled into lib
      external: ['vue'],
      output: {
        // externalized deps for UMD build
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
