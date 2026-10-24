<script setup lang="ts">
import type { TestimonialBlock } from '#shared/content-blocks'

const block = defineModel<TestimonialBlock>('block', { required: true })
</script>

<template>
  <div class="space-y-3">
    <UTextarea
      v-model="block.quote"
      :rows="3"
      maxlength="2000"
      autoresize
      placeholder="What did they say?"
      aria-label="Testimonial"
      class="w-full"
    />
    <div class="grid gap-3 sm:grid-cols-2">
      <UInput
        v-model="block.name"
        maxlength="120"
        placeholder="Name"
        aria-label="Name"
        class="w-full"
      />
      <UInput
        v-model="block.role"
        maxlength="160"
        placeholder="Role and company (optional)"
        aria-label="Role"
        class="w-full"
      />
    </div>
    <BlocksImageField
      v-model="block.image"
      label="Photo"
      :caption="false"
      removable
    />
  </div>
</template>
