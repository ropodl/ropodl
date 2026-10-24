import { dataBlocks } from './data'
import { layoutBlocks } from './layout'
import { mediaBlocks } from './media'
import { showcaseBlocks } from './showcase'
import { paragraph, textBlocks } from './text'
import type { BlockCategory, BlockDefinition, BlockOf, ContentBlock, ContentBlockDocument, ContentBlockType, ContentImage } from './types'
import { BlockValidationError, fail, isRecord, type BlockContext } from './validate'

export * from './types'
export { BlockValidationError } from './validate'

// Adding a block type: define it in one of the category files and add its editor and
// renderer in app/components/blocks/registry.ts. Order here is the order in the block picker.
export const blockDefinitions = [
  ...textBlocks,
  ...mediaBlocks,
  ...layoutBlocks,
  ...dataBlocks,
  ...showcaseBlocks
] as BlockDefinition[]

const definitionsByType = new Map(blockDefinitions.map(definition => [definition.type, definition]))

export const blockCategories: { value: BlockCategory, label: string }[] = [
  { value: 'text', label: 'Text' },
  { value: 'media', label: 'Media' },
  { value: 'layout', label: 'Layout and actions' },
  { value: 'data', label: 'Data' },
  { value: 'showcase', label: 'Showcase' }
]

export const maxTopLevelBlocks = 50

export function blockDefinition<T extends ContentBlockType>(type: T) {
  return definitionsByType.get(type) as BlockDefinition<T> | undefined
}

export function createBlock<T extends ContentBlockType>(type: T): BlockOf<T> {
  return (blockDefinition(type) ?? paragraph).create() as BlockOf<T>
}

function sanitizeBlocks(value: unknown, context: Omit<BlockContext, 'children'>, field: string, max: number): ContentBlock[] {
  if (!Array.isArray(value) || value.length > max) fail(`The ${field} can contain up to ${max} blocks.`)
  return value.map((raw) => {
    if (!isRecord(raw) || typeof raw.type !== 'string') fail('Invalid content block.')
    const definition = definitionsByType.get(raw.type as ContentBlockType)
    if (!definition) fail(`Unsupported content block: ${raw.type}.`)
    if (definition.layout && context.depth > 0) fail(`A ${definition.label.toLowerCase()} block can't be placed inside another layout block.`)
    return definition.sanitize(raw, {
      ...context,
      children: (children, childField, childMax) => sanitizeBlocks(children, { ...context, depth: context.depth + 1 }, childField, childMax)
    })
  })
}

// Validates an untrusted block document and returns it re-serialised, or throws BlockValidationError.
export function sanitizeContentBlockDocument(value: unknown, userId?: string): ContentBlockDocument {
  if (!isRecord(value) || value.version !== 1) fail('The content block document is invalid.')
  return { version: 1, blocks: sanitizeBlocks(value.blocks, { userId, depth: 0 }, 'content', maxTopLevelBlocks) }
}

export function isBlockValidationError(error: unknown): error is BlockValidationError {
  return error instanceof BlockValidationError
}

export function readContentBlockDocument(value: string): ContentBlockDocument | null {
  try {
    const document = JSON.parse(value) as Partial<ContentBlockDocument>
    if (document.version === 1 && Array.isArray(document.blocks)) return document as ContentBlockDocument
  } catch {
    return null
  }
  return null
}

function walkBlocks(blocks: ContentBlock[], visit: (block: ContentBlock, definition: BlockDefinition) => void) {
  for (const block of blocks) {
    const definition = definitionsByType.get(block.type)
    if (!definition) continue
    visit(block, definition)
    if (definition.children) walkBlocks(definition.children(block as never), visit)
  }
}

export function contentBlocksPlainText(blocks: ContentBlock[]) {
  const parts: string[] = []
  walkBlocks(blocks, (block, definition) => parts.push(...definition.text(block as never)))
  return parts.filter(Boolean).join('\n')
}

export function contentBlockImages(blocks: ContentBlock[]) {
  const images: ContentImage[] = []
  walkBlocks(blocks, (block, definition) => images.push(...(definition.images?.(block as never) ?? [])))
  return images
}

export function contentBlockHeadingId(text: string, index: number) {
  const slug = text.normalize('NFKD').toLowerCase()
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  return `content-heading-${slug || 'section'}-${index + 1}`
}
