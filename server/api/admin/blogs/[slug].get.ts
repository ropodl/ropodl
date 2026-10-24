import { eq } from 'drizzle-orm'
import { getDatabase } from '../../../db'
import { blogs, blogTagLinks } from '../../../db/schema'
import { imageUrl, requireContentAdmin, sanitizeRichContent } from '../../../utils/content'

export default defineEventHandler(async (event) => {
  await requireContentAdmin(event)
  const slug = getRouterParam(event, 'slug')
  if (!slug) throw createError({ statusCode: 404, statusMessage: 'Blog post not found.' })
  const [post] = await getDatabase(event).select().from(blogs).where(eq(blogs.slug, slug)).limit(1)
  if (!post) throw createError({ statusCode: 404, statusMessage: 'Blog post not found.' })
  const tags = await getDatabase(event).select({ tagId: blogTagLinks.tagId }).from(blogTagLinks).where(eq(blogTagLinks.blogId, post.id))
  return { ...post, content: sanitizeRichContent(post.content), tagIds: tags.map(tag => tag.tagId), imageUrl: imageUrl(post.imageKey) }
})
