<script setup lang="ts" generic="T">
// Repeating entries inside a block editor (milestones, questions, stats…). Entries are
// separated by dividers, not nested cards, to keep a single card level in the admin.
const props = withDefaults(defineProps<{ create: () => T, max: number, min?: number, addLabel: string, itemLabel: string }>(), { min: 1 })
const items = defineModel<T[]>({ required: true })

function move(index: number, offset: -1 | 1) {
  const [item] = items.value.splice(index, 1)
  items.value.splice(index + offset, 0, item!)
}

function add() {
  if (items.value.length < props.max) items.value.push(props.create())
}
</script>

<template>
  <div>
    <ol class="divide-y divide-default">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="flex gap-3 py-4 first:pt-0"
      >
        <span class="mt-2 w-5 shrink-0 text-right font-mono text-xs text-dimmed">{{ index + 1 }}</span>
        <div class="min-w-0 flex-1 space-y-3">
          <slot
            :item="item"
            :index="index"
          />
        </div>
        <div class="flex shrink-0 flex-col gap-0.5">
          <UButton
            size="xs"
            variant="ghost"
            color="neutral"
            icon="i-lucide-chevron-up"
            :disabled="index === 0"
            :aria-label="`Move ${itemLabel} ${index + 1} up`"
            @click="move(index, -1)"
          />
          <UButton
            size="xs"
            variant="ghost"
            color="neutral"
            icon="i-lucide-chevron-down"
            :disabled="index === items.length - 1"
            :aria-label="`Move ${itemLabel} ${index + 1} down`"
            @click="move(index, 1)"
          />
          <UButton
            size="xs"
            variant="ghost"
            color="error"
            icon="i-lucide-trash-2"
            :disabled="items.length <= min"
            :aria-label="`Remove ${itemLabel} ${index + 1}`"
            @click="items.splice(index, 1)"
          />
        </div>
      </li>
    </ol>
    <UButton
      class="mt-3"
      size="sm"
      variant="soft"
      color="neutral"
      icon="i-lucide-plus"
      :disabled="items.length >= max"
      @click="add"
    >
      {{ addLabel }}
    </UButton>
  </div>
</template>
