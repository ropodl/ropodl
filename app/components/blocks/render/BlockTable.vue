<script setup lang="ts">
import type { TableBlock } from '#shared/content-blocks'

const props = defineProps<{ block: TableBlock }>()
const header = computed(() => props.block.hasHeader ? props.block.rows[0] : undefined)
const body = computed(() => props.block.hasHeader ? props.block.rows.slice(1) : props.block.rows)
</script>

<template>
  <figure class="my-6 overflow-x-auto rounded-xl border border-default">
    <table class="w-full border-collapse text-left text-sm leading-6">
      <caption
        v-if="block.caption"
        class="caption-bottom border-t border-default px-4 py-2 text-left text-xs text-muted"
      >
        {{ block.caption }}
      </caption>
      <thead
        v-if="header"
        class="bg-elevated/60 text-highlighted"
      >
        <tr>
          <th
            v-for="(cell, index) in header"
            :key="index"
            scope="col"
            class="border-b border-default px-4 py-2.5 font-semibold"
          >
            <BlocksInlineText :text="cell" />
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-default">
        <tr
          v-for="(row, rowIndex) in body"
          :key="rowIndex"
        >
          <td
            v-for="(cell, cellIndex) in row"
            :key="cellIndex"
            class="px-4 py-2.5 align-top"
          >
            <BlocksInlineText :text="cell" />
          </td>
        </tr>
      </tbody>
    </table>
  </figure>
</template>
