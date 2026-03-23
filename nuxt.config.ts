// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

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
  ],

  googleFonts: {
    families: {
      Ubuntu: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    },
    display: 'swap',
    download: true,
  },

  ssr: true,

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

  vite: {
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

  runtimeConfig: {
    public: {
      API_URL: process.env.API_URL,
    },
  },
});
