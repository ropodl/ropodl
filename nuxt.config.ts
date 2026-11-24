import { fileURLToPath } from 'node:url'
import { voidPlugin } from 'void'

// https://nuxt.com/docs/api/configuration/nuxt-config
const cloudflareModuleEntry = fileURLToPath(import.meta.resolve('nitropack/presets/cloudflare/runtime/cloudflare-module'))
// Void integration stays explicit so the preserved Wrangler path remains usable for rollback.
const voidIntegrationEnabled = process.env.VOID_NUXT_INTEGRATION === '1'

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
      cloudflareWebAnalyticsToken: ''
    }
  },

  alias: {
    '@schema': fileURLToPath(new URL('./server/db/schema.ts', import.meta.url)),
    ...(!voidIntegrationEnabled
      ? { 'void/db': fileURLToPath(new URL('./server/db/void-db-unavailable.ts', import.meta.url)) }
      : {})
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
    preset: voidIntegrationEnabled ? 'cloudflare-module' : 'cloudflare',
    ...(!voidIntegrationEnabled ? { entry: cloudflareModuleEntry } : {}),
    ...(voidIntegrationEnabled
      ? {
          modules: ['void/nitro'],
          cloudflare: { dev: { configPath: './.void-wrangler.jsonc' } }
        }
      : {}),
    rollupConfig: {
      output: {
        format: 'esm',
        exports: 'named',
        inlineDynamicImports: false
      }
    }
  },

  vite: {
    plugins: voidIntegrationEnabled ? [voidPlugin()] : []
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
