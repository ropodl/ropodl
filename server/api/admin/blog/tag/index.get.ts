import { getAdminClient, requireAdminUser } from '../../../../utils/admin'

export default defineEventHandler(async (event) => {
  await requireAdminUser(event)
  const client = await getAdminClient(event)

  const { data, error } = await client
    .from('blog_tags')
    .select('id, title:tag_name, slug:tag_slug, excerpt:tag_excerpt, created_at, updated_at')
    .order('tag_name', { ascending: true })

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    })
  }

  return data ?? []
})
