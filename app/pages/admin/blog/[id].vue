<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import type { blog } from '~/types/blog';
import Editor from '~/components/admin/shared/Editor.vue';
import MediaSelector from '~/components/admin/shared/MediaSelector.vue';
import useApiFetch from '~/utils/shared/useApiFetch';

definePageMeta({
  layout: 'admin',
  middleware: ['is-auth'],
});

const route = useRoute();
const router = useRouter();
const id = route.params.id as string;
const isEditing = computed(() => id !== 'create');

const loading = ref(false);
const saving = ref(false);
const showMediaSelector = ref(false);

const form = ref({
  title: '',
  slug: '',
  content: '',
  excerpt: '',
  featured_image_id: null as number | null,
  featured_image_url: null as string | null,
  status: 'draft' as 'draft' | 'published',
  categoryId: null as number | null,
  tagIds: [] as number[],
});

const categories = ref<{ id: number; title: string }[]>([]);
const tags = ref<{ id: number; title: string }[]>([]);

// Quick Create State
const catDialog = ref(false);
const tagDialog = ref(false);
const quickLoading = ref(false);
const quickForm = ref({ title: '', slug: '', excerpt: '' });
const qFormRef = ref();

const resetQuickForm = () => {
  quickForm.value = { title: '', slug: '', excerpt: '' };
};

const watchTitle = watch(
  () => quickForm.value.title,
  (newVal) => {
    if (newVal) {
      quickForm.value.slug = newVal
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');
    }
  }
);

const saveQuickCategory = async () => {
  const { valid } = await qFormRef.value.validate();
  if (!valid) return;

  quickLoading.value = true;
  try {
    const res = await useApiFetch<any>('admin/blog/category', {
      method: 'POST',
      body: quickForm.value,
    });
    if (res.success) {
      await fetchMetadata();
      form.value.categoryId = res.data.id;
      catDialog.value = false;
    }
  } catch (err) {
    console.error(err);
  } finally {
    quickLoading.value = false;
  }
};

const saveQuickTag = async () => {
  const { valid } = await qFormRef.value.validate();
  if (!valid) return;

  quickLoading.value = true;
  try {
    const res = await useApiFetch<any>('admin/blog/tag', {
      method: 'POST',
      body: quickForm.value,
    });
    if (res.success) {
      await fetchMetadata();
      if (!form.value.tagIds.includes(res.data.id)) {
        form.value.tagIds.push(res.data.id);
      }
      tagDialog.value = false;
    }
  } catch (err) {
    console.error(err);
  } finally {
    quickLoading.value = false;
  }
};

const fetchMetadata = async () => {
  try {
    const [catData, tagData] = await Promise.all([
      useApiFetch<any[]>('admin/blog/category'),
      useApiFetch<any[]>('admin/blog/tag'),
    ]);
    categories.value = catData;
    tags.value = tagData;
  } catch (error) {
    console.error('Failed to fetch metadata:', error);
  }
};

