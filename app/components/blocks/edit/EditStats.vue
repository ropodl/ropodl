<script setup lang="ts">
import type { StatsBlock } from '#shared/content-blocks'

const block = defineModel<StatsBlock>('block', { required: true })
</script>

<template>
  <div class="space-y-4">
    <UInput
      v-model="block.title"
      maxlength="160"
      placeholder="Heading (optional)"
      aria-label="Stats heading"
      class="w-full"
    />
    <BlocksBlockItems
      v-model="block.items"
      :create="() => ({ label: '', value: '', detail: '' })"
      :max="4"
      add-label="Add stat"
      item-label="stat"
    >
      <template #default="{ item, index }">
        <div class="grid gap-2 sm:grid-cols-3">
          <UInput
            v-model="item.value"
            maxlength="80"
            placeholder="Value, e.g. 40%"
            :aria-label="`Stat ${index + 1} value`"
            :ui="{ base: 'font-semibold' }"
          />
          <UInput
            v-model="item.label"
            maxlength="80"
            placeholder="Label, e.g. Faster load"
            :aria-label="`Stat ${index + 1} label`"
          />
          <UInput
            v-model="item.detail"
            maxlength="240"
            placeholder="Detail (optional)"
            :aria-label="`Stat ${index + 1} detail`"
          />
        </div>
      </template>
    </BlocksBlockItems>
  </div>
</template>
