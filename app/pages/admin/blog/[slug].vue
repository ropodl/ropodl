<script setup lang="ts">
// import { snackbar } from '@/composables/snack';
// import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue';
import type { blog } from '~/types/blog';
// import slugify from '@/utils/slugify';
// import { Head, router, useForm } from '@inertiajs/vue3';
// import { useObjectUrl } from '@vueuse/core';
// import { computed, defineAsyncComponent, ref, watch } from 'vue';

// const breadcrumbs = defineAsyncComponent(() => import('@/components/admin/layout/breadcrumbs.vue'));
// const editor = defineAsyncComponent(() => import('@/components/admin/shared/Editor.vue'));

// const { setSnackbar } = snackbar();

// const { blog } = defineProps<{
//   blog?: blog;
//   // tags: PortfolioType[];
// }>();
definePageMeta({
  layout: "admin",
  middleware: ['is-auth']
})

const blog = ref<blog>({
  title: null,
  slug: null,
  content: null,
  featured_image: null,
  status: null
})

const form = ref({
  title: blog.value?.title ?? '',
  slug: blog.value?.slug ?? '',
  content: blog.value?.content ?? '',
  featured_image: blog.value?.featured_image ?? (null as File | string | null),
  status: blog.value?.status ?? 'draft',
});

// Auto-generate slug from title only for new portfolios
// watch(
//   () => form.title,
//   (title) => {
//     if (!blog?.slug) {
//       form.slug = slugify(title, {
//         maxLength: 70,
//       });
//     }
//   },
// );

const rules = {
  title: [
    (v: string) => !!v || 'Blog Title is required',
    (v: string) => v.length <= 100 || 'Blog Title must be 100 characters or less',
  ],
  slug: [(v: string) => !v || v.length <= 70 || 'Blog Slug must be 70 characters or less'],
  featured_image: [
    (v?: File[]) => {
      if (!v || v.length === 0) return true;
      const file = v[0];
      if (file?.size > 5120 * 1024) {
        return 'File size must be less than 5MB';
      }
      return true;
    },
  ],
};

const blogForm = ref();
const fileBrowser = ref<HTMLInputElement | null>(null);
const fileSelected = ref<File | null>(null);

// Compute image preview URL
// const imagePreviewUrl = computed(() => {
//   if (fileSelected.value) {
//     return useObjectUrl(fileSelected.value).value;
//   }
//   return null;
// });

// Determine which image to show
// const displayImageUrl = computed(() => {
//   if (imagePreviewUrl.value) {
//     return imagePreviewUrl.value;
//   }
//   if (blog?.id && typeof form.featured_image === 'string') {
//     return form.featured_image;
//   }
//   return null;
// });

// const uploadFile = (event: Event) => {
//   const target = event.target as HTMLInputElement;
//   if (target.files?.[0]) {
//     fileSelected.value = target.files[0];
//     form.featured_image = fileSelected.value;
//   }
// };

// const removeImage = () => {
//   fileSelected.value = null;
//   form.featured_image = null;
//   if (fileBrowser.value) {
//     fileBrowser.value.value = '';
//   }
// };

const fileSelector = () => {
  fileBrowser.value?.click();
};

const submit = async () => {
  // const { valid } = await blogForm.value.validate();

  // if (!valid) return;

  // const routeName = blog?.id ? 'blog.update' : 'blog.store';
  // const routeParams = blog?.id ? [blog.id] : [];

  // form.post(route(routeName, routeParams), {
  //   forceFormData: true,
  //   preserveScroll: false,
  //   onSuccess: () => {
  //     console.log('Form submitted successfully');
  //   },
  //   onError: () => {
  //     setSnackbar('Form Submission error', 'error');
  //   },
  // });
};

// const breadcrumbItems = computed(() => [
//   {
//     title: 'blog',
//     href: '/admin/blog',
//   },
//   {
//     title: blog ? 'edit' : 'create',
//     href: blog ? `/admin/blog/${blog.id}` : '/admin/blog/create',
//   },
// ]);

const statusOptions = [
  { title: 'Draft', value: 'draft' },
  { title: 'Published', value: 'published' },
] as const;
</script>

