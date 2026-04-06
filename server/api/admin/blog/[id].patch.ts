import {
  cleanOptionalString,
  cleanString,
  getAdminClient,
  parseNumericId,
  requireAdminUser,
} from '../../../utils/admin'

export default defineEventHandler(async (event) => {
  await requireAdminUser(event)
  const client = await getAdminClient(event)
  const id = parseNumericId(getRouterParam(event, 'id'), 'blog')
  const body = await readBody<{
    title?: string
    slug?: string
    content?: string
    excerpt?: string | null
    featured_image_id?: number | null
    categoryId?: number | null
    status?: 'draft' | 'published' | 'archieved'
    tagIds?: number[]
  }>(event)

  const payload = {
    blog_title: cleanString(body.title),
    blog_slug: cleanString(body.slug),
    blog_content: cleanString(body.content),
    blog_excerpt: cleanOptionalString(body.excerpt),
    featured_image: body.featured_image_id ?? null,
    category_id: body.categoryId ?? null,
    blog_status: body.status ?? 'draft',
    updated_at: new Date().toISOString(),
  }

  const missingFields = [
    !payload.blog_title ? 'title' : null,
    !payload.blog_slug ? 'slug' : null,
    !payload.blog_content ? 'content' : null,
    !payload.featured_image ? 'featured_image_id' : null,
  ].filter((field): field is string => Boolean(field))

  if (missingFields.length) {
    throw createError({
      statusCode: 400,
      statusMessage: `Missing required blog fields: ${missingFields.join(', ')}`,
    })
  }

  const { data: updated, error } = await client
    .from('blogs')
    .update(payload)
    .eq('id', id)
    .select('id')
    .single()

  if (error || !updated) {
    throw createError({
      statusCode: error?.code === 'PGRST116' ? 404 : error?.code === '23505' ? 409 : 400,
      statusMessage: error?.message ?? 'Failed to update blog',
    })
  }

  const { error: deleteError } = await client
    .from('blog_to_tags')
    .delete()
    .eq('blog_id', id)

  if (deleteError) {
    throw createError({
      statusCode: 400,
      statusMessage: deleteError.message,
    })
  }

  const tagIds = Array.isArray(body.tagIds)
    ? body.tagIds.filter((tagId): tagId is number => Number.isInteger(tagId))
    : []

  if (tagIds.length) {
    const { error: tagError } = await client
      .from('blog_to_tags')
      .insert(tagIds.map((tagId) => ({ blog_id: id, tag_id: tagId })))

    if (tagError) {
      throw createError({
        statusCode: 400,
        statusMessage: tagError.message,
      })
    }
  }

  return {
    success: true,
    data: updated,
  }
})
