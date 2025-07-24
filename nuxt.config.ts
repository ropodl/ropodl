import { vuetifyOptions } from "./app/utils/module/vuetify.ts";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-18",
  ssr: true,
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      htmlAttrs: {
        lang: "en",
      },
    },
  },
  devtools: { enabled: true },
  experimental: {
    viewTransition: true,
    renderJsonPayloads: true,
    componentIslands: false,
    defaults: {
      nuxtLink: {
        prefetch: true,
        prefetchOn: { visibility: true },
      },
    },
    payloadExtraction: true,
    treeshakeClientOnly: true,
  },
  routeRules: {
    "/": { prerender: true },
  },
  modules: [
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@vueuse/motion/nuxt",
    "@nuxtjs/google-fonts",
    "@vite-pwa/nuxt",
    "vuetify-nuxt-module",
    "nuxt-simple-sitemap",
    "nuxt-delay-hydration",
    // "nuxt-capo",
    // "nuxt-security",
    "nuxt-gtag",
    "nuxt-link-checker",
    // "@nuxtjs/supabase",
    "@pinia-plugin-persistedstate/nuxt",
    "@nuxtjs/strapi",
    "v-gsap-nuxt",
    "@nuxt/icon",
  ],
  googleFonts: {
    families: {
      Roboto: {
        wght: [100, 300, 400, 500, 700, 900],
      },
    },
    display: "swap",
  },
  gtag: {
    id: process.env.GOOGLE_ANALYTICS_ID,
  },
  // supabase: {
  //   url: process.env.SUPABASE_URL,
  //   key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  //   redirectOptions: {
  //     login: "/login",
  //     callback: "/confirm",
  //     exclude: [
  //       "/",
  //       "/about",
  //       "/contact",
  //       "/blogs",
  //       "/blogs/*",
  //       "/portfolio",
  //       "/portfolio/*",
  //     ],
  //   },
  // },
  strapi: {
    devtools: true,
    url: process.env.STRAPI_URL,
  },
  vuetify: {
    vuetifyOptions: vuetifyOptions,
    moduleOptions: {
      // check https://nuxt.vuetifyjs.com/guide/server-side-rendering.html
      ssrClientHints: {
        reloadOnFirstRequest: false,
        viewportSize: true,
        prefersColorScheme: true,
        prefersColorSchemeOptions: {
          useBrowserThemeOnly: true,
          cookieName: "color-scheme",
          darkThemeName: "dark",
          lightThemeName: "light",
        },
      },

      // /* If customizing sass global variables ($utilities, $reset, $color-pack, $body-font-family, etc) */
      // disableVuetifyStyles: false,
      // styles: {
      //   configFile: "assets/settings.scss",
      // },
    },
  },
  site: {
    url: "https://ropodl.com/",
    name: "Saroj Poudel",
  },
  sitemap: {
    sitemapName: "sitemap.xml",
    defaults: {},
    exclude: ["/_nuxt/**", "/admin/**", "/login", "/confirm", "/api/**"],
  },
  pwa: {
    registerType: "autoUpdate",
    manifest: {
      name: "Saroj Poudel",
      short_name: "ropodl",
      theme_color: "#ffffffff",
      description: "Official Website of Saroj Poudel",
      icons: [
        {
          src: "/favicon-192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/favicon-512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },
    client: {
      installPrompt: true,
    },
  },
  // runtimeConfig: {
  //   public: {
  //     supabase_url: process.env.SUPABASE_URL,
  //   },
  // },
  pinia: {
    storesDirs: ["./app/stores/**"],
  },
  piniaPersistedstate: {
    storage: "localStorage",
  },
  nitro: {
    minify: true,
    // experimental: {
    //   websocket: true,
    //   openAPI: true,
    // },
    // openAPI: {
    //   ui: {
    //     scalar: {
    //       theme: "purple",
    //     },
    //   },
    // },
  },
  build: {
    transpile: ["vuetify"],
  },
});
