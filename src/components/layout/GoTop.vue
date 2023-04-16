<script setup>
import { ref } from "vue";
import { useScrollTo } from "@/composables/scrollToId";
import { mdiArrowUp } from "@mdi/js";

let show = ref(false);

const onScroll = (e) => {
  if (typeof window === "undefined") return;
  const top = window.scrollY || 0;
  show.value = top > 500 ? true : false;
};
</script>
<template>
  <v-btn
    icon
    size="x-large"
    variant="tonal"
    class="position-fixed"
    v-scroll="onScroll"
    @click="useScrollTo('app', 0)"
    aria-label="Go to top button"
    :style="{
      bottom: show ? '40px' : '-70px',
      right: '40px',
      zIndex: '999',
      transition: 'all 250ms cubic-bezier(.17,.26,1,.32) 0s',
    }"
  >
    <v-icon :icon="mdiArrowUp"></v-icon>
  </v-btn>
</template>
