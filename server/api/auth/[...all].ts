import { getMethod, toWebRequest } from 'h3'
import { enforceRateLimit } from '../../utils/cloudflare'
import { getAuth } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  if (getMethod(event) === 'POST' && getRequestURL(event).pathname.endsWith('/sign-in/email')) {
    const ip = getHeader(event, 'cf-connecting-ip') || getRequestIP(event) || 'unknown'
    await enforceRateLimit(event, 'LOGIN_LIMITER', `login:${ip}`)
  }

  return getAuth(event).handler(toWebRequest(event))
})
