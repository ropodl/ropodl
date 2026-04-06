import { getAdminClient, parseNumericId, requireAdminUser } from '../../../utils/admin'

export default defineEventHandler(async (event) => {
  await requireAdminUser(event)
  const client = await getAdminClient(event)
  const id = parseNumericId(getRouterParam(event, 'id'), 'media')

  const { data, error } = await client
    .from('media')
    .select('id, file_url, metadata')
    .eq('id', id)
    .single()

  if (error || !data) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Media not found',
    })
  }

  const storagePaths = [data.file_url, data.metadata?.variants?.full, data.metadata?.variants?.card, data.metadata?.variants?.blur]
    .filter((value): value is string => typeof value === 'string' && value.length > 0)
    .map((value) => {
      try {
        const url = new URL(value)
        return decodeURIComponent(url.pathname.split('/media/').slice(1).join('/media/'))
      } catch {
        return value
      }
    })
    .map((value) => value.replace(/^media\//, ''))

  if (storagePaths.length) {
    await client.storage.from('media').remove(storagePaths)
  }

  const { error: deleteError } = await client
    .from('media')
    .delete()
    .eq('id', id)

  if (deleteError) {
    throw createError({
      statusCode: 400,
      statusMessage: deleteError.message,
    })
  }

  return {
    message: 'Media deleted successfully',
  }
})
