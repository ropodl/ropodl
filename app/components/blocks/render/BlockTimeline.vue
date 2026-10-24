<script setup lang="ts">
import type { TimelineBlock } from '#shared/content-blocks'

defineProps<{ block: TimelineBlock }>()
</script>

<template>
  <section class="my-6 space-y-4">
    <h2 v-if="block.title">
      {{ block.title }}
    </h2>
    <ol class="relative space-y-6 border-s border-default !pl-6">
      <li
        v-for="(event, index) in block.events"
        :key="index"
        class="relative !list-none"
      >
        <span
          class="absolute -start-[1.9rem] top-2 size-2.5 rounded-full border-2 border-primary bg-default"
          aria-hidden="true"
        />
        <time
          v-if="event.date"
          class="font-mono text-xs text-primary"
        >{{ event.date }}</time>
        <h3 class="mt-1 text-base font-semibold text-highlighted">
          {{ event.title }}
        </h3>
        <p
          v-if="event.description"
          class="mt-1 whitespace-pre-line"
        >
          {{ event.description }}
        </p>
      </li>
    </ol>
  </section>
</template>
