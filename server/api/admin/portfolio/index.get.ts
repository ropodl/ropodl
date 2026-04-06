import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import { serializePortfolio } from '../../../utils/serializers'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  const query = getQuery(event)
  const perPage = Math.min(Number(query.per_page ?? query.limit) || 10, 50)
  const page = Math.max(Number(query.page) || 1, 1)
  const offset = Math.max(Number(query.offset) || (page - 1) * perPage, 0)
  const search = query.search as string | undefined

  const client = await serverSupabaseClient(event)

  let supabaseQuery = client
    .from('portfolios')
    .select(`
      *,
      featured_image:media!featured_image_id(*),
      work_type:work_types!work_type_id(*)
    `, { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + perPage - 1)

  if (search) {
    supabaseQuery = supabaseQuery.or(`title.ilike.%${search}%,slug.ilike.%${search}%`)
  }

  const { data, error, count } = await supabaseQuery

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    })
  }

  const total = count || 0
  const currentPage = Math.floor(offset / perPage) + 1
  const lastPage = Math.max(Math.ceil(total / perPage), 1)

  return {
    data: (data ?? []).map(serializePortfolio),
    pagination: {
      total,
      current_page: currentPage,
      per_page: perPage,
      last_page: lastPage,
    },
  }
})
