import { asc, count } from 'drizzle-orm'
import { getDatabase } from '../../../db'
import { requireContentAdmin } from '../../../utils/content'
import { getTaxonomyTable } from '../../../utils/taxonomy'

export default defineEventHandler(async (event) => {
  await requireContentAdmin(event)
  const query = getQuery(event)
  const table = getTaxonomyTable(getRouterParam(event, 'kind') || '')
  const db = getDatabase(event)
  if (query.page === undefined && query.pageSize === undefined) {
    return db.select().from(table).orderBy(asc(table.title))
  }

  const requestedSize = Number.parseInt(String(query.pageSize || '10'), 10)
  const pageSize = [10, 25, 50, 100].includes(requestedSize) ? requestedSize : 10
  const rows = await db.select({ total: count() }).from(table)
  const totalItems = rows[0]?.total || 0
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))
  const requestedPage = Number.parseInt(String(query.page || '1'), 10)
  const page = Math.min(Math.max(Number.isFinite(requestedPage) ? requestedPage : 1, 1), totalPages)
  const items = await db.select().from(table).orderBy(asc(table.title)).limit(pageSize).offset((page - 1) * pageSize)
  return { items, page, pageSize, totalItems, totalPages }
})
