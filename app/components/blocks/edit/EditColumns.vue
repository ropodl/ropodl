<script setup lang="ts">
import { createBlock, type ColumnsBlock } from '#shared/content-blocks'

const block = defineModel<ColumnsBlock>('block', { required: true })
const count = computed({
  get: () => block.value.columns.length,
  set: (value: number) => {
    if (value > block.value.columns.length) block.value.columns.push({ blocks: [createBlock('paragraph')] })
    else block.value.columns.splice(value)
  }
})
const lastColumnHasContent = computed(() => block.value.columns.length === 3 && block.value.columns[2]!.blocks.some(child => JSON.stringify(child) !== JSON.stringify(createBlock(child.type))))
</script>

<template>
  <div class="space-y-4">
    <UFormField
      label="Columns"
      :help="lastColumnHasContent ? 'Switching to two columns removes the third column and its blocks.' : undefined"
    >
      <USelect
        v-model="count"
        :items="[{ label: 'Two columns', value: 2 }, { label: 'Three columns', value: 3 }]"
        class="w-44"
      />
    </UFormField>
    <div
      class="grid gap-4"
      :class="block.columns.length === 3 ? 'xl:grid-cols-3' : 'lg:grid-cols-2'"
    >
      <div
        v-for="(column, index) in block.columns"
        :key="index"
        class="min-w-0 border-l-2 border-accented pl-3"
      >
        <p class="mb-2 text-[11px] font-medium uppercase tracking-wider text-dimmed">
          Column {{ index + 1 }}
        </p>
        <BlocksBlockList
          v-model="column.blocks"
          nested
          :max="12"
        />
      </div>
    </div>
  </div>
</template>
