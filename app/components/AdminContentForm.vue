<script setup lang="ts">
import { blogPostFormats, type BlogPostFormat } from '../utils/blog-post-formats'
import { contentBlocksPlainText, readContentBlockDocument } from '#shared/content-blocks'

type ContentCollection = 'blogs' | 'projects'
interface ExistingContent { title: string, slug: string, summary: string, seoTitle: string, seoDescription: string, content: string, imageKey: string | null, imageUrl: string | null, status: 'draft' | 'published' | 'archived', categoryId?: string | null, tagIds?: string[], typeId?: string | null, postFormat?: BlogPostFormat, formatUrl?: string, quoteText?: string, quoteCitation?: string }
interface TaxonomyOption { id: string, title: string }

const props = defineProps<{ collection: ContentCollection, slug?: string }>()
const isBlog = computed(() => props.collection === 'blogs')
const selectedBlogFormat = computed(() => blogPostFormats.find(format => format.value === form.postFormat))
const itemLabel = computed(() => isBlog.value ? 'article' : 'project')
const collectionLabel = computed(() => isBlog.value ? 'Blog post' : 'Project')
const endpoint = computed(() => `/api/admin/${props.collection}`)
const editEndpoint = computed(() => props.slug ? `${endpoint.value}/${encodeURIComponent(props.slug)}` : '')
const contentDocument = computed(() => readContentBlockDocument(form.content))

const form = reactive({
  title: '',
  slug: '',
  summary: '',
  seoTitle: '',
  seoDescription: '',
  content: '',
  postFormat: 'standard' as BlogPostFormat,
  formatUrl: '',
  quoteText: '',
  quoteCitation: '',
  imageKey: '',
  categoryId: '',
  tagIds: [] as string[],
  typeId: '',
  status: 'draft' as 'draft' | 'published' | 'archived'
})
const slugEdited = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)
const previewUrl = ref('')
const uploading = ref(false)
const uploadingBlocks = ref(false)
const saving = ref(false)
const formError = ref('')
const uploadError = ref('')
const saved = ref(false)
const existingItem = ref<ExistingContent | null>(null)
const { data: categories } = await useFetch<TaxonomyOption[]>('/api/admin/taxonomies/categories', { default: () => [] })
const { data: tags } = await useFetch<TaxonomyOption[]>('/api/admin/taxonomies/tags', { default: () => [] })
const { data: workTypes } = await useFetch<TaxonomyOption[]>('/api/admin/taxonomies/work-types', { default: () => [] })
const editorText = computed(() => contentDocument.value
  ? contentBlocksPlainText(contentDocument.value.blocks)
  : form.content.replace(/<[^>]*>/g, ' '))
const wordCount = computed(() => editorText.value.trim() ? editorText.value.trim().split(/\s+/).length : 0)
const readingMinutes = computed(() => Math.max(1, Math.ceil(wordCount.value / 220)))
const statusOptions = [
  { label: 'Save as draft', value: 'draft' },
  { label: 'Publish now', value: 'published' },
  { label: 'Archive', value: 'archived' }
] satisfies { label: string, value: typeof form.status }[]
// Select items can't use an empty string as a value, so "none" stands in for an unset taxonomy.
const noneValue = '__none'
const categoryOptions = computed(() => [{ label: 'Uncategorized', value: noneValue }, ...categories.value.map(item => ({ label: item.title, value: item.id }))])
const workTypeOptions = computed(() => [{ label: 'No type', value: noneValue }, ...workTypes.value.map(item => ({ label: item.title, value: item.id }))])
const categoryModel = computed({
  get: () => form.categoryId || noneValue,
  set: (value: string) => { form.categoryId = value === noneValue ? '' : value }
})
const typeModel = computed({
  get: () => form.typeId || noneValue,
  set: (value: string) => { form.typeId = value === noneValue ? '' : value }
})
const projectSteps = [
  { label: 'Project details', href: '#project-details', icon: 'i-lucide-notebook-pen' },
  { label: 'Build the story', href: '#content-blocks', icon: 'i-lucide-layers-3' },
  { label: 'Review & publish', href: '#project-publishing', icon: 'i-lucide-send' }
]

if (props.slug) {
  const { data: item, error } = await useFetch<ExistingContent>(() => editEndpoint.value)
  if (item.value) {
    existingItem.value = item.value
    Object.assign(form, {
      title: item.value.title,
      slug: item.value.slug,
      summary: item.value.summary,
      seoTitle: item.value.seoTitle || '',
      seoDescription: item.value.seoDescription || '',
      content: item.value.content,
      postFormat: item.value.postFormat || 'standard',
      formatUrl: item.value.formatUrl || '',
      quoteText: item.value.quoteText || '',
      quoteCitation: item.value.quoteCitation || '',
      imageKey: item.value.imageKey || '',
      categoryId: item.value.categoryId || '',
      tagIds: item.value.tagIds || [],
      typeId: item.value.typeId || '',
      status: item.value.status
    })
    previewUrl.value = item.value.imageUrl || ''
    slugEdited.value = true
  } else {
    formError.value = (error.value as { data?: { statusMessage?: string } } | null)?.data?.statusMessage || `Could not load this ${itemLabel.value}.`
  }
}

