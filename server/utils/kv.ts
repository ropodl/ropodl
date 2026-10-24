import type { H3Event } from 'h3'
import { getCloudflareEnv } from './cloudflare'

export function getKv(event: H3Event) {
  return getCloudflareEnv(event).APP_KV
}
