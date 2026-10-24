<script setup>
const mobileMenuOpen = ref(false)
const route = useRoute()
const runtimeConfig = useRuntimeConfig()
const analyticsToken = runtimeConfig.public.cloudflareWebAnalyticsToken
const googleTagId = runtimeConfig.public.googleTagId
const siteOrigin = useSiteOrigin()
const isPrimarySectionActive = path => route.path === path || route.path.startsWith(`${path}/`)

watch(() => route.path, () => {
  mobileMenuOpen.value = false
})

function onGlobalKeydown(event) {
  if (event.key !== 'Escape' || !mobileMenuOpen.value) return
  mobileMenuOpen.value = false
  document.querySelector('button[aria-controls="mobile-primary-navigation"]')?.focus()
}

onMounted(() => window.addEventListener('keydown', onGlobalKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', onGlobalKeydown))

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'theme-color', content: '#101115' },
    { name: 'mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-title', content: 'ropodl' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico', sizes: '48x48' },
    { rel: 'icon', href: '/icon.svg', type: 'image/svg+xml' },
    { rel: 'preload', href: '/icon.svg', as: 'image', type: 'image/svg+xml', fetchpriority: 'high' },
    // Body and heading weights; without these the fonts are only discovered after the CSS is parsed.
    { rel: 'preload', href: '/fonts/ubuntu-400-latin.woff2', as: 'font', type: 'font/woff2', crossorigin: '' },
    { rel: 'preload', href: '/fonts/ubuntu-700-latin.woff2', as: 'font', type: 'font/woff2', crossorigin: '' },
    { rel: 'manifest', href: '/manifest.webmanifest' },
    { rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '180x180' },
    { rel: 'alternate', type: 'application/rss+xml', title: 'ropodl blog feed', href: '/feed.xml' }
  ],
  htmlAttrs: {
    'lang': 'en',
    'data-color-mode-forced': 'dark'
  }
})

useSeoMeta({
  titleTemplate: title => title ? `${title} · ropodl` : 'ropodl',
  description: 'Saroj Poudel — full-stack developer and designer based in Kathmandu, Nepal.',
  ogSiteName: 'ropodl',
  ogType: 'website',
  ogImage: () => `${siteOrigin}/social-card.png`,
  ogImageAlt: 'Saroj Poudel — Full-stack developer and designer',
  twitterCard: 'summary_large_image',
  twitterImage: () => `${siteOrigin}/social-card.png`,
  twitterImageAlt: 'Saroj Poudel — Full-stack developer and designer'
})

const isAdminArea = computed(() => route.path.startsWith('/admin'))
const canonicalUrl = computed(() => `${siteOrigin}${route.path}`)
const privateRoute = computed(() => isAdminArea.value || ['/login', '/dashboard', '/saved'].includes(route.path))
const routeTitles = {
  '/': 'Home', '/about': 'About', '/contact': 'Contact', '/blogs': 'Blog', '/projects': 'Projects',
  '/admin': 'Admin dashboard', '/admin/pages': 'Manage pages', '/admin/blogs': 'Blog posts', '/admin/projects': 'Projects',
  '/saved': 'Saved articles', '/admin/contacts': 'Contact inbox', '/admin/media': 'Media library', '/admin/audit': 'Audit log', '/admin/settings/profile': 'Profile and security'
}
const fallbackTitle = computed(() => routeTitles[route.path] || (route.path.startsWith('/admin/') ? 'Admin workspace' : 'ropodl'))

useSeoMeta({
  title: () => fallbackTitle.value,
  description: 'Saroj Poudel — full-stack developer and designer based in Kathmandu, Nepal.',
  robots: () => privateRoute.value ? 'noindex, nofollow' : 'index, follow',
  ogUrl: () => canonicalUrl.value
})

useHead(() => ({ link: [{ rel: 'canonical', href: canonicalUrl.value }] }))

