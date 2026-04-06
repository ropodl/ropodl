import { getAdminClient, parseNumericId, requireAdminUser } from '../../../utils/admin'

export default defineEventHandler(async (event) => {
  await requireAdminUser(event)
  const client = await getAdminClient(event)
  const id = parseNumericId(getRouterParam(event, 'id'), 'blog')

  const { data: blog, error } = await client
    .from('blogs')
    .select(`
      id,
      title:blog_title,
      slug:blog_slug,
      content:blog_content,
      excerpt:blog_excerpt,
      status:blog_status,
      featured:featured_image,
      categoryId:category_id,
      featured_image_record:media!featured_image(id, file_url),
      category:blog_categories!category_id(id, category_name, category_slug),
      tags:blog_to_tags(tag:blog_tags(id, tag_name, tag_slug))
    `)
    .eq('id', id)
    .single()

  if (error || !blog) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Blog not found',
    })
  }

  return {
    success: true,
    data: {
      ...blog,
      featured_image_url: blog.featured_image_record?.file_url ?? null,
      tags: (blog.tags ?? []).map((item: { tag?: { id: number, tag_name: string, tag_slug: string } | null }) => ({
        id: item.tag?.id,
        title: item.tag?.tag_name,
        slug: item.tag?.tag_slug,
      })).filter((tag: { id?: number }) => typeof tag.id === 'number'),
    },
  }
})
