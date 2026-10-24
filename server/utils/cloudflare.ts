/// <reference types="@cloudflare/workers-types" />

import type { H3Event } from 'h3'

export interface CloudflareEnv {
  DB: D1Database
  APP_KV: KVNamespace
  UPLOADS: R2Bucket
  AI: Ai
  IMAGES: ImagesBinding
  ASSETS?: { fetch(request: Request): Promise<Response> }
  BETTER_AUTH_SECRET: string
  BETTER_AUTH_URL?: string
  GITHUB_CLIENT_ID?: string
  GITHUB_CLIENT_SECRET?: string
  EMAIL: SendEmail
  TURNSTILE_SECRET_KEY?: string
  TURNSTILE_TEST_MODE?: string
  AUDIO_LIMITER: RateLimit
  CONTACT_LIMITER: RateLimit
  FEEDBACK_LIMITER: RateLimit
  LOGIN_LIMITER: RateLimit
  UPLOADS_LIMITER: RateLimit
}

export function getCloudflareEnv(event: H3Event): CloudflareEnv {
  const request = event.req as typeof event.req & {
    runtime?: { cloudflare?: { env?: CloudflareEnv } }
  }
  const context = event.context as typeof event.context & {
    cloudflare?: { env?: CloudflareEnv }
  }
  const env = request.runtime?.cloudflare?.env ?? context.cloudflare?.env

  if (!env) {
    throw createError({ statusCode: 503, statusMessage: 'Cloudflare bindings are unavailable. Run the app with the Cloudflare development runtime.' })
  }

  return env
}

export async function enforceRateLimit(event: H3Event, limiterName: 'AUDIO_LIMITER' | 'CONTACT_LIMITER' | 'FEEDBACK_LIMITER' | 'LOGIN_LIMITER' | 'UPLOADS_LIMITER', key: string) {
  const { success } = await getCloudflareEnv(event)[limiterName].limit({ key })
  if (!success) {
    throw createError({ statusCode: 429, statusMessage: 'Too many requests. Please wait a minute and try again.' })
  }
}
