<script setup lang="ts">
import { extractContentImages } from '../../utils/extract-content-images'
import { blogPostFormats, type BlogPostFormat } from '../../utils/blog-post-formats'
import { contentBlocksPlainText, readContentBlockDocument } from '#shared/content-blocks'

interface BlogPost {
  title: string
  slug: string
  summary: string
  seoTitle: string
  seoDescription: string
  content: string
  postFormat: BlogPostFormat
  formatUrl: string
  quoteText: string
  quoteCitation: string
  videoEmbedUrl: string | null
  updatedAt: string | number
  imageUrl: string | null
  createdAt: string | number
  category?: { title: string, slug: string } | null
  tags?: { title: string, slug: string }[]
  previous?: { title: string, slug: string } | null
  next?: { title: string, slug: string } | null
  related?: { slug: string, title: string, summary: string, imageUrl: string | null, createdAt: string | number }[]
}

const route = useRoute()
const siteOrigin = useSiteOrigin()
const { data: post } = await useFetch<BlogPost>(() => `/api/blogs/${encodeURIComponent(String(route.params.slug))}`)

const formattedDate = computed(() => new Intl.DateTimeFormat('en', {
  dateStyle: 'long',
  timeZone: 'UTC'
}).format(new Date(post.value!.createdAt)))
const articleImages = computed(() => [
  ...(post.value?.imageUrl && post.value.postFormat !== 'image' ? [{ src: post.value.imageUrl, alt: post.value.title }] : []),
  ...extractContentImages(post.value?.content || '', true)
])
const postFormatLabel = computed(() => post.value?.postFormat === 'standard'
  ? 'Post'
  : blogPostFormats.find(format => format.value === post.value?.postFormat)?.label || 'Post')
const articleWordCount = computed(() => {
  if (!post.value) return 0
  const document = readContentBlockDocument(post.value.content)
  const plainText = document
    ? contentBlocksPlainText(document.blocks)
    : post.value.content.replace(/<[^>]*>/g, ' ')
  return plainText.trim().split(/\s+/).filter(Boolean).length
})

usePageSeo(() => ({
  title: post.value?.seoTitle || post.value?.title || 'Blog — Saroj Poudel',
  description: post.value?.seoDescription || post.value?.summary || '',
  image: post.value?.imageUrl,
  imageAlt: post.value?.title || 'Saroj Poudel blog post',
  type: 'article',
  publishedTime: post.value?.createdAt,
  modifiedTime: post.value?.updatedAt,
  authorName: 'Saroj Poudel',
  section: post.value?.category?.title,
  tags: post.value?.tags?.map(tag => tag.title),
  schema: post.value
    ? {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        '@id': `${siteOrigin}/blogs/${post.value.slug}#article`,
        'headline': post.value.title,
        'description': post.value.seoDescription || post.value.summary,
        'url': `${siteOrigin}/blogs/${post.value.slug}`,
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': `${siteOrigin}/blogs/${post.value.slug}`
        },
        'image': post.value.imageUrl ? new URL(post.value.imageUrl, siteOrigin).href : `${siteOrigin}/social-card.png`,
        'datePublished': new Date(post.value.createdAt).toISOString(),
        'dateModified': new Date(post.value.updatedAt).toISOString(),
        'author': { '@id': `${siteOrigin}/#person` },
        'publisher': { '@id': `${siteOrigin}/#person` },
        'articleSection': post.value.category?.title,
        'keywords': post.value.tags?.map(tag => tag.title),
        'wordCount': articleWordCount.value,
        'inLanguage': 'en'
      }
    : undefined
}))
</script>

