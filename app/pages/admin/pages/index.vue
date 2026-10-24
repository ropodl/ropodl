<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
interface SitePage { slug: string, label: string, seoTitle: string, seoDescription: string, updatedAt: string | null }
const { data: pages, pending } = await useFetch<SitePage[]>('/api/admin/pages', { default: () => [] })
</script>

<template>
  <AdminShell>
    <AdminPageHeader
      eyebrow="Website"
      title="Pages"
      description="Edit page content, search metadata, and social previews."
    />
    <AdminSection v-if="pending">
      <UEmpty
        variant="naked"
        loading
        title="Loading pages…"
      />
    </AdminSection>
    <div
      v-else
      class="grid gap-4 sm:grid-cols-2"
    >
      <NuxtLink
        v-for="page in pages"
        :key="page.slug"
        :to="`/admin/pages/${page.slug}`"
        class="group rounded-xl border border-default bg-muted p-5 transition-colors hover:border-accented hover:bg-elevated focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <div class="flex items-center justify-between">
          <h2 class="font-semibold text-highlighted">
            {{ page.label }}
          </h2>
          <UIcon
            name="i-lucide-arrow-up-right"
            class="size-4 text-dimmed transition-colors group-hover:text-toned"
          />
        </div>
        <p class="mt-3 line-clamp-1 text-sm text-toned">
          {{ page.seoTitle }}
        </p>
        <p class="mt-1 line-clamp-2 text-xs leading-5 text-muted">
          {{ page.seoDescription }}
        </p>
        <p class="mt-4 text-xs text-primary">
          Edit page and SEO
        </p>
      </NuxtLink>
    </div>
  </AdminShell>
</template>
