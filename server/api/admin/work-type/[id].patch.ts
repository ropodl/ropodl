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
  const id = parseNumericId(getRouterParam(event, 'id'), 'work type')
  const body = await readBody<{ title?: string, slug?: string, description?: string | null }>(event)

  const { data, error } = await client
    .from('work_types')
    .update({
      title: cleanString(body.title),
      slug: cleanString(body.slug),
      description: cleanOptionalString(body.description),
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select('*')
    .single()

  if (error || !data) {
    throw createError({
      statusCode: error?.code === 'PGRST116' ? 404 : 400,
      statusMessage: error?.message ?? 'Failed to update work type',
    })
  }

  return data
})
