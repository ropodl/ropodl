<script setup lang="ts">
import { useApiFetch } from '~/utils/shared/useApiFetch';
import type { Portfolio, PortfolioType } from '~/types/portfolio';
import { useRoute, useRouter } from 'vue-router';
import Editor from '~/components/admin/shared/Editor.vue';
import MediaSelector from '~/components/admin/shared/MediaSelector.vue';
import { useAuth } from '~/composables/admin/auth/useAuth';

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
const { can } = useAuth();

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
    const data = await useApiFetch<Portfolio>(`admin/portfolio/${route.params.id}`);
    form.value = { ...data };
    
    // Fetch featured image URL for preview if ID exists
    if (form.value.featuredImageId) {
       const media = await useApiFetch<any>(`admin/media/${form.value.featuredImageId}`);
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
    const url = isEditing.value ? `admin/portfolio/${route.params.id}` : 'admin/portfolio';
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
watch(() => form.value.title, (newTitle) => {
  if (!isEditing.value && newTitle) {
    form.value.slug = newTitle
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  }
});

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
  <v-container>
    <v-form ref="portfolioForm" @submit.prevent="save">
      <v-row align="center" class="mb-4">
        <v-col cols="12" md="6">
          <v-btn
            variant="text"
            prepend-icon="carbon:arrow-left"
            class="mb-2"
            to="/admin/portfolio"
          >
            Back to Portfolios
          </v-btn>
          <div class="text-h4 font-weight-bold">
            {{ isEditing ? 'Edit Portfolio' : 'Create New Portfolio' }}
          </div>
        </v-col>
        <v-col cols="12" md="6" class="text-right">
          <v-btn
            v-if="isEditing ? can('portfolio.update') : can('portfolio.create')"
            color="primary"
            size="large"
            rounded="lg"
            :loading="saving"
            type="submit"
          >
            {{ isEditing ? 'Update' : 'Publish' }} Portfolio
          </v-btn>
        </v-col>
      </v-row>

      <v-row v-if="loading">
        <v-col cols="12">
          <v-progress-linear indeterminate color="primary" />
        </v-col>
      </v-row>

      <v-row v-else>
        <!-- Main Content -->
        <v-col cols="12" md="8">
          <v-card rounded="lg" elevation="0" border class="mb-6">
            <v-card-text>
              <v-text-field
                v-model="form.title"
                label="Portfolio Title"
                placeholder="Name of your project"
                variant="outlined"
                rounded="lg"
                :rules="[rules.required]"
                class="mb-2"
              />
              <v-text-field
                v-model="form.slug"
                label="Slug"
                placeholder="project-slug"
                variant="outlined"
                rounded="lg"
                :rules="[rules.required]"
                class="mb-4"
              />
              <div class="text-subtitle-1 font-weight-bold mb-2">Project Content</div>
              <Editor v-model:content="form.content" />
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Sidebar -->
        <v-col cols="12" md="4">
          <!-- Featured Image -->
          <v-card rounded="lg" elevation="0" border class="mb-6">
            <v-card-title class="pa-4 text-subtitle-1 font-weight-bold">Featured Image</v-card-title>
            <v-divider />
            <v-card-text class="pa-4 text-center">
              <v-img
                v-if="previewImage"
                :src="previewImage"
                height="200"
                cover
                rounded="lg"
                class="mb-4 bg-grey-lighten-4"
              />
              <v-btn
                variant="tonal"
                prepend-icon="carbon:image"
                block
                rounded="lg"
                @click="mediaDialog = true"
              >
                {{ previewImage ? 'Change' : 'Select' }} Image
              </v-btn>
              <MediaSelector v-model="mediaDialog" @select="onMediaSelect" />
              <v-input :rules="[rules.required]" v-model="form.featuredImageId" hide-details="auto" density="compact" />
            </v-card-text>
          </v-card>

          <!-- Settings -->
          <v-card rounded="lg" elevation="0" border class="mb-6">
            <v-card-title class="pa-4 text-subtitle-1 font-weight-bold">Settings</v-card-title>
            <v-divider />
            <v-card-text class="pa-4">
              <v-select
                v-model="form.workTypeId"
                label="Work Type"
                :items="types"
                item-title="title"
                item-value="id"
                variant="outlined"
                rounded="lg"
                placeholder="Category"
                class="mb-4"
              />
              <v-select
                v-model="form.status"
                label="Status"
                :items="statusOptions"
                variant="outlined"
                rounded="lg"
                class="mb-2"
              />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>
