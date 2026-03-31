import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import { randomUUID } from 'node:crypto'
import sharp from 'sharp'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  const formData = await readMultipartFormData(event)
  if (!formData || !formData.length) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No file uploaded',
    })
  }

  const file = formData.find((item) => item.name === 'file')
  if (!file || !file.data) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No file found in form data',
    })
  }

  const client = await serverSupabaseClient(event)

  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')

  const baseDir = `${year}/${month}/${day}`
  const fileExtension = file.filename?.includes('.')
    ? file.filename.substring(file.filename.lastIndexOf('.'))
    : ''
  const fileNameWithoutExt = randomUUID()
  const fileName = `${fileNameWithoutExt}${fileExtension}`
  const filePath = `${baseDir}/${fileName}`

  // 1. Upload Original File
  const { error: uploadError } = await client.storage
    .from('media')
    .upload(filePath, file.data, {
      contentType: file.type,
      cacheControl: '3600',
      upsert: false,
    })

  if (uploadError) {
    throw createError({
      statusCode: 500,
      statusMessage: uploadError.message,
    })
  }

  const {
    data: { publicUrl },
  } = client.storage.from('media').getPublicUrl(filePath)

  let metadata: any = {}
  const variants: any = {}

  // 2. Process Image Variants if it's an image
  if (file.type?.startsWith('image/')) {
    try {
      const image = sharp(file.data)
      const imageInfo = await image.metadata()
      
      metadata.dimensions = { width: imageInfo.width, height: imageInfo.height }

      // Define variants
      const variantSpecs = [
        { name: 'full', height: 1200, quality: 75, blur: 0 },
        { name: 'card', height: 220, quality: 65, blur: 0 },
        { name: 'blur', width: 20, quality: 25, blur: 5 },
      ]

      await Promise.all(
        variantSpecs.map(async (spec) => {
          let pipeline = image.clone().rotate()
          
          if (spec.height) {
            pipeline = pipeline.resize({ height: spec.height, fit: spec.name === 'card' ? 'contain' : 'inside',  withoutEnlargement: true })
          } else if (spec.width) {
            pipeline = pipeline.resize({ width: spec.width })
          }

          if (spec.blur) {
            pipeline = pipeline.blur(spec.blur)
          }

          const variantBuffer = await pipeline.webp({ quality: spec.quality }).toBuffer()
          const variantFileName = `${fileNameWithoutExt}_${spec.name}.webp`
          const variantPath = `${baseDir}/${variantFileName}`

          await client.storage.from('media').upload(variantPath, variantBuffer, {
            contentType: 'image/webp',
            cacheControl: '3600',
            upsert: false,
          })

          const { data: { publicUrl: variantUrl } } = client.storage.from('media').getPublicUrl(variantPath)
          variants[spec.name] = variantFileName // Store filename or URL based on your preference. Original stored filename.
        })
      )

      metadata.variants = variants
    } catch (err) {
      console.error('Image processing failed:', err)
    }
  }

  // 3. Insert into media table
  const { data: mediaData, error: mediaError } = await client
    .from('media')
    .insert({
      filename: fileName,
      mime_type: file.type,
      file_url: publicUrl,
      size_bytes: file.data.byteLength,
      uploaded_by: user.id,
      alt_text: file.filename,
      metadata,
    })
    .select()
    .single()

  if (mediaError) {
    // Cleanup storage if database insert fails (simplified cleanup)
    await client.storage.from('media').remove([filePath])
    throw createError({
      statusCode: 500,
      statusMessage: mediaError.message,
    })
  }

  return mediaData
})
