import type { H3Event } from 'h3'
import { getCloudflareEnv } from './cloudflare'

const maxUploadBytes = 4 * 1024 * 1024
// The largest the site shows an image is the 1200px project hero and the full-screen lightbox,
// so anything bigger is downscaled to fit 1920px on its longest side (smaller images are left as-is).
const maxDimension = 1920

// Cloudflare Images does the encoding, so the Worker doesn't ship (or spend CPU on) a WASM codec.
async function encodeWebp(event: H3Event, image: Uint8Array, quality: number) {
  const input = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(image)
      controller.close()
    }
  })
  const result = await getCloudflareEnv(event).IMAGES.input(input)
    .transform({ width: maxDimension, height: maxDimension, fit: 'scale-down' })
    .output({ format: 'image/webp', quality, anim: true })
  return new Uint8Array(await new Response(result.image()).arrayBuffer())
}

export async function convertToWebp(event: H3Event, image: Uint8Array) {
  let data = await encodeWebp(event, image, 80)
  if (data.byteLength > maxUploadBytes) data = await encodeWebp(event, image, 65)

  if (!isWebp(data)) {
    throw new Error('The image converter did not produce a valid WebP image.')
  }
  if (data.byteLength > maxUploadBytes) {
    throw createError({ statusCode: 413, statusMessage: 'The converted WebP image is over the 4 MB limit.' })
  }

  return data
}

function isWebp(data: Uint8Array) {
  return data.byteLength >= 12
    && data[0] === 0x52 && data[1] === 0x49 && data[2] === 0x46 && data[3] === 0x46
    && data[8] === 0x57 && data[9] === 0x45 && data[10] === 0x42 && data[11] === 0x50
}
