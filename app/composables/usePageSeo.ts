import { computed, toValue, type MaybeRefOrGetter } from 'vue'

export interface PageSeo {
  title: string
  description: string
  image?: string | null
  imageAlt?: string
  type?: 'website' | 'article'
  publishedTime?: string | number | Date
  modifiedTime?: string | number | Date
  authorName?: string
  section?: string
  tags?: string[]
  schema?: Record<string, unknown>
}

export function useSiteOrigin() {
  return useRuntimeConfig().public.siteUrl.replace(/\/+$/, '')
}

function safeJsonLd(value: Record<string, unknown>) {
  return JSON.stringify(value).replace(/[<>&\u2028\u2029]/g, character => ({
    '<': '\\u003C',
    '>': '\\u003E',
    '&': '\\u0026',
    '\u2028': '\\u2028',
    '\u2029': '\\u2029'
  })[character]!)
}

function toIsoString(value: PageSeo['publishedTime']) {
  if (!value) return undefined
  const date = new Date(value)
  return Number.isNaN(date.valueOf()) ? undefined : date.toISOString()
}

export function usePageSeo(options: MaybeRefOrGetter<PageSeo>) {
  const route = useRoute()
  const siteOrigin = useSiteOrigin()
  const seo = computed(() => toValue(options))

  useHead(() => {
    const page = seo.value
    const imageUrl = page.image
      ? new URL(page.image, siteOrigin).href
      : new URL('/social-card.png', siteOrigin).href
    const imageType = imageUrl.endsWith('.png') ? 'image/png' : imageUrl.endsWith('.webp') ? 'image/webp' : undefined
    const isDefaultImage = imageUrl.endsWith('/social-card.png')
    const pageUrl = new URL(route.path, siteOrigin).href
    const publishedTime = toIsoString(page.publishedTime)
    const modifiedTime = toIsoString(page.modifiedTime)

    return {
      title: page.title,
      meta: [
        { name: 'description', content: page.description },
        { property: 'og:title', content: page.title },
        { property: 'og:description', content: page.description },
        { property: 'og:type', content: page.type || 'website' },
        { property: 'og:url', content: pageUrl },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:image', content: imageUrl },
        { property: 'og:image:secure_url', content: imageUrl },
        { property: 'og:image:alt', content: page.imageAlt || page.title },
        ...(imageType ? [{ property: 'og:image:type', content: imageType }] : []),
        ...(isDefaultImage
          ? [
              { property: 'og:image:width', content: '1200' },
              { property: 'og:image:height', content: '630' }
            ]
          : []),
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: page.title },
        { name: 'twitter:description', content: page.description },
        { name: 'twitter:image', content: imageUrl },
        { name: 'twitter:image:alt', content: page.imageAlt || page.title },
        ...(publishedTime ? [{ property: 'article:published_time', content: publishedTime }] : []),
        ...(modifiedTime ? [{ property: 'article:modified_time', content: modifiedTime }] : []),
        ...(page.authorName ? [{ property: 'article:author', content: page.authorName }] : []),
        ...(page.section ? [{ property: 'article:section', content: page.section }] : []),
        ...(page.tags || []).map(tag => ({ property: 'article:tag', content: tag }))
      ],
      script: page.schema
        ? [{ key: 'page-jsonld', type: 'application/ld+json', innerHTML: safeJsonLd(page.schema) }]
        : []
    }
  })
}
