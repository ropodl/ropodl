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
  const search = query.search as string

  const client = await serverSupabaseClient(event)

  let supabaseQuery = client
    .from('media')
    .select('*')
    .order('created_at', { ascending: false })

  if (search) {
    supabaseQuery = supabaseQuery.or(`filename.ilike.%${search}%,alt_text.ilike.%${search}%,description.ilike.%${search}%`)
  }

  const { data, error } = await supabaseQuery

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    })
  }

  return data
})
