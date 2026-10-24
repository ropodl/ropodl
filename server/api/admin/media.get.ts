import { getCloudflareEnv } from '../../utils/cloudflare'
import { requireContentAdmin } from '../../utils/content'

export default defineEventHandler(async (event) => {
  const user = await requireContentAdmin(event)
  const query = getQuery(event)
  const cursor = typeof query.cursor === 'string' ? query.cursor : undefined
  const page = await getCloudflareEnv(event).UPLOADS.list({
    prefix: `uploads/${user.id}/`,
    cursor,
    limit: 100
  })

  return {
    files: page.objects.map(object => ({
      key: object.key,
      url: `/api/uploads/${object.key}`,
      size: object.size,
      uploadedAt: object.uploaded.toISOString()
    })),
    cursor: page.truncated ? page.cursor : null
  }
})
