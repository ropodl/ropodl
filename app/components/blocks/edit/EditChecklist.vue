<script setup lang="ts">
import type { ChecklistBlock } from '#shared/content-blocks'

const block = defineModel<ChecklistBlock>('block', { required: true })
</script>

<template>
  <div class="space-y-4">
    <UInput
      v-model="block.title"
      maxlength="160"
      placeholder="Title (optional)"
      aria-label="Checklist title"
      class="w-full"
    />
    <BlocksBlockItems
      v-model="block.items"
      :create="() => ({ text: '', checked: true })"
      :max="40"
      add-label="Add item"
      item-label="item"
    >
      <template #default="{ item, index }">
        <div class="flex items-center gap-3">
          <UCheckbox
            v-model="item.checked"
            :aria-label="`Item ${index + 1} is ticked`"
          />
          <UInput
            v-model="item.text"
            maxlength="500"
            placeholder="Item"
            :aria-label="`Item ${index + 1}`"
            class="flex-1"
          />
        </div>
      </template>
    </BlocksBlockItems>
  </div>
</template>
