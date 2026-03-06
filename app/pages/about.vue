<script setup lang="ts">
import socials from '@/utils/social';

useSeoMeta({
  title: 'About Saroj Poudel | Fullstack Developer',
  description: 'Passionate full-stack developer and designer dedicated to building high-performance web applications.',
});
</script>

<template>
  <v-container class="py-16 px-md-16">
    <!-- Hero Section -->
    <v-row class="mb-16" align="center">
      <v-col cols="12" lg="6">
         <div class="text-overline text-primary mb-4 glow-text">THE JOURNEY</div>
         <h1 class="text-h2 text-md-h1 font-weight-black mb-8">BUILDING THE <span class="text-gradient">FUTURE</span></h1>
         <p class="text-h5 text-medium-emphasis font-weight-light mb-8">
            I am a full-stack engineer with a deep passion for digital craftsmanship. My work lives at the intersection of robust engineering and avant-garde design.
         </p>
         <div class="d-flex gap-4">
            <v-btn color="primary" rounded="pill" size="large" class="px-8 shadow-primary" to="/contact">Let's Collaborate</v-btn>
         </div>
      </v-col>
      <v-col cols="12" lg="6" class="text-center">
         <div class="position-relative d-inline-block">
            <v-avatar size="300" class="glass border-primary animate-float elevation-20">
               <v-img src="https://www.ropodl.com/media/full.jpg" cover />
            </v-avatar>
            <div class="glass position-absolute" style="top: 0; right: 0; padding: 15px; border-radius: 15px">
               <v-icon icon="carbon:chemistry" color="primary" size="x-large" />
            </div>
         </div>
      </v-col>
    </v-row>

    <!-- Philoshophy & Skills Section -->
    <v-row class="mb-16">
       <v-col cols="12">
          <v-card class="glass pa-8 pa-md-16 rounded-xl" elevation="0">
             <v-row>
                <v-col cols="12" md="4">
                   <h2 class="text-h4 font-weight-bold mb-6">Philosophy</h2>
                   <p class="text-body-1 text-medium-emphasis font-weight-light">
                      I believe in decentralization, user empowerment, and the beauty of clean, efficient code. Every pixel and every line of code serves a purpose.
                   </p>
                </v-col>
                <v-col cols="12" md="8">
                   <h2 class="text-h4 font-weight-bold mb-8">Core <span class="text-gradient">Stack</span></h2>
                   <v-row>
                      <v-col v-for="skill in ['Nuxt 3', 'Vue 3', 'TypeScript', 'Node.js', 'Hono', 'Strapi', 'Vuetify', 'Modern CSS']" :key="skill" cols="6" sm="3">
                         <div class="glass pa-4 rounded-lg text-center font-weight-bold hover-bg-primary transition-all">
                            {{ skill }}
                         </div>
                      </v-col>
                   </v-row>
                </v-col>
             </v-row>
          </v-card>
       </v-col>
    </v-row>

    <!-- Socials Section -->
    <v-row class="mt-16">
       <v-col cols="12" class="text-center">
          <div class="text-overline text-primary mb-4 glow-text">CONTACT</div>
          <h2 class="text-h3 font-weight-black mb-12">GET IN <span class="text-gradient">TOUCH</span></h2>
          <div class="d-flex justify-center gap-8 flex-wrap">
             <template v-for="{ name, link } in socials" :key="name">
                <a :href="link" target="_blank" class="text-decoration-none text-h5 text-medium-emphasis hover-text-white transition-all">
                   {{ name }}
                </a>
             </template>
          </div>
       </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.hover-bg-primary:hover {
   background: rgba(0, 240, 255, 0.1) !important;
   border-color: var(--v-theme-primary) !important;
   color: white !important;
}
.shadow-primary {
  box-shadow: 0 0 30px rgba(0, 240, 255, 0.2) !important;
}
.hover-text-white:hover {
  color: white !important;
}
.transition-all {
  transition: all 0.3s ease;
}
</style>
