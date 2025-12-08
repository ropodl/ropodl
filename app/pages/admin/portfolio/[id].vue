<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
// import { snackbar } from '@/composables/snack';
// import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue';
// import type { Portfolio, PortfolioType } from '@/types/portfolio';
// import slugify from '@/utils/slugify';
// import { Head, router, useForm } from '@inertiajs/vue3';
import { useObjectUrl } from '@vueuse/core';
import { computed, ref, watch } from 'vue';

// const breadcrumbs = defineAsyncComponent(() => import('@/components/admin/layout/breadcrumbs.vue'));
// const editor = defineAsyncComponent(() => import('@/components/admin/shared/Editor.vue'));

// const { setSnackbar } = snackbar();

// const { portfolio, types } = defineProps<{
//   // portfolio?: Portfolio;
//   types: PortfolioType[];
// }>();

// const form = useForm({
//   _method: portfolio?.id ? 'PATCH' : 'POST',
//   title: portfolio?.title ?? '',
//   slug: portfolio?.slug ?? '',
//   content: portfolio?.content ?? '',
//   featured_image: portfolio?.featured_image ?? (null as File | string | null),
//   status: portfolio?.status ?? 'draft',
//   portfolio_type_id: portfolio?.portfolio_type_id ?? null,
// });

// Auto-generate slug from title only for new portfolios
// watch(
//   () => form.title,
//   (title) => {
//     if (!portfolio?.slug) {
//       form.slug = slugify(title, {
//         maxLength: 70,
//       });
//     }
//   },
// );

const rules = {
  title: [
    (v: string) => !!v || 'Portfolio Title is required',
    (v: string) => v.length <= 100 || 'Portfolio Title must be 100 characters or less',
  ],
  slug: [(v: string) => !v || v.length <= 70 || 'Portfolio Slug must be 70 characters or less'],
  // featured_image: [
  //   (v?: File[]) => {
  //     if (!v || v.length === 0) return true;
  //     const file = v[0];
  //     if (file?.size > 5120 * 1024) {
  //       return 'File size must be less than 5MB';
  //     }
  //     return true;
  //   },
  // ],
};

const portfolioForm = ref();
const fileBrowser = ref<HTMLInputElement | null>(null);
// const fileSelected = ref<File | null>(null);

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
//   if (portfolio?.id && typeof form.featured_image === 'string') {
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

// const fileSelector = () => {
//   fileBrowser.value?.click();
// };

// const test = ref<any>();

// const submit = async () => {
//   const { valid } = await portfolioForm.value.validate();

//   if (!valid) return;

//   const routeName = portfolio?.id ? 'portfolio.update' : 'portfolio.store';
//   const routeParams = portfolio?.id ? [portfolio.id] : [];

//   form.post(route(routeName, routeParams), {
//     forceFormData: true,
//     preserveScroll: false,
//     onSuccess: () => {
//       console.log('Form submitted successfully');
//     },
//     onError: (errors) => {
//       test.value = errors;
//       setSnackbar('Form Sumission error', 'error');
//     },
//   });
// };

// const breadcrumbItems = computed(() => [
//   {
//     title: 'portfolio',
//     href: '/admin/portfolio',
//   },
//   {
//     title: portfolio ? 'edit' : 'create',
//     href: portfolio ? `/admin/portfolio/${portfolio.id}` : '/admin/portfolio/create',
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
      <v-row>
        <v-col cols="12">
          <!-- <breadcrumbs :items="breadcrumbItems" /> -->
        </v-col>
      </v-row>
      <v-form
        ref="portfolioForm"
        >
        <!-- @submit.prevent="submit" -->
        <v-row>
          <v-col
            cols="12"
            md="8"
          >
            <v-label>Portfolio Title</v-label>
            <v-text-field
            placeholder="eg. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            :rules="rules.title"
            />
            <!-- v-model="form.title"
              :error-messages="form.errors.title"
              @update:model-value="form.errors.title = ''" -->

            <v-label>Portfolio Slug</v-label>
            <v-text-field
            placeholder="eg. lorem-ipsum-dolor-sit-amet-consectetur-adipiscing-elit"
            :rules="rules.slug"
            />
            <!-- v-model="form.slug"
            :error-messages="form.errors.slug"
              @update:model-value="form.errors.slug = ''" -->

            <v-label>Portfolio Content</v-label>
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
                <v-label>Work Type</v-label>
              </v-card-text>
              <v-card-text class="pt-0">
                <v-select
                placeholder="Select one work type"
                item-title="title"
                item-value="id"
                hide-details
                />
                <!-- :items="types" -->
                <!-- v-model="form.portfolio_type_id"
                  :error-messages="form.errors.portfolio_type_id" -->
              </v-card-text>
            </v-card>

            <v-card class="mb-3">
              <v-card-text class="pb-0">
                <v-label>Status</v-label>
              </v-card-text>
              <v-card-text class="pt-0">
                <!-- v-model="form.status" -->
                <v-select
                  hide-details
                  :items="statusOptions"
                  placeholder="Portfolio Status"
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
                  {{ portfolio ? 'Update' : 'Create' }}
                  Portfolio
                </v-btn>
                <v-btn
                  variant="outlined"
                  @click="router.visit('/admin/portfolio')"
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