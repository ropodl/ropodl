import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event)
  const client = await serverSupabaseClient(event)

  const { data, error } = await client.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    throw createError({
      statusCode: 401,
      statusMessage: error.message,
    })
  }

  return {
    message: 'Logged in Successfully',
    token: data.session?.access_token,
    user: data.user,
  }
})
