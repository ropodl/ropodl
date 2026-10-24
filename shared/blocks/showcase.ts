import { defineBlock } from './types'
import { image, link, list, optionalImage, text } from './validate'

const emptyImage = () => ({ src: '', alt: '', caption: '' })

export const testimonial = defineBlock({
  type: 'testimonial',
  label: 'Testimonial',
  description: 'A client or colleague quote with their name and role.',
  icon: 'i-lucide-message-square-quote',
  category: 'showcase',
  keywords: ['review', 'recommendation', 'client', 'feedback'],
  create: () => ({ type: 'testimonial', quote: '', name: '', role: '', image: null }),
  sanitize: (value, context) => ({
    type: 'testimonial',
    quote: text(value.quote, 2000, 'testimonial', true),
    name: text(value.name, 120, 'name', true),
    role: text(value.role, 160, 'role'),
    image: optionalImage(value.image, context, 'photo')
  }),
  text: block => [block.quote, block.name, block.role],
  images: block => block.image ? [block.image] : []
})

export const techStack = defineBlock({
  type: 'techStack',
  label: 'Tech stack',
  description: 'Tools and technologies, shown as badges.',
  icon: 'i-lucide-layers',
  category: 'showcase',
  keywords: ['tools', 'technologies', 'badges', 'skills', 'tags'],
  create: () => ({ type: 'techStack', title: '', items: [] }),
  sanitize: value => ({
    type: 'techStack',
    title: text(value.title, 160, 'tech stack title'),
    items: list(value.items, 1, 40, 'tech stack', item => text(item, 60, 'technology', true))
  }),
  text: block => [block.title, block.items.join(', ')]
})

export const beforeAfter = defineBlock({
  type: 'beforeAfter',
  label: 'Before and after',
  description: 'Compare two images with a slider.',
  icon: 'i-lucide-git-compare-arrows',
  category: 'showcase',
  keywords: ['compare', 'comparison', 'redesign', 'slider'],
  create: () => ({ type: 'beforeAfter', before: emptyImage(), after: emptyImage(), caption: '' }),
  sanitize: (value, context) => ({
    type: 'beforeAfter',
    before: image(value.before, context, 'before image'),
    after: image(value.after, context, 'after image'),
    caption: text(value.caption, 500, 'comparison caption')
  }),
  text: block => [block.caption],
  images: block => [block.before, block.after]
})

export const file = defineBlock({
  type: 'file',
  label: 'File download',
  description: 'A download card for a PDF, archive or other file link.',
  icon: 'i-lucide-file-down',
  category: 'showcase',
  keywords: ['download', 'pdf', 'resume', 'attachment'],
  create: () => ({ type: 'file', label: '', url: '', description: '', meta: '' }),
  sanitize: value => ({
    type: 'file',
    label: text(value.label, 160, 'file name', true),
    url: link(value.url, 'file link'),
    description: text(value.description, 500, 'file description'),
    meta: text(value.meta, 60, 'file details')
  }),
  text: block => [block.label, block.description]
})

export const showcaseBlocks = [testimonial, techStack, beforeAfter, file]