useHead(() => {
  const personId = `${siteOrigin}/#person`
  const websiteId = `${siteOrigin}/#website`
  return {
    script: privateRoute.value
      ? []
      : [{
          key: 'site-jsonld',
          type: 'application/ld+json',
          innerHTML: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'Person',
              '@id': personId,
              'name': 'Saroj Poudel',
              'url': `${siteOrigin}/`,
              'image': `${siteOrigin}/saroj-poudel.webp`,
              'jobTitle': 'Software Engineer, Full-stack Developer and Designer',
              'address': {
                '@type': 'PostalAddress',
                'addressLocality': 'Kathmandu',
                'addressCountry': 'NP'
              },
              'sameAs': [
                'https://github.com/ropodl/',
                'https://linkedin.com/in/ropodl/',
                'https://dribbble.com/ropodl/',
                'https://instagram.com/ropodl/'
              ],
              'knowsAbout': ['Web development', 'Frontend engineering', 'Full-stack development', 'User interface design', 'Search engine optimization']
            },
            {
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              '@id': websiteId,
              'name': 'ropodl',
              'url': `${siteOrigin}/`,
              'inLanguage': 'en',
              'publisher': { '@id': personId }
            }
          ])
        }]
  }
})

useHead({
  script: analyticsToken
    ? [{
        'src': 'https://static.cloudflareinsights.com/beacon.min.js',
        'defer': true,
        'data-cf-beacon': JSON.stringify({ token: analyticsToken })
      }]
    : []
})

// The tag is only loaded once a public page is visited, and stays loaded so client-side navigation keeps working.
const googleTagLoaded = useState('google-tag-loaded', () => false)
if (googleTagId && !privateRoute.value) googleTagLoaded.value = true

// The inline config snippet is rendered into the HTML so Google's tag checker can detect it.
useHead(() => ({
  script: googleTagLoaded.value
    ? [
        { key: 'google-tag', src: `https://www.googletagmanager.com/gtag/js?id=${googleTagId}`, async: true },
        {
          key: 'google-tag-config',
          innerHTML: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config',${JSON.stringify(googleTagId)},{send_page_view:false});`
        }
      ]
    : []
}))

// Page views are sent manually on each finished navigation (not by gtag's automatic page_view) so private routes are never tracked.
if (import.meta.client && googleTagId) {
  useNuxtApp().hook('page:finish', () => {
    if (privateRoute.value) return
    googleTagLoaded.value = true
    if (!window.gtag) {
      window.dataLayer = window.dataLayer || []
      window.gtag = function () {
        // gtag.js only recognises the real arguments object, not a rest-parameter array.
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer.push(arguments)
      }
      window.gtag('js', new Date())
      window.gtag('config', googleTagId, { send_page_view: false })
    }
    // Wait a frame so the new page's <title> has been written to the document.
    requestAnimationFrame(() => window.gtag('event', 'page_view', {
      page_location: window.location.href,
      page_title: document.title
    }))
  })
}
</script>

