import { defineConfig } from 'astro/config'
import { fileURLToPath } from 'node:url'

import vercel from '@astrojs/vercel/serverless';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
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

  adapter: vercel(),
})