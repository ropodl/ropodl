import colors from "vuetify/lib/util/colors";
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
  },
  modules: [
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
    "@nuxtjs/supabase",
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
    vuetifyOptions: {
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
            },
          },
        },
      },
    },
  },
  site: { url: "https://ropodl.vercel.app" },
  sitemap: {
    sitemapName: "sitemap.xml",
    defaults: {},
    exclude: ["/_nuxt/**", "/admin/**", "/login", "/api/**"],
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
    tinymce_key: process.env.TINYMCE_KEY,
    public: {
      supabase_url: process.env.SUPABASE_URL,
    },
  },
  // nuxt security
  security: {
    headers: {
      contentSecurityPolicy: {
        "img-src": ["'self'", "https://avatars.githubusercontent.com"],
      },
    },
  },
});
