import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import { fileURLToPath } from 'node:url'

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  integrations: [react()],
  srcDir: 'src',
  output: 'hybrid',
  vite: {
    resolve: {
      alias: {
        // So imports like "@/lib/utils" keep funcionando
        '@': fileURLToPath(new URL('./', import.meta.url)),
      },
    },
  },
})
