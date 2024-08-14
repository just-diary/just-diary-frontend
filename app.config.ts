import { defineConfig } from '@solidjs/start/config'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Font from 'vite-plugin-font'

export default defineConfig({
  vite: {
    plugins: [UnoCSS(), AutoImport({
      imports: ['solid-js'],
      dts: './src/auto-imports.d.ts',
      // resolvers: [
      //   IconsResolver({
      //     componentPrefix: 'Icon',
      //   }),
      // ],
    }), Font.vite()],
  },
  server: {
    preset: 'cloudflare',
  },
})
