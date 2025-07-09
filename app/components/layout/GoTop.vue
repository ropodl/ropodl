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
      v-scroll="onScroll"
      aria-label="Go to top button"
      @click="goTop"
    >
      <v-icon color="white" icon="mdi-arrow-up" />
      <!-- Add pill shape to button -->
      <!-- <div class="progress-container">
        New container for custom progress
        <div class="progress-track" :style="{ height: progress + '%' }"></div>
      </div> -->
      <div class="progres"></div>
    </v-btn>
  </div>
</template>
<style lang="scss">
/* Remove old circular styles */
// .circular-no-animation {
//   display: none;
// }

// /* New progress bar styles */
// .progress-container {
//   position: relative;
//   width: 40px;
//   height: 40px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   border-radius: 20px; /* Fully rounded pill shape */
//   overflow: hidden; /* Clip progress bar to container */
// }

// .progress-track {
//   position: absolute;
//   bottom: 0;
//   left: 0;
//   width: 100%;
//   background: rgba(255, 255, 255, 0.3); /* Progress color */
//   transition: height 0.1s linear;
// }

// /* Override Vuetify's circular button */
// .v-btn--icon.v-btn--density-default {
//   border-radius: 20px !important;
// }
</style>
