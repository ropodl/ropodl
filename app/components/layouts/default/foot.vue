<script setup lang="ts">
import socials from '~/utils/social';
</script>

<template>
  <footer class="mt-16 pb-8 px-md-16 px-4">
    <v-container>
      <!-- Footer Glass Box -->
      <v-card class="glass pa-8 pa-md-16 rounded-xl border-primary" elevation="0">
        <v-row>
          <v-col cols="12" md="6">
             <div class="text-h4 font-weight-black text-white mb-6">RO<span class="text-primary">PODL</span></div>
             <p class="text-h6 text-medium-emphasis font-weight-light mb-8" style="max-width: 400px">
                Designing and building digital artifacts for the decentralized web.
             </p>
             <div class="d-flex gap-4">
                <template v-for="{ name, link } in socials" :key="name">
                  <v-btn
                    :href="link"
                    target="_blank"
                    icon
                    variant="tonal"
                    color="primary"
                    rounded="lg"
                  >
                    <v-icon :icon="`carbon:logo-${name.toLowerCase().replace('x', 'twitter')}`" />
                  </v-btn>
                </template>
             </div>
          </v-col>
          
          <v-col cols="12" md="3">
             <div class="text-subtitle-1 font-weight-bold text-white mb-6">Explore</div>
             <div class="d-flex flex-column gap-3">
                <nuxt-link to="/" class="text-decoration-none text-medium-emphasis hover-text-primary transition-all">Home</nuxt-link>
                <nuxt-link to="/blog" class="text-decoration-none text-medium-emphasis hover-text-primary transition-all">Blog</nuxt-link>
                <nuxt-link to="/portfolio" class="text-decoration-none text-medium-emphasis hover-text-primary transition-all">Portfolio</nuxt-link>
                <nuxt-link to="/about" class="text-decoration-none text-medium-emphasis hover-text-primary transition-all">About</nuxt-link>
             </div>
          </v-col>
          
          <v-col cols="12" md="3">
             <div class="text-subtitle-1 font-weight-bold text-white mb-6">Connect</div>
             <div class="d-flex flex-column gap-3">
                <nuxt-link to="/contact" class="text-decoration-none text-medium-emphasis hover-text-primary transition-all">Contact</nuxt-link>
                <a href="mailto:hello@ropodl.com" class="text-decoration-none text-medium-emphasis hover-text-primary transition-all">hello@ropodl.com</a>
             </div>
          </v-col>
        </v-row>
        
        <v-divider class="my-12 opacity-10" />
        
        <div class="d-flex flex-wrap justify-space-between align-center gap-4">
           <div class="text-caption text-medium-emphasis font-weight-light">
              &copy; {{ new Date().getFullYear() }} Ropodl. All rights reserved.
           </div>
           <div class="text-caption text-medium-emphasis font-weight-light">
              Built with <span class="text-primary">Nuxt 3</span> & <span class="text-primary">Vuetify</span>
           </div>
        </div>
      </v-card>
    </v-container>
  </footer>
</template>

<style scoped>
.hover-text-primary:hover {
  color: var(--v-theme-primary) !important;
}
.transition-all {
  transition: all 0.3s ease;
}
</style>
