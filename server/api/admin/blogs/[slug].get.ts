import { eq } from 'drizzle-orm'
import { getDatabase } from '../../../db'
import { blogs, blogCategories, blogTagLinks, blogTags } from '../../../db/schema'
import { imageUrl, requireContentAdmin, sanitizeRichContent } from '../../../utils/content'
import { getVideoEmbedUrl } from '../../../utils/blog-post-formats'

export default defineEventHandler(async (event) => {
  await requireContentAdmin(event)
  const slug = getRouterParam(event, 'slug')
  if (!slug) throw createError({ statusCode: 404, statusMessage: 'Blog post not found.' })
  const db = getDatabase(event)
  const [post] = await db.select().from(blogs).where(eq(blogs.slug, slug)).limit(1)
  if (!post) throw createError({ statusCode: 404, statusMessage: 'Blog post not found.' })
  const [categoryRows, tagRows] = await db.batch([
    db.select({ title: blogCategories.title, slug: blogCategories.slug }).from(blogCategories).where(eq(blogCategories.id, post.categoryId ?? '')).limit(1),
    db.select({ tagId: blogTagLinks.tagId, title: blogTags.title, slug: blogTags.slug })
      .from(blogTagLinks)
      .innerJoin(blogTags, eq(blogTagLinks.tagId, blogTags.id))
      .where(eq(blogTagLinks.blogId, post.id))
  ])
  return {
    ...post,
    content: sanitizeRichContent(post.content),
    tagIds: tagRows.map(tag => tag.tagId),
    category: categoryRows[0] || null,
    tags: tagRows.map(({ title, slug }) => ({ title, slug })),
    videoEmbedUrl: post.postFormat === 'video' ? getVideoEmbedUrl(post.formatUrl) : null,
    imageUrl: imageUrl(post.imageKey)
  }
})
