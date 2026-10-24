<script setup lang="ts">
import type { CodeBlock } from '#shared/content-blocks'

const props = defineProps<{ block: CodeBlock }>()
const copied = ref(false)

async function copy() {
  await navigator.clipboard.writeText(props.block.code)
  copied.value = true
  setTimeout(() => (copied.value = false), 1600)
}
</script>

<template>
  <figure class="my-6 overflow-hidden rounded-xl border border-default bg-elevated">
    <figcaption class="flex items-center justify-between gap-3 border-b border-default px-4 py-2 font-mono text-xs text-muted">
      <span class="truncate">{{ block.filename || block.language || 'Code' }}</span>
      <button
        type="button"
        class="inline-flex items-center gap-1 rounded-md px-2 py-1 hover:bg-default hover:text-highlighted"
        :aria-label="copied ? 'Copied' : 'Copy code'"
        @click="copy"
      >
        <UIcon
          :name="copied ? 'i-lucide-check' : 'i-lucide-copy'"
          class="size-3.5"
          aria-hidden="true"
        />
        {{ copied ? 'Copied' : 'Copy' }}
      </button>
    </figcaption>
    <pre class="m-0 overflow-x-auto p-4 text-sm leading-6"><code>{{ block.code }}</code></pre>
  </figure>
</template>
