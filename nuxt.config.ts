import { resolve } from 'node:path';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },

  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      link: [
        {
          rel: 'icon',
          type: 'image/ico',
          href: '/favicon.ico',
        },
      ],
    },
  },

  experimental: {
    viewTransition: false,
    payloadExtraction: true,
    defaults: {
      nuxtLink: {
        prefetchOn: {
          interaction: true,
        },
      },
    },
  },

  modules: [
    '@nuxt/eslint',
    'vuetify-nuxt-module',
    '@nuxtjs/google-fonts',
    '@vite-pwa/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/supabase'
  ],

  supabase: {
    redirectOptions: {
      login: '/auth',
      callback: '/auth/confirm',
      exclude: ['/', '/about', '/contact', '/blog', '/blog/**', '/portfolio', '/portfolio/**'],
    },
  },

  googleFonts: {
    families: {
      Ubuntu: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    },
    display: 'swap',
    download: true,
  },

  ssr: true,

  routeRules: {
    '/': { prerender: true },
    '/about': { prerender: true },
    '/contact': { prerender: true },
    '/portfolio': { prerender: true },
    '/blog': { swr: 300 },
    '/blog/**': { swr: 300 },
    '/api/blog': { swr: 300 },
    '/api/blog/**': { swr: 300 },
    '/media/**': {
      headers: {
        'cache-control': 'public, max-age=31536000, immutable',
      },
    },
    '/favicon.ico': {
      headers: {
        'cache-control': 'public, max-age=31536000, immutable',
      },
    },
  },

  css: ['./app/assets/main.scss'],

  // when enabling ssr option you need to disable inlineStyles and maybe devLogs
  features: {
    inlineStyles: false,
    devLogs: false,
  },

  build: {
    transpile: [
      'vuetify',
      '@tiptap/vue-3',
      '@tiptap/pm',
      '@tiptap/starter-kit',
      '@tiptap/extension-image',
      '@tiptap/extension-link',
      '@tiptap/extension-underline',
      '@tiptap/extension-placeholder',
      '@tiptap/extension-text-align',
    ],
  },

  nitro: {
    compressPublicAssets: true,
  },

  vite: {
    resolve: {
      alias: [
        {
          find: /^cookie$/,
          replacement: resolve('./app/utils/cookie-shim.ts'),
        },
      ],
    },
    ssr: {
      noExternal: [
        'vuetify',
        'prosemirror-state',
        'prosemirror-model',
        'prosemirror-transform',
        'prosemirror-view',
      ],
    },
    optimizeDeps: {
      include: [
        'prosemirror-state',
        'prosemirror-model',
        'prosemirror-transform',
        'prosemirror-view',
        '@supabase/ssr',
        'cookie',
        'cookie/dist/index.js',
        '@iconify/vue',
      ],
    },
  },

  vuetify: {
    moduleOptions: {
      // check https://nuxt.vuetifyjs.com/guide/server-side-rendering.html
      ssrClientHints: {
        reloadOnFirstRequest: false,
        viewportSize: true,
        prefersColorScheme: false,

        prefersColorSchemeOptions: {
          useBrowserThemeOnly: false,
        },
      },

      // /* If customizing sass global variables ($utilities, $reset, $color-pack, $body-font-family, etc) */
      // disableVuetifyStyles: true,
      styles: {
        configFile: './app/assets/settings.scss',
      },
    },
  },

  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Ropodl',
      short_name: 'Ropodl',
      description: 'Portfolio, blog, and contact experience for Ropodl.',
      theme_color: '#090b10',
      background_color: '#090b10',
      display: 'standalone',
      lang: 'en',
      start_url: '/',
      icons: [
        {
          src: '/media/avatar.webp',
          sizes: '512x512',
          type: 'image/webp',
          purpose: 'any',
        },
      ],
    },
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,jpg,jpeg}'],
      runtimeCaching: [
        {
          urlPattern: '/media/.*',
          handler: 'CacheFirst',
          options: {
            cacheName: 'media-assets',
            expiration: {
              maxEntries: 64,
              maxAgeSeconds: 60 * 60 * 24 * 30,
            },
          },
        },
      ],
    },
    client: {
      installPrompt: true,
      periodicSyncForUpdates: 60 * 60,
    },
    devOptions: {
      enabled: false,
    },
    pwaAssets: {
      disabled: true,
    },
  },

  runtimeConfig: {
    supabase: {
      secretKey: process.env.SUPABASE_SECRET_KEY,
      serviceKey: process.env.SUPABASE_SERVICE_KEY,
    },
    public: {
      supabase: {
        url: process.env.SUPABASE_URL,
        key: process.env.SUPABASE_ANON_KEY,
      }
    },
  },
});
