import { getDatabase } from '../../../db'
import { requireContentAdmin, slugify } from '../../../utils/content'
import { recordAdminAction } from '../../../utils/audit'
import { getTaxonomyTable } from '../../../utils/taxonomy'

export default defineEventHandler(async (event) => {
  await requireContentAdmin(event)
  const kind = getRouterParam(event, 'kind') || ''
  const table = getTaxonomyTable(kind)
  const body = await readBody<{ title?: unknown; slug?: unknown; description?: unknown }>(event)
  const title = typeof body?.title === 'string' ? body.title.trim().slice(0, 120) : ''
  const slug = slugify(body?.slug || title)
  const description = typeof body?.description === 'string' ? body.description.trim().slice(0, 600) : ''
  if (!title || !slug) throw createError({ statusCode: 400, statusMessage: 'Add a title and valid slug.' })
  const now = new Date()
  const values = kind === 'tags' ? { id: crypto.randomUUID(), title, slug, createdAt: now, updatedAt: now } : { id: crypto.randomUUID(), title, slug, description, createdAt: now, updatedAt: now }
  const [created] = await getDatabase(event).insert(table).values(values as never).returning()
  await recordAdminAction(event, 'created', kind, created?.id)
  return created
})
