import { defineBlock } from './types'
import { getVideoEmbedUrl, safeHttpsUrl } from './urls'
import { fail, image, list, oneOf, text } from './validate'

const emptyImage = () => ({ src: '', alt: '', caption: '' })

export const imageBlock = defineBlock({
  type: 'image',
  label: 'Image',
  description: 'One image with alt text and a caption.',
  icon: 'i-lucide-image',
  category: 'media',
  keywords: ['photo', 'picture', 'screenshot'],
  create: () => ({ type: 'image', image: emptyImage(), width: 'normal' }),
  sanitize: (value, context) => ({
    type: 'image',
    image: image(value.image, context),
    width: value.width === undefined ? 'normal' : oneOf(value.width, ['normal', 'wide'] as const, 'image width')
  }),
  text: block => [block.image.caption || ''],
  images: block => [block.image]
})

export const gallery = defineBlock({
  type: 'gallery',
  label: 'Gallery',
  description: 'A grid of up to 12 images that open in a lightbox.',
  icon: 'i-lucide-images',
  category: 'media',
  keywords: ['photos', 'grid', 'lightbox'],
  create: () => ({ type: 'gallery', images: [] }),
  sanitize: (value, context) => ({ type: 'gallery', images: list(value.images, 1, 12, 'gallery', item => image(item, context, 'gallery image')) }),
  text: block => block.images.map(item => item.caption || item.alt),
  images: block => block.images
})

export const embed = defineBlock({
  type: 'embed',
  label: 'Video',
  description: 'Embed a YouTube or Vimeo video.',
  icon: 'i-lucide-square-play',
  category: 'media',
  keywords: ['youtube', 'vimeo', 'embed', 'video'],
  create: () => ({ type: 'embed', url: '', caption: '' }),
  sanitize: (value) => {
    const url = text(value.url, 2048, 'video URL', true)
    if (!getVideoEmbedUrl(url)) fail('Use a YouTube or Vimeo video link.')
    return { type: 'embed', url, caption: text(value.caption, 500, 'video caption') }
  },
  text: block => [block.caption]
})

export const audio = defineBlock({
  type: 'audio',
  label: 'Audio',
  description: 'Play an audio file from an https:// link.',
  icon: 'i-lucide-audio-lines',
  category: 'media',
  keywords: ['podcast', 'sound', 'music', 'mp3'],
  create: () => ({ type: 'audio', url: '', title: '' }),
  sanitize: (value) => {
    const url = text(value.url, 2048, 'audio URL', true)
    if (!safeHttpsUrl(url)) fail('Use an https:// link for the audio file.')
    return { type: 'audio', url, title: text(value.title, 160, 'audio title') }
  },
  text: block => [block.title]
})

export const mediaBlocks = [imageBlock, gallery, embed, audio]
