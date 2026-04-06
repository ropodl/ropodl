import { serverSupabaseServiceRole, serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  const body = await readBody<{
    fullname?: string
    email?: string
    password?: string
  }>(event)

  const email = typeof body.email === 'string' ? body.email.trim() : ''
  const fullname = typeof body.fullname === 'string' ? body.fullname.trim() : ''
  const password = typeof body.password === 'string' ? body.password.trim() : ''

  if (!email && !fullname && !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No data to update',
    })
  }

  const admin = serverSupabaseServiceRole(event)
  const metadata = {
    ...user.user_metadata,
    ...(fullname ? { fullname } : {}),
  }

  const { data, error } = await admin.auth.admin.updateUserById(user.id, {
    email: email || undefined,
    password: password || undefined,
    user_metadata: metadata,
  })

  if (error) {
    throw createError({
      statusCode: 400,
      statusMessage: error.message,
    })
  }

  return {
    success: true,
    data: {
      id: data.user.id,
      email: data.user.email,
      fullname: data.user.user_metadata?.fullname ?? null,
      username: data.user.user_metadata?.username ?? null,
    },
  }
})
