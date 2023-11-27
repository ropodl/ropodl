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
  experimental: {
    viewTransition: true,
    inlineSSRStyles: false,
  },
  modules: [
    "@vueuse/nuxt",
    "@pinia/nuxt",
    "@nuxtjs/google-fonts",
    "@vite-pwa/nuxt",
    "@formkit/auto-animate/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "nuxt-mongoose",
    "vuetify-nuxt-module",
    "nuxt-simple-sitemap",
    // "nuxt-capo",
    // "nuxt-security",
    "@sidebase/nuxt-auth",
    "nuxt-delay-hydration",
  ],
  googleFonts: {
    download: false,
    families: {
      Roboto: {
        wght: [100, 300, 400, 500, 700, 900],
      },
    },
    display: "swap",
  },
  imports: {
    dirs: ["stores", "stores/frontend"],
  },
  mongoose: {
    uri: process.env.MONGODB_URI,
    options: {},
    modelsDir: "models",
    devtools: true,
  },
  piniaPersistedstate: {
    // cookieOptions: {
    //   sameSite: "strict",
    // },
    storage: "localStorage",
  },
  vuetify: {
    vuetifyOptions: {
      ssr: true,
      icons: {
        defaultSet: "mdi",
      },
      theme: {
        defaultTheme: "dark",
        variations: {
          colors: [
            "primary",
            "secondary",
            "error",
            "info",
            "success",
            "warning",
          ],
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
  },
  auth: {
    provider: {
      type: "authjs",
    },
  },
  // runtimeConfig: {
  //   public: {
  //     api_url: process.env.api_url,
  //   },
  //   private: {
  //     oop: "test",
  //   },
  // },
});