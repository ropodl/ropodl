import { getAdminClient, parseNumericId, requireAdminUser } from '../../../../utils/admin'
import { serializeContact } from '../../../../utils/serializers'

export default defineEventHandler(async (event) => {
  await requireAdminUser(event)
  const client = await getAdminClient(event)
  const id = parseNumericId(getRouterParam(event, 'id'), 'contact')
  const body = await readBody<{ status?: 'unread' | 'read' | 'replied' | 'archived' }>(event)

  if (!body.status) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Status is required',
    })
  }

  const { data, error } = await client
    .from('contact_requests')
    .update({
      status: body.status,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select('*')
    .single()

  if (error || !data) {
    throw createError({
      statusCode: 404,
      statusMessage: error?.message ?? 'Contact request not found',
    })
  }

  return {
    success: true,
    data: serializeContact(data),
  }
})
