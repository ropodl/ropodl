<script lang="ts">
import { defineComponent, h, type VNodeChild } from 'vue'
import { isSafeContentLink, parseInline, type InlineNode } from '#shared/content-blocks'

// Renders inline formatting as elements, never HTML. Unsafe links fall back to their text.
function render(nodes: InlineNode[]): VNodeChild[] {
  return nodes.map((node) => {
    switch (node.type) {
      case 'text': return node.text
      case 'strong': return h('strong', { class: 'font-semibold text-highlighted' }, render(node.children))
      case 'em': return h('em', render(node.children))
      case 'code': return h('code', { class: 'rounded-md bg-elevated px-1.5 py-0.5 font-mono text-[0.88em] text-highlighted' }, node.text)
      case 'link': return isSafeContentLink(node.href)
        ? h('a', { href: node.href, target: node.href.startsWith('https:') ? '_blank' : undefined, rel: 'noopener noreferrer' }, render(node.children))
        : render(node.children)
    }
  })
}

export default defineComponent({
  name: 'InlineText',
  props: { text: { type: String, required: true } },
  setup: props => () => render(parseInline(props.text))
})
</script>
