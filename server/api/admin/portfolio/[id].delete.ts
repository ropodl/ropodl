import { getAdminClient, parseNumericId, requireAdminUser } from '../../../utils/admin'

export default defineEventHandler(async (event) => {
  await requireAdminUser(event)
  const client = await getAdminClient(event)
  const id = parseNumericId(getRouterParam(event, 'id'), 'portfolio')

  const { error } = await client
    .from('portfolios')
    .delete()
    .eq('id', id)

  if (error) {
    throw createError({
      statusCode: 400,
      statusMessage: error.message,
    })
  }

  return {
    message: 'Deleted successfully',
  }
})
