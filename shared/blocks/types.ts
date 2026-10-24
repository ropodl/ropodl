import type { BlockContext } from './validate'

export interface ContentImage {
  src: string
  alt: string
  caption?: string
}

// Fields marked "inline" may contain inline formatting (see inline.ts).

// Text
export interface ParagraphBlock { type: 'paragraph', text: string /* inline */ }
export interface HeadingBlock { type: 'heading', level: 2 | 3, text: string }
export interface ListBlock { type: 'list', style: 'bulleted' | 'numbered', items: string[] /* inline */ }
export interface QuoteBlock { type: 'quote', text: string /* inline */, attribution: string }
export interface CalloutBlock { type: 'callout', tone: 'info' | 'success' | 'warning' | 'danger', title: string, text: string /* inline */ }
export interface CodeBlock { type: 'code', language: string, filename?: string, code: string }
export interface DividerBlock { type: 'divider' }

// Media
export interface ImageBlock { type: 'image', image: ContentImage, width?: 'normal' | 'wide' }
export interface GalleryBlock { type: 'gallery', images: ContentImage[] }
export interface EmbedBlock { type: 'embed', url: string, caption: string }
export interface AudioBlock { type: 'audio', url: string, title: string }

// Layout
export interface ColumnsBlock { type: 'columns', columns: { blocks: ContentBlock[] }[] }
export interface MediaTextBlock { type: 'mediaText', image: ContentImage, heading: string, text: string /* inline */, imagePosition: 'left' | 'right' }
export interface ButtonBlock { type: 'button', label: string, url: string, style: 'primary' | 'secondary' }
export interface LinkBlock { type: 'link', label: string, url: string }

// Data
export interface TableBlock { type: 'table', caption: string, hasHeader: boolean, rows: string[][] /* inline cells */ }
export interface ChecklistBlock { type: 'checklist', title: string, items: { text: string /* inline */, checked: boolean }[] }
export interface StatsBlock { type: 'stats', title: string, items: { label: string, value: string, detail: string }[] }
export interface TimelineBlock { type: 'timeline', title: string, events: { date: string, title: string, description: string }[] }
export interface FaqBlock { type: 'faq', title: string, items: { question: string, answer: string /* inline */ }[] }

// Showcase
export interface TestimonialBlock { type: 'testimonial', quote: string, name: string, role: string, image: ContentImage | null }
export interface TechStackBlock { type: 'techStack', title: string, items: string[] }
export interface BeforeAfterBlock { type: 'beforeAfter', before: ContentImage, after: ContentImage, caption: string }
export interface FileBlock { type: 'file', label: string, url: string, description: string, meta: string }

export type ContentBlock
  = | ParagraphBlock | HeadingBlock | ListBlock | QuoteBlock | CalloutBlock | CodeBlock | DividerBlock
    | ImageBlock | GalleryBlock | EmbedBlock | AudioBlock
    | ColumnsBlock | MediaTextBlock | ButtonBlock | LinkBlock
    | TableBlock | ChecklistBlock | StatsBlock | TimelineBlock | FaqBlock
    | TestimonialBlock | TechStackBlock | BeforeAfterBlock | FileBlock

export type ContentBlockType = ContentBlock['type']
export type BlockOf<T extends ContentBlockType> = Extract<ContentBlock, { type: T }>

export interface ContentBlockDocument {
  version: 1
  blocks: ContentBlock[]
}

export type BlockCategory = 'text' | 'media' | 'layout' | 'data' | 'showcase'

// Everything the app needs to know about one block type, except its Vue components
// (app/components/blocks/registry.ts maps each type to its editor and renderer).
export interface BlockDefinition<T extends ContentBlockType = ContentBlockType> {
  type: T
  label: string
  description: string
  icon: string
  category: BlockCategory
  keywords?: string[]
  // Layout blocks can't be placed inside other layout blocks.
  layout?: boolean
  create: () => BlockOf<T>
  // Validates untrusted input and returns a clean block; throws BlockValidationError.
  sanitize: (value: Record<string, unknown>, context: BlockContext) => BlockOf<T>
  // Readable text, for search, reading time and narration.
  text: (block: BlockOf<T>) => string[]
  images?: (block: BlockOf<T>) => ContentImage[]
  children?: (block: BlockOf<T>) => ContentBlock[]
}

export function defineBlock<T extends ContentBlockType>(definition: BlockDefinition<T>) {
  return definition
}
