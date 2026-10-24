<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
interface EditablePage { slug: string, label: string, content: Record<string, string>, seoTitle: string, seoDescription: string }
const route = useRoute()
const toast = useToast()
const saving = ref(false)
const { data: page, error } = await useFetch<EditablePage>(() => `/api/admin/pages/${route.params.slug}`)
const fieldLabels: Record<string, string> = {
  heading: 'Heading', description: 'Description', button: 'Button label', eyebrow: 'Eyebrow', paragraph1: 'Paragraph 1', paragraph2: 'Paragraph 2', paragraph3: 'Paragraph 3', valueEyebrow: 'Value proposition eyebrow', valueHeading: 'Value proposition heading', valueDescription: 'Value proposition description', skills: 'Skills and tools (comma separated)', howIWorkEyebrow: 'How I work eyebrow', howIWorkTitle: 'How I work heading', howIWorkIntro: 'How I work introduction', howIWorkSteps: 'How I work steps (one per line: title | description)', journey: 'Experience section label', experienceTitle: 'Experience heading', experienceIntro: 'Experience introduction', experience: 'Experience entries (one per line: role | company | dates | optional highlights separated by ;)', educationEyebrow: 'Education eyebrow', educationTitle: 'Education heading', educationIntro: 'Education introduction', education: 'Education entries (one per line: qualification | institution | dates)', email: 'Email', location: 'Location'
}

async function save() {
  if (!page.value || saving.value) return
  saving.value = true
  try {
    await $fetch(`/api/admin/pages/${page.value.slug}`, { method: 'PUT', body: page.value })
    toast.add({ title: 'Page saved', color: 'success' })
  } catch (cause: unknown) {
    toast.add({ title: 'Could not save page', description: cause instanceof Error ? cause.message : 'Try again.', color: 'error' })
  } finally { saving.value = false }
}
</script>

<template>
  <AdminShell>
    <div class="mx-auto max-w-4xl">
      <AdminPageHeader
        :title="page?.label || 'Page'"
        description="Edit visible copy and search/social metadata."
        back-to="/admin/pages"
        back-label="Pages"
      >
        <template #actions>
          <UButton
            :loading="saving"
            :disabled="!page"
            @click="save"
          >
            Save changes
          </UButton>
        </template>
      </AdminPageHeader>
      <div class="space-y-5">
        <UAlert
          v-if="error"
          role="alert"
          color="error"
          variant="subtle"
          icon="i-lucide-circle-alert"
          title="Page could not be loaded"
          description="Try returning to Pages and opening it again."
        />
        <template v-if="page">
          <AdminSection
            title="Page content"
            description="Each field controls the matching text shown on the public page."
          >
            <UFormField
              v-for="(value, key) in page.content"
              :key="key"
              :label="fieldLabels[key] || key"
            >
              <UTextarea
                v-model="page.content[key]"
                :rows="['description', 'paragraph1', 'paragraph2', 'paragraph3', 'valueDescription', 'howIWorkIntro', 'howIWorkSteps', 'experienceIntro', 'experience', 'educationIntro', 'education'].includes(key) ? 4 : 2"
                autoresize
                class="w-full"
              />
            </UFormField>
          </AdminSection>
          <AdminSection
            title="SEO and social preview"
            description="The same title and description generate a page specific Open Graph image."
          >
            <UFormField label="SEO title">
              <UInput
                v-model="page.seoTitle"
                maxlength="180"
                class="w-full"
              />
            </UFormField>
            <UFormField label="SEO description">
              <UTextarea
                v-model="page.seoDescription"
                maxlength="500"
                :rows="3"
                class="w-full"
              />
            </UFormField>
            <figure>
              <img
                :src="`/og.svg?title=${encodeURIComponent(page.seoTitle)}&description=${encodeURIComponent(page.seoDescription)}`"
                alt="Generated social sharing preview"
                class="aspect-[1200/630] w-full rounded-lg border border-default object-cover"
              >
              <figcaption class="mt-2 text-xs text-muted">
                Live Open Graph image preview
              </figcaption>
            </figure>
          </AdminSection>
          <div class="flex justify-end">
            <UButton
              :loading="saving"
              @click="save"
            >
              Save changes
            </UButton>
          </div>
        </template>
      </div>
    </div>
  </AdminShell>
</template>
