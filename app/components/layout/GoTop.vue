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
    <v-btn
      flat
      border
      icon
      size="56"
      class="overflow-hidden"
      v-scroll="onScroll"
      aria-label="Go to top button"
      @click="goTop"
    >
      <v-icon color="white" icon="mdi-arrow-up" />
      <div class="progress-track" :style="{ height: progress + '%' }"></div>
    </v-btn>
  </div>
</template>
<style lang="scss">
.progress-track {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(255, 255, 255, 0.3);
  transition: height 0s;
}
</style>
