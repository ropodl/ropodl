<script setup lang="ts">
import { useMockData } from '~/composables/useMockData';
import useApiFetch from '~/utils/shared/useApiFetch';

const route = useRoute();
const slug = route.params.slug as string;
const { blogs: mockBlogs } = useMockData();

const blog = ref<any>(null);

onMounted(() => {
  fetchBlog();
});

const fetchBlog = async () => {
  try {
    const res = await useApiFetch<any>(`/blog/${slug}`);
    blog.value = res.data || mockBlogs.value.find(b => b.slug === slug);
  } catch (err) {
    blog.value = mockBlogs.value.find(b => b.slug === slug);
  }
};

useSeoMeta({
  title: () => blog.value?.title || 'Blog Post',
  description: () => blog.value?.excerpt || '',
});
</script>

<template>
  <div v-if="blog" class="blog-post-page">
    <!-- Header Section -->
    <div class="header-overlay position-relative">
       <v-img :src="blog.featured_image?.fileUrl" height="60vh" cover class="header-img">
          <div class="fill-height d-flex flex-column justify-center align-center text-center px-4 grad-overlay">
             <div class="text-overline text-primary mb-4 glow-text">{{ useDateFormat(blog.created_at, 'MMMM D, YYYY') }}</div>
             <h1 class="text-h2 text-md-h1 font-weight-black text-white px-2" style="max-width: 1000px">{{ blog.title }}</h1>
          </div>
       </v-img>
    </div>

    <v-container class="pb-16 mt-n16 position-relative z-1">
      <v-row justify="center">
        <v-col cols="12" lg="8">
          <v-card class="glass pa-8 pa-md-16 rounded-xl prose-box" elevation="0">
             <div class="blog-content text-h6 font-weight-light text-medium-emphasis" v-html="blog.content"></div>
             
             <v-divider class="my-12 opacity-10" />
             
             <div class="d-flex align-center flex-wrap gap-4">
                <v-chip v-for="tag in blog.tags" :key="tag.id" variant="tonal" rounded="lg" color="primary">#{{ tag.title }}</v-chip>
             </div>
          </v-card>
        </v-col>
        
        <v-col cols="12" lg="4" class="hidden-md-and-down">
           <v-card class="glass pa-8 rounded-xl position-sticky top-100" elevation="0" style="top: 100px">
              <div class="text-h6 font-weight-bold mb-4">About the Author</div>
              <div class="d-flex align-center mb-6">
                 <v-avatar size="64" class="mr-4 glass border-primary">
                    <v-img src="https://www.ropodl.com/media/full.jpg" />
                 </v-avatar>
                 <div>
                    <div class="text-subtitle-1 font-weight-bold">Saroj Poudel</div>
                    <div class="text-caption">Fullstack Developer</div>
                 </div>
              </div>
              <p class="text-body-2 text-medium-emphasis mb-6 font-weight-light">Building the future of the web, one component at a time.</p>
              <v-btn block variant="outlined" rounded="pill" color="primary" to="/contact">Discuss this post</v-btn>
           </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
  <div v-else class="min-vh-100 d-flex align-center justify-center">
     <v-progress-circular indeterminate color="primary" size="64" />
  </div>
</template>

<style scoped>
.grad-overlay {
  background: linear-gradient(to bottom, rgba(5,5,5,0.3) 0%, rgba(5,5,5,0.8) 100%);
}
.z-1 { z-index: 1; }
.blog-content :deep(p) { margin-bottom: 2rem; line-height: 1.8; }
.blog-content :deep(h2) { font-size: 2.5rem; margin: 3rem 0 1.5rem; color: white; }
.blog-content :deep(h3) { font-size: 1.8rem; margin: 2rem 0 1rem; color: white; }
.blog-content :deep(img) { width: 100%; border-radius: 20px; margin: 2rem 0; }
.blog-content :deep(pre) { background: rgba(255,255,255,0.05); padding: 2rem; border-radius: 12px; margin: 2rem 0; overflow-x: auto; }
</style>
