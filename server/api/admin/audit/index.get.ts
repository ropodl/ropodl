import { getAdminClient, requireAdminUser } from '../../../utils/admin'
import { serializeAuditLog } from '../../../utils/serializers'

export default defineEventHandler(async (event) => {
  await requireAdminUser(event)
  const client = await getAdminClient(event)
  const query = getQuery(event)
  const limit = Math.min(Number(query.limit) || 20, 100)
  const offset = Math.max(Number(query.offset) || 0, 0)

  const { data, error, count } = await client
    .from('audit_logs')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    })
  }

  return {
    meta: {
      total: count || 0,
      count: data?.length || 0,
      limit,
      offset,
    },
    data: (data ?? []).map((item: any) => serializeAuditLog(item)),
  }
})
