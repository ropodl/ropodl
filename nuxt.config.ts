import { fileURLToPath } from 'node:url'

// https://nuxt.com/docs/api/configuration/nuxt-config
const cloudflareModuleEntry = fileURLToPath(import.meta.resolve('nitropack/presets/cloudflare/runtime/cloudflare-module'))

export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxtjs/sitemap'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  site: {
    url: 'https://ropodl.com',
    name: 'ropodl'
  },

  colorMode: {
    preference: 'dark',
    fallback: 'dark',
    storageKey: 'ropodl-color-mode'
  },

  // Only generate Nuxt UI theme CSS for components and colors the site uses; this CSS is inlined into every page.
  ui: {
    theme: {
      colors: ['primary', 'success', 'error']
    },
    experimental: {
      componentDetection: true
    }
  },

  runtimeConfig: {
    public: {
      siteUrl: 'https://ropodl.com',
      turnstileSiteKey: '',
      cloudflareWebAnalyticsToken: '',
      googleTagId: 'G-1KDFS20N0H'
    }
  },

  features: {
    inlineStyles: true
  },

  experimental: {
    viewTransition: true,
    prefetchPreloadTags: true,
    defaults: {
      nuxtLink: {
        prefetch: true,
        prefetchOn: {
          visibility: true,
          interaction: true
        }
      }
    }
  },

  compatibilityDate: '2026-10-19',

  nitro: {
    preset: 'cloudflare',
    entry: cloudflareModuleEntry,
    rollupConfig: {
      output: {
        format: 'esm',
        exports: 'named',
        inlineDynamicImports: false
      }
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  icon: {
    provider: 'none',
    clientBundle: {
      // Block definitions name their icons in .ts files (shared/blocks), so scan those too.
      scan: { globInclude: ['**/*.{vue,ts}'] }
    }
  },

  image: {
    provider: 'cloudflare',
    cloudflare: {
      baseURL: process.env.CLOUDFLARE_IMAGE_BASE_URL || '/'
    }
  },

  sitemap: {
    // Blog and project slugs come from D1 at request time; see server/plugins/sitemap.ts.
    exclude: ['/admin/**', '/dashboard', '/login', '/saved'],
    cacheMaxAgeSeconds: 900
  }
})
