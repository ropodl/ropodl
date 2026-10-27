import { eq } from 'drizzle-orm'
import { getDatabase } from '../../../../db'
import { requireContentAdmin, slugify } from '../../../../utils/content'
import { recordAdminAction } from '../../../../utils/audit'
import { getTaxonomyTable } from '../../../../utils/taxonomy'

export default defineEventHandler(async (event) => {
  await requireContentAdmin(event)
  const kind = getRouterParam(event, 'kind') || ''
  const id = getRouterParam(event, 'id') || ''
  const table = getTaxonomyTable(kind)
  const body = await readBody<{ title?: unknown, slug?: unknown, description?: unknown }>(event)
  const title = typeof body?.title === 'string' ? body.title.trim().slice(0, 120) : ''
  const slug = slugify(body?.slug || title)
  const description = typeof body?.description === 'string' ? body.description.trim().slice(0, 600) : ''
  if (!id || !title || !slug) throw createError({ statusCode: 400, statusMessage: 'Add a title and valid slug.' })
  const values = kind === 'tags' ? { title, slug, updatedAt: new Date() } : { title, slug, description, updatedAt: new Date() }
  const [updated] = await getDatabase(event).update(table).set(values as never).where(eq(table.id, id)).returning()
  if (!updated) throw createError({ statusCode: 404, statusMessage: 'Taxonomy item not found.' })
  await recordAdminAction(event, 'updated', kind, id)
  return updated
})
