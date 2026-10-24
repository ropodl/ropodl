<script setup lang="ts">
const { bookmarks, ready, errorMessage } = useArticleBookmarks()

useSeoMeta({
  title: 'Saved articles',
  description: 'Articles you saved to read later.',
  robots: 'noindex, nofollow'
})
</script>

<template>
  <PublicPageMotion
    preset="saved"
    class="block"
  >
    <section class="space-y-8 py-8 sm:py-12">
      <header class="space-y-3">
        <p class="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-primary">
          Your reading list
        </p>
        <h1 class="text-4xl font-bold tracking-tight text-highlighted sm:text-5xl">
          Saved articles
        </h1>
        <p class="max-w-2xl font-mono text-sm leading-7 text-muted">
          Keep articles you want to come back to. Your list is stored only in this browser.
        </p>
      </header>

      <p
        v-if="errorMessage"
        role="alert"
        class="rounded-xl border border-error/30 bg-error/5 p-4 text-sm text-error"
      >
        {{ errorMessage }}
      </p>
      <div
        v-if="!ready"
        class="rounded-xl border border-default bg-elevated/40 p-6 text-sm text-muted"
      >
        Loading saved articles…
      </div>
      <p
        v-else-if="!bookmarks.length"
        class="rounded-xl border border-default bg-elevated/40 p-8 text-center text-sm text-muted"
      >
        No saved articles yet. Open an article and choose “Save for later”.
      </p>
      <ul
        v-else
        class="space-y-4"
      >
        <li
          v-for="bookmark in bookmarks"
          :key="bookmark.slug"
        >
          <Motion
            as="div"
            :while-hover="{ y: -2 }"
            :while-press="{ scale: 0.985 }"
            :transition="{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }"
          >
            <UCard
              class="bg-elevated/50"
              :ui="{ body: 'p-5 sm:p-6' }"
            >
              <div class="flex items-start justify-between gap-4">
                <div class="min-w-0 space-y-2">
                  <NuxtLink
                    prefetch-on="visibility"
                    :to="`/blogs/${bookmark.slug}`"
                    class="font-semibold text-highlighted hover:text-primary"
                  >
                    {{ bookmark.title }}
                  </NuxtLink>
                  <p
                    v-if="bookmark.summary"
                    class="font-mono text-sm leading-6 text-muted"
                  >
                    {{ bookmark.summary }}
                  </p>
                </div>
                <ArticleBookmarkButton
                  :slug="bookmark.slug"
                  :title="bookmark.title"
                  :summary="bookmark.summary"
                  :image-url="bookmark.imageUrl"
                />
              </div>
            </UCard>
          </Motion>
        </li>
      </ul>
    </section>
  </PublicPageMotion>
</template>
