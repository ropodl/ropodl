import { and, asc, desc, eq, exists, gt, inArray, lt, ne, not, or } from 'drizzle-orm'
import { getDatabase } from '../../db'
import { blogs, blogCategories, blogTagLinks, blogTags } from '../../db/schema'
import { imageUrl, sanitizeRichContent } from '../../utils/content'
import { getVideoEmbedUrl } from '../../utils/blog-post-formats'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  if (!slug) throw createError({ statusCode: 404, statusMessage: 'Article not found.' })

  const db = getDatabase(event)
  const [post] = await db.select().from(blogs)
    .where(and(eq(blogs.slug, slug), eq(blogs.status, 'published')))
    .limit(1)

  if (!post) throw createError({ statusCode: 404, statusMessage: 'Article not found.' })

  // Related posts share the category or a tag; posts with neither fall back to the latest posts.
  const hasCategory = exists(db.select({ id: blogCategories.id }).from(blogCategories).where(eq(blogCategories.id, post.categoryId ?? '')))
  const hasTags = exists(db.select({ blogId: blogTagLinks.blogId }).from(blogTagLinks).where(eq(blogTagLinks.blogId, post.id)))
  const sharedTagPosts = db.select({ blogId: blogTagLinks.blogId }).from(blogTagLinks)
    .where(inArray(blogTagLinks.tagId, db.select({ tagId: blogTagLinks.tagId }).from(blogTagLinks).where(eq(blogTagLinks.blogId, post.id))))
  const relatedCondition = or(
    post.categoryId ? and(eq(blogs.categoryId, post.categoryId), hasCategory) : undefined,
    inArray(blogs.id, sharedTagPosts),
    and(not(hasCategory), not(hasTags))
  )
  const adjacentSelection = { title: blogs.title, slug: blogs.slug }
  const adjacentBase = eq(blogs.status, 'published')

  // All follow-up reads go to D1 in a single batch (one round trip) instead of one request per query.
  const [categoryRows, tags, relatedRows, previousRows, nextRows] = await db.batch([
    db.select({ title: blogCategories.title, slug: blogCategories.slug }).from(blogCategories).where(eq(blogCategories.id, post.categoryId ?? '')).limit(1),
    db.select({ title: blogTags.title, slug: blogTags.slug }).from(blogTagLinks).innerJoin(blogTags, eq(blogTagLinks.tagId, blogTags.id)).where(eq(blogTagLinks.blogId, post.id)),
    db.select({ id: blogs.id, title: blogs.title, slug: blogs.slug, summary: blogs.summary, imageKey: blogs.imageKey, createdAt: blogs.createdAt })
      .from(blogs).where(and(eq(blogs.status, 'published'), ne(blogs.id, post.id), relatedCondition)).orderBy(desc(blogs.createdAt)).limit(3),
    db.select(adjacentSelection).from(blogs)
      .where(and(adjacentBase, or(lt(blogs.createdAt, post.createdAt), and(eq(blogs.createdAt, post.createdAt), lt(blogs.id, post.id)))))
      .orderBy(desc(blogs.createdAt), desc(blogs.id))
      .limit(1),
    db.select(adjacentSelection).from(blogs)
      .where(and(adjacentBase, or(gt(blogs.createdAt, post.createdAt), and(eq(blogs.createdAt, post.createdAt), gt(blogs.id, post.id)))))
      .orderBy(asc(blogs.createdAt), asc(blogs.id))
      .limit(1)
  ])
  const related = relatedRows.map(item => ({ ...item, imageUrl: imageUrl(item.imageKey) }))
  return { ...post, content: sanitizeRichContent(post.content), videoEmbedUrl: post.postFormat === 'video' ? getVideoEmbedUrl(post.formatUrl) : null, category: categoryRows[0] || null, tags, imageUrl: imageUrl(post.imageKey), related, previous: previousRows[0] || null, next: nextRows[0] || null }
})
