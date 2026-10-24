<script setup lang="ts">
defineProps<{
  title: string
  eyebrow?: string
  description?: string
  backTo?: string
  backLabel?: string
}>()
</script>

<template>
  <header class="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
    <div class="min-w-0">
      <NuxtLink
        v-if="backTo"
        :to="backTo"
        class="mb-3 inline-flex items-center gap-1 text-sm text-muted hover:text-highlighted"
      >
        <UIcon
          name="i-lucide-arrow-left"
          class="size-4"
          aria-hidden="true"
        />
        {{ backLabel || 'Back' }}
      </NuxtLink>
      <p
        v-if="eyebrow"
        class="text-xs font-medium text-primary"
      >
        {{ eyebrow }}
      </p>
      <h1 class="mt-2 text-2xl font-semibold tracking-tight text-highlighted sm:text-3xl">
        {{ title }}
      </h1>
      <p
        v-if="description"
        class="mt-2 text-sm text-muted"
      >
        {{ description }}
      </p>
    </div>
    <div
      v-if="$slots.actions"
      class="flex shrink-0 flex-wrap items-center gap-2"
    >
      <slot name="actions" />
    </div>
  </header>
</template>
