<script setup lang="ts">
const props = defineProps<{ size: number }>()
const route = useRoute()
const router = useRouter()
async function changeSize(pageSize: number) {
  await router.push({ path: route.path, query: { ...route.query, page: undefined, pageSize: String(pageSize) } })
}
</script>

<template>
  <div class="flex items-center gap-2 text-xs text-muted">
    <span aria-hidden="true">Rows</span>
    <USelect
      :model-value="props.size"
      :items="[10, 25, 50, 100]"
      size="sm"
      aria-label="Rows per page"
      class="w-20"
      @update:model-value="changeSize(Number($event))"
    />
    <span aria-hidden="true">per page</span>
  </div>
</template>
