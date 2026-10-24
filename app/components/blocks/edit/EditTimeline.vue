<script setup lang="ts">
import type { TimelineBlock } from '#shared/content-blocks'

const block = defineModel<TimelineBlock>('block', { required: true })
</script>

<template>
  <div class="space-y-4">
    <UInput
      v-model="block.title"
      maxlength="160"
      placeholder="Heading (optional)"
      aria-label="Timeline heading"
      class="w-full"
    />
    <BlocksBlockItems
      v-model="block.events"
      :create="() => ({ date: '', title: '', description: '' })"
      :max="30"
      add-label="Add milestone"
      item-label="milestone"
    >
      <template #default="{ item, index }">
        <div class="grid gap-2 sm:grid-cols-[10rem_minmax(0,1fr)]">
          <UInput
            v-model="item.date"
            maxlength="80"
            placeholder="Date or phase"
            :aria-label="`Milestone ${index + 1} date`"
          />
          <UInput
            v-model="item.title"
            maxlength="160"
            placeholder="Milestone"
            :aria-label="`Milestone ${index + 1} title`"
          />
        </div>
        <UTextarea
          v-model="item.description"
          :rows="2"
          maxlength="2000"
          autoresize
          placeholder="What happened? (optional)"
          :aria-label="`Milestone ${index + 1} description`"
          class="w-full"
        />
      </template>
    </BlocksBlockItems>
  </div>
</template>
