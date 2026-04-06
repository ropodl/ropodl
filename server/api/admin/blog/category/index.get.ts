import { getAdminClient, requireAdminUser } from '../../../../utils/admin'

export default defineEventHandler(async (event) => {
  await requireAdminUser(event)
  const client = await getAdminClient(event)

  const { data, error } = await client
    .from('blog_categories')
    .select('id, title:category_name, slug:category_slug, excerpt:category_excerpt, created_at, updated_at')
    .order('category_name', { ascending: true })

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    })
  }

  return data ?? []
})
