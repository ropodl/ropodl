<script setup lang="ts">
interface HeadingLink {
  id: string
  title: string
  level: number
}

const props = defineProps<{
  content: string
}>()

const headings = ref<HeadingLink[]>([])

function makeHeadingId(text: string, index: number) {
  const slug = text.normalize('NFKD').toLowerCase()
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-|-$/g, '')
  return `article-${slug || 'section'}-${index + 1}`
}

async function collectHeadings() {
  await nextTick()
  const article = document.getElementById('blog-article-content')
  if (!article) {
    headings.value = []
    return
  }

  headings.value = Array.from(article.querySelectorAll<HTMLElement>('h2, h3')).map((heading, index) => {
    const id = makeHeadingId(heading.textContent?.trim() || '', index)
    heading.id = id
    heading.tabIndex = -1
    heading.classList.add('scroll-mt-28')
    return { id, title: heading.textContent?.trim() || 'Section', level: heading.tagName === 'H3' ? 3 : 2 }
  })
}

watch(() => props.content, () => {
  void collectHeadings()
})

onMounted(() => {
  void collectHeadings()
})
</script>

<template>
  <div>
    <div class="flex flex-wrap items-center gap-3">
      <details
        v-if="headings.length"
        class="group relative"
      >
        <summary class="inline-flex min-h-9 cursor-pointer list-none items-center gap-2 rounded-lg border border-default px-3 py-2 text-sm text-muted transition-colors hover:bg-elevated hover:text-highlighted [&::-webkit-details-marker]:hidden">
          <UIcon
            name="i-lucide-list"
            class="size-4"
          />
          Contents
          <UIcon
            name="i-lucide-chevron-down"
            class="size-3.5 transition-transform group-open:rotate-180"
          />
        </summary>
        <nav
          aria-label="Table of contents"
          class="absolute left-0 top-full z-20 mt-2 max-h-72 w-72 max-w-[calc(100vw-2rem)] overflow-y-auto rounded-xl border border-default bg-default p-2 shadow-xl"
        >
          <a
            v-for="heading in headings"
            :key="heading.id"
            :href="`#${heading.id}`"
            class="block rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-elevated hover:text-highlighted"
            :class="heading.level === 3 ? 'pl-6 text-xs' : ''"
          >
            {{ heading.title }}
          </a>
        </nav>
      </details>
    </div>
  </div>
</template>
