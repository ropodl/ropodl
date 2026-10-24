import { toWebRequest, readMultipartFormData } from 'h3'
import { getAuth } from '../utils/auth'
import { enforceRateLimit, getCloudflareEnv } from '../utils/cloudflare'
import { convertToWebp } from '../utils/image-converter'

const maxUploadBytes = 4 * 1024 * 1024
const allowedImageTypes = new Set(['image/avif', 'image/gif', 'image/jpeg', 'image/png', 'image/webp'])

export default defineEventHandler(async (event) => {
  const request = toWebRequest(event)
  const session = await getAuth(event).api.getSession({ headers: request.headers })
  if (!session?.user) {
    throw createError({ statusCode: 401, statusMessage: 'Sign in to upload files.' })
  }
  await enforceRateLimit(event, 'UPLOADS_LIMITER', `uploads:${session.user.id}`)

  const parts = await readMultipartFormData(event)
  const file = parts?.find(part => part.name === 'file' && part.filename)
  if (!file || !file.filename) {
    throw createError({ statusCode: 400, statusMessage: 'Send an image in a multipart field named "file".' })
  }
  if (file.data.byteLength > maxUploadBytes) {
    throw createError({ statusCode: 413, statusMessage: 'Image uploads are limited to 4 MB.' })
  }
  if (!file.type || !allowedImageTypes.has(file.type)) {
    throw createError({ statusCode: 415, statusMessage: 'Use a PNG, JPEG, WebP, AVIF, or GIF image.' })
  }

  let webp: Uint8Array
  try {
    webp = await convertToWebp(event, file.data)
  } catch (error) {
    if (error && typeof error === 'object' && 'statusCode' in error) throw error
    throw createError({ statusCode: 415, statusMessage: 'Could not convert this image. Use a valid PNG, JPEG, WebP, AVIF, or GIF image.' })
  }

  const key = `uploads/${session.user.id}/${crypto.randomUUID()}.webp`
  await getCloudflareEnv(event).UPLOADS.put(key, webp, {
    httpMetadata: {
      contentType: 'image/webp',
      cacheControl: 'public, max-age=31536000, immutable'
    }
  })

  return { url: `/api/uploads/${key}`, pathname: key }
})