<template>
    <!-- <v-btn @click="setSnackbar('hello', 'success')">test</v-btn> -->
    <v-container>
      <!-- <v-row>
        <v-col cols="12">
          <breadcrumbs :items="breadcrumbItems" />
        </v-col>
      </v-row> -->
      <v-form
        ref="blogForm"
        @submit.prevent="submit"
        >
        <v-row>
          <v-col
            cols="12"
            md="8"
          >
            <v-label>Blog Title</v-label>
            <v-text-field
              v-model="form.title"
              placeholder="eg. Lorem ipsum dolor."
              :rules="rules.title"
              />
              <!-- :error-messages="form.errors.title"
              @update:model-value="form.errors.title = ''" -->

            <v-label>Blog Slug</v-label>
            <v-text-field
              v-model="form.slug"
              placeholder="eg. lorem-ipsum-dolor"
              :rules="rules.slug"
              />
              <!-- :error-messages="form.errors.slug"
              @update:model-value="form.errors.slug = ''" -->

            <v-label>Blog Content</v-label>
            <v-card color="transparent">
              <!-- <editor v-model:content="form.content" /> -->
            </v-card>
          </v-col>

          <v-col
            cols="12"
            md="4"
          >
            <v-card class="mb-3">
              <v-card-text class="pb-0">
                <v-label>Category</v-label>
              </v-card-text>
              <v-card-text class="pt-0">
                <v-select
                placeholder="Select one work type"
                item-title="title"
                item-value="id"
                hide-details
                />
                <!-- v-model="form.portfolio_type_id"
                  :items="types"
                  :error-messages="form.errors.portfolio_type_id" -->
              </v-card-text>
            </v-card>

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
                <v-label>Featured Image</v-label>
              </v-card-text>
              <v-card-text class="pt-0">
                <v-card
                  border
                  height="200"
                >
                  <!-- <template v-if="displayImageUrl">
                    <v-card-text class="pa-0">
                      <v-hover v-slot="{ isHovering, props }">
                        <v-img
                          v-bind="props"
                          cover
                          height="200"
                          :src="displayImageUrl"
                        >
                          <v-fade-transition>
                            <div
                              v-if="isHovering"
                              class="w-100 h-100 d-flex align-center justify-center"
                              style="background-color: rgba(0, 0, 0, 0.5)"
                            >
                              <v-btn
                                v-tooltip="'Remove Featured Image'"
                                rounded="circle"
                                icon="carbon:close"
                                @click="removeImage"
                                />
                            </div>
                          </v-fade-transition>
                        </v-img>
                      </v-hover>
                    </v-card-text>
                  </template>

                  <template v-else>
                    <v-card-text
                      class="pt-0 w-100 h-100 d-flex align-center justify-center flex-column"
                    >
                      <div class="d-flex align-center justify-center flex-column mb-3">
                        <v-icon
                          size="32"
                          class="mb-2"
                          icon="carbon:cloud-upload"
                        />
                        <div class="text-h6 font-weight-medium">Select Featured image</div>
                      </div>
                      <input
                        ref="fileBrowser"
                        id="file-browser"
                        class="d-none"
                        type="file"
                        accept="image/jpeg,image/png,image/jpg,image/gif,image/webp"
                        @change="uploadFile"
                        />
                      <v-btn
                        border
                        @click="fileSelector"
                      >
                        Browse
                      </v-btn>
                      <div
                        v-if="form.errors.featured_image"
                        class="mt-2"
                      >
                        <div style="color: #c62828; font-size: 0.875rem">
                          {{ form.errors.featured_image }}
                        </div>
                      </div>
                    </v-card-text>
                  </template> -->
                </v-card>
              </v-card-text>
            </v-card>

            <v-card class="mb-3">
              <v-card-text class="pb-0">
                <v-label>Actions</v-label>
              </v-card-text>
              <v-card-actions>
                <!-- <v-btn
                  type="submit"
                  color="primary"
                  :loading="form.processing"
                  :disabled="form.processing"
                >
                  {{ blog ? 'Update' : 'Create' }}
                  Portfolio
                </v-btn> -->
                <!-- <v-btn
                  variant="outlined"
                  @click="router.visit('/admin/blog')"
                >
                  Cancel
                </v-btn> -->
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
</template>