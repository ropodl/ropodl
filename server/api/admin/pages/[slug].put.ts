import { getDatabase } from '../../../db'
import { sitePages } from '../../../db/schema'
import { requireContentAdmin } from '../../../utils/content'
import { recordAdminAction } from '../../../utils/audit'
import { normalizeSitePageContent, sitePageDefaults } from '../../../../shared/site-pages'

export default defineEventHandler(async (event) => {
  await requireContentAdmin(event)
  const slug = getRouterParam(event, 'slug') || ''
  if (!sitePageDefaults[slug]) throw createError({ statusCode: 404, statusMessage: 'Page not found.' })
  const body = await readBody<Record<string, unknown>>(event)
  const content = body.content && typeof body.content === 'object' && !Array.isArray(body.content) ? body.content as Record<string, unknown> : {}
  const cleanContent = normalizeSitePageContent(slug, Object.fromEntries(Object.entries(sitePageDefaults[slug]!.content).map(([key, fallback]) => [key, typeof content[key] === 'string' ? (content[key] as string).trim().slice(0, 20_000) : fallback])))
  const seoTitle = typeof body.seoTitle === 'string' ? body.seoTitle.trim().slice(0, 180) : ''
  const seoDescription = typeof body.seoDescription === 'string' ? body.seoDescription.trim().slice(0, 500) : ''
  await getDatabase(event).insert(sitePages).values({ slug, content: JSON.stringify(cleanContent), seoTitle, seoDescription, updatedAt: new Date() }).onConflictDoUpdate({ target: sitePages.slug, set: { content: JSON.stringify(cleanContent), seoTitle, seoDescription, updatedAt: new Date() } })
  await recordAdminAction(event, 'update', 'page', slug)
  return { success: true }
})
