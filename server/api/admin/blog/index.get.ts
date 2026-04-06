import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import { serializeMedia } from '../../../utils/serializers'

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
    .range(offset, offset + perPage - 1)

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

  const currentPage = Math.floor(offset / perPage) + 1
  const total = count || 0
  const lastPage = Math.max(Math.ceil(total / perPage), 1)

  return {
    success: true,
    meta: {
      total,
      count: data?.length || 0,
      limit: perPage,
      offset,
      current_page: currentPage,
      per_page: perPage,
      last_page: lastPage,
    },
    data: (data ?? []).map((item: any) => ({
      id: item.id,
      title: item.blog_title,
      slug: item.blog_slug,
      status: item.blog_status,
      created_at: item.created_at,
      updated_at: item.updated_at,
      featured_image: serializeMedia(item.featured_image),
      category: item.category
        ? {
            id: item.category.id,
            title: item.category.category_name,
            slug: item.category.category_slug,
          }
        : null,
    })),
  }
})
