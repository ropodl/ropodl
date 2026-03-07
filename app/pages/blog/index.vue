<script setup lang="ts">
import type { blog } from '~/types/blog';
import useApiFetch from '~/utils/shared/useApiFetch';

const blogs = ref<blog[]>([]);
const categories = ref<any[]>([]);
const currentCategory = ref<string | null>(null);
const currentTag = ref<string | null>(null);

const route = useRoute();
const router = useRouter();

const fetchCategories = async () => {
  const res = await useApiFetch<{ data: any[] }>('/admin/blog/category');
  categories.value = res.data;
};

const getAllBlogs = async () => {
  const params: any = {};
  if (currentCategory.value) params.category = currentCategory.value;
  if (currentTag.value) params.tag = currentTag.value;

  await useApiFetch<{ data: blog[] }>('/blog', { params }).then((res) => {
    blogs.value = res.data;
  });
};

const filterByCategory = (slug: string | null) => {
  currentCategory.value = slug;
  currentTag.value = null;
  getAllBlogs();
};

onMounted(() => {
  getAllBlogs();
  fetchCategories();
});
</script>
<template>
  <v-container>
    <v-row>
      <v-col>
        <layouts-default-page-title>
          A collection of my
          <span class="text-primary-darken-2">thoughts</span>.
        </layouts-default-page-title>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-chip-group
          v-model="currentCategory"
          selected-class="text-primary"
          mandatory
          class="mb-6"
        >
          <v-chip
            :value="null"
            variant="tonal"
            rounded="lg"
            @click="filterByCategory(null)"
          >
            All Posts
          </v-chip>
          <v-chip
            v-for="cat in categories"
            :key="cat.id"
            :value="cat.slug"
            variant="tonal"
            rounded="lg"
            @click="filterByCategory(cat.slug)"
          >
            {{ cat.title }}
          </v-chip>
        </v-chip-group>
      </v-col>
    </v-row>

    <template v-if="blogs.length">
      <v-row class="mb-16">
        <template
          v-for="(
            {
              slug,
              title,
              excerpt,
              featured_image,
              created_at,
              category,
              tags,
            },
            i
          ) in blogs"
          :key="slug"
        >
          <template v-if="i === 0">
            <v-col cols="12">
              <v-row class="mb-3">
                <v-col cols="12" md="6">
                  <template v-if="featured_image">
                    <v-hover v-slot="{ isHovering, props }">
                      <v-card
                        v-bind="props"
                        border
                        color="white"
                        :height="400"
                        rounded="xl"
                        :variant="isHovering ? 'tonal' : 'text'"
                        :to="`/blog/${slug}`"
                      >
                        <v-img
                          cover
                          class="h-100"
                          :class="{ 'zoom-image': isHovering }"
                          :src="featured_image.fileUrl"
                          :alt="featured_image.altText"
                        >
                          <template #placeholder>
                            <div
                              class="d-flex align-center justify-center fill-height"
                            >
                              <v-skeleton-loader
                                class="w-100 h-100"
                                type="image"
                              />
                            </div>
                          </template>
                        </v-img>
                      </v-card>
                    </v-hover>
                  </template>
                </v-col>
                <v-col cols="12" md="6">
                  <div class="d-flex flex-column">
                    <div v-if="category" class="mb-2">
                      <v-chip
                        size="x-small"
                        color="primary"
                        variant="flat"
                        rounded="lg"
                      >
                        {{ category.title }}
                      </v-chip>
                    </div>
                    <nuxt-link
                      class="text-decoration-none"
                      :to="`/blog/${slug}`"
                    >
                      <v-card-text
                        class="pt-0 text-h3 font-weight-medium text-white pb-0 line-clamp-2"
                        style="line-height: 1.2; white-space: normal"
                      >
                        {{ title }}
                      </v-card-text>
                    </nuxt-link>
                    <v-card-text class="text-white text-subtitle-1">
                      {{ excerpt }}
                    </v-card-text>
                    <v-card-text class="text-white text-caption">
                      {{
                        created_at
                          ? useDateFormat(created_at, 'MMM D, YYYY')
                          : ''
                      }}
                    </v-card-text>
                    <v-card-actions>
                      <v-btn
                        icon
                        variant="outlined"
                        width="100"
                        height="60"
                        rounded="pill"
                        :to="`/blog/${slug}`"
                      >
                        <v-icon color="primary" icon="carbon:arrow-right" />
                      </v-btn>
                    </v-card-actions>
                  </div>
                </v-col>
              </v-row>
            </v-col>
          </template>
          <template v-else>
            <v-col cols="12" sm="6" md="6" lg="4">
              <v-hover v-slot="{ isHovering, props }">
                <template v-if="featured_image">
                  <v-card
                    border
                    v-bind="props"
                    flat
                    height="400"
                    class="mb-3"
                    color="white"
                    :variant="isHovering ? 'tonal' : 'text'"
                    rounded="xl"
                    :to="`/blog/${slug}`"
                  >
                    <v-img
                      cover
                      height="400"
                      :class="{ 'zoom-image': isHovering }"
                      :src="featured_image.fileUrl"
                      :alt="featured_image.altText"
                    >
                      <template #placeholder>
                        <div
                          class="d-flex align-center justify-center fill-height"
                        >
                          <v-skeleton-loader class="w-100 h-100" type="image" />
                        </div>
                      </template>
                    </v-img>
                  </v-card>
                </template>
                <v-card border="0" rounded="0" color="transparent">
                  <div v-if="category" class="px-0 pt-2 pb-0">
                    <span
                      class="text-caption text-primary font-weight-bold uppercase"
                      >{{ category.title }}</span
                    >
                  </div>
                  <v-card-text
                    class="pt-1 text-h6 text-white px-0 pb-0 line-clamp-2"
                    style="line-height: 1.2; white-space: normal"
                  >
                    {{ title }}
                  </v-card-text>
                  <v-card-text class="text-white text-caption pl-0">
                    {{
                      created_at ? useDateFormat(created_at, 'MMM D, YYYY') : ''
                    }}
                  </v-card-text>
                </v-card>
              </v-hover>
            </v-col>
          </template>
        </template>
      </v-row>
    </template>
    <template v-else>
      <v-row class="py-16">
        <v-col cols="12" class="mb-6">
          <v-alert border rounded="lg" border-color="white">
            Sorry, no content available.
          </v-alert>
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>
