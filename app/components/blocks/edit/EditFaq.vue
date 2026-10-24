<script setup lang="ts">
import type { FaqBlock } from '#shared/content-blocks'

const block = defineModel<FaqBlock>('block', { required: true })
</script>

<template>
  <div class="space-y-4">
    <UInput
      v-model="block.title"
      maxlength="160"
      placeholder="Heading (optional)"
      aria-label="FAQ heading"
      class="w-full"
    />
    <BlocksBlockItems
      v-model="block.items"
      :create="() => ({ question: '', answer: '' })"
      :max="20"
      add-label="Add question"
      item-label="question"
    >
      <template #default="{ item, index }">
        <UInput
          v-model="item.question"
          maxlength="240"
          placeholder="Question"
          :aria-label="`Question ${index + 1}`"
          class="w-full"
          :ui="{ base: 'font-medium' }"
        />
        <BlocksInlineTextarea
          v-model="item.answer"
          :rows="2"
          :maxlength="3000"
          placeholder="Answer"
          :aria-label="`Answer ${index + 1}`"
        />
      </template>
    </BlocksBlockItems>
  </div>
</template>
