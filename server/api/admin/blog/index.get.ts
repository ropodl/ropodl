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
  const search = query.search as string

  const client = await serverSupabaseClient(event)

  let supabaseQuery = client
    .from('blogs')
    .select(`
      id,
      blog_title,
      blog_slug,
      blog_status,
      created_at,
      updated_at,
      featured_image:media!featured_image(id, filename, file_url, alt_text),
      category:blog_categories!category_id(id, category_name, category_slug)
    `, { count: 'exact' })
    .order('updated_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (search) {
    supabaseQuery = supabaseQuery.or(`blog_title.ilike.%${search}%,blog_excerpt.ilike.%${search}%`)
  }

  const { data, error, count } = await supabaseQuery

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