<template>
  <UApp>
    <NuxtRouteAnnouncer />
    <NuxtPage v-if="isAdminArea" />

    <template v-else>
      <a
        href="#main-content"
        class="skip-link"
      >Skip to main content</a>
      <header
        class="site-nav-header fixed inset-x-0 top-4 z-50 px-4"
      >
        <nav
          class="relative mx-auto flex max-w-4xl flex-nowrap items-center gap-x-2 rounded-2xl border border-default bg-default/80 px-3 py-3 shadow-lg shadow-black/5 backdrop-blur-xl sm:gap-x-6 sm:px-6"
          aria-label="Main navigation"
        >
          <NuxtLink
            to="/"
            prefetch-on="visibility"
            aria-label="ropodl home"
            class="mr-auto flex items-center gap-2 font-semibold text-highlighted"
          >
            <img
              src="/icon.svg"
              alt=""
              aria-hidden="true"
              class="size-8 object-contain"
            >
          </NuxtLink>
          <NuxtLink
            to="/blogs"
            prefetch-on="visibility"
            class="hidden rounded-lg px-1.5 py-1 text-xs text-muted transition-colors hover:text-highlighted sm:inline-flex sm:px-2 sm:text-sm"
            active-class="bg-primary/10 text-primary"
            :class="isPrimarySectionActive('/blogs') ? 'bg-primary/10 text-primary' : ''"
            :aria-current="isPrimarySectionActive('/blogs') ? 'page' : undefined"
          >
            Blog
          </NuxtLink>
          <NuxtLink
            to="/projects"
            prefetch-on="visibility"
            class="hidden rounded-lg px-1.5 py-1 text-xs text-muted transition-colors hover:text-highlighted sm:inline-flex sm:px-2 sm:text-sm"
            active-class="bg-primary/10 text-primary"
            :class="isPrimarySectionActive('/projects') ? 'bg-primary/10 text-primary' : ''"
            :aria-current="isPrimarySectionActive('/projects') ? 'page' : undefined"
          >
            Projects
          </NuxtLink>
          <NuxtLink
            to="/about"
            prefetch-on="visibility"
            class="hidden rounded-lg px-1.5 py-1 text-xs text-muted transition-colors hover:text-highlighted sm:inline-flex sm:px-2 sm:text-sm"
            active-class="bg-primary/10 text-primary"
          >
            About
          </NuxtLink>
          <NuxtLink
            to="/contact"
            prefetch-on="visibility"
            class="hidden rounded-lg px-1.5 py-1 text-xs text-muted transition-colors hover:text-highlighted sm:inline-flex sm:px-2 sm:text-sm"
            active-class="bg-primary/10 text-primary"
          >
            Contact
          </NuxtLink>
          <LazySiteSearch hydrate-on-idle />
          <Motion
            as="button"
            type="button"
            class="inline-flex size-11 items-center justify-center rounded-lg text-muted transition-colors hover:bg-elevated hover:text-highlighted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:hidden"
            :while-hover="{ scale: 1.04 }"
            :while-press="{ scale: 0.94 }"
            :transition="{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }"
            :aria-label="mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'"
            :aria-expanded="mobileMenuOpen"
            aria-controls="mobile-primary-navigation"
            @click="mobileMenuOpen = !mobileMenuOpen"
          >
            <UIcon
              :name="mobileMenuOpen ? 'i-lucide-x' : 'i-lucide-menu'"
              class="size-5"
            />
          </Motion>
        </nav>
        <AnimatePresence>
          <Motion
            v-if="mobileMenuOpen"
            id="mobile-primary-navigation"
            as="nav"
            aria-label="Mobile navigation"
            :initial="{ opacity: 0, y: -6, scale: 0.985 }"
            :animate="{ opacity: 1, y: 0, scale: 1 }"
            :exit="{ opacity: 0, y: -5, scale: 0.985 }"
            :transition="{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }"
            class="mx-auto mt-2 max-w-4xl overflow-hidden rounded-2xl border border-default bg-default/95 p-2 shadow-xl shadow-black/10 backdrop-blur-xl sm:hidden"
          >
            <Motion
              v-for="(item, index) in [
                { label: 'Blog', to: '/blogs', icon: 'i-lucide-notebook-tabs' },
                { label: 'Projects', to: '/projects', icon: 'i-lucide-panels-top-left' },
                { label: 'About', to: '/about', icon: 'i-lucide-user-round' },
                { label: 'Contact', to: '/contact', icon: 'i-lucide-mail' }
              ]"
              :key="item.to"
              as="div"
              :initial="{ opacity: 0, x: -6 }"
              :animate="{ opacity: 1, x: 0 }"
              :transition="{ duration: 0.15, delay: index * 0.03, ease: [0.16, 1, 0.3, 1] }"
            >
              <NuxtLink
                :to="item.to"
                class="flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm text-muted transition-colors hover:bg-elevated hover:text-highlighted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                active-class="bg-primary/10 text-primary"
                :class="isPrimarySectionActive(item.to) ? 'bg-primary/10 text-primary' : ''"
                :aria-current="isPrimarySectionActive(item.to) ? 'page' : undefined"
                @click="mobileMenuOpen = false"
              >
                <UIcon
                  :name="item.icon"
                  class="size-4"
                />
                {{ item.label }}
              </NuxtLink>
            </Motion>
          </Motion>
        </AnimatePresence>
      </header>

      <main
        id="main-content"
        tabindex="-1"
        class="mx-auto min-h-[70vh] w-full max-w-4xl px-4 pb-12 pt-28 sm:pb-16 sm:pt-32"
      >
        <NuxtPage />
      </main>

      <footer class="border-t border-default">
        <div class="mx-auto flex max-w-5xl flex-col items-center gap-5 px-4 py-8 text-center sm:py-10">
          <nav
            aria-label="Social links"
            class="flex flex-wrap justify-center gap-4 sm:gap-5"
          >
            <Motion
              as="div"
              :while-hover="{ y: -2, scale: 1.05 }"
              :while-press="{ scale: 0.95 }"
              :transition="{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }"
            >
              <a
                href="https://github.com/ropodl/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                class="flex size-11 items-center justify-center rounded-lg text-muted transition-colors hover:bg-elevated hover:text-highlighted"
              >
                <UIcon
                  name="i-simple-icons-github"
                  class="size-5"
                />
              </a>
            </Motion>
            <Motion
              as="div"
              :while-hover="{ y: -2, scale: 1.05 }"
              :while-press="{ scale: 0.95 }"
              :transition="{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }"
            >
              <a
                href="https://linkedin.com/in/ropodl/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                class="flex size-11 items-center justify-center rounded-lg text-muted transition-colors hover:bg-elevated hover:text-highlighted"
              >
                <UIcon
                  name="i-simple-icons-linkedin"
                  class="size-5"
                />
              </a>
            </Motion>
            <Motion
              as="div"
              :while-hover="{ y: -2, scale: 1.05 }"
              :while-press="{ scale: 0.95 }"
              :transition="{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }"
            >
              <a
                href="https://dribbble.com/ropodl/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Dribbble"
                class="flex size-11 items-center justify-center rounded-lg text-muted transition-colors hover:bg-elevated hover:text-highlighted"
              >
                <UIcon
                  name="i-simple-icons-dribbble"
                  class="size-5"
                />
              </a>
            </Motion>
            <Motion
              as="div"
              :while-hover="{ y: -2, scale: 1.05 }"
              :while-press="{ scale: 0.95 }"
              :transition="{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }"
            >
              <a
                href="https://instagram.com/ropodl/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                class="flex size-11 items-center justify-center rounded-lg text-muted transition-colors hover:bg-elevated hover:text-highlighted"
              >
                <UIcon
                  name="i-simple-icons-instagram"
                  class="size-5"
                />
              </a>
            </Motion>
            <Motion
              as="div"
              :while-hover="{ y: -2, scale: 1.05 }"
              :while-press="{ scale: 0.95 }"
              :transition="{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }"
            >
              <a
                href="/feed.xml"
                aria-label="RSS feed"
                title="RSS feed"
                class="flex size-11 items-center justify-center rounded-lg text-muted transition-colors hover:bg-elevated hover:text-highlighted"
              >
                <UIcon
                  name="i-lucide-rss"
                  class="size-5"
                />
              </a>
            </Motion>
            <Motion
              as="div"
              :while-hover="{ y: -2, scale: 1.05 }"
              :while-press="{ scale: 0.95 }"
              :transition="{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }"
            >
              <NuxtLink
                to="/saved"
                aria-label="Saved articles"
                title="Saved articles"
                class="flex size-11 items-center justify-center rounded-lg text-muted transition-colors hover:bg-elevated hover:text-highlighted"
              >
                <UIcon
                  name="i-lucide-bookmark"
                  class="size-5"
                />
              </NuxtLink>
            </Motion>
          </nav>
          <p class="text-sm text-muted">
            © {{ new Date().getFullYear() }} Saroj Poudel
          </p>
        </div>
      </footer>
    </template>
  </UApp>
</template>
