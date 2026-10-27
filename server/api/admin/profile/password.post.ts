import { toWebRequest } from 'h3'
import { getAuth } from '../../../utils/auth'
import { requireContentAdmin } from '../../../utils/content'
import { recordAdminAction } from '../../../utils/audit'

export default defineEventHandler(async (event) => {
  await requireContentAdmin(event)
  const body = await readBody<{ currentPassword?: unknown, newPassword?: unknown }>(event)
  if (typeof body?.currentPassword !== 'string' || typeof body?.newPassword !== 'string' || body.newPassword.length < 8 || body.newPassword.length > 128) {
    throw createError({ statusCode: 400, statusMessage: 'Provide your current password and a new password of at least 8 characters.' })
  }
  try {
    await getAuth(event).api.changePassword({ headers: toWebRequest(event).headers, body: { currentPassword: body.currentPassword, newPassword: body.newPassword, revokeOtherSessions: true } })
  } catch {
    throw createError({ statusCode: 400, statusMessage: 'The current password could not be verified.' })
  }
  await recordAdminAction(event, 'changed password', 'account')
  return { ok: true }
})
