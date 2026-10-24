<script setup lang="ts">
// The one card level in the admin: put fields straight inside it. Group related fields with
// AdminSection's own spacing or a `border-t border-default pt-5` divider, never another bordered card.
defineProps<{
  title?: string
  description?: string
}>()
</script>

<template>
  <section class="scroll-mt-24 rounded-xl border border-default bg-muted p-5 sm:p-6">
    <div
      v-if="title || $slots.actions"
      class="mb-5 flex flex-wrap items-start justify-between gap-3"
    >
      <div class="min-w-0">
        <h2
          v-if="title"
          class="text-sm font-semibold text-highlighted"
        >
          {{ title }}
        </h2>
        <p
          v-if="description"
          class="mt-1 text-xs leading-5 text-muted"
        >
          {{ description }}
        </p>
      </div>
      <div
        v-if="$slots.actions"
        class="flex shrink-0 items-center gap-2"
      >
        <slot name="actions" />
      </div>
    </div>
    <div class="space-y-5">
      <slot />
    </div>
  </section>
</template>
