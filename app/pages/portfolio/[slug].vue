<script setup lang="ts">
// import GuestLayout from '@/layouts/GuestLayout.vue';
// import { Head } from '@inertiajs/vue3';
// import { defineAsyncComponent } from 'vue';

// const Dynamic = defineAsyncComponent(() => import('@/components/shared/dynamic.vue'));

defineProps<{
  portfolio: {
    id: number;
    title: string;
    slug: string;
    content: string;
    status: string;
    type_id: number;
    created_at: string;
    updated_at: string;
    featured_image: string;
  };
}>();
</script>

<template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card
            border
            rounded="xl"
          >
            <v-img
              cover
              :aspect-ratio="16 / 8"
              :src="portfolio.featured_image"
            />
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card-title
            class="text-md-h2 text-h4 font-weight-bold px-0 pt-0"
            style="line-height: 1.2; white-space: unset !important"
          >
            {{ portfolio.title }}
          </v-card-title>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12">
          <template v-if="portfolio.content">
            <dynamic :content="portfolio.content" />
          </template>
        </v-col>
      </v-row>
    </v-container>
</template>
