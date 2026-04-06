import { getAdminClient, parseNumericId, requireAdminUser } from '../../../utils/admin'
import { serializeContact } from '../../../utils/serializers'

export default defineEventHandler(async (event) => {
  await requireAdminUser(event)
  const client = await getAdminClient(event)
  const id = parseNumericId(getRouterParam(event, 'id'), 'contact')

  const { data, error } = await client
    .from('contact_requests')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Contact request not found',
    })
  }

  if (data.status === 'unread') {
    await client
      .from('contact_requests')
      .update({ status: 'read', updated_at: new Date().toISOString() })
      .eq('id', id)
  }

  return {
    success: true,
    data: {
      ...serializeContact(data),
      status: data.status === 'unread' ? 'read' : data.status,
    },
  }
})
