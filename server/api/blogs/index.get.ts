import { and, count, desc, eq, inArray, sql } from 'drizzle-orm'
import { getDatabase } from '../../db'
import { blogs, blogCategories, blogTagLinks, blogTags } from '../../db/schema'
import { imageUrl } from '../../utils/content'

const pageSize = 10

export default defineEventHandler(async (event) => {
  const db = getDatabase(event)
  const query = getQuery(event)
  const categorySlug = typeof query.category === 'string' ? query.category : ''
  const tagSlug = typeof query.tag === 'string' ? query.tag : ''
  const requestedPage = Number.parseInt(String(query.page || '1'), 10)
  // Filters resolve slugs in SQL, so an unknown slug simply matches no posts.
  const where = and(
    eq(blogs.status, 'published'),
    categorySlug ? inArray(blogs.categoryId, db.select({ id: blogCategories.id }).from(blogCategories).where(eq(blogCategories.slug, categorySlug))) : undefined,
    tagSlug ? inArray(blogs.id, db.select({ blogId: blogTagLinks.blogId }).from(blogTagLinks).innerJoin(blogTags, eq(blogTagLinks.tagId, blogTags.id)).where(eq(blogTags.slug, tagSlug))) : undefined
  )

  // Everything for one page goes to D1 in a single batch (one round trip).
  const fetchPage = (page: number) => {
    const offset = (page - 1) * pageSize
    const pageIds = db.select({ id: blogs.id }).from(blogs).where(where).orderBy(desc(blogs.createdAt), desc(blogs.id)).limit(pageSize).offset(offset)
    return db.batch([
      db.select({ title: blogCategories.title, slug: blogCategories.slug }).from(blogCategories).where(eq(blogCategories.slug, categorySlug)).limit(1),
      db.select({ title: blogTags.title, slug: blogTags.slug }).from(blogTags).where(eq(blogTags.slug, tagSlug)).limit(1),
      db.select({ total: count() }).from(blogs).where(where),
      db.select({
        id: blogs.id,
        title: blogs.title,
        slug: blogs.slug,
        summary: blogs.summary,
        imageKey: blogs.imageKey,
        postFormat: blogs.postFormat,
        createdAt: blogs.createdAt,
        // Aliased because D1 batch rows are keyed by column name, and these would collide with blogs.title/slug.
        categoryTitle: sql<string | null>`${blogCategories.title}`.as('categoryTitle'),
        categorySlug: sql<string | null>`${blogCategories.slug}`.as('categorySlug')
      }).from(blogs)
        .leftJoin(blogCategories, eq(blogs.categoryId, blogCategories.id))
        .where(where)
        .orderBy(desc(blogs.createdAt), desc(blogs.id))
        .limit(pageSize)
        .offset(offset),
      db.select({ blogId: blogTagLinks.blogId, title: blogTags.title, slug: blogTags.slug }).from(blogTagLinks).innerJoin(blogTags, eq(blogTagLinks.tagId, blogTags.id)).where(inArray(blogTagLinks.blogId, pageIds))
    ])
  }

  let page = Math.max(Number.isFinite(requestedPage) ? requestedPage : 1, 1)
  let result = await fetchPage(page)
  const total = result[2][0]?.total || 0
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  // Out-of-range pages are clamped to the last page, which costs a second round trip only in that case.
  if (page > totalPages) {
    page = totalPages
    result = await fetchPage(page)
  }
  const [[category], [tag], , posts, tags] = result

  return {
    items: posts.map(({ categoryTitle, categorySlug, ...post }) => ({
      ...post,
      category: categoryTitle && categorySlug ? { blogId: post.id, title: categoryTitle, slug: categorySlug } : null,
      tags: tags.filter(item => item.blogId === post.id).map(({ title, slug }) => ({ title, slug })),
      imageUrl: imageUrl(post.imageKey)
    })),
    category: category || null,
    tag: tag || null,
    page,
    pageSize,
    totalItems: total,
    totalPages
  }
})
