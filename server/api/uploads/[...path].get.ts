import { getRouterParam } from 'h3'
import { getCloudflareEnv } from '../../utils/cloudflare'

export default defineEventHandler(async (event) => {
  const key = getRouterParam(event, 'path')
  if (!key || !key.startsWith('uploads/')) {
    throw createError({ statusCode: 404, statusMessage: 'Image not found.' })
  }

  const object = await getCloudflareEnv(event).UPLOADS.get(key)
  if (!object) {
    throw createError({ statusCode: 404, statusMessage: 'Image not found.' })
  }

  const headers = new Headers()
  object.writeHttpMetadata(headers)
  headers.set('etag', object.httpEtag)
  headers.set('cache-control', 'public, max-age=31536000, immutable')

  return new Response(object.body, { headers })
})
