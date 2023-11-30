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
    componentIslands: true,
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
    "nuxt-delay-hydration",
    "nuxt-mail",
    "nuxt-capo",
    // "nuxt-security",
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
    storage: "localStorage",
  },
  vuetify: {
    vuetifyOptions: {
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
  sitemap: {
    sitemapName: "sitemap.xml",
    route: "sitemap.xml",
    defaults: {},
    exclude: ["/_nuxt/**", "/admin/**", "/login", "/api/**"],
  },
  mail: {
    message: {
      to: process.env.SMTP_USER,
    },
    smtp: {
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    },
  },
  runtimeConfig: {},
});
