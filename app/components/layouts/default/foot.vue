<script setup lang="ts">
import { computed } from 'vue';
import socials from '@/utils/social';
import { useDisplay, useGoTo } from 'vuetify';
import { useWindowScroll } from '@vueuse/core';

const goTo = useGoTo();
const { mobile } = useDisplay();
const { y } = useWindowScroll();

const scrollPercentage = computed(() => {
  if (import.meta.server) return 0;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  return height > 0 ? (y.value / height) * 100 : 0;
});

const isVisible = computed(() => {
  return y.value > 10;
});

const goTop = () => {
  goTo(0, {
    easing: 'linear',
    duration: 250,
  });
};
</script>
<template>
  <v-container
    max-width="1200"
    class="position-sticky left-0 right-0 mx-auto mb-n12 z-1010"
    style="bottom: 10px; pointer-events: none"
  >
    <v-row>
      <v-col cols="12" class="d-flex px-6">
        <v-spacer />
        <v-btn
          v-tooltip="{
            location: 'top',
            text: 'Go To Top',
          }"
          :class="isVisible ? 'opacity-100' : 'opacity-0'"
          :border="false"
          icon
          rounded="circle"
          :style="`pointer-events: ${isVisible ? 'all' : 'none'}; transition: opacity 0.3s ease-in-out;`"
          @click="goTop"
        >
          <v-progress-circular size="50" width="1" :model-value="scrollPercentage">
            <v-icon size="small" icon="carbon:up-to-top" />
          </v-progress-circular>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
  <v-footer
    border="t"
    class="site-footer blur-8"
    :class="{ 'pb-16': mobile }"
  >
    <v-card
      color="transparent"
      border="0"
      rounded="0"
      class="pt-16 w-100 overflow-visible"
    >
      <v-container max-width="1200">
        <v-row class="align-end">
          <v-col cols="12" md="8">
            <div class="text-overline text-medium-emphasis mb-4 footer-label">
              Available for product design, frontend systems, and full-stack builds
            </div>
            <div class="footer-title font-weight-bold">
              Build something that feels
              <span class="text-primary">sharp, fast, and hard to ignore.</span>
            </div>
            <div class="text-body-large text-medium-emphasis mt-5 footer-copy">
              If you need a frontend that carries its own weight, I design and ship it end-to-end.
            </div>
          </v-col>
          <v-col cols="12" md="4" class="d-flex justify-md-end">
            <v-btn
              color="primary"
              variant="flat"
              rounded="pill"
              size="x-large"
              class="px-8"
              href="mailto:hello@ropodl.com"
            >
              hello@ropodl.com
              <template #append>
                <v-icon icon="carbon:arrow-up-right" />
              </template>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
      <v-container max-width="1200" class="pt-10">
        <v-row align="center" justify="center">
          <v-col cols="12" md="4">
            <div class="d-flex align-center text-body-2 text-medium-emphasis">
              Copyright © {{ new Date().getFullYear() }}. Saroj Poudel.
            </div>
          </v-col>
          <v-col cols="12" md="8">
            <ul class="list-none d-flex flex-wrap justify-sm-center justify-md-end pl-0">
              <template v-for="{ icon, link, name } in socials" :key="link">
                <li>
                  <v-btn
                    rounded="lg"
                    color="primary"
                    variant="text"
                    class="mr-1 mr-sm-3"
                    size="small"
                    :href="link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <v-icon start :icon />
                    {{ name }}
                  </v-btn>
                </li>
              </template>
            </ul>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-footer>
</template>
<style scoped>
.site-footer {
  background:
    linear-gradient(180deg, rgba(var(--v-theme-surface), 0.08), rgba(var(--v-theme-surface), 0.4)),
    rgba(var(--v-theme-background), 0.7);
}

.footer-label {
  letter-spacing: 0.18em;
}

.footer-title {
  font-size: clamp(2.2rem, 5vw, 4.5rem);
  line-height: 0.95;
  max-width: 14ch;
}

.footer-copy {
  max-width: 42ch;
}
</style>
