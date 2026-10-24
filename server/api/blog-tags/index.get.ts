import { asc, count } from 'drizzle-orm'
import { getDatabase } from '../../db'
import { blogTags } from '../../db/schema'

export default defineEventHandler(async (event) => {
  const db = getDatabase(event)
  const query = getQuery(event)
  if (query.page === undefined && query.pageSize === undefined) {
    return db.select({ title: blogTags.title, slug: blogTags.slug }).from(blogTags).orderBy(asc(blogTags.title))
  }
  const requestedSize = Number.parseInt(String(query.pageSize || '10'), 10)
  const pageSize = [10, 25, 50].includes(requestedSize) ? requestedSize : 10
  const rows = await db.select({ total: count() }).from(blogTags)
  const totalItems = rows[0]?.total || 0
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))
  const requestedPage = Number.parseInt(String(query.page || '1'), 10)
  const page = Math.min(Math.max(Number.isFinite(requestedPage) ? requestedPage : 1, 1), totalPages)
  const items = await db.select({ title: blogTags.title, slug: blogTags.slug }).from(blogTags).orderBy(asc(blogTags.title)).limit(pageSize).offset((page - 1) * pageSize)
  return { items, page, pageSize, totalItems, totalPages }
})
