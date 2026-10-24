import { count, desc } from 'drizzle-orm'
import { getDatabase } from '../../../db'
import { auditLogs } from '../../../db/schema'
import { requireContentAdmin } from '../../../utils/content'

export default defineEventHandler(async (event) => {
  await requireContentAdmin(event)
  const db = getDatabase(event)
  const rows = await db.select({ total: count() }).from(auditLogs)
  const total = rows[0]?.total || 0
  const query = getQuery(event)
  const requestedSize = Number.parseInt(String(query.pageSize || '10'), 10)
  const pageSize = [10, 25, 50, 100].includes(requestedSize) ? requestedSize : 10
  const page = Math.max(1, Number.parseInt(String(query.page || '1'), 10) || 1)
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const currentPage = Math.min(page, totalPages)
  const items = await db.select().from(auditLogs).orderBy(desc(auditLogs.createdAt)).limit(pageSize).offset((currentPage - 1) * pageSize)
  return { items, page: currentPage, pageSize, totalItems: total, totalPages }
})
