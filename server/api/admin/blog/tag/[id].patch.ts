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
  const id = parseNumericId(getRouterParam(event, 'id'), 'tag')
  const body = await readBody<{ title?: string, slug?: string, excerpt?: string | null }>(event)

  const { data, error } = await client
    .from('blog_tags')
    .update({
      tag_name: cleanString(body.title),
      tag_slug: cleanString(body.slug),
      tag_excerpt: cleanOptionalString(body.excerpt),
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select('id, title:tag_name, slug:tag_slug, excerpt:tag_excerpt, created_at, updated_at')
    .single()

  if (error || !data) {
    throw createError({
      statusCode: error?.code === 'PGRST116' ? 404 : 400,
      statusMessage: error?.message ?? 'Failed to update tag',
    })
  }

  return {
    success: true,
    data,
  }
})
