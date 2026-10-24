import { inlinePlainText } from './inline'
import { defineBlock } from './types'
import { inlineText, list, oneOf, text } from './validate'

export const paragraph = defineBlock({
  type: 'paragraph',
  label: 'Paragraph',
  description: 'Body text with bold, italic, code and links.',
  icon: 'i-lucide-pilcrow',
  category: 'text',
  keywords: ['text', 'body'],
  create: () => ({ type: 'paragraph', text: '' }),
  sanitize: value => ({ type: 'paragraph', text: inlineText(value.text, 10000, 'paragraph') }),
  text: block => [inlinePlainText(block.text)]
})

export const heading = defineBlock({
  type: 'heading',
  label: 'Heading',
  description: 'Start a new section; shows in the table of contents.',
  icon: 'i-lucide-heading',
  category: 'text',
  keywords: ['title', 'section', 'h2', 'h3'],
  create: () => ({ type: 'heading', level: 2, text: '' }),
  sanitize: value => ({ type: 'heading', level: oneOf(value.level, [2, 3] as const, 'heading level'), text: text(value.text, 160, 'heading', true) }),
  text: block => [block.text]
})

export const listBlock = defineBlock({
  type: 'list',
  label: 'List',
  description: 'Bulleted or numbered points.',
  icon: 'i-lucide-list',
  category: 'text',
  keywords: ['bullets', 'numbered', 'ordered'],
  create: () => ({ type: 'list', style: 'bulleted', items: [''] }),
  sanitize: value => ({
    type: 'list',
    style: oneOf(value.style, ['bulleted', 'numbered'] as const, 'list style'),
    items: list(value.items, 1, 50, 'list', item => inlineText(item, 1000, 'list item')).filter(Boolean)
  }),
  text: block => block.items.map(inlinePlainText)
})

export const quote = defineBlock({
  type: 'quote',
  label: 'Quote',
  description: 'A quotation with an optional attribution.',
  icon: 'i-lucide-quote',
  category: 'text',
  keywords: ['blockquote', 'citation'],
  create: () => ({ type: 'quote', text: '', attribution: '' }),
  sanitize: value => ({ type: 'quote', text: inlineText(value.text, 6000, 'quote', true), attribution: text(value.attribution, 240, 'quote attribution') }),
  text: block => [inlinePlainText(block.text), block.attribution]
})

export const callout = defineBlock({
  type: 'callout',
  label: 'Callout',
  description: 'A highlighted note, tip, success or warning.',
  icon: 'i-lucide-lightbulb',
  category: 'text',
  keywords: ['note', 'alert', 'tip', 'warning', 'admonition'],
  create: () => ({ type: 'callout', tone: 'info', title: '', text: '' }),
  sanitize: value => ({
    type: 'callout',
    tone: oneOf(value.tone, ['info', 'success', 'warning', 'danger'] as const, 'callout style'),
    title: text(value.title, 160, 'callout title'),
    text: inlineText(value.text, 3000, 'callout text', true)
  }),
  text: block => [block.title, inlinePlainText(block.text)]
})

export const code = defineBlock({
  type: 'code',
  label: 'Code',
  description: 'A code sample, shown exactly as written.',
  icon: 'i-lucide-code-xml',
  category: 'text',
  keywords: ['snippet', 'pre', 'terminal'],
  create: () => ({ type: 'code', language: '', filename: '', code: '' }),
  sanitize: value => ({
    type: 'code',
    language: text(value.language, 40, 'code language'),
    filename: text(value.filename, 120, 'code filename'),
    code: text(value.code, 10000, 'code', true)
  }),
  text: block => [block.code]
})

export const divider = defineBlock({
  type: 'divider',
  label: 'Divider',
  description: 'A line between two sections.',
  icon: 'i-lucide-separator-horizontal',
  category: 'text',
  keywords: ['hr', 'separator', 'rule'],
  create: () => ({ type: 'divider' }),
  sanitize: () => ({ type: 'divider' }),
  text: () => []
})

export const textBlocks = [paragraph, heading, listBlock, quote, callout, code, divider]
