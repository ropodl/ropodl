import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  const query = getQuery(event)
  const limit = Math.min(Number(query.limit) || 10, 50)
  const offset = Math.max(Number(query.offset) || 0, 0)

  const client = await serverSupabaseClient(event)

  const { data, error, count } = await client
    .from('portfolios')
    .select(`
      *,
      featured_image:media!featured_image_id(*),
      work_type:work_types!work_type_id(*)
    `, { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    })
  }

  return {
    success: true,
    meta: {
      total: count || 0,
      count: data?.length || 0,
      limit,
      offset,
    },
    data,
  }
})