watch(() => form.title, (title) => {
  if (!slugEdited.value) {
    form.slug = title.normalize('NFKD').toLowerCase().trim()
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 120)
  }
})

function openFilePicker() {
  fileInput.value?.click()
}

async function uploadImage(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return

  uploadError.value = ''
  formError.value = ''
  saved.value = false
  if (!file.type.startsWith('image/')) {
    uploadError.value = 'Choose an image file.'
    input.value = ''
    return
  }
  if (file.size > 4 * 1024 * 1024) {
    uploadError.value = 'Images must be 4 MB or smaller.'
    input.value = ''
    return
  }

  uploading.value = true
  try {
    const data = new FormData()
    data.append('file', file)
    const uploaded = await $fetch<{ url: string, pathname: string }>('/api/uploads', {
      method: 'POST',
      body: data
    })
    form.imageKey = uploaded.pathname
    previewUrl.value = uploaded.url
  } catch (error) {
    const requestError = error as { data?: { statusMessage?: string } }
    uploadError.value = requestError.data?.statusMessage || 'Image upload failed. Please try again.'
  } finally {
    uploading.value = false
    input.value = ''
  }
}

async function submit() {
  formError.value = ''
  saved.value = false
  if (!form.title.trim() || !form.slug.trim() || !form.imageKey) {
    formError.value = 'Add a title, URL slug, and featured image before saving.'
    return
  }

  saving.value = true
  try {
    const created = await $fetch<{ id: string, slug: string, status: string }>(props.slug ? editEndpoint.value : endpoint.value, {
      method: props.slug ? 'PUT' : 'POST',
      body: { ...form }
    })
    if (created.status === 'published') {
      await navigateTo(isBlog.value ? `/blogs/${created.slug}` : `/projects/${created.slug}`)
    } else {
      saved.value = true
    }
  } catch (error) {
    const requestError = error as { data?: { statusMessage?: string } }
    formError.value = requestError.data?.statusMessage || `Could not save this ${itemLabel.value}. Please try again.`
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div>
    <AdminPageHeader
      :eyebrow="collectionLabel"
      :title="props.slug ? `Edit ${itemLabel}` : `Create ${itemLabel}`"
      :description="isBlog ? (props.slug ? 'Update your article details, story, and sharing settings.' : 'Create an article with a clear title, useful details, and a strong story.') : (props.slug ? 'Update the project overview, story, and publishing settings.' : 'Start with the project basics, then shape the story with flexible content blocks.')"
      :back-to="`/admin/${collection}`"
      :back-label="`Back to ${isBlog ? 'blog posts' : 'projects'}`"
    />
    <nav
      v-if="!isBlog"
      aria-label="Project editor sections"
      class="-mt-2 mb-7 flex flex-wrap gap-2"
    >
      <UButton
        v-for="(step, index) in projectSteps"
        :key="step.href"
        :to="step.href"
        :icon="step.icon"
        color="neutral"
        variant="outline"
        size="sm"
      >
        {{ index + 1 }}. {{ step.label }}
      </UButton>
    </nav>

    <form
      class="grid gap-5 xl:grid-cols-[minmax(0,1fr)_340px]"
      @submit.prevent="submit"
    >
      <div class="min-w-0 space-y-5">
        <AdminSection
          id="project-details"
          :title="isBlog ? 'Article details' : 'Project overview'"
          :description="isBlog ? 'Give readers a helpful first impression and a memorable URL.' : 'Name the work, describe the outcome, and choose where it belongs.'"
        >
          <UFormField
            label="Title"
            required
          >
            <UInput
              id="content-title"
              v-model="form.title"
              required
              maxlength="160"
              autocomplete="off"
              placeholder="A clear, memorable title"
              class="w-full"
            />
          </UFormField>

          <UFormField
            label="URL slug"
            help="Lowercase letters, numbers, and hyphens. You can edit the suggested slug."
            required
          >
            <UFieldGroup class="w-full">
              <UBadge
                color="neutral"
                variant="outline"
                size="lg"
                :label="`/${isBlog ? 'blogs' : 'projects'}/`"
              />
              <UInput
                id="content-slug"
                v-model="form.slug"
                required
                maxlength="120"
                pattern="[a-z0-9]+(-[a-z0-9]+)*"
                autocomplete="off"
                placeholder="your-content-slug"
                class="w-full"
                @input="slugEdited = true"
              />
            </UFieldGroup>
          </UFormField>

          <UFormField label="Summary">
            <UTextarea
              id="content-summary"
              v-model="form.summary"
              :rows="3"
              maxlength="600"
              placeholder="A short introduction for cards and search results."
              class="w-full"
            />
          </UFormField>

          <div
            v-if="isBlog"
            class="space-y-5 border-t border-default pt-5"
          >
            <UFormField
              label="Post format"
              :help="selectedBlogFormat?.description || 'A regular article with a title, summary, and body.'"
            >
              <USelect
                id="blog-post-format"
                v-model="form.postFormat"
                :items="blogPostFormats"
                class="w-full"
              />
            </UFormField>
            <UFormField
              v-if="['link', 'video', 'audio'].includes(form.postFormat)"
              :label="form.postFormat === 'link' ? 'Destination URL' : form.postFormat === 'video' ? 'YouTube or Vimeo URL' : 'Audio file URL'"
              :help="form.postFormat === 'video' ? 'Video embeds are limited to YouTube and Vimeo.' : undefined"
              required
            >
              <UInput
                id="blog-format-url"
                v-model="form.formatUrl"
                type="url"
                maxlength="2048"
                required
                :placeholder="form.postFormat === 'video' ? 'https://youtu.be/… or https://vimeo.com/…' : 'https://…'"
                class="w-full"
              />
            </UFormField>
            <template v-if="form.postFormat === 'quote'">
              <UFormField
                label="Quotation"
                required
              >
                <UTextarea
                  id="blog-quote-text"
                  v-model="form.quoteText"
                  :rows="3"
                  maxlength="6000"
                  required
                  placeholder="Write the quotation."
                  class="w-full"
                />
              </UFormField>
              <UFormField
                label="Attribution"
                hint="Optional"
              >
                <UInput
                  id="blog-quote-citation"
                  v-model="form.quoteCitation"
                  maxlength="240"
                  placeholder="Author or source"
                  class="w-full"
                />
              </UFormField>
            </template>
          </div>

          <details
            class="group border-t border-default pt-5"
            :open="isBlog"
          >
            <summary class="flex cursor-pointer list-none items-center justify-between gap-3 rounded-sm text-xs font-semibold uppercase tracking-[0.16em] text-toned focus-visible:outline-2 focus-visible:outline-primary [&::-webkit-details-marker]:hidden">
              Search &amp; social preview
              <UIcon
                name="i-lucide-chevron-down"
                class="size-4 text-muted transition-transform group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>
            <p class="mt-2 text-xs leading-5 text-muted">
              Optional overrides for search and social cards. Leave blank to use your title and summary.
            </p>
            <div class="mt-5 space-y-5">
              <UFormField label="SEO title">
                <UInput
                  id="content-seo-title"
                  v-model="form.seoTitle"
                  maxlength="180"
                  :placeholder="form.title || 'Search result title'"
                  class="w-full"
                />
              </UFormField>
              <UFormField label="SEO description">
                <UTextarea
                  id="content-seo-description"
                  v-model="form.seoDescription"
                  :rows="3"
                  maxlength="500"
                  :placeholder="form.summary || 'Search result description'"
                  class="w-full"
                />
              </UFormField>
            </div>
          </details>

          <div class="grid gap-5 border-t border-default pt-5 sm:grid-cols-2">
            <UFormField
              v-if="isBlog"
              label="Category"
            >
              <USelect
                v-model="categoryModel"
                :items="categoryOptions"
                class="w-full"
              />
            </UFormField>
            <UFormField
              v-if="isBlog"
              label="Tags"
            >
              <USelectMenu
                v-model="form.tagIds"
                :items="tags"
                value-key="id"
                label-key="title"
                multiple
                placeholder="Choose tags"
                class="w-full"
              />
            </UFormField>
            <UFormField
              v-if="!isBlog"
              label="Work type"
            >
              <USelect
                v-model="typeModel"
                :items="workTypeOptions"
                class="w-full"
              />
            </UFormField>
          </div>

          <details
            v-if="!isBlog"
            class="group border-t border-default pt-5"
          >
            <summary class="flex cursor-pointer list-none items-center justify-between gap-3 rounded-sm text-xs font-semibold uppercase tracking-[0.16em] text-toned focus-visible:outline-2 focus-visible:outline-primary [&::-webkit-details-marker]:hidden">
              Case study checklist
              <UIcon
                name="i-lucide-chevron-down"
                class="size-4 text-muted transition-transform group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>
            <p class="mt-2 text-xs leading-5 text-muted">
              Use the story blocks below to show the work behind the project. Stick to details you can verify; omit metrics or outcomes that are not documented.
            </p>
            <ul class="mt-3 grid gap-2 text-xs leading-5 text-muted sm:grid-cols-2">
              <li><span class="font-medium text-highlighted">Context:</span> Who was the work for, and what problem needed solving?</li>
              <li><span class="font-medium text-highlighted">Role:</span> What did you own, and what constraints shaped the work?</li>
              <li><span class="font-medium text-highlighted">Process:</span> Which decisions, iterations, or milestones changed the direction?</li>
              <li><span class="font-medium text-highlighted">Implementation:</span> Explain the system, tools, and technical challenges.</li>
              <li><span class="font-medium text-highlighted">Outcome:</span> Describe what shipped and include measurable impact only when verified.</li>
              <li><span class="font-medium text-highlighted">Evidence:</span> Add captioned screenshots or a gallery to show the finished work.</li>
            </ul>
            <p class="mt-3 text-xs leading-5 text-muted">
              Timeline, stats, and gallery blocks can help make the story easier to scan.
            </p>
          </details>
        </AdminSection>

        <AdminContentBlocks
          v-model="form.content"
          @uploading="uploadingBlocks = $event"
        />
        <p class="text-xs text-dimmed">
          {{ wordCount }} words · about {{ readingMinutes }} min read
        </p>
      </div>

      <aside class="space-y-5 xl:sticky xl:top-24 xl:self-start">
        <AdminSection
          title="Featured image"
          :description="`Choose an image to represent this ${itemLabel}.`"
        >
          <template #actions>
            <UBadge
              color="primary"
              variant="subtle"
              size="sm"
            >
              Required
            </UBadge>
          </template>
          <img
            v-if="previewUrl"
            :src="previewUrl"
            :alt="form.title ? `${form.title} cover` : 'Featured image preview'"
            class="aspect-[16/10] w-full rounded-lg border border-default object-cover"
          >
          <div
            v-else
            class="flex aspect-[16/10] flex-col items-center justify-center rounded-lg border border-dashed border-accented px-4 text-center"
          >
            <UIcon
              name="i-lucide-image-plus"
              class="size-6 text-dimmed"
              aria-hidden="true"
            />
            <p class="mt-3 text-xs text-toned">
              No image selected
            </p>
            <p class="mt-1 text-[10px] text-dimmed">
              PNG, JPG, WebP, AVIF or GIF · converted to WebP · up to 4 MB
            </p>
          </div>
          <input
            ref="fileInput"
            type="file"
            accept="image/avif,image/gif,image/jpeg,image/png,image/webp"
            class="sr-only"
            tabindex="-1"
            aria-hidden="true"
            @change="uploadImage"
          >
          <UButton
            color="neutral"
            variant="outline"
            icon="i-lucide-upload"
            block
            :loading="uploading"
            :aria-label="previewUrl ? 'Replace featured image' : 'Upload featured image'"
            :title="previewUrl ? 'Replace the image used on project cards and social previews' : 'Choose the image used on project cards and social previews'"
            @click="openFilePicker"
          >
            {{ uploading ? 'Uploading image…' : previewUrl ? 'Replace image' : 'Upload image' }}
          </UButton>
          <UAlert
            v-if="uploadError"
            role="alert"
            color="error"
            variant="subtle"
            icon="i-lucide-circle-alert"
            :title="uploadError"
          />
        </AdminSection>

        <AdminSection
          id="project-publishing"
          :title="isBlog ? 'Publish article' : 'Review & publish'"
        >
          <UFormField
            label="Status"
            :help="isBlog ? 'Drafts are saved privately and stay hidden from visitors.' : 'Drafts stay private. Publish only when your project story is ready to share.'"
          >
            <USelect
              id="content-status"
              v-model="form.status"
              :items="statusOptions"
              class="w-full"
            />
          </UFormField>
          <UAlert
            v-if="formError"
            role="alert"
            color="error"
            variant="subtle"
            icon="i-lucide-circle-alert"
            :title="formError"
          />
          <UAlert
            v-if="saved"
            role="status"
            color="success"
            variant="subtle"
            icon="i-lucide-circle-check"
            :title="props.slug ? 'Changes saved.' : `Draft saved. You can create another ${itemLabel} or return to the listing.`"
          />
          <UButton
            type="submit"
            icon="i-lucide-check"
            size="lg"
            block
            :loading="saving"
            :disabled="saving || uploading || uploadingBlocks"
          >
            {{ saving ? 'Saving…' : form.status === 'published' ? `Publish ${itemLabel}` : form.status === 'archived' ? `Archive ${itemLabel}` : props.slug ? 'Save changes' : 'Save draft' }}
          </UButton>
        </AdminSection>
      </aside>
    </form>
  </div>
</template>
