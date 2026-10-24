<script setup lang="ts">
interface SearchItem {
  title: string
  summary: string
  kind: 'Article' | 'Project'
  detail: string
  url: string
}

const dialog = ref<HTMLDialogElement | null>(null)
const searchInput = ref<HTMLInputElement | null>(null)
const isOpen = ref(false)
const query = ref('')
const results = ref<SearchItem[]>([])
const selectedIndex = ref(0)
const pending = ref(false)
const errorMessage = ref('')
let searchTimer: ReturnType<typeof setTimeout> | undefined
let requestController: AbortController | undefined

watch(query, (value) => {
  clearTimeout(searchTimer)
  requestController?.abort()
  results.value = []
  selectedIndex.value = 0
  errorMessage.value = ''

  const term = value.trim()
  if (term.length < 2) {
    pending.value = false
    return
  }

  pending.value = true
  searchTimer = setTimeout(async () => {
    const controller = new AbortController()
    requestController = controller
    try {
      const response = await $fetch<{ items: SearchItem[] }>('/api/search', {
        query: { q: term },
        signal: controller.signal
      })
      results.value = response.items
    } catch (error) {
      if (!controller.signal.aborted) {
        console.error('Site search failed:', error)
        errorMessage.value = 'Search is temporarily unavailable. Please try again.'
      }
    } finally {
      if (requestController === controller) {
        requestController = undefined
        pending.value = false
      }
    }
  }, 180)
})

watch(isOpen, async (open) => {
  await nextTick()
  const element = dialog.value
  if (!element) return

  if (open && !element.open) {
    element.showModal()
    searchInput.value?.focus()
  } else if (!open && element.open) {
    element.close()
  }
})

function openSearch() {
  isOpen.value = true
}

function closeSearch() {
  isOpen.value = false
}

function onDialogClose() {
  isOpen.value = false
  query.value = ''
}

function onGlobalKeydown(event: KeyboardEvent) {
  const target = event.target
  const isTyping = target instanceof HTMLElement
    && (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))
  const shortcut = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k'

  if (!isOpen.value && !isTyping && (shortcut || (!event.metaKey && !event.ctrlKey && event.key === '/'))) {
    event.preventDefault()
    openSearch()
    return
  }

  if (!isOpen.value || !results.value.length || target !== searchInput.value) return
  if (event.key === 'ArrowDown') {
    event.preventDefault()
    selectedIndex.value = (selectedIndex.value + 1) % results.value.length
  } else if (event.key === 'ArrowUp') {
    event.preventDefault()
    selectedIndex.value = (selectedIndex.value - 1 + results.value.length) % results.value.length
  } else if (event.key === 'Enter') {
    event.preventDefault()
    void navigateTo(results.value[selectedIndex.value]!.url)
    closeSearch()
  }
}

onMounted(() => window.addEventListener('keydown', onGlobalKeydown))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onGlobalKeydown)
  clearTimeout(searchTimer)
  requestController?.abort()
})
</script>

<template>
  <div>
    <Motion
      as="button"
      type="button"
      :while-hover="{ scale: 1.04 }"
      :while-press="{ scale: 0.95 }"
      :transition="{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }"
      class="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-muted transition-colors hover:bg-elevated hover:text-highlighted sm:w-auto sm:gap-2 sm:px-2"
      aria-label="Search articles and projects"
      title="Search ( / or ⌘K )"
      @click="openSearch"
    >
      <UIcon
        name="i-lucide-search"
        class="size-4"
      />
      <span class="hidden text-sm sm:inline">Search</span>
      <kbd class="hidden rounded border border-default px-1.5 py-0.5 font-mono text-[10px] text-dimmed sm:inline">⌘K</kbd>
    </Motion>

    <dialog
      ref="dialog"
      class="fixed inset-x-4 top-[12vh] m-auto max-h-[76vh] w-[calc(100%-2rem)] max-w-xl overflow-hidden rounded-2xl border border-default bg-default p-0 text-default shadow-2xl"
      data-site-search
      aria-label="Search articles and projects"
      @click.self="closeSearch"
      @close="onDialogClose"
    >
      <form
        class="border-b border-default p-4"
        @submit.prevent
      >
        <label
          for="site-search-input"
          class="sr-only"
        >Search articles and projects</label>
        <div class="flex items-center gap-3">
          <UIcon
            name="i-lucide-search"
            class="size-5 shrink-0 text-muted"
          />
          <input
            id="site-search-input"
            ref="searchInput"
            v-model="query"
            role="combobox"
            aria-autocomplete="list"
            aria-haspopup="listbox"
            :aria-expanded="results.length > 0"
            :aria-controls="results.length ? 'site-search-results' : undefined"
            :aria-activedescendant="results.length ? `site-search-result-${selectedIndex}` : undefined"
            type="search"
            autocomplete="off"
            placeholder="Search articles and projects…"
            class="min-w-0 flex-1 bg-transparent text-base text-highlighted outline-none placeholder:text-dimmed"
          >
          <button
            type="button"
            class="rounded-md border border-default px-2 py-1 font-mono text-xs text-muted hover:bg-elevated"
            @click="closeSearch"
          >
            Esc
          </button>
        </div>
      </form>

      <div class="max-h-[calc(76vh-4.5rem)] overflow-y-auto p-2">
        <p
          v-if="query.trim().length < 2"
          class="px-3 py-8 text-center text-sm text-muted"
        >
          Search by title or summary.
        </p>
        <p
          v-else-if="pending"
          class="px-3 py-8 text-center text-sm text-muted"
        >
          Searching…
        </p>
        <p
          v-else-if="errorMessage"
          role="alert"
          class="px-3 py-8 text-center text-sm text-error"
        >
          {{ errorMessage }}
        </p>
        <p
          v-else-if="!results.length"
          class="px-3 py-8 text-center text-sm text-muted"
        >
          No articles or projects found.
        </p>
        <ul
          v-else
          id="site-search-results"
          class="space-y-1"
          role="listbox"
          aria-label="Search results"
        >
          <li
            v-for="(item, index) in results"
            :key="item.url"
            role="presentation"
          >
            <Motion
              as="div"
              :while-hover="{ x: 2 }"
              :transition="{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }"
            >
              <NuxtLink
                :id="`site-search-result-${index}`"
                :to="item.url"
                role="option"
                :aria-selected="index === selectedIndex"
                class="block rounded-xl px-3 py-3 transition-colors"
                :class="index === selectedIndex ? 'bg-primary/10' : 'hover:bg-elevated'"
                @mouseenter="selectedIndex = index"
                @click="closeSearch"
              >
                <span class="flex items-center justify-between gap-3">
                  <span class="truncate font-medium text-highlighted">{{ item.title }}</span>
                  <span class="shrink-0 font-mono text-[10px] uppercase tracking-wider text-muted">{{ item.kind }}</span>
                </span>
                <span class="mt-1 block truncate text-sm text-muted">{{ item.summary || item.detail }}</span>
              </NuxtLink>
            </Motion>
          </li>
        </ul>
      </div>
      <div class="flex items-center gap-4 border-t border-default px-4 py-2.5 font-mono text-[10px] text-dimmed">
        <span><kbd class="rounded border border-default px-1">↑</kbd> <kbd class="rounded border border-default px-1">↓</kbd> to navigate</span>
        <span><kbd class="rounded border border-default px-1">Enter</kbd> to open</span>
      </div>
    </dialog>
  </div>
</template>
