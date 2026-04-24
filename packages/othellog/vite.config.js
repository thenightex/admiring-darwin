// @ts-check
import { resolve } from 'node:path'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

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
      rollupTypes: true,
    }),
  ],
  resolve: {
    alias: {
      '~/': `${resolve(__dirname, 'src')}/`,
    },
  },

  build: {
    lib: {
      entry: resolve(import.meta.dirname, 'src/main.js'),
      name: 'othellog',
      fileName: 'othellog',
    },
    /*
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
    */
  },
})