<template>
  <PublicPageMotion
    preset="article"
    class="block"
  >
    <article class="mx-auto max-w-3xl space-y-8 py-8 sm:py-12">
      <header class="space-y-5">
        <NuxtLink
          prefetch-on="visibility"
          to="/blogs"
          class="inline-flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-primary"
        >
          <UIcon
            name="i-lucide-arrow-left"
            class="size-3.5"
          />
          All blog posts
        </NuxtLink>
        <div class="space-y-4">
          <div class="flex items-center gap-3 font-mono text-xs text-muted">
            <UBadge
              color="primary"
              variant="subtle"
              size="sm"
            >
              {{ postFormatLabel }}
            </UBadge>
            <time
              v-if="post"
              :datetime="new Date(post.createdAt).toISOString()"
            >{{ formattedDate }}</time>
            <NuxtLink
              v-if="post?.category"
              :to="{ path: '/blogs', query: { category: post.category.slug } }"
              class="text-primary hover:underline"
            >{{ post.category.title }}</NuxtLink>
          </div>
          <h1 class="text-3xl font-bold tracking-tight text-highlighted sm:text-5xl">
            {{ post?.title }}
          </h1>
          <p
            v-if="post?.summary && !['aside', 'status'].includes(post.postFormat)"
            class="font-mono text-base leading-7 text-muted sm:text-lg"
          >
            {{ post.summary }}
          </p>
        </div>
      </header>

      <blockquote
        v-if="post?.postFormat === 'quote'"
        class="space-y-3 rounded-xl border-l-4 border-primary bg-elevated/50 px-6 py-5 text-xl leading-relaxed text-highlighted sm:px-8 sm:py-7 sm:text-2xl"
      >
        <p>{{ post.quoteText }}</p>
        <cite
          v-if="post.quoteCitation"
          class="block font-mono text-sm not-italic text-muted"
        >
          — {{ post.quoteCitation }}
        </cite>
      </blockquote>

      <div
        v-if="(post?.postFormat === 'aside' || post?.postFormat === 'status') && post.summary"
        class="rounded-xl border border-primary/20 bg-primary/5 px-5 py-4 font-mono text-sm leading-7 text-muted"
      >
        {{ post.summary }}
      </div>

      <a
        v-if="post?.postFormat === 'link'"
        :href="post.formatUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center justify-between gap-4 rounded-xl border border-default bg-elevated/50 p-5 text-highlighted transition-colors hover:border-primary/40 hover:text-primary"
      >
        <span class="min-w-0 truncate">{{ post.formatUrl }}</span>
        <UIcon
          name="i-lucide-arrow-up-right"
          class="size-5 shrink-0"
        />
      </a>

      <div
        v-if="post?.postFormat === 'video' && post.videoEmbedUrl"
        class="aspect-video overflow-hidden rounded-xl border border-default bg-black"
      >
        <iframe
          :src="post.videoEmbedUrl"
          :title="post.title"
          class="size-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        />
      </div>

      <audio
        v-if="post?.postFormat === 'audio'"
        :src="post.formatUrl"
        controls
        preload="metadata"
        class="w-full"
      >
        Your browser does not support audio playback.
      </audio>

      <figure
        v-if="post?.postFormat === 'image' && post.imageUrl"
        class="overflow-hidden rounded-xl border border-default"
      >
        <img
          :src="post.imageUrl"
          :alt="post.title"
          loading="eager"
          fetchpriority="high"
          decoding="async"
          :style="{ viewTransitionName: `blog-cover-${post.slug}` }"
          class="max-h-[70vh] w-full object-contain"
        >
        <figcaption class="px-4 py-3 text-center text-xs text-muted">
          {{ post.title }}
        </figcaption>
      </figure>

      <div
        v-if="post"
        class="flex flex-wrap items-center gap-2"
        role="group"
        aria-label="Article actions"
      >
        <BlogTextToSpeech
          v-if="post.content"
          :slug="post.slug"
          :updated-at="post.updatedAt"
        />
        <ArticleBookmarkButton
          :slug="post.slug"
          :title="post.title"
          :summary="post.summary"
          :image-url="post.imageUrl"
        />
        <ContentShareActions
          :title="post.title"
          :text="post.summary"
        />
        <NuxtLink
          to="/saved"
          class="inline-flex min-h-9 items-center gap-1.5 px-2 text-sm text-muted transition-colors hover:text-primary"
        >
          View saved articles
          <UIcon
            name="i-lucide-arrow-right"
            class="size-3.5"
          />
        </NuxtLink>
      </div>

      <BlogReadingTools
        v-if="post?.content"
        :content="post.content"
      />

      <ContentImageGallery
        :images="articleImages"
        label="Article images"
        priority
      />

      <RichContent
        v-if="post?.content"
        id="blog-article-content"
        :class="{ 'font-mono': post.postFormat === 'chat' }"
        :content="post.content"
        label="Article photo gallery"
      />
      <p
        v-else-if="post && !['quote', 'link', 'video', 'audio', 'image'].includes(post.postFormat)"
        class="text-sm text-muted"
      >
        This article does not have any additional content yet.
      </p>
      <LazyArticleFeedback
        v-if="post"
        hydrate-on-visible
        :slug="post.slug"
      />

      <nav
        v-if="post?.tags?.length"
        aria-label="Article tags"
        class="flex flex-wrap gap-2"
      >
        <Motion
          v-for="tag in post.tags"
          :key="tag.slug"
          as="div"
          :while-hover="{ y: -1 }"
          :while-press="{ scale: 0.97 }"
          :transition="{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }"
        >
          <NuxtLink
            :to="{ path: '/blogs', query: { tag: tag.slug } }"
            class="inline-flex rounded-full border border-default px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:border-primary/40 hover:text-primary"
          >#{{ tag.title }}</NuxtLink>
        </Motion>
      </nav>

      <nav
        v-if="post?.previous || post?.next"
        aria-label="Adjacent blog posts"
        class="grid gap-3 border-t border-default pt-6 sm:grid-cols-2"
      >
        <Motion
          v-if="post.previous"
          as="div"
          :while-hover="{ x: -2 }"
          :while-press="{ scale: 0.99 }"
          :transition="{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }"
        >
          <NuxtLink
            prefetch-on="visibility"
            :to="`/blogs/${post.previous.slug}`"
            class="group block rounded-xl border border-default p-4 transition-colors hover:border-primary/40 hover:bg-elevated/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <span class="inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors group-hover:text-primary">
              <UIcon
                name="i-lucide-arrow-left"
                class="size-3.5"
              />
              Previous post
            </span>
            <span class="mt-2 block font-semibold text-highlighted">{{ post.previous.title }}</span>
          </NuxtLink>
        </Motion>
        <Motion
          v-if="post.next"
          as="div"
          :while-hover="{ x: 2 }"
          :while-press="{ scale: 0.99 }"
          :transition="{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }"
        >
          <NuxtLink
            prefetch-on="visibility"
            :to="`/blogs/${post.next.slug}`"
            class="group block rounded-xl border border-default p-4 text-left transition-colors hover:border-primary/40 hover:bg-elevated/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:col-start-2"
          >
            <span class="inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors group-hover:text-primary">
              Next post
              <UIcon
                name="i-lucide-arrow-right"
                class="size-3.5"
              />
            </span>
            <span class="mt-2 block font-semibold text-highlighted">{{ post.next.title }}</span>
          </NuxtLink>
        </Motion>
      </nav>

      <LazyRelatedContent
        hydrate-on-visible
        :items="post?.related || []"
        kind="blogs"
      />
      <LazyContactCta hydrate-on-visible />
    </article>
  </PublicPageMotion>
</template>
