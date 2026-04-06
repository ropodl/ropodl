<script setup lang="ts">
import { useApiFetch } from '~/utils/shared/useApiFetch';
import type { Portfolio, PortfolioType } from '~/types/portfolio';
import { useRoute, useRouter } from 'vue-router';
import Editor from '~/components/admin/shared/Editor.vue';
import MediaSelector from '~/components/admin/shared/MediaSelector.vue';

definePageMeta({
  layout: 'admin',
  middleware: ['is-auth'],
});

const route = useRoute();
const router = useRouter();
const isEditing = computed(() => route.params.id !== 'create');

const form = ref<Partial<Portfolio>>({
  title: '',
  slug: '',
  content: '',
  featuredImageId: 0,
  workTypeId: null,
  status: 'draft',
});

const types = ref<PortfolioType[]>([]);
const loading = ref(false);
const saving = ref(false);
const portfolioForm = ref();

const fetchTypes = async () => {
  try {
    types.value = await useApiFetch<PortfolioType[]>('admin/work-type');
  } catch (err) {
    console.error('Failed to fetch types', err);
  }
};

const mediaDialog = ref(false);
const previewImage = ref('');

const onMediaSelect = (url: string, id: number) => {
  form.value.featuredImageId = id;
  previewImage.value = url;
  mediaDialog.value = false;
};

const fetchPortfolio = async () => {
  if (!isEditing.value) return;
  loading.value = true;
  try {
    const data = await useApiFetch<Portfolio>(
      `admin/portfolio/${route.params.id}`
    );
    form.value = { ...data };

    // Fetch featured image URL for preview if ID exists
    if (form.value.featuredImageId) {
      const media = await useApiFetch<any>(
        `admin/media/${form.value.featuredImageId}`
      );
      previewImage.value = media.fileUrl;
    }
  } catch (err) {
    console.error('Failed to fetch portfolio', err);
  } finally {
    loading.value = false;
  }
};

const save = async () => {
  const { valid } = await portfolioForm.value.validate();
  if (!valid) return;

  saving.value = true;
  try {
    const url = isEditing.value
      ? `admin/portfolio/${route.params.id}`
      : 'admin/portfolio';
    const method = isEditing.value ? 'PATCH' : 'POST';

    await useApiFetch(url, {
      method,
      body: form.value,
    });

    router.push('/admin/portfolio');
  } catch (err) {
    console.error('Failed to save portfolio', err);
  } finally {
    saving.value = false;
  }
};

// Auto-slugify
watch(
  () => form.value.title,
  (newTitle) => {
    if (!isEditing.value && newTitle) {
      form.value.slug = newTitle
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');
    }
  }
);

onMounted(() => {
  fetchTypes();
  fetchPortfolio();
});

const statusOptions = [
  { title: 'Draft', value: 'draft' },
  { title: 'Published', value: 'published' },
  { title: 'Archived', value: 'archived' },
];

const rules = {
  required: (v: any) => !!v || 'Required',
};
</script>

<template>
  <v-container class="admin-page">
    <v-form ref="portfolioForm" @submit.prevent="save">
      <section class="admin-hero">
        <div class="admin-hero__kicker">Case study builder</div>
        <div class="admin-hero__title">
          {{ isEditing ? 'Refine the case study story.' : 'Stage the next portfolio release.' }}
        </div>
        <div class="admin-hero__copy">
          Build richer project pages with stronger framing, better visuals, and cleaner categorization.
        </div>
      </section>

      <v-row v-if="loading">
        <v-col cols="12">
          <v-progress-linear indeterminate color="primary" />
        </v-col>
      </v-row>

      <div v-else class="admin-form-grid">
        <div class="admin-stack">
          <v-card class="admin-panel">
            <v-card-text class="pa-6">
              <div class="admin-panel__title">Project framing</div>
              <div class="admin-panel__copy">
                Name the project, define the URL, and write the narrative body.
              </div>

              <v-text-field
                v-model="form.title"
                label="Portfolio Title"
                placeholder="Name of your project"
                variant="outlined"
                rounded="xl"
                :rules="[rules.required]"
                class="mt-6 mb-2"
              />
              <v-text-field
                v-model="form.slug"
                label="Slug"
                placeholder="project-slug"
                variant="outlined"
                rounded="xl"
                :rules="[rules.required]"
                class="mb-4"
              />
              <div class="admin-panel__title">Project Content</div>
              <Editor v-model:content="form.content" />
            </v-card-text>
          </v-card>

        </div>

        <div class="admin-stack">
          <v-card class="admin-panel">
            <v-card-text class="pa-6">
              <div class="admin-panel__title">Release controls</div>
              <div class="admin-panel__copy">
                Publish when the project is presentation-ready.
              </div>
              <v-btn
                color="primary"
                size="large"
                rounded="xl"
                block
                class="mt-6 mb-4"
                :loading="saving"
                type="submit"
              >
                {{ isEditing ? 'Update Portfolio' : 'Publish Portfolio' }}
              </v-btn>
              <v-select
                v-model="form.status"
                label="Status"
                :items="statusOptions"
                variant="outlined"
                rounded="xl"
                class="mb-2"
              />
            </v-card-text>
          </v-card>

          <v-card class="admin-panel">
            <v-card-text class="pa-6">
              <div class="admin-panel__title">Featured image</div>
              <div class="admin-panel__copy">
                Select the hero visual that carries the project card and detail page.
              </div>
              <div
                class="admin-feature-frame mt-6"
                :class="{ 'admin-feature-frame--empty': !previewImage }"
                @click="mediaDialog = true"
              >
                <template v-if="previewImage">
                  <v-img
                    :src="previewImage"
                    min-height="260"
                    cover
                  />
                  <div class="admin-feature-frame__overlay">
                    <v-btn rounded="xl" color="primary">Change image</v-btn>
                  </div>
                </template>
                <template v-else>
                  <div class="text-center">
                    <v-icon size="44" icon="carbon:image" />
                    <div class="text-h6 font-weight-bold mt-3">Select hero media</div>
                    <div class="text-body-2 text-medium-emphasis mt-1">
                      Add a visual anchor for the portfolio card.
                    </div>
                  </div>
                </template>
              </div>
              <MediaSelector v-model="mediaDialog" @select="onMediaSelect" />
              <v-input
                v-model="form.featuredImageId"
                :rules="[rules.required]"
                hide-details="auto"
                density="compact"
              />
            </v-card-text>
          </v-card>

          <v-card class="admin-panel">
            <v-card-text class="pa-6">
              <div class="admin-panel__title">Classification</div>
              <div class="admin-panel__copy">
                Tie the project to the right work type before it goes live.
              </div>
              <v-select
                v-model="form.workTypeId"
                label="Work Type"
                :items="types"
                item-title="title"
                item-value="id"
                variant="outlined"
                rounded="xl"
                placeholder="Category"
                class="mt-6 mb-2"
              />
            </v-card-text>
          </v-card>
        </div>
      </div>
    </v-form>
  </v-container>
</template>
