<script setup lang="ts">
import type { StatsBlock } from '#shared/content-blocks'

defineProps<{ block: StatsBlock }>()
</script>

<template>
  <section class="my-6 space-y-4">
    <h2 v-if="block.title">
      {{ block.title }}
    </h2>
    <dl class="grid gap-3 sm:grid-cols-2">
      <div
        v-for="(item, index) in block.items"
        :key="index"
        class="rounded-xl border border-default bg-elevated/50 p-5"
      >
        <dt class="font-mono text-xs uppercase tracking-wider text-muted">
          {{ item.label }}
        </dt>
        <dd class="mb-0 mt-2 text-xl font-semibold text-highlighted">
          {{ item.value }}
        </dd>
        <p
          v-if="item.detail"
          class="mb-0 mt-2 text-sm leading-6 text-muted"
        >
          {{ item.detail }}
        </p>
      </div>
    </dl>
  </section>
</template>
