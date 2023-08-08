<script setup>
import { useNetwork } from "@vueuse/core";
import gsap from "gsap";
import MouseFollower from "mouse-follower";

import { defineAsyncComponent } from "vue";
const { isOnline } = useNetwork();

import "mouse-follower/src/scss/index.scss";
MouseFollower.registerGSAP(gsap);
// Mouse Follower options
new MouseFollower({
  stateDetection: {
    // "-pointer": "a,button",
    "-hidden": "a,button",
  },
});

const Navbar = defineAsyncComponent(() =>
  import("@/components/layout/Navbar.vue")
);
const Footer = defineAsyncComponent(() =>
  import("@/components/layout/Footer.vue")
);

const GoTop = defineAsyncComponent(() =>
  import("@/components/layout/GoTop.vue")
);

const OfflineBanner = defineAsyncComponent(() =>
  import("@/components/layout/OfflineBanner.vue")
);
</script>
<template>
  <v-app>
    <v-main>
      <Navbar />
      <OfflineBanner v-if="!isOnline" />
      <router-view />
      <Footer />
    </v-main>
    <GoTop />
  </v-app>
</template>
<style lang="scss">
.mf-cursor{
  &::before{
    transform: scale(0.5);
  }
}
::selection {
  color: white;
  background: rgba(var(--v-theme-primary), 1);
  filter: invert(0.4);
}
@media (min-width: 1280px) and (min-width: 1920px) {
  .v-container {
    max-width: 1366px !important;
  }
  .v-container.v-container--fluid {
    max-width: 100%;
  }
}
.list-style-none {
  list-style: none;
}
</style>
