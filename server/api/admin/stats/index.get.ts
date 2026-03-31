import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  const client = await serverSupabaseClient(event)

  const [
    { count: blogCount },
    { count: mediaCount },
    { count: userCount },
    { data: recentBlogs }
  ] = await Promise.all([
    client.from('blogs').select('*', { count: 'exact', head: true }),
    client.from('media').select('*', { count: 'exact', head: true }),
    client.from('users').select('*', { count: 'exact', head: true }), // Assuming users table exists
    client
      .from('blogs')
      .select('id, blog_title, blog_status, created_at')
      .order('created_at', { ascending: false })
      .limit(5)
  ])

  return {
    counts: {
      blogs: blogCount || 0,
      media: mediaCount || 0,
      users: userCount || 0,
    },
    recentBlogs: recentBlogs || []
  }
})
