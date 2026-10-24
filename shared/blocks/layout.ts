import { inlinePlainText } from './inline'
import { defineBlock } from './types'
import { image, inlineText, link, list, oneOf, text } from './validate'

export const columns = defineBlock({
  type: 'columns',
  label: 'Columns',
  description: 'Two or three side-by-side columns of blocks.',
  icon: 'i-lucide-columns-3',
  category: 'layout',
  keywords: ['grid', 'side by side', 'layout', 'split'],
  layout: true,
  create: () => ({ type: 'columns', columns: [{ blocks: [{ type: 'paragraph', text: '' }] }, { blocks: [{ type: 'paragraph', text: '' }] }] }),
  sanitize: (value, context) => ({
    type: 'columns',
    columns: list(value.columns, 2, 3, 'columns', (column, index) => ({
      blocks: context.children(column && typeof column === 'object' ? (column as { blocks?: unknown }).blocks : undefined, `column ${index + 1}`, 12)
    }))
  }),
  text: () => [],
  children: block => block.columns.flatMap(column => column.blocks)
})

export const mediaText = defineBlock({
  type: 'mediaText',
  label: 'Media and text',
  description: 'An image beside a heading and text.',
  icon: 'i-lucide-panel-left',
  category: 'layout',
  keywords: ['image text', 'feature', 'split', 'side'],
  create: () => ({ type: 'mediaText', image: { src: '', alt: '', caption: '' }, heading: '', text: '', imagePosition: 'left' }),
  sanitize: (value, context) => ({
    type: 'mediaText',
    image: image(value.image, context),
    heading: text(value.heading, 160, 'media heading'),
    text: inlineText(value.text, 3000, 'media text', true),
    imagePosition: oneOf(value.imagePosition, ['left', 'right'] as const, 'image position')
  }),
  text: block => [block.heading, inlinePlainText(block.text)],
  images: block => [block.image]
})

export const button = defineBlock({
  type: 'button',
  label: 'Button',
  description: 'A prominent call to action.',
  icon: 'i-lucide-mouse-pointer-click',
  category: 'layout',
  keywords: ['cta', 'action'],
  create: () => ({ type: 'button', label: '', url: '', style: 'primary' }),
  sanitize: value => ({
    type: 'button',
    label: text(value.label, 160, 'button label', true),
    url: link(value.url, 'button'),
    style: oneOf(value.style, ['primary', 'secondary'] as const, 'button style')
  }),
  text: block => [block.label]
})

export const linkBlock = defineBlock({
  type: 'link',
  label: 'Link',
  description: 'A standalone text link.',
  icon: 'i-lucide-link',
  category: 'layout',
  keywords: ['url', 'anchor'],
  create: () => ({ type: 'link', label: '', url: '' }),
  sanitize: value => ({ type: 'link', label: text(value.label, 160, 'link label', true), url: link(value.url, 'link') }),
  text: block => [block.label]
})

export const layoutBlocks = [columns, mediaText, button, linkBlock]
