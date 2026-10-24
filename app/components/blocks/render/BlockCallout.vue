<script setup lang="ts">
import type { CalloutBlock } from '#shared/content-blocks'

defineProps<{ block: CalloutBlock }>()

const tones = {
  info: { icon: 'i-lucide-info', class: 'border-sky-400/25 bg-sky-400/5', iconClass: 'text-sky-300' },
  success: { icon: 'i-lucide-circle-check', class: 'border-emerald-400/25 bg-emerald-400/5', iconClass: 'text-emerald-300' },
  warning: { icon: 'i-lucide-triangle-alert', class: 'border-amber-400/25 bg-amber-400/5', iconClass: 'text-amber-300' },
  danger: { icon: 'i-lucide-octagon-alert', class: 'border-red-400/30 bg-red-400/5', iconClass: 'text-red-300' }
}
</script>

<template>
  <aside
    class="my-6 flex gap-3 rounded-xl border px-5 py-4"
    :class="tones[block.tone].class"
  >
    <UIcon
      :name="tones[block.tone].icon"
      class="mt-1.5 size-5 shrink-0"
      :class="tones[block.tone].iconClass"
      aria-hidden="true"
    />
    <div class="min-w-0">
      <p
        v-if="block.title"
        class="mb-1 font-semibold text-highlighted"
      >
        {{ block.title }}
      </p>
      <p class="mb-0 whitespace-pre-line">
        <BlocksInlineText :text="block.text" />
      </p>
    </div>
  </aside>
</template>
