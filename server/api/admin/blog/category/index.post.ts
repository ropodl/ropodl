import { cleanOptionalString, cleanString, getAdminClient, requireAdminUser } from '../../../../utils/admin'

export default defineEventHandler(async (event) => {
  await requireAdminUser(event)
  const client = await getAdminClient(event)
  const body = await readBody<{ title?: string, slug?: string, excerpt?: string | null }>(event)

  const title = cleanString(body.title)
  const slug = cleanString(body.slug)

  if (!title || title.length > 60) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Title must be between 1 and 60 characters',
    })
  }

  if (!slug || slug.length > 120) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid slug',
    })
  }

  const { data, error } = await client
    .from('blog_categories')
    .insert({
      category_name: title,
      category_slug: slug,
      category_excerpt: cleanOptionalString(body.excerpt),
    })
    .select('id, title:category_name, slug:category_slug, excerpt:category_excerpt, created_at, updated_at')
    .single()

  if (error || !data) {
    throw createError({
      statusCode: error?.code === '23505' ? 409 : 400,
      statusMessage: error?.message ?? 'Failed to create category',
    })
  }

  return {
    success: true,
    data,
  }
})
