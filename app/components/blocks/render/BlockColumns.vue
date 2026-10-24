<script setup lang="ts">
import type { ColumnsBlock } from '#shared/content-blocks'

defineProps<{ block: ColumnsBlock, label?: string }>()
</script>

<template>
  <div
    class="my-6 grid gap-6"
    :class="block.columns.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'"
  >
    <div
      v-for="(column, index) in block.columns"
      :key="index"
      class="min-w-0 [&>*:first-child]:mt-0"
    >
      <BlocksRenderBlocks
        :blocks="column.blocks"
        :label="label"
      />
    </div>
  </div>
</template>
