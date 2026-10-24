<script setup lang="ts">
import type { ArticleBookmark } from '../composables/useArticleBookmarks'

const props = defineProps<Omit<ArticleBookmark, 'savedAt'>>()
const { isBookmarked, toggleBookmark, errorMessage } = useArticleBookmarks()
const saved = computed(() => isBookmarked(props.slug))
</script>

<template>
  <div class="space-y-1">
    <Motion
      as="div"
      :while-hover="{ y: -1 }"
      :while-press="{ scale: 0.97 }"
      :transition="{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }"
    >
      <UButton
        type="button"
        color="neutral"
        variant="outline"
        size="sm"
        :aria-pressed="saved"
        :aria-label="saved ? 'Remove article from saved items' : 'Save article for later'"
        @click="toggleBookmark({ slug, title, summary, imageUrl })"
      >
        <UIcon
          :name="saved ? 'i-lucide-bookmark-check' : 'i-lucide-bookmark'"
          class="size-4"
        />
        {{ saved ? 'Saved' : 'Save for later' }}
      </UButton>
    </Motion>
    <p
      v-if="errorMessage"
      role="alert"
      class="text-xs text-error"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>
