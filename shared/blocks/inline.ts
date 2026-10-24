import { isSafeContentLink } from './urls'

// Inline formatting inside text blocks uses a tiny Markdown subset:
// **bold**, *italic*, `code`, [label](https://… or mailto:…), and \ to escape a marker.
// It is parsed into nodes and rendered as Vue elements, never as HTML.
export type InlineNode
  = | { type: 'text', text: string }
    | { type: 'strong' | 'em', children: InlineNode[] }
    | { type: 'code', text: string }
    | { type: 'link', href: string, children: InlineNode[] }

const escapable = '\\*`[]()'
const linkPattern = /^\[([^\]\n]+)\]\(([^)\s]+)\)/

// Index of the next unescaped `marker` at or after `from`, or -1. A single `*` never matches inside `**`.
function findClosing(source: string, marker: string, from: number) {
  for (let i = from; i < source.length; i++) {
    if (source[i] === '\\') {
      i++
      continue
    }
    if (!source.startsWith(marker, i)) continue
    if (marker === '*' && (source[i + 1] === '*' || source[i - 1] === '*')) continue
    return i
  }
  return -1
}

export function parseInline(source: string, allowLinks = true): InlineNode[] {
  const nodes: InlineNode[] = []
  let buffer = ''
  const flush = () => {
    if (buffer) nodes.push({ type: 'text', text: buffer })
    buffer = ''
  }

  for (let i = 0; i < source.length;) {
    const char = source[i]!
    if (char === '\\' && escapable.includes(source[i + 1] ?? '')) {
      buffer += source[i + 1]
      i += 2
      continue
    }
    if (char === '`') {
      const end = source.indexOf('`', i + 1)
      if (end > i + 1) {
        flush()
        nodes.push({ type: 'code', text: source.slice(i + 1, end) })
        i = end + 1
        continue
      }
    }
    if (source.startsWith('**', i)) {
      const end = findClosing(source, '**', i + 2)
      if (end > i + 2) {
        flush()
        nodes.push({ type: 'strong', children: parseInline(source.slice(i + 2, end), allowLinks) })
        i = end + 2
        continue
      }
    }
    if (char === '*') {
      const end = findClosing(source, '*', i + 1)
      if (end > i + 1) {
        flush()
        nodes.push({ type: 'em', children: parseInline(source.slice(i + 1, end), allowLinks) })
        i = end + 1
        continue
      }
    }
    if (char === '[' && allowLinks) {
      const match = linkPattern.exec(source.slice(i))
      if (match) {
        flush()
        nodes.push({ type: 'link', href: match[2]!, children: parseInline(match[1]!, false) })
        i += match[0].length
        continue
      }
    }
    buffer += char
    i++
  }
  flush()
  return nodes
}

function nodesText(nodes: InlineNode[]): string {
  return nodes.map(node => 'children' in node ? nodesText(node.children) : node.text).join('')
}

// Plain text with the formatting markers removed (for search, reading time and narration).
export function inlinePlainText(source: string) {
  return nodesText(parseInline(source))
}

export function inlineLinks(source: string) {
  const links: string[] = []
  const walk = (nodes: InlineNode[]) => nodes.forEach((node) => {
    if (node.type === 'link') links.push(node.href)
    if ('children' in node) walk(node.children)
  })
  walk(parseInline(source))
  return links
}

export function hasOnlySafeInlineLinks(source: string) {
  return inlineLinks(source).every(isSafeContentLink)
}
