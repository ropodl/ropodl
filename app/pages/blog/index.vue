<script setup lang="ts">
import type { blog } from '~/types/blog';
import useApiFetch from '~/utils/shared/useApiFetch';

const blogs = ref<blog[]>([]);

onMounted(() => {
  getAllBlogs();
});

const getAllBlogs = async () => {
  await useApiFetch('/blog').then((res) => {
    blogs.value = res.data;
    console.log(res);
  });
};
</script>
<template>
  <v-container max-width="1200">
    <v-row>
      <v-col>
        <layouts-default-page-title>
          A collection of my
          <span class="text-primary-darken-2">thoughts</span>.
        </layouts-default-page-title>
      </v-col>
    </v-row>
    <template v-if="blogs.length">
      <v-row class="mb-16">
        <template
          v-for="(
            { slug, title, excerpt, featured_image, created_at }, i
          ) in blogs"
          :key="title"
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
                    <nuxt-link
                      class="text-decoration-none"
                      :to="`/blog/${slug}`"
                    >
                      <v-card-text
                        class="pt-0 text-h3 font-weight-medium text-white pb-0 line-clamp-3"
                        style="line-height: normal; white-space: normal"
                      >
                        {{ title }}
                      </v-card-text>
                    </nuxt-link>
                    <v-card-text class="text-white text-subtitle-1">
                      {{ excerpt }}
                    </v-card-text>
                    <v-card-text class="text-white text-caption">
                      {{ useDateFormat(created_at, 'MMM D, YYYY') }}
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
                        <v-icon icon="carbon:arrow-right" />
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
                  <v-card-text
                    class="pt-2 text-h6 text-white px-0 pb-0 line-clamp-3"
                    style="line-height: normal; white-space: normal"
                  >
                    {{ title }}
                  </v-card-text>
                  <v-card-text class="text-white text-caption pl-0">
                    {{ useDateFormat(created_at, 'MMM D, YYYY') }}
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
