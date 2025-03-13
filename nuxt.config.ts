import Lara from "@primevue/themes/lara";
import { fileURLToPath } from "url";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "Sportik - спортивное приложение",
    },
  },
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  alias: {
    "@": fileURLToPath(new URL("./src", import.meta.url)),
  },
  components: [
    {
      path: "./src/shared/ui",
      pathPrefix: false,
    },
  ],
  dir: {
    pages: "./src/app/routes",
    layouts: "./src/app/layouts",
    assets: "./src/shared/assets",
    plugins: "./src/app/plugins",
    middleware: "./src/app/middleware",
  },
  runtimeConfig: {
    public: {
      NUXT_API_BASE_URL: process.env.NUXT_API_BASE_URL,
      NUXT_REFRESH_TOKEN_NAME: process.env.NUXT_REFRESH_TOKEN_NAME,
      NUXT_ACCESS_TOKEN_NAME: process.env.NUXT_ACCESS_TOKEN_NAME,
      NUXT_REST_API_URL: process.env.NUXT_API_BASE_URL,
    },
  },
  vite: {
    optimizeDeps: {
      include: ["jsdoc-type-pratt-parser"],
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
          additionalData: `
          @use "@/app/styles/_tools.scss" as *;
          `,
        },
      },
    },
  },
  css: [`./src/app/styles/global.scss`],
  // TODO: надо проверить работает ли сжатие
  nitro: {
    compressPublicAssets: true,
  },
  modules: [
    "@primevue/nuxt-module",
    "@nuxtjs/storybook",
    "@pinia/nuxt",
    "@vee-validate/nuxt",
    "nuxt-svgo",
  ],
  svgo: {
    autoImportPath: "@@/src/shared/assets/icons",
    componentPrefix: "i",
  },
  veeValidate: {
    autoImports: true,
    componentNames: {
      Form: "VForm",
    },
  },
  primevue: {
    options: {
      theme: {
        preset: Lara,
        options: {
          prefix: "p",
          darkModeSelector: "light",
        },
      },
    },
    components: {
      exclude: ["Form"],
    },
  },
  storybook: { enabled: false, host: "http://localhost:6006", port: 6006 },
});
