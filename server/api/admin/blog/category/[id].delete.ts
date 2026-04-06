import { getAdminClient, parseNumericId, requireAdminUser } from '../../../../utils/admin'

export default defineEventHandler(async (event) => {
  await requireAdminUser(event)
  const client = await getAdminClient(event)
  const id = parseNumericId(getRouterParam(event, 'id'), 'category')

  const { error } = await client
    .from('blog_categories')
    .delete()
    .eq('id', id)

  if (error) {
    throw createError({
      statusCode: 400,
      statusMessage: error.message,
    })
  }

  return {
    success: true,
    message: 'Deleted successfully',
  }
})
