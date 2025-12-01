import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  srcDir: "src",

  // Genera páginas estáticas donde se puede y server donde haga falta
  output: "server",

  adapter: vercel(),

  image: {
    service: {
      entrypoint: "astro/assets/services/sharp",
    },
  },

  vite: {
    resolve: {
      alias: {
        "@": "./",
      },
    },
  },
});
