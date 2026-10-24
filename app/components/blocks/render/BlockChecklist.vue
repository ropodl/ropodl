<script setup lang="ts">
import type { ChecklistBlock } from '#shared/content-blocks'

defineProps<{ block: ChecklistBlock }>()
</script>

<template>
  <section class="my-6">
    <h3
      v-if="block.title"
      class="!mt-0"
    >
      {{ block.title }}
    </h3>
    <ul class="!list-none space-y-2 !pl-0">
      <li
        v-for="(item, index) in block.items"
        :key="index"
        class="flex gap-3"
      >
        <UIcon
          :name="item.checked ? 'i-lucide-circle-check' : 'i-lucide-circle'"
          class="mt-1.5 size-5 shrink-0"
          :class="item.checked ? 'text-primary' : 'text-dimmed'"
        />
        <span class="sr-only">{{ item.checked ? 'Done:' : 'Not done:' }}</span>
        <span><BlocksInlineText :text="item.text" /></span>
      </li>
    </ul>
  </section>
</template>
