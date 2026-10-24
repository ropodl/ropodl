import { inlinePlainText } from './inline'
import { defineBlock } from './types'
import { fail, inlineText, list, record, text } from './validate'

export const table = defineBlock({
  type: 'table',
  label: 'Table',
  description: 'Rows and columns of data, with an optional header row.',
  icon: 'i-lucide-table',
  category: 'data',
  keywords: ['grid', 'spreadsheet', 'comparison'],
  create: () => ({ type: 'table', caption: '', hasHeader: true, rows: [['', ''], ['', '']] }),
  sanitize: (value) => {
    const rows = list(value.rows, 1, 30, 'table', row => list(row, 1, 8, 'table row', cell => inlineText(cell, 500, 'table cell')))
    if (rows.some(row => row.length !== rows[0]!.length)) fail('Every table row needs the same number of cells.')
    return { type: 'table', caption: text(value.caption, 240, 'table caption'), hasHeader: value.hasHeader === true, rows }
  },
  text: block => [block.caption, ...block.rows.flat().map(inlinePlainText)]
})

export const checklist = defineBlock({
  type: 'checklist',
  label: 'Checklist',
  description: 'A list of ticked and unticked items, like features or requirements.',
  icon: 'i-lucide-list-checks',
  category: 'data',
  keywords: ['todo', 'tasks', 'features', 'checkbox'],
  create: () => ({ type: 'checklist', title: '', items: [{ text: '', checked: true }] }),
  sanitize: value => ({
    type: 'checklist',
    title: text(value.title, 160, 'checklist title'),
    items: list(value.items, 1, 40, 'checklist', (item) => {
      const raw = record(item, 'checklist item')
      return { text: inlineText(raw.text, 500, 'checklist item', true), checked: raw.checked === true }
    })
  }),
  text: block => [block.title, ...block.items.map(item => inlinePlainText(item.text))]
})

export const stats = defineBlock({
  type: 'stats',
  label: 'Stats',
  description: 'Up to four headline numbers or outcomes.',
  icon: 'i-lucide-chart-no-axes-column-increasing',
  category: 'data',
  keywords: ['numbers', 'metrics', 'results', 'kpi'],
  create: () => ({ type: 'stats', title: '', items: [{ label: '', value: '', detail: '' }] }),
  sanitize: value => ({
    type: 'stats',
    title: text(value.title, 160, 'stats title'),
    items: list(value.items, 1, 4, 'stats', (item) => {
      const raw = record(item, 'stat')
      return { label: text(raw.label, 80, 'stat label', true), value: text(raw.value, 80, 'stat value', true), detail: text(raw.detail, 240, 'stat detail') }
    })
  }),
  text: block => [block.title, ...block.items.flatMap(item => [item.label, item.value, item.detail])]
})

export const timeline = defineBlock({
  type: 'timeline',
  label: 'Timeline',
  description: 'Milestones in order, with dates.',
  icon: 'i-lucide-calendar-range',
  category: 'data',
  keywords: ['history', 'milestones', 'roadmap', 'process'],
  create: () => ({ type: 'timeline', title: '', events: [{ date: '', title: '', description: '' }] }),
  sanitize: value => ({
    type: 'timeline',
    title: text(value.title, 160, 'timeline title'),
    events: list(value.events, 1, 30, 'timeline', (event) => {
      const raw = record(event, 'milestone')
      return { date: text(raw.date, 80, 'milestone date'), title: text(raw.title, 160, 'milestone title', true), description: text(raw.description, 2000, 'milestone description') }
    })
  }),
  text: block => [block.title, ...block.events.flatMap(event => [event.date, event.title, event.description])]
})

export const faq = defineBlock({
  type: 'faq',
  label: 'FAQ',
  description: 'Questions with expandable answers.',
  icon: 'i-lucide-circle-help',
  category: 'data',
  keywords: ['questions', 'accordion', 'answers'],
  create: () => ({ type: 'faq', title: '', items: [{ question: '', answer: '' }] }),
  sanitize: value => ({
    type: 'faq',
    title: text(value.title, 160, 'FAQ title'),
    items: list(value.items, 1, 20, 'FAQ', (item) => {
      const raw = record(item, 'FAQ item')
      return { question: text(raw.question, 240, 'FAQ question', true), answer: inlineText(raw.answer, 3000, 'FAQ answer', true) }
    })
  }),
  text: block => [block.title, ...block.items.flatMap(item => [item.question, inlinePlainText(item.answer)])]
})

export const dataBlocks = [table, checklist, stats, timeline, faq]
