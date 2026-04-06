<script setup lang="ts">
import { useDisplay } from 'vuetify';

const route = useRoute();
const { mobile } = useDisplay();

const pages = [
  {
    icon: 'carbon:home',
    title: 'home',
    to: '/',
  },
  {
    icon: 'carbon:blog',
    title: 'blog',
    to: '/blog',
  },
  {
    icon: 'carbon:workspace',
    title: 'portfolio',
    to: '/portfolio',
  },
  {
    icon: 'carbon:information',
    title: 'about',
    to: '/about',
  },
  // {
  //   icon: 'carbon:phone',
  //   title: 'contact',
  //   to: '/contact',
  // },
];

const isActive = (path: string) => {
  if (path === '/') return route.path === '/';
  return route.path === path || route.path.startsWith(`${path}/`);
};

const tabColor = (path: string) =>
  isActive(path)
    ? 'rgba(var(--v-theme-surface),0.9)'
    : 'rgba(var(--v-theme-on-surface), 0.8)';
</script>
<template>
  <v-card
    flat
    color="rgba(var(--v-theme-surface), 0.7)"
    :location="mobile ? 'bottom' : 'top'"
    rounded="pill"
    class="position-fixed pa-1 blur-8 z-1010"
    :class="[mobile ? 'bottom-10' : 'top-10']"
  >
    <v-tabs
      density="compact"
      hide-slider
      show-arrows
      align-tabs="center"
      width="100"
      height="50"
      rounded="pill"
      >
      <template v-if="pages">
        <template v-for="{ icon, title, to } in pages" :key="title">
          <v-tab
          :variant="isActive(to) ? 'tonal':'text'"
            :stacked="mobile"
            color="primary"
            :to
            :active="isActive(to)"
            rounded="pill"
            class="nav-tab"
            :class="{ 'nav-tab--active': isActive(to) }"
            >
            <!-- :style="{ color: tabColor(to) }" -->
            <v-icon
              :start="!mobile"
              :icon
              
            />
            {{ title }}
          </v-tab>
        </template>
      </template>
    </v-tabs>
  </v-card>
</template>
<!-- <style scoped>
.nav-tab--active {
  color: inherit !important;
  background-color: rgba(var(--v-theme-primary), 0.2);
  backdrop-filter: blur(8px);
}
</style> -->
