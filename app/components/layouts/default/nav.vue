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
</script>
<template>
  <v-card
    flat
    color="rgba(var(--v-theme-surface), 0.72)"
    :location="mobile ? 'bottom' : 'top'"
    rounded="pill"
    class="site-nav position-fixed pa-1 blur-8 z-1010"
    :class="[mobile ? 'bottom-10' : 'top-10']"
  >
    <v-tabs
      color="primary"
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
            :stacked="mobile"
            :to
            :active="isActive(to)"
            rounded="pill"
            class="px-4"
          >
            <v-icon :start="!mobile" :icon />
            {{ title }}
          </v-tab>
        </template>
      </template>
    </v-tabs>
  </v-card>
</template>
<style scoped>
.site-nav {
  border: 1px solid rgba(var(--v-theme-on-surface), 0.08);
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.18);
}
</style>
