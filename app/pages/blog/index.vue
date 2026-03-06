<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useSeoMeta, useRoute, useDateFormat } from '#imports';
import { useMockData } from '~/composables/useMockData';
import useApiFetch from '~/utils/shared/useApiFetch';

const { blogs: mockBlogs } = useMockData();
const blogs = ref<any[]>([]);

onMounted(() => {
  getAllBlogs();
});

const getAllBlogs = async () => {
  try {
    const res = await useApiFetch<any>('/blog');
    blogs.value = res.data.length ? res.data : mockBlogs.value;
  } catch (err) {
    blogs.value = mockBlogs.value;
  }
};
</script>

<template>
  <v-container class="py-16 px-md-16">
    <v-row class="mb-12">
      <v-col cols="12" md="8">
         <div class="text-overline text-primary mb-2 glow-text">INSIGHTS & ARTICLES</div>
         <h2 class="text-h2 font-weight-black mb-4">LATEST <span class="text-gradient">STORIES</span></h2>
         <p class="text-h6 text-medium-emphasis font-weight-light">Thoughts on design, code, and the future of technology.</p>
      </v-col>
    </v-row>

    <v-row v-if="blogs.length">
      <v-col
        v-for="(blog, i) in blogs"
        :key="blog.slug"
        cols="12"
        :md="i === 0 ? 12 : 6"
        :lg="i === 0 ? 12 : 4"
        class="mb-10"
      >
        <v-hover v-slot="{ isHovering, props }">
          <v-card
            v-bind="props"
            :to="`/blog/${blog.slug}`"
            class="rounded-xl overflow-hidden glass transition-all glow-card h-100 d-flex flex-column"
            :class="{ 'flex-md-row': i === 0 }"
            elevation="0"
          >
            <div :class="i === 0 ? 'w-md-50 w-100 h-100' : 'w-100'">
               <v-img
                  :src="blog.featured_image?.fileUrl"
                  :height="i === 0 ? '500' : '260'"
                  cover
                  class="transition-all"
                  :style="isHovering ? 'transform: scale(1.05)' : ''"
               >
                  <template #placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                      <v-progress-circular indeterminate color="primary" />
                    </v-row>
                  </template>
               </v-img>
            </div>
            
            <div class="pa-8 d-flex flex-column" :class="i === 0 ? 'w-md-50' : 'w-100'">
                <div class="d-flex align-center mb-4">
                   <div class="text-caption text-primary mr-4 opacity-80">{{ useDateFormat(blog.created_at, 'MMM D, YYYY') }}</div>
                </div>
                <h3 :class="i === 0 ? 'text-h3' : 'text-h5'" class="font-weight-bold mb-4 line-clamp-2">{{ blog.title }}</h3>
                <p class="text-body-1 text-medium-emphasis mb-8 line-clamp-3 font-weight-light">{{ blog.excerpt }}</p>
                <v-spacer />
                <div class="d-flex align-center text-primary font-weight-bold">
                   Read Entry
                   <v-icon icon="carbon:arrow-right" class="ml-2" size="small" />
                </div>
            </div>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>

    <v-row v-else class="py-16 text-center">
       <v-col cols="12">
          <v-progress-circular indeterminate color="primary" size="64" />
       </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.w-md-50 {
  @media (min-width: 960px) {
    width: 50% !important;
  }
}
</style>
