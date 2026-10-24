import { eq } from 'drizzle-orm'
import { getDatabase } from '../../db'
import { sitePages } from '../../db/schema'
import { normalizeSitePageContent, sitePageDefaults } from '../../../shared/site-pages'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug') || ''
  const fallback = sitePageDefaults[slug]
  if (!fallback) throw createError({ statusCode: 404, statusMessage: 'Page not found.' })
  try {
    const [saved] = await getDatabase(event).select().from(sitePages).where(eq(sitePages.slug, slug)).limit(1)
    const content = normalizeSitePageContent(slug, { ...fallback.content, ...(saved ? JSON.parse(saved.content) : {}) })
    return { slug, label: fallback.label, content, seoTitle: saved?.seoTitle || fallback.seoTitle, seoDescription: saved?.seoDescription || fallback.seoDescription }
  } catch {
    return { slug, ...fallback }
  }
})
