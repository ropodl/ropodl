<script setup lang="ts">
import type { TableBlock } from '#shared/content-blocks'

const block = defineModel<TableBlock>('block', { required: true })
const columnCount = computed(() => block.value.rows[0]?.length ?? 0)

function addRow() {
  if (block.value.rows.length < 30) block.value.rows.push(Array.from({ length: columnCount.value }, () => ''))
}

function addColumn() {
  if (columnCount.value < 8) block.value.rows.forEach(row => row.push(''))
}

function removeColumn(index: number) {
  if (columnCount.value > 1) block.value.rows.forEach(row => row.splice(index, 1))
}
</script>

<template>
  <div class="space-y-3">
    <div class="flex flex-wrap items-center gap-4">
      <USwitch
        v-model="block.hasHeader"
        label="First row is a header"
      />
      <UInput
        v-model="block.caption"
        maxlength="240"
        placeholder="Caption (optional)"
        aria-label="Table caption"
        class="min-w-48 flex-1"
      />
    </div>
    <div class="overflow-x-auto">
      <table class="w-full border-separate border-spacing-1">
        <thead>
          <tr>
            <th
              v-for="(_, columnIndex) in columnCount"
              :key="columnIndex"
              class="text-left"
            >
              <UButton
                size="xs"
                variant="ghost"
                color="neutral"
                icon="i-lucide-x"
                :disabled="columnCount <= 1"
                :aria-label="`Remove column ${columnIndex + 1}`"
                @click="removeColumn(columnIndex)"
              />
            </th>
            <th />
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, rowIndex) in block.rows"
            :key="rowIndex"
          >
            <td
              v-for="(_, cellIndex) in row"
              :key="cellIndex"
              class="min-w-32"
            >
              <UInput
                v-model="row[cellIndex]"
                size="sm"
                maxlength="500"
                :aria-label="`Row ${rowIndex + 1}, column ${cellIndex + 1}`"
                class="w-full"
                :ui="{ base: rowIndex === 0 && block.hasHeader ? 'font-semibold' : '' }"
              />
            </td>
            <td class="w-8">
              <UButton
                size="xs"
                variant="ghost"
                color="neutral"
                icon="i-lucide-x"
                :disabled="block.rows.length <= 1"
                :aria-label="`Remove row ${rowIndex + 1}`"
                @click="block.rows.splice(rowIndex, 1)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex gap-2">
      <UButton
        size="sm"
        variant="soft"
        color="neutral"
        icon="i-lucide-plus"
        :disabled="block.rows.length >= 30"
        @click="addRow"
      >
        Add row
      </UButton>
      <UButton
        size="sm"
        variant="soft"
        color="neutral"
        icon="i-lucide-plus"
        :disabled="columnCount >= 8"
        @click="addColumn"
      >
        Add column
      </UButton>
    </div>
  </div>
</template>
