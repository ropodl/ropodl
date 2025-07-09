<script setup>
const { isOnline } = useNetwork();
const route = useRoute();

const app = ref(null);
useIsFullScreen(app);
</script>

<template>
  <div>
    <VitePwaManifest />
    <NuxtLoadingIndicator :height="1" color="rgb(var(--v-theme-primary))" />
    <v-app ref="app">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
      <LazyLayoutOfflineBanner v-if="!isOnline" />
      <LazyLayoutGoTop v-if="!route.fullPath.includes('/admin/')" />
    </v-app>
  </div>
</template>
<style lang="scss">
body {
  background-color: rgb(var(--v-theme-background));
}
.v-skeleton-loader__image {
  height: 100% !important;
}
.v-img:not(.v-parallax) {
  transition: all 0.2s;
}
.v-img:not(.v-parallax) .v-img__img {
  transform: scale(1);
  transition: all 0.2s;
}
.v-img:not(.v-parallax).zoom-image .v-img__img {
  transform: scale(1.2);
}
// App specific classes
.blur-8 {
  backdrop-filter: blur(8px);
}
// Utility classes
.inset-0 {
  inset: 0;
}
.top-0 {
  top: 0;
}
.bottom-0 {
  bottom: 0;
}
.left-0 {
  left: 0;
}
.right-0 {
  right: 0;
}
.z-index-1 {
  z-index: 1;
}
.z-index-11 {
  z-index: 11;
}
.list-style-none {
  list-style: none;
}
.line-clamp-1 {
  display: -webkit-box !important;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  white-space: normal !important;
  overflow: hidden !important;
}
.line-clamp-2 {
  display: -webkit-box !important;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  white-space: normal !important;
  overflow: hidden !important;
}
.line-clamp-3 {
  display: -webkit-box !important;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  white-space: normal !important;
  overflow: hidden !important;
}
</style>
