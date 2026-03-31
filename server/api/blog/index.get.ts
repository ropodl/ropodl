import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const limit = Math.min(Number(query.limit) || 10, 50)
  const offset = Math.max(Number(query.offset) || 0, 0)
  const catSlug = query.category as string
  const tagSlug = query.tag as string

  const client = await serverSupabaseClient(event)

  let supabaseQuery = client
    .from('blogs')
    .select(`
      id,
      blog_title,
      blog_slug,
      blog_excerpt,
      blog_status,
      created_at,
      featured_image:media!featured_image(id, filename, file_url, alt_text),
      category:blog_categories!category_id(id, category_name, category_slug)
    `, { count: 'exact' })
    .eq('blog_status', 'published')
    .order('updated_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (catSlug) {
    supabaseQuery = supabaseQuery.eq('category.category_slug', catSlug)
  }

  // Handle tag filter if needed. This might require a join through blog_to_tags
  if (tagSlug) {
    // Supabase join syntax for filtering by tags
    supabaseQuery = supabaseQuery.filter('blog_to_tags.blog_tags.tag_slug', 'eq', tagSlug)
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
