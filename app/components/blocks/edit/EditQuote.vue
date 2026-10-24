<script setup lang="ts">
import type { QuoteBlock } from '#shared/content-blocks'

const block = defineModel<QuoteBlock>('block', { required: true })
</script>

<template>
  <div class="space-y-3">
    <BlocksInlineTextarea
      v-model="block.text"
      :maxlength="6000"
      placeholder="Quotation"
      aria-label="Quote"
    />
    <UFormField label="Attribution">
      <UInput
        v-model="block.attribution"
        maxlength="240"
        placeholder="Optional, e.g. Ada Lovelace"
        class="w-full"
      />
    </UFormField>
  </div>
</template>
