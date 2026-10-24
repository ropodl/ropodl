import { eq } from 'drizzle-orm'
import { getDatabase } from '../../../../db'
import { requireContentAdmin } from '../../../../utils/content'
import { recordAdminAction } from '../../../../utils/audit'
import { getTaxonomyTable } from '../../../../utils/taxonomy'

export default defineEventHandler(async (event) => {
  await requireContentAdmin(event)
  const kind = getRouterParam(event, 'kind') || ''
  const id = getRouterParam(event, 'id') || ''
  const table = getTaxonomyTable(kind)
  const [deleted] = await getDatabase(event).delete(table).where(eq(table.id, id)).returning({ id: table.id })
  if (!deleted) throw createError({ statusCode: 404, statusMessage: 'Taxonomy item not found.' })
  await recordAdminAction(event, 'deleted', kind, id)
  return { ok: true }
})
