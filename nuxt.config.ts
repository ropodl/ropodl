import { vuetifyOptions } from "./utils/module/vuetify.ts"
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
    componentIslands: true,
    renderJsonPayloads: false,
    defaults: {
      nuxtLink: {
        prefetch: true,
        prefetchOn: { visibility: true },
      },
    },
  },
  routeRules: {
    "/": { prerender: true },
  },
  modules: [
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@nuxtjs/google-fonts",
    "@vite-pwa/nuxt",
    "@formkit/auto-animate/nuxt",
    "vuetify-nuxt-module",
    "nuxt-simple-sitemap",
    "nuxt-delay-hydration",
    "nuxt-og-image",
    // "nuxt-capo",
    // "nuxt-security",
    "nuxt-gtag",
    "nuxt-link-checker",
    "@nuxtjs/supabase",
    "@pinia-plugin-persistedstate/nuxt"
  ],
  googleFonts: {
    families: {
      Roboto: {
        wght: [100, 300, 400, 500, 700, 900],
      },
    },
    display: "swap",
  },
  ogImage: {
    fonts: ["Roboto:400"],
    compatibility: {
      prerender: {
        chromium: false
      }
    }
  },
  gtag: {
    id: process.env.GOOGLE_ANALYTICS_ID,
  },
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    redirectOptions: {
      login: "/login",
      callback: "/confirm",
      exclude: [
        "/",
        "/about",
        "/contact",
        "/blogs",
        "/blogs/*",
        "/portfolio",
        "/portfolio/*",
      ],
    },
  },
  vuetify: {
    vuetifyOptions: vuetifyOptions,
  },
  site: { url: "https://ropodl.com/" },
  sitemap: {
    sitemapName: "sitemap.xml",
    defaults: {},
    exclude: ["/_nuxt/**", "/admin/**", "/login","/confirm", "/api/**"],
  },
  pwa: {
    registerType: "autoUpdate",
    workbox: {
      cleanupOutdatedCaches: true,
      navigateFallback: "/",
      globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
    },
    manifest: {
      name: "Saroj Poudel",
      short_name: "ropodl",
      theme_color: "#ff7a03",
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
  runtimeConfig: {
    public: {
      supabase_url: process.env.SUPABASE_URL,
    },
  },
  pinia: {
    storesDirs: ["./stores/**"],
  },
  piniaPersistedstate: {
    storage: "localStorage",
  },
  nitro: {
    minify: true
  },
  compatibilityDate: "2024-11-18",
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler"
        }
      }
    }
  },
});