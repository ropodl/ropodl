import { and, count, desc, eq, inArray, sql } from 'drizzle-orm'
import { getDatabase } from '../../db'
import { projects, projectTypes } from '../../db/schema'
import { imageUrl } from '../../utils/content'

export default defineEventHandler(async (event) => {
  const db = getDatabase(event)
  const query = getQuery(event)
  const typeSlug = typeof query.type === 'string' ? query.type : ''
  const requestedSize = Number.parseInt(String(query.pageSize || '10'), 10)
  const pageSize = [10, 25, 50].includes(requestedSize) ? requestedSize : 10
  const requestedPage = Number.parseInt(String(query.page || '1'), 10)
  // The type filter resolves its slug in SQL, so an unknown slug simply matches no projects.
  const where = and(
    eq(projects.status, 'published'),
    typeSlug ? inArray(projects.typeId, db.select({ id: projectTypes.id }).from(projectTypes).where(eq(projectTypes.slug, typeSlug))) : undefined
  )

  // Everything for one page goes to D1 in a single batch (one round trip).
  const fetchPage = (page: number) => db.batch([
    db.select({ title: projectTypes.title, slug: projectTypes.slug }).from(projectTypes).where(eq(projectTypes.slug, typeSlug)).limit(1),
    db.select({ total: count() }).from(projects).where(where),
    db.select({
      id: projects.id,
      title: projects.title,
      slug: projects.slug,
      summary: projects.summary,
      imageKey: projects.imageKey,
      typeId: projects.typeId,
      createdAt: projects.createdAt,
      // Aliased because D1 batch rows are keyed by column name, and these would collide with projects.title/slug.
      typeTitle: sql<string | null>`${projectTypes.title}`.as('typeTitle'),
      typeSlug: sql<string | null>`${projectTypes.slug}`.as('typeSlug')
    }).from(projects)
      .leftJoin(projectTypes, eq(projects.typeId, projectTypes.id))
      .where(where)
      .orderBy(desc(projects.createdAt), desc(projects.id))
      .limit(pageSize)
      .offset((page - 1) * pageSize)
  ])

  let page = Math.max(Number.isFinite(requestedPage) ? requestedPage : 1, 1)
  let result = await fetchPage(page)
  const total = result[1][0]?.total || 0
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  // Out-of-range pages are clamped to the last page, which costs a second round trip only in that case.
  if (page > totalPages) {
    page = totalPages
    result = await fetchPage(page)
  }
  const [[selectedType], , items] = result

  return {
    items: items.map(({ typeTitle, typeSlug, ...item }) => ({
      ...item,
      type: item.typeId && typeTitle && typeSlug ? { id: item.typeId, title: typeTitle, slug: typeSlug } : null,
      imageUrl: imageUrl(item.imageKey)
    })),
    type: selectedType || null,
    page,
    pageSize,
    totalItems: total,
    totalPages
  }
})
