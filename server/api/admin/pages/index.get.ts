import { getDatabase } from '../../../db'
import { sitePages } from '../../../db/schema'
import { requireContentAdmin } from '../../../utils/content'
import { sitePageDefaults } from '../../../../shared/site-pages'

export default defineEventHandler(async (event) => {
  await requireContentAdmin(event)
  let saved: typeof sitePages.$inferSelect[] = []
  try {
    saved = await getDatabase(event).select().from(sitePages)
  } catch (error) {
    console.warn('Failed to load saved site pages.', error)
  }
  return Object.entries(sitePageDefaults).map(([slug, fallback]) => {
    const page = saved.find(item => item.slug === slug)
    return { slug, label: fallback.label, seoTitle: page?.seoTitle || fallback.seoTitle, seoDescription: page?.seoDescription || fallback.seoDescription, updatedAt: page?.updatedAt || null }
  })
})
