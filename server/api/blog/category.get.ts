import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client: any = await serverSupabaseClient(event)

  const { data, error } = await client
    .from('blogs')
    .select(`
      category:blog_categories!category_id(
        id,
        category_name,
        category_slug
      )
    `)
    .eq('blog_status', 'published')
    .not('category_id', 'is', null)

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    })
  }

  return {
    success: true,
    data: Array.from(
      new Map(
        (data ?? [])
          .map((item: any) => item.category)
          .filter(Boolean)
          .map((category: any) => [
            category.id,
            {
              id: category.id,
              title: category.category_name,
              slug: category.category_slug,
            },
          ]),
      ).values(),
    ).sort((a, b) => a.title.localeCompare(b.title)),
  }
})
