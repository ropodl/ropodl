import { cleanOptionalString, cleanString, getAdminClient, requireAdminUser } from '../../../utils/admin'

export default defineEventHandler(async (event) => {
  await requireAdminUser(event)
  const client = await getAdminClient(event)
  const body = await readBody<{ title?: string, slug?: string, description?: string | null }>(event)

  const { data, error } = await client
    .from('work_types')
    .insert({
      title: cleanString(body.title),
      slug: cleanString(body.slug),
      description: cleanOptionalString(body.description),
    })
    .select('*')
    .single()

  if (error || !data) {
    throw createError({
      statusCode: error?.code === '23505' ? 409 : 400,
      statusMessage: error?.message ?? 'Failed to create work type',
    })
  }

  return data
})
