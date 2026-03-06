<script setup lang="ts">
import { useMockData } from '~/composables/useMockData';
import useApiFetch from '~/utils/shared/useApiFetch';

const route = useRoute();
const slug = route.params.slug as string;
const { portfolios: mockPortfolios } = useMockData();

const project = ref<any>(null);

onMounted(() => {
  fetchProject();
});

const fetchProject = async () => {
  try {
    const res = await useApiFetch<any>(`/portfolio/${slug}`);
    project.value = res.data || mockPortfolios.value.find(p => p.slug === slug);
  } catch (err) {
    project.value = mockPortfolios.value.find(p => p.slug === slug);
  }
};

useSeoMeta({
  title: () => project.value?.title || 'Project Details',
  description: () => project.value?.description || '',
});
</script>

<template>
  <div v-if="project" class="project-detail-page">
    <v-container class="py-16 px-md-16">
      <!-- Project Header -->
      <v-row class="mb-12" align="end">
        <v-col cols="12" md="8">
           <div class="text-overline text-primary mb-4 glow-text">{{ project.type?.title || 'Case Study' }}</div>
           <h1 class="text-h2 text-md-h1 font-weight-black mb-6">{{ project.title }}</h1>
           <p class="text-h5 text-medium-emphasis font-weight-light">{{ project.description }}</p>
        </v-col>
        <v-col cols="12" md="4" class="text-md-right">
           <v-btn color="primary" size="x-large" rounded="pill" class="px-10 magnetic-btn shadow-primary" href="#" target="_blank">
              Live Preview
              <v-icon icon="carbon:launch" class="ml-2" />
           </v-btn>
        </v-col>
      </v-row>

      <!-- project Feature Image -->
      <v-row class="mb-16">
        <v-col cols="12">
           <v-img :src="project.featured" height="70vh" cover class="rounded-xl glass border-primary shadow-lg" />
        </v-col>
      </v-row>

      <!-- Project Content -->
      <v-row justify="center">
        <v-col cols="12" lg="8">
           <v-card class="glass pa-8 pa-md-16 rounded-xl" elevation="0">
              <h2 class="text-h3 font-weight-bold mb-8">Concept & <span class="text-gradient">Execution</span></h2>
              <div class="text-h6 font-weight-light text-medium-emphasis" v-html="project.content"></div>
              
              <v-divider class="my-12 opacity-10" />
              
              <div class="d-flex align-center flex-wrap gap-8 justify-center">
                 <div class="text-center">
                    <div class="text-h4 font-weight-black text-primary mb-1">2026</div>
                    <div class="text-caption opacity-50">Year</div>
                 </div>
                 <v-divider vertical class="mx-4 opacity-10" />
                 <div class="text-center">
                    <div class="text-h4 font-weight-black text-primary mb-1">Nuxt 3</div>
                    <div class="text-caption opacity-50">Core</div>
                 </div>
                 <v-divider vertical class="mx-4 opacity-10" />
                 <div class="text-center">
                    <div class="text-h4 font-weight-black text-primary mb-1">Vuetify</div>
                    <div class="text-caption opacity-50">Design</div>
                 </div>
              </div>
           </v-card>
        </v-col>
      </v-row>
      
      <!-- Call to Action -->
      <v-row class="mt-16">
         <v-col cols="12" class="text-center">
            <h3 class="text-h4 font-weight-bold mb-8">Ready to start a <span class="text-gradient">project?</span></h3>
            <v-btn variant="outlined" size="x-large" rounded="pill" class="px-12" to="/contact">Get in touch</v-btn>
         </v-col>
      </v-row>
    </v-container>
  </div>
  <!-- Loading State -->
  <div v-else class="min-vh-100 d-flex align-center justify-center">
     <v-progress-circular indeterminate color="primary" size="64" />
  </div>
</template>

<style scoped>
.shadow-primary {
  box-shadow: 0 0 30px rgba(0, 240, 255, 0.2) !important;
}
:deep(p) { margin-bottom: 2rem; line-height: 1.8; }
</style>
