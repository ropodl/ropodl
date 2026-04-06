import { getAdminClient, parseNumericId, requireAdminUser } from '../../../utils/admin'
import { serializeMedia } from '../../../utils/serializers'

export default defineEventHandler(async (event) => {
  await requireAdminUser(event)
  const client = await getAdminClient(event)
  const id = parseNumericId(getRouterParam(event, 'id'), 'media')

  const { data, error } = await client
    .from('media')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Media not found',
    })
  }

  return serializeMedia(data)
})
