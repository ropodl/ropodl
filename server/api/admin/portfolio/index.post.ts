import { cleanString, getAdminClient, requireAdminUser } from '../../../utils/admin'
import { serializePortfolio } from '../../../utils/serializers'

export default defineEventHandler(async (event) => {
  await requireAdminUser(event)
  const client = await getAdminClient(event)
  const body = await readBody<{
    title?: string
    slug?: string
    content?: string
    featuredImageId?: number | null
    workTypeId?: number | null
    status?: 'draft' | 'published' | 'archived'
  }>(event)

  const payload = {
    title: cleanString(body.title),
    slug: cleanString(body.slug),
    content: cleanString(body.content),
    featured_image_id: body.featuredImageId ?? null,
    work_type_id: body.workTypeId ?? null,
    status: body.status ?? 'draft',
  }

  if (!payload.title || !payload.slug || !payload.content || !payload.featured_image_id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required portfolio fields',
    })
  }

  const { data, error } = await client
    .from('portfolios')
    .insert(payload)
    .select('*')
    .single()

  if (error || !data) {
    throw createError({
      statusCode: error?.code === '23505' ? 409 : 400,
      statusMessage: error?.message ?? 'Failed to create portfolio',
    })
  }

  return serializePortfolio(data)
})
