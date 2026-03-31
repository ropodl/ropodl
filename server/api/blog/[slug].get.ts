import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  const client = await serverSupabaseClient(event)

  const { data: post, error } = await client
    .from('blogs')
    .select(`
      id,
      blog_title,
      blog_slug,
      blog_excerpt,
      blog_content,
      created_at,
      featured_image:media!featured_image(id, filename, file_url, alt_text),
      category:blog_categories!category_id(id, category_name, category_slug),
      tags:blog_to_tags(tag:blog_tags(id, tag_name, tag_slug))
    `)
    .eq('blog_slug', slug)
    .eq('blog_status', 'published')
    .single()

  if (error || !post) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Post not found',
    })
  }

  // Get previous and next posts
  const { data: previous } = await client
    .from('blogs')
    .select('blog_title, blog_slug, featured_image:media!featured_image(id, filename, file_url, alt_text)')
    .eq('blog_status', 'published')
    .lt('created_at', post.created_at)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  const { data: next } = await client
    .from('blogs')
    .select('blog_title, blog_slug, featured_image:media!featured_image(id, filename, file_url, alt_text)')
    .eq('blog_status', 'published')
    .gt('created_at', post.created_at)
    .order('created_at', { ascending: true })
    .limit(1)
    .single()

  return {
    success: true,
    data: post,
    previous: previous || null,
    next: next || null,
  }
})
