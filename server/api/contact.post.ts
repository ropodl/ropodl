import { enforceRateLimit, getCloudflareEnv } from '../utils/cloudflare'
import { recordSiteMetric } from '../utils/metrics'
import { getDatabase } from '../db'
import { contactMessages } from '../db/schema'

interface ContactMessage {
  name?: unknown
  email?: unknown
  subject?: unknown
  message?: unknown
  website?: unknown
  turnstileToken?: unknown
}

function cleanText(value: unknown, maxLength: number) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
}

export default defineEventHandler(async (event) => {
  const ip = getHeader(event, 'cf-connecting-ip') || getRequestIP(event) || 'unknown'
  await enforceRateLimit(event, 'CONTACT_LIMITER', `contact:${ip}`)

  const body = await readBody<ContactMessage>(event)
  const name = cleanText(body?.name, 120)
  const email = cleanText(body?.email, 254)
  const subject = cleanText(body?.subject, 200)
  const message = cleanText(body?.message, 5000)

  // Silently accept honeypot submissions without forwarding them.
  if (cleanText(body?.website, 200)) {
    return { ok: true }
  }

  const env = getCloudflareEnv(event)
  const turnstileToken = cleanText(body?.turnstileToken, 2048)
  if (!env.TURNSTILE_SECRET_KEY) {
    throw createError({ statusCode: 503, statusMessage: 'Contact verification is not configured yet.' })
  }
  if (!turnstileToken) {
    throw createError({ statusCode: 403, statusMessage: 'Please complete the verification challenge.' })
  }

  const verificationBody = new URLSearchParams({
    secret: env.TURNSTILE_SECRET_KEY,
    response: turnstileToken
  })
  if (ip !== 'unknown') verificationBody.set('remoteip', ip)

  let verification: { success?: boolean, hostname?: string, action?: string }
  try {
    const result = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: verificationBody
    })
    if (!result.ok) throw new Error(`Siteverify returned ${result.status}`)
    verification = await result.json()
  } catch {
    throw createError({ statusCode: 502, statusMessage: 'Could not verify the challenge. Please try again.' })
  }

  const requestHostname = getRequestURL(event).hostname
  const localTestToken = env.TURNSTILE_TEST_MODE === 'true'
    && verification.hostname === 'example.com'
  const actionMatches = verification.action === 'contact' || localTestToken
  const hostnameMatches = verification.hostname === requestHostname || localTestToken
  if (!verification.success || !hostnameMatches || !actionMatches) {
    throw createError({ statusCode: 403, statusMessage: 'Verification failed. Please try again.' })
  }

  if (!name || !email || !subject || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw createError({ statusCode: 400, statusMessage: 'Please provide a valid name, email, subject, and message.' })
  }

  try {
    await env.EMAIL.send({
      from: 'hello@ropodl.com',
      to: 'hello@ropodl.com',
      replyTo: email,
      subject: `Project contact: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`
    })
  } catch (error) {
    console.error('Cloudflare Email Service contact email failed:', error)
    throw createError({ statusCode: 502, statusMessage: 'Could not send your message. Please try again later.' })
  }

  const now = new Date()
  await getDatabase(event).insert(contactMessages).values({
    id: crypto.randomUUID(), name, email, subject, message, status: 'new', createdAt: now, updatedAt: now
  })

  try {
    await recordSiteMetric(event, { event: 'contact_conversion' })
  } catch (error) {
    console.error('Could not record contact conversion metric:', error)
  }

  return { ok: true }
})
