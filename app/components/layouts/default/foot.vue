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
    class="position-sticky left-0 right-0 mx-auto mb-n16 mb-md-n12 z-1010"
    style="bottom: 20px; pointer-events: none"
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
          variant="elevated"
          color="surface"
          icon
          rounded="circle"
          :style="`pointer-events: ${isVisible ? 'all' : 'none'}; transition: all 0.3s ease-in-out;`"
          @click="goTop"
        >
          <v-progress-circular size="50" width="1" color="primary" :model-value="scrollPercentage">
            <v-icon size="small" color="white" icon="carbon:up-to-top" />
          </v-progress-circular>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
  <v-footer
    border="t"
    class="blur-8"
    :class="{ 'pb-16': mobile }"
  >
    <v-card
      color="transparent"
      border="0"
      rounded="0"
      class="pt-16 w-100 overflow-visible"
    >
      <v-container max-width="1200">
        <v-row>
          <v-col cols="12">
            <div class="text-h6 text-md-title-large mb-6">
              Liked my works? Let's Talk and work together
            </div>
            <a
              href="mailto:hello@ropodl.com"
              class="text-decoration-none text-high-emphasis d-inline-flex align-center flex-wrap"
            >
              <div class="text-email font-weight-bold">
                <span class="text-primary-darken-2">hello</span>@ropodl.com
              </div>
              <v-btn
                v-if="!mobile"
                border
                icon="carbon:arrow-up-right"
                variant="tonal"
                rounded="circle"
                class="ms-3"
              />
            </a>
          </v-col>
        </v-row>
      </v-container>
      <v-container max-width="1200">
        <v-row align="center" justify="center">
          <v-col cols="12" md="6">
            <div class="d-flex align-center justify-center justify-md-start text-body-1">
              Copyright © {{ new Date().getFullYear() }}.
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <ul class="list-none d-flex justify-center justify-md-end mt-4 mt-md-0">
              <template v-for="{ icon, link } in socials" :key="link">
                <li>
                  <v-btn
                    rounded="lg"
                    color="primary"
                    variant="text"
                    class="mr-3"
                    size="small"
                    :href="link"
                    :icon
                  />
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
.text-email {
  /* Scales from 2.5rem on small screens to 6rem on large screens */
  font-size: clamp(2.5rem, 8vw, 6rem);
  line-height: 1.1;
  word-break: break-all;
}
</style>
