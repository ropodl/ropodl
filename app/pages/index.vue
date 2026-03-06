<script setup lang="ts">
import socials from '@/utils/social';
import { useMockData } from '~/composables/useMockData';

const { portfolios } = useMockData();

useSeoMeta({
  title: 'Saroj Poudel | Web3 Designer & Developer',
  description: 'Full-Stack Developer & Designer creating immersive digital experiences.',
});
</script>

<template>
  <v-container class="py-16 px-md-16">
    <!-- Hero Section -->
    <v-row class="min-vh-80 d-flex align-center">
      <v-col cols="12" lg="8">
        <div class="text-overline text-primary mb-4 font-weight-bold glow-text animate-pulse">
          AVAILABLE FOR PROJECTS
        </div>
        <h1 class="text-h2 text-md-h1 font-weight-black mb-6" style="line-height:1">
          CREATING DIGITAL <br />
          <span class="text-gradient">INTERACTIONS</span>
        </h1>
        <p class="text-h5 text-medium-emphasis mb-10 font-weight-light" style="max-width: 600px">
          Bridging the gap between engineering and design to build immersive, scalable, and decentralized experiences.
        </p>
        
        <div class="d-flex flex-wrap gap-4 pt-4">
          <v-btn
            color="primary"
            size="x-large"
            rounded="pill"
            class="px-10 magnetic-btn shadow-primary"
            elevation="10"
            to="/portfolio"
          >
            Explore Work
          </v-btn>
          <v-btn
            variant="outlined"
            size="x-large"
            rounded="pill"
            class="px-10 opacity-80"
            to="/contact"
          >
            Get in touch
          </v-btn>
        </div>
      </v-col>
      <v-col cols="12" lg="4" class="hidden-md-and-down">
        <div class="position-relative">
          <div class="animate-float">
             <v-img
                src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800"
                class="rounded-xl glass border-primary"
                max-width="400"
                aspect-ratio="1"
                cover
             />
          </div>
          <div class="glass position-absolute" style="bottom: -20px; right: -20px; width: 200px; height: 100px; border-radius: 20px; padding: 20px; z-index: 2">
             <div class="text-h6 font-weight-bold">6+ Years</div>
             <div class="text-caption">Experience</div>
          </div>
        </div>
      </v-col>
    </v-row>

    <!-- Socials Section -->
    <v-row class="mt-16 pt-16 border-top">
      <v-col cols="12">
        <div class="d-flex align-center gap-8 flex-wrap">
          <template v-for="{ name, link } in socials" :key="name">
             <a :href="link" target="_blank" class="text-decoration-none text-h6 text-medium-emphasis hover-text-white transition-all">
                {{ name }}
             </a>
          </template>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.min-vh-80 {
  min-height: 80vh;
}
.border-top {
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}
.hover-text-white:hover {
  color: white !important;
}
.transition-all {
  transition: all 0.3s ease;
}
.shadow-primary {
  box-shadow: 0 0 30px rgba(0, 240, 255, 0.2) !important;
}
</style>
