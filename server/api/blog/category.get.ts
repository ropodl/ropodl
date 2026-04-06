import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client: any = await serverSupabaseClient(event)

  const { data, error } = await client
    .from('blog_categories')
    .select('id, category_name, category_slug')
    .order('category_name', { ascending: true })

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    })
  }

  return {
    success: true,
    data: (data ?? []).map((category: any) => ({
      id: category.id,
      title: category.category_name,
      slug: category.category_slug,
    })),
  }
})
