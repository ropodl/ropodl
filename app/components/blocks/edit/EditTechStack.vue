<script setup lang="ts">
import type { TechStackBlock } from '#shared/content-blocks'

const block = defineModel<TechStackBlock>('block', { required: true })
</script>

<template>
  <div class="space-y-3">
    <UInput
      v-model="block.title"
      maxlength="160"
      placeholder="Heading (optional), e.g. Built with"
      aria-label="Tech stack heading"
      class="w-full"
    />
    <UFormField
      label="Technologies"
      help="Press Enter or comma after each one."
    >
      <UInputTags
        v-model="block.items"
        :max="40"
        :max-length="60"
        placeholder="Nuxt, Cloudflare Workers, D1…"
        add-on-paste
        :convert-value="(value: string) => value.trim()"
        :delimiter="','"
        class="w-full"
      />
    </UFormField>
  </div>
</template>
