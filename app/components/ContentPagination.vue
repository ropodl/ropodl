<script setup lang="ts">
const props = withDefaults(defineProps<{ page: number, totalPages: number, queryKey?: string }>(), { queryKey: 'page' })
const route = useRoute()
type PageItem = number | 'left-gap' | 'right-gap'
const pages = computed<PageItem[]>(() => {
  const total = Math.max(1, props.totalPages)
  const current = Math.min(Math.max(1, props.page), total)
  if (total <= 7) return Array.from({ length: total }, (_, index) => index + 1)

  const visible: PageItem[] = [1]
  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)
  if (start > 2) visible.push('left-gap')
  for (let number = start; number <= end; number++) visible.push(number)
  if (end < total - 1) visible.push('right-gap')
  visible.push(total)
  return visible
})

function pageTo(page: number) {
  return { path: route.path, query: { ...route.query, [props.queryKey]: page === 1 ? undefined : String(page) } }
}
</script>

<template>
  <nav
    v-if="totalPages > 1"
    class="flex flex-wrap items-center justify-center gap-2 pt-4"
    aria-label="Pagination"
  >
    <Motion
      as="div"
      :while-hover="{ y: -1 }"
      :while-press="{ scale: 0.97 }"
      :transition="{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }"
    >
      <NuxtLink
        :to="pageTo(Math.max(1, page - 1))"
        class="rounded-lg border border-default px-3 py-2 text-xs text-muted transition-colors hover:bg-elevated"
        :class="page === 1 ? 'pointer-events-none opacity-40' : ''"
        :aria-disabled="page === 1"
      >Previous</NuxtLink>
    </Motion>
    <template
      v-for="item in pages"
      :key="item"
    >
      <span
        v-if="typeof item === 'string'"
        class="px-1 text-xs text-muted"
        aria-hidden="true"
      >…</span>
      <Motion
        v-else
        as="div"
        :while-hover="{ y: -1, scale: 1.03 }"
        :while-press="{ scale: 0.96 }"
        :transition="{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }"
      >
        <NuxtLink
          :to="pageTo(item)"
          class="flex size-9 items-center justify-center rounded-lg border text-xs transition-colors"
          :class="item === page ? 'border-primary bg-primary/10 font-semibold text-primary' : 'border-default text-muted hover:bg-elevated'"
          :aria-current="item === page ? 'page' : undefined"
        >{{ item }}</NuxtLink>
      </Motion>
    </template>
    <Motion
      as="div"
      :while-hover="{ y: -1 }"
      :while-press="{ scale: 0.97 }"
      :transition="{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }"
    >
      <NuxtLink
        :to="pageTo(Math.min(totalPages, page + 1))"
        class="rounded-lg border border-default px-3 py-2 text-xs text-muted transition-colors hover:bg-elevated"
        :class="page === totalPages ? 'pointer-events-none opacity-40' : ''"
        :aria-disabled="page === totalPages"
      >Next</NuxtLink>
    </Motion>
  </nav>
</template>
