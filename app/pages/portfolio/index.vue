<script setup lang="ts">
// import type { Portfolio } from '@@/types/portfolio';
// import { defineAsyncComponent } from 'vue';

// const card = defineAsyncComponent(() => import('@/components/guest/shared/portfolio/card.vue'));

// defineProps<{
//   portfolios: Portfolio[];
// }>();

// const calcCol = (i: number) => {
//   return (i + 1) % 3 ? 6 : 12;
// };
</script>
<template>
   <v-container max-width="1200">
      <v-row>
         <v-col>
            <layouts-default-page-title>
               Look at what I've been
               <span class="text-primary-darken-2">working on</span>.
            </layouts-default-page-title>
         </v-col>
      </v-row>
      <!-- <template v-if="portfolios.length">
        <v-row class="py-16">
          <template
            v-for="(portfolio, i) in portfolios"
            :key="portfolio.id"
          >
            <v-col
              class="mb-6"
              cols="12"
              :md="calcCol(i)"
            >
              <card :portfolio />
            </v-col>
          </template>
        </v-row>
      </template>
      <template v-else> -->
      <v-row class="py-16">
         <v-col class="mb-6">
            <v-alert border rounded="lg" border-color="white">
               Sorry no content available.
            </v-alert>
         </v-col>
      </v-row>
      <!-- </template> -->
   </v-container>
   <!-- </guest-layout> -->
</template>
