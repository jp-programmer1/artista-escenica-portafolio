import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import node from '@astrojs/node'
import { fileURLToPath } from 'node:url'

import vercel from '@astrojs/vercel/serverless';

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

  adapter: vercel(),
})