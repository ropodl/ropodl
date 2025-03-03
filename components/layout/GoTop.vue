<script lang="ts" setup>
const goTo = useGoTo();

const show = ref(false);
const progress = ref(0);

const onScroll = (e: Event) => {
  if (typeof window === "undefined") return;
  const top = window.scrollY || 0;
  show.value = top > 100 ? true : false;
  // Scroll Progress
  const scrollTop = window.pageYOffset;
  const documentHeight = document.documentElement.scrollHeight;
  const viewportHeight = window.innerHeight;
  progress.value = (scrollTop / (documentHeight - viewportHeight)) * 100;
};

const goTop = () => {
  goTo(0);
};
</script>
<template>
  <div
    class="position-fixed"
    :style="{
      bottom: show ? '20px' : '-70px',
      right: '20px',
      zIndex: '999',
      transition: 'all 250ms cubic-bezier(.17,.26,1,.32) 0s',
    }"
  >
    <v-fab
      flat
      border
      icon
      rounded="circle"
      size="40"
      v-scroll="onScroll"
      aria-label="Go to top button"
      @click="goTop"
    >
      <v-progress-circular
        color="brand"
        width="3"
        size="40"
        :model-value="progress"
        aria-label="document scroll position"
        class="circular-no-animation"
      >
        <v-icon color="white" icon="mdi-arrow-up" />
      </v-progress-circular>
    </v-fab>
  </div>
</template>
<style lang="scss">
.circular-no-animation {
  circle.v-progress-circular__overlay {
    transition: none !important;
  }
}
</style>
