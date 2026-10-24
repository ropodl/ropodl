import { count, desc } from 'drizzle-orm'
import { getDatabase } from '../../../db'
import { projects } from '../../../db/schema'
import { imageUrl, requireContentAdmin } from '../../../utils/content'

export default defineEventHandler(async (event) => {
  await requireContentAdmin(event)
  const db = getDatabase(event)
  const rows = await db.select({ total: count() }).from(projects)
  const total = rows[0]?.total || 0
  const requestedSize = Number.parseInt(String(getQuery(event).pageSize || '10'), 10)
  const pageSize = [10, 25, 50, 100].includes(requestedSize) ? requestedSize : 10
  const requestedPage = Number.parseInt(String(getQuery(event).page || '1'), 10)
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const page = Math.min(Math.max(Number.isFinite(requestedPage) ? requestedPage : 1, 1), totalPages)
  const items = await db.select().from(projects).orderBy(desc(projects.createdAt)).limit(pageSize).offset((page - 1) * pageSize)
  return { items: items.map(item => ({ ...item, imageUrl: imageUrl(item.imageKey) })), page, pageSize, totalItems: total, totalPages }
})
