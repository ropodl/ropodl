<script setup lang="ts">
import { blockCategories, blockDefinitions, type ContentBlockType } from '#shared/content-blocks'

// Searchable list of block types, grouped by category. Layout blocks are hidden inside columns.
const props = defineProps<{ nested?: boolean }>()
const emit = defineEmits<{ select: [type: ContentBlockType] }>()

const groups = computed(() => blockCategories.map(category => ({
  id: category.value,
  label: category.label,
  items: blockDefinitions
    .filter(definition => definition.category === category.value && !(props.nested && definition.layout))
    .map(definition => ({
      label: definition.label,
      description: definition.description,
      icon: definition.icon,
      suffix: definition.keywords?.join(' '),
      onSelect: () => emit('select', definition.type)
    }))
})).filter(group => group.items.length))
</script>

<template>
  <UCommandPalette
    :groups="groups"
    placeholder="Search blocks…"
    :fuse="{ fuseOptions: { keys: ['label', 'description', 'suffix'] } }"
    :ui="{ itemLabelSuffix: 'hidden' }"
    class="h-96"
  />
</template>
