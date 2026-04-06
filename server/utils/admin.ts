import {
  serverSupabaseClient,
  serverSupabaseServiceRole,
  serverSupabaseUser,
} from '#supabase/server'

export async function requireAdminUser(event: Parameters<typeof serverSupabaseUser>[0]) {
  const user = await serverSupabaseUser(event)

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  return user
}

export async function getAdminClient(event: Parameters<typeof serverSupabaseServiceRole>[0]) {
  try {
    return serverSupabaseServiceRole(event) as any
  } catch {
    return await serverSupabaseClient(event) as any
  }
}

export function parseNumericId(value: string | undefined, label = 'resource') {
  const id = Number(value)

  if (!Number.isInteger(id) || id <= 0) {
    throw createError({
      statusCode: 400,
      statusMessage: `Invalid ${label} id`,
    })
  }

  return id
}

export function cleanString(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

export function cleanOptionalString(value: unknown) {
  const cleaned = cleanString(value)
  return cleaned || null
}
