<script setup lang="ts">
import { ref } from 'vue';
import { useDisplay } from 'vuetify';

const { mobile } = useDisplay();
const drawer = ref(false);

const navItems = [
  { title: 'Home', to: '/' },
  { title: 'Works', to: '/works' },
  { title: 'About', to: '/about' },
  { title: 'Contact', to: '/contact' },
];
</script>

<template>
  <v-app-bar flat border="b" class="blur-8 px-md-12">
    <v-container class="d-flex align-center" max-width="1200">
      <NuxtLink to="/" class="text-decoration-none text-high-emphasis font-weight-bold text-h6">
        RO<span class="text-primary-darken-2">PODL</span>
      </NuxtLink>

      <v-spacer />

      <!-- Desktop Navigation -->
      <div v-if="!mobile" class="d-flex align-center">
        <v-btn
          v-for="item in navItems"
          :key="item.title"
          :to="item.to"
          variant="text"
          class="text-capitalize mx-1"
          rounded="lg"
        >
          {{ item.title }}
        </v-btn>
      </div>

      <!-- Mobile Menu Toggle -->
      <v-app-bar-nav-icon v-else @click="drawer = !drawer" />
    </v-container>
  </v-app-bar>

  <!-- Mobile Navigation Drawer -->
  <v-navigation-drawer
    v-model="drawer"
    location="right"
    temporary
    width="300"
    border="0"
    class="pa-4"
  >
    <div class="d-flex justify-end mb-8">
      <v-btn 
        icon="carbon:close" 
        variant="tonal" 
        rounded="circle" 
        @click="drawer = false" 
      />
    </div>

    <v-list nav>
      <v-list-item
        v-for="item in navItems"
        :key="item.title"
        :to="item.to"
        :title="item.title"
        rounded="lg"
        class="mb-2"
        @click="drawer = false"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
.blur-8 {
  backdrop-filter: blur(8px);
  background-color: rgba(var(--v-theme-surface), 0.8) !important;
}
</style>