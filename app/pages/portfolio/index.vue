<script setup lang="ts">
import { useMockData } from '~/composables/useMockData';
import useApiFetch from '~/utils/shared/useApiFetch';

const { portfolios: mockPortfolios } = useMockData();
const portfolios = ref<any[]>([]);

onMounted(() => {
  fetchPortfolios();
});

const fetchPortfolios = async () => {
  try {
    const res = await useApiFetch<any>('/portfolio');
    portfolios.value = res.data.length ? res.data : mockPortfolios.value;
  } catch (err) {
    portfolios.value = mockPortfolios.value;
  }
};
</script>

<template>
  <v-container class="py-16 px-md-16">
    <v-row class="mb-12">
      <v-col cols="12" md="8">
         <div class="text-overline text-primary mb-2 glow-text">SELECTED WORKS</div>
         <h2 class="text-h2 font-weight-black mb-4">DIGITAL <span class="text-gradient">SHOWCASE</span></h2>
         <p class="text-h6 text-medium-emphasis font-weight-light">A collection of projects exploring the intersection of design and blockchain technology.</p>
      </v-col>
    </v-row>

    <v-row v-if="portfolios.length">
      <v-col
        v-for="project in portfolios"
        :key="project.slug"
        cols="12"
        md="6"
        class="mb-10"
      >
        <v-hover v-slot="{ isHovering, props }">
          <v-card
            v-bind="props"
            :to="`/portfolio/${project.slug}`"
            class="rounded-xl overflow-hidden glass transition-all glow-card"
            elevation="0"
          >
            <v-img
              :src="project.featured"
              height="400"
              cover
              class="transition-all"
              :style="isHovering ? 'transform: scale(1.05)' : ''"
            >
               <div class="fill-height d-flex flex-column justify-end pa-8 grad-bg">
                  <div class="d-flex align-center mb-2">
                     <v-chip size="x-small" color="primary" variant="flat" rounded="lg" class="mr-3">
                        {{ project.type?.title || 'Project' }}
                     </v-chip>
                  </div>
                  <h3 class="text-h4 font-weight-bold text-white mb-2">{{ project.title }}</h3>
                  <p class="text-body-1 text-white opacity-70 line-clamp-2 mb-0">{{ project.description }}</p>
               </div>
            </v-img>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.grad-bg {
  background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, transparent 100%);
}
</style>
