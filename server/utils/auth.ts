import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { getDatabase } from '../db'
import * as schema from '../db/schema'
import type { H3Event } from 'h3'
import { getCloudflareEnv } from './cloudflare'
import { hashPassword, verifyPassword } from './password'

export function getAuth(event: H3Event) {
  const env = getCloudflareEnv(event)
  const secret = env.BETTER_AUTH_SECRET
  if (!secret || secret.length < 32) {
    throw createError({ statusCode: 503, statusMessage: 'Authentication is not configured. Set BETTER_AUTH_SECRET to a random value with at least 32 characters.' })
  }

  return betterAuth({
    appName: 'Saroj Poudel Projects',
    baseURL: env.BETTER_AUTH_URL || getRequestURL(event).origin,
    secret,
    database: drizzleAdapter(getDatabase(event), {
      provider: 'sqlite',
      schema
    }),
    emailAndPassword: {
      enabled: true,
      disableSignUp: true,
      password: {
        hash: hashPassword,
        verify: verifyPassword
      }
    },
    ...(env.GITHUB_CLIENT_ID && env.GITHUB_CLIENT_SECRET
      ? {
          socialProviders: {
            github: {
              clientId: env.GITHUB_CLIENT_ID,
              clientSecret: env.GITHUB_CLIENT_SECRET,
              disableSignUp: true
            }
          }
        }
      : {})
  })
}
