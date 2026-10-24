<script setup lang="ts">
interface RelatedItem {
  slug: string
  title: string
  summary: string
  imageUrl: string | null
  createdAt: string | number
}

defineProps<{ items: RelatedItem[], kind: 'blogs' | 'projects' }>()
</script>

<template>
  <section
    v-if="items.length"
    class="space-y-4 border-t border-default pt-8"
    aria-labelledby="related-content-title"
  >
    <div>
      <p class="font-mono text-xs uppercase tracking-[0.2em] text-primary">
        Keep exploring
      </p>
      <h2
        id="related-content-title"
        class="mt-2 text-2xl font-semibold text-highlighted"
      >
        {{ kind === 'blogs' ? 'Related articles' : 'Related projects' }}
      </h2>
    </div>
    <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      <Motion
        v-for="item in items"
        :key="item.slug"
        as="div"
        :while-hover="{ y: -2 }"
        :while-press="{ scale: 0.985 }"
        :transition="{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }"
      >
        <NuxtLink
          prefetch-on="visibility"
          :to="`/${kind}/${item.slug}`"
          class="group block overflow-hidden rounded-xl border border-default bg-elevated/40 transition-colors hover:bg-elevated focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <NuxtImg
            v-if="item.imageUrl"
            :src="item.imageUrl"
            :alt="`${item.title} preview`"
            width="960"
            height="540"
            sizes="sm:100vw md:50vw lg:33vw"
            format="webp"
            quality="76"
            loading="lazy"
            decoding="async"
            :style="{ viewTransitionName: `${kind === 'projects' ? 'project' : 'blog'}-cover-${item.slug}` }"
            class="aspect-[16/9] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025]"
          />
          <div class="p-4">
            <h3 class="font-semibold text-highlighted transition-colors group-hover:text-primary">
              {{ item.title }}
            </h3>
            <p
              v-if="item.summary"
              class="mt-2 line-clamp-2 text-sm leading-6 text-muted"
            >
              {{ item.summary }}
            </p>
            <span class="mt-3 inline-flex items-center gap-1 text-xs text-muted group-hover:text-primary">
              {{ kind === 'blogs' ? 'Read article' : 'View project' }}
              <UIcon
                name="i-lucide-arrow-up-right"
                class="size-3.5"
              />
            </span>
          </div>
        </NuxtLink>
      </Motion>
    </div>
  </section>
</template>
