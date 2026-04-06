import { getAdminClient, parseNumericId, requireAdminUser } from '../../../utils/admin'
import { serializePortfolio } from '../../../utils/serializers'

export default defineEventHandler(async (event) => {
  await requireAdminUser(event)
  const client = await getAdminClient(event)
  const id = parseNumericId(getRouterParam(event, 'id'), 'portfolio')

  const { data, error } = await client
    .from('portfolios')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Portfolio not found',
    })
  }

  return serializePortfolio(data)
})
