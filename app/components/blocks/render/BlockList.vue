<script setup lang="ts">
import type { ListBlock } from '#shared/content-blocks'

defineProps<{ block: ListBlock }>()
</script>

<template>
  <component :is="block.style === 'numbered' ? 'ol' : 'ul'">
    <li
      v-for="(item, index) in block.items"
      :key="index"
    >
      <BlocksInlineText :text="item" />
    </li>
  </component>
</template>