const fetchBlog = async () => {
  await fetchMetadata();
  if (!isEditing.value) return;

  loading.value = true;
  try {
    const res = await useApiFetch<any>(`admin/blog/${id}`);
    if (res.success && res.data) {
      const data = res.data;
      form.value = {
        title: data.title,
        slug: data.slug,
        content: data.content,
        excerpt: data.excerpt || '',
        featured_image_id: data.featured,
        featured_image_url: data.featured_image_url || null,
        status: data.status,
        categoryId: data.categoryId,
        tagIds: data.tags?.map((t: any) => t.id) || [],
      };
    }
  } catch (error) {
    console.error('Failed to fetch blog:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchBlog);

const rules = {
  title: [
    (v: string) => !!v || 'Blog Title is required',
    (v: string) =>
      v.length <= 100 || 'Blog Title must be 100 characters or less',
  ],
  slug: [
    (v: string) => !!v || 'Slug is required',
    (v: string) =>
      !v || v.length <= 120 || 'Blog Slug must be 120 characters or less',
  ],
};

const blogForm = ref();

const handleImageSelected = (url: string, id: number) => {
  form.value.featured_image_url = url;
  form.value.featured_image_id = id;
};

const removeImage = () => {
  form.value.featured_image_url = null;
  form.value.featured_image_id = null;
};

const submit = async () => {
  const { valid } = await blogForm.value.validate();
  if (!valid) return;

  saving.value = true;
  const endpoint = isEditing.value ? `admin/blog/${id}` : 'admin/blog';
  const method = isEditing.value ? 'PATCH' : 'POST';

  await useApiFetch<any>(endpoint, {
    method,
    body: form.value,
  })
    .then((res) => {
      if (res.success) {
        router.push(`/admin/blog/${res.data.id}`);
      }
    })
    .catch((err) => {
      console.error('Form Submission error', err);
    })
    .finally(() => {
      saving.value = false;
    });
};

const statusOptions = [
  { title: 'Draft', value: 'draft' },
  { title: 'Published', value: 'published' },
] as const;
</script>

<template>
  <v-container v-if="!loading">
    <v-form ref="blogForm" @submit.prevent="submit">
      <v-row>
        <v-col cols="12" md="8">
          <v-label>Blog Title</v-label>
          <v-text-field
            v-model="form.title"
            placeholder="eg. Lorem ipsum dolor."
            :rules="rules.title"
          />

          <v-label>Blog Slug</v-label>
          <v-text-field
            v-model="form.slug"
            placeholder="eg. lorem-ipsum-dolor"
            :rules="rules.slug"
          />

          <v-label>Blog Content</v-label>
          <client-only>
            <Editor v-model:content="form.content" />
            <template #fallback>
              <div class="text-center pa-4">Loading Editor...</div>
            </template>
          </client-only>

          <v-label class="mt-4">Excerpt</v-label>
          <v-textarea
            v-model="form.excerpt"
            placeholder="Provide a brief summary..."
            rows="3"
          />
        </v-col>

        <v-col cols="12" md="4">
          <v-btn
            block
            type="submit"
            color="primary"
            class="mb-3"
            :loading="saving"
          >
            Submit
          </v-btn>
          <v-card class="mb-3">
            <v-card-text class="pb-0">
              <v-label>Status</v-label>
            </v-card-text>
            <v-card-text class="pt-0">
              <v-select
                v-model="form.status"
                hide-details
                :items="statusOptions"
                placeholder="Blog Status"
              />
            </v-card-text>
          </v-card>

          <v-card class="mb-3">
            <v-card-text class="pb-0">
              <v-label>Category & Tags</v-label>
            </v-card-text>
            <v-card-text class="pt-0">
              <div class="d-flex align-center gap-2 mb-3">
                <v-select
                  v-model="form.categoryId"
                  label="Category"
                  :items="categories"
                  item-title="title"
                  item-value="id"
                  variant="outlined"
                  rounded="lg"
                  hide-details
                  clearable
                />
                <v-btn
                  icon="carbon:add"
                  variant="tonal"
                  rounded="lg"
                  color="primary"
                  @click="
                    resetQuickForm();
                    catDialog = true;
                  "
                />
              </div>
              <div class="d-flex align-center gap-2">
                <v-autocomplete
                  v-model="form.tagIds"
                  label="Tags"
                  :items="tags"
                  item-title="title"
                  item-value="id"
                  variant="outlined"
                  rounded="lg"
                  multiple
                  chips
                  closable-chips
                  hide-details
                />
                <v-btn
                  icon="carbon:add"
                  variant="tonal"
                  rounded="lg"
                  color="primary"
                  @click="
                    resetQuickForm();
                    tagDialog = true;
                  "
                />
              </div>
            </v-card-text>
          </v-card>

          <v-card class="mb-3">
            <v-card-text class="pb-0">
              <v-label>Featured Image</v-label>
            </v-card-text>
            <v-card-text class="pt-0">
              <v-hover v-slot="{ isHovering, props }">
                <v-card
                  v-bind="props"
                  border
                  height="200"
                  class="d-flex align-center justify-center cursor-pointer w-100"
                  @click="showMediaSelector = true"
                >
                  <template v-if="form.featured_image_url">
                    <v-img
                      :src="form.featured_image_url"
                      cover
                      class="h-100"
                      content-class="w-100 h-100 d-flex align-center justify-center"
                    >
                      <template v-if="isHovering">
                        <div
                          class="w-100 h-100 d-flex align-center justify-center"
                          style="
                            background-color: rgba(var(--v-theme-surface), 0.4);
                          "
                        >
                          <v-btn
                            icon="carbon:close"
                            rounded="circle"
                            color="primary"
                            variant="flat"
                            @click.stop="removeImage"
                          />
                        </div>
                      </template>
                    </v-img>
                  </template>
                  <template v-else>
                    <div class="text-center">
                      <v-icon size="32" icon="mdi-cloud-upload" />
                      <div class="text-h6 font-weight-medium">
                        Select Featured image
                      </div>
                      <div class="text-caption">
                        Select an image to set as featured image
                      </div>
                      <!-- <v-btn border class="mt-2">Browse</v-btn> -->
                    </div>
                  </template>
                </v-card>
              </v-hover>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-form>

    <MediaSelector
      v-model="showMediaSelector"
      @select="(url, id) => handleImageSelected(url, id)"
    />

    <!-- Quick Create Dialog -->
    <v-dialog v-model="catDialog" max-width="450">
      <v-card rounded="xl">
        <v-card-title class="pa-4 font-weight-bold"
          >Quick New Category</v-card-title
        >
        <v-divider />
        <v-card-text class="pa-4">
          <v-form ref="qFormRef">
            <v-text-field
              v-model="quickForm.title"
              label="Category Title"
              placeholder="e.g. Technology"
              variant="outlined"
              rounded="lg"
              class="mb-2"
              :rules="[
                (v) => !!v || 'Required',
                (v) => v.length <= 60 || 'Too long',
              ]"
            />
            <v-text-field
              v-model="quickForm.slug"
              label="Slug"
              variant="outlined"
              rounded="lg"
              class="mb-2"
              :rules="[(v) => !!v || 'Required']"
            />
          </v-form>
        </v-card-text>
        <v-divider />
        <v-card-actions class="pa-4">
          <v-spacer />
          <v-btn variant="text" rounded="lg" @click="catDialog = false"
            >Cancel</v-btn
          >
          <v-btn
            color="primary"
            variant="flat"
            rounded="lg"
            :loading="quickLoading"
            @click="saveQuickCategory"
            >Create</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="tagDialog" max-width="450">
      <v-card rounded="xl">
        <v-card-title class="pa-4 font-weight-bold">Quick New Tag</v-card-title>
        <v-divider />
        <v-card-text class="pa-4">
          <v-form ref="qFormRef">
            <v-text-field
              v-model="quickForm.title"
              label="Tag Name"
              placeholder="e.g. NuxtJS"
              variant="outlined"
              rounded="lg"
              class="mb-2"
              :rules="[
                (v) => !!v || 'Required',
                (v) => v.length <= 60 || 'Too long',
              ]"
            />
            <v-text-field
              v-model="quickForm.slug"
              label="Slug"
              variant="outlined"
              rounded="lg"
              class="mb-2"
              :rules="[(v) => !!v || 'Required']"
            />
          </v-form>
        </v-card-text>
        <v-divider />
        <v-card-actions class="pa-4">
          <v-spacer />
          <v-btn variant="text" rounded="lg" @click="tagDialog = false"
            >Cancel</v-btn
          >
          <v-btn
            color="primary"
            variant="flat"
            rounded="lg"
            :loading="quickLoading"
            @click="saveQuickTag"
            >Create</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>

  <v-container v-else class="fill-height d-flex align-center justify-center">
    <v-progress-circular indeterminate color="primary" size="64" />
  </v-container>
</template>
