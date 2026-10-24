<script setup lang="ts">
import type { TechStackBlock } from '#shared/content-blocks'

defineProps<{ block: TechStackBlock }>()
</script>

<template>
  <section class="my-6">
    <h3
      v-if="block.title"
      class="!mt-0"
    >
      {{ block.title }}
    </h3>
    <ul
      class="!m-0 flex !list-none flex-wrap gap-2 !p-0"
      :aria-label="block.title || 'Technologies'"
    >
      <li
        v-for="(item, index) in block.items"
        :key="index"
        class="!m-0 rounded-full border border-default bg-elevated/60 px-3 py-1 font-mono text-xs text-highlighted"
      >
        {{ item }}
      </li>
    </ul>
  </section>
</template>
