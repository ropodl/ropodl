import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const client = await serverSupabaseClient(event)

  const { data, error } = await client
    .from('contact_requests')
    .insert({
      name: body.name?.trim(),
      email: body.email?.trim(),
      subject: body.subject?.trim(),
      message: body.message?.trim(),
    })
    .select()
    .single()

  if (error) {
    throw createError({
      statusCode: 400,
      statusMessage: error.message,
    })
  }

  return { success: true, data }
})
