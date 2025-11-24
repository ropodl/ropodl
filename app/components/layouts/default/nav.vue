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
];
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
      color="primary"
      density="compact"
      hide-slider
      show-arrows
      height="50"
      rounded="pill"
    >
    <template v-if="pages">
      <template
        v-for="{ icon, title, to } in pages"
        :key="title"
      >
      <nuxt-link :to class="text-decoration-none text-white">
        <v-tab
            :stacked="mobile"
            :active="to === route.fullPath"
            rounded="pill"
            >
            <v-icon
            :start="!mobile"
            >
            <Icon :name="icon"/>
          </v-icon>
          {{ title }}
        </v-tab>
      </nuxt-link>
      </template>
    </template>
    </v-tabs>
  </v-card>
</template>
