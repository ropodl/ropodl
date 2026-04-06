import {
  cleanOptionalString,
  cleanString,
  getAdminClient,
  parseNumericId,
  requireAdminUser,
} from '../../../../utils/admin'

export default defineEventHandler(async (event) => {
  await requireAdminUser(event)
  const client = await getAdminClient(event)
  const id = parseNumericId(getRouterParam(event, 'id'), 'category')
  const body = await readBody<{ title?: string, slug?: string, excerpt?: string | null }>(event)

  const { data, error } = await client
    .from('blog_categories')
    .update({
      category_name: cleanString(body.title),
      category_slug: cleanString(body.slug),
      category_excerpt: cleanOptionalString(body.excerpt),
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select('id, title:category_name, slug:category_slug, excerpt:category_excerpt, created_at, updated_at')
    .single()

  if (error || !data) {
    throw createError({
      statusCode: error?.code === 'PGRST116' ? 404 : 400,
      statusMessage: error?.message ?? 'Failed to update category',
    })
  }

  return {
    success: true,
    data,
  }
})
