import {
  cleanOptionalString,
  getAdminClient,
  parseNumericId,
  requireAdminUser,
} from '../../../utils/admin'
import { serializeMedia } from '../../../utils/serializers'

export default defineEventHandler(async (event) => {
  await requireAdminUser(event)
  const client = await getAdminClient(event)
  const id = parseNumericId(getRouterParam(event, 'id'), 'media')
  const body = await readBody<{ altText?: string | null, description?: string | null }>(event)

  const { data, error } = await client
    .from('media')
    .update({
      alt_text: cleanOptionalString(body.altText),
      description: cleanOptionalString(body.description),
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select('*')
    .single()

  if (error || !data) {
    throw createError({
      statusCode: error?.code === 'PGRST116' ? 404 : 400,
      statusMessage: error?.message ?? 'Media not found',
    })
  }

  return serializeMedia(data)
})
