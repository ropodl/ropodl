import { md3 } from "vuetify/blueprints";
import colors from "vuetify/lib/util/colors";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
    },
  },
  devtools: { enabled: true },
  googleFonts: {
    download: false,
    families: {
      Roboto: {
        wght: [100, 300, 400, 500, 700, 900],
      },
    },
    display: "swap",
  },
  vuetify: {
    vuetifyOptions: {
      blueprint: md3,
      icons: {
        defaultSet: "mdi",
      },
      theme: {
        defaultTheme: "dark",
        variations: {
          colors: ["primary", "secondary", "error", "info", "success", "warning"],
          lighten: 5,
          darken: 5,
        },
        themes: {
          dark: {
            dark: true,
            colors: {
              primary: "#ff7a03",
              accent: colors.grey.darken3,
              secondary: colors.amber.darken3,
              info: colors.teal.lighten1,
              warning: colors.amber.base,
              error: colors.deepOrange.accent4,
              success: colors.green.accent3,
              // background: "#252734",
            },
          },
        },
      },
    },
    moduleOptions: {
      /* nuxt-vuetify module options */
      // treeshaking: true,
      // useIconCDN: true | false,
      /* vite-plugin-vuetify options */
      // styles: true | 'none' | 'expose' | 'sass' | { configFile: string },
      autoImport: true,
      useVuetifyLabs: true,
    },
  },
  pinia: {
    autoImports: ["getActivePinia", "defineStore", "acceptHMRUpdate"]
  },
  imports: {
    dirs: ['stores']
  },
  modules: [
    "@vueuse/nuxt",
    "@invictus.codes/nuxt-vuetify",
    "@pinia/nuxt",
    "@nuxtjs/google-fonts",
    "@vite-pwa/nuxt",
    "@formkit/auto-animate/nuxt",
    "@vueuse/motion/nuxt",
    "nuxt-capo"
  ],
  runtimeConfig: {
    public: {
      api_url: process.env.api_url,
    },
  },
});
