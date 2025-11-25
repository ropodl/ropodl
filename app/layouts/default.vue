<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()
const router = useRouter()

// --- Transition State ---
// 'idle' | 'covering' | 'revealing'
const transitionState = ref('idle')
const isInitialLoad = ref(true)

// --- Navigation Guard for Smooth Transitions ---
// This intercepts the route change to play our "Curtain" animation first
router.beforeEach(async (to, from, next) => {
  // If it's the same page, do nothing
  if (to.path === from.path) {
    next()
    return
  }

  // 1. Start covering the screen and hide content instantly
  transitionState.value = 'covering'

  // 2. Wait for the cover animation to finish (600ms matches CSS)
  await new Promise(resolve => setTimeout(resolve, 600))

  // 3. Allow route change to proceed behind the curtain
  next()
})

router.afterEach(() => {
  // 4. Once route is loaded, switch to revealing mode
  // Small delay ensures the DOM has actually updated before the reveal starts
  setTimeout(() => {
    transitionState.value = 'revealing'
    
    // 5. Reset to idle after reveal animation finishes (600ms)
    setTimeout(() => {
      transitionState.value = 'idle'
    }, 600)
  }, 50)
})

// --- Initial Mount Animation ---
onMounted(() => {
  // 1. Initial state is fully covered (via isInitialLoad = true)
  // 2. Wait a small moment (300ms) before starting the reveal
  setTimeout(() => {
    isInitialLoad.value = false // Set this immediately before reveal starts
    transitionState.value = 'revealing'
    
    // 3. Reset to idle after reveal animation finishes
    setTimeout(() => {
      transitionState.value = 'idle'
    }, 600)
  }, 300)
})
</script>

<template>
  <v-app class="app-container">
    <layouts-default-nav />

    <!-- 
      TRANSITION CURTAIN 
      This overlay sits on top of everything (z-index 9999) 
      and wipes the screen during navigation.
    -->
    <div 
      class="transition-curtain"
      :class="[transitionState, { 'initial-load': isInitialLoad }]"
      aria-hidden="true"
    >
      <div class="curtain-layer bg-surface"></div>
    </div>

    <v-main :class="{ 'mt-16': !mobile }" class="main-content">
      <!-- 
        BACKGROUND LAYER 
        A clean, modern gradient mesh. 
      -->
      <div class="studio-bg">
        <div class="gradient-mesh"></div>
        <div class="noise-overlay"></div>
      </div>

      <!-- 
        CONTENT SLOT 
        Content is now explicitly hidden when covering or on initial load.
      -->
      <div 
        class="page-wrapper"
        :class="{ 'content-hidden': transitionState === 'covering' || isInitialLoad }"
      >
        <slot />
      </div>
    </v-main>

    <layouts-default-foot />
  </v-app>
</template>

<style scoped>
/* --- 1. The Curtain Animation (The "Studio" Effect) --- */
.transition-curtain {
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.curtain-layer {
  width: 100%;
  height: 100%;
  background-color: rgb(var(--v-theme-surface-variant));
  transform: scaleY(0);
  transform-origin: bottom;
  will-change: transform;
  transition: transform 0.6s cubic-bezier(0.83, 0, 0.17, 1);
}

/* State: Covering (Wipe Up) */
.transition-curtain.covering .curtain-layer {
  transform: scaleY(1);
  transform-origin: bottom;
}

/* State: Revealing (Wipe Away) */
.transition-curtain.revealing .curtain-layer {
  transform: scaleY(0);
  transform-origin: top;
}

/* Initial Load State: Curtain is fully up/visible until JS starts the reveal */
.transition-curtain.initial-load .curtain-layer {
  transform: scaleY(1);
}

/* --- 2. The Background (Modern & Stable) --- */
.studio-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
  background-color: rgb(var(--v-theme-surface));
}

.gradient-mesh {
  position: absolute;
  width: 150%;
  height: 150%;
  top: -25%;
  left: -25%;
  background: 
    radial-gradient(circle at 50% 50%, rgba(var(--v-theme-primary), 0.08) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(var(--v-theme-secondary), 0.05) 0%, transparent 40%);
  filter: blur(60px);
  opacity: 0.8;
}

.noise-overlay {
  position: absolute;
  inset: 0;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  pointer-events: none;
}

/* --- 3. Content Visibility Control (The fix for no visible content) --- */
.app-container {
  overflow-x: hidden;
}

.main-content {
  position: relative;
  min-height: 100vh;
}

.page-wrapper {
  width: 100%;
  height: 100%;
  /* This transition handles the smooth fade-in and slight slide */
  transition: 
    opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), 
    transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  will-change: opacity, transform;
}

/* Content Hidden State (Active during Initial Load and Covering Navigation) */
.page-wrapper.content-hidden {
  opacity: 0;
  transform: translateY(10px);
}
</style>