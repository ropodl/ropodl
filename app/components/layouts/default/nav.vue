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

const isActive = (path: string) => {
  if (path === '/') return route.path === '/';
  return route.path === path || route.path.startsWith(`${path}/`);
};
</script>
<template>
  <v-app-bar
    flat
    height="74"
    class="glass-nav px-md-16 px-4"
    scroll-behavior="hide"
  >
    <div class="d-flex align-center w-100">
      <nuxt-link to="/" class="text-decoration-none d-flex align-center">
        <div class="text-h5 font-weight-black text-white mr-2">RO<span class="text-primary">PODL</span></div>
      </nuxt-link>

      <v-spacer />

      <div v-if="!mobile" class="d-flex gap-2">
        <template v-for="{ title, to } in pages" :key="title">
          <v-btn
            :to="to"
            variant="text"
            rounded="pill"
            class="text-capitalize px-6"
            :active="isActive(to)"
            :color="isActive(to) ? 'primary' : 'white'"
          >
            {{ title }}
          </v-btn>
        </template>
      </div>

      <v-spacer v-if="!mobile" />

      <div class="d-flex align-center gap-4">
        <v-btn
          v-if="!mobile"
          variant="tonal"
          color="primary"
          rounded="pill"
          class="text-capitalize px-6"
          to="/admin"
        >
          Console
        </v-btn>
        <v-btn
          icon="carbon:menu"
          variant="text"
          class="hidden-md-and-up"
        />
      </div>
    </div>
  </v-app-bar>
</template>
