<script setup>
const { isOnline } = useNetwork();
const route = useRoute();

const app = ref(null);
useIsFullScreen(app);

const bgPattern = `<div class="position-fixed w-100 h-100" style="opacity: 0.05;mask-image: radial-gradient(circle, #fff, transparent);">
      <svg aria-hidden="true" class="position-absolute w-100 h-100">
        <defs>
          <pattern
            id=":Rem:"
            width="64"
            height="64"
            patternUnits="userSpaceOnUse"
            x="50%"
            y="100%"
          >
            <path d="M0 128V.5H128" fill="none" stroke="currentColor"></path>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#:Rem:)"></rect>
      </svg>
    </div>`;
</script>

<template>
  <div>
    <VitePwaManifest />
    <NuxtLoadingIndicator :height="1" color="rgb(var(--v-theme-primary))" />
    <template v-if="!route.fullPath.includes('/admin')">
      <div v-html="bgPattern"></div>
    </template>
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
  -webkit-box-orient: vertical;
  white-space: normal !important;
  overflow: hidden !important;
}
.line-clamp-2 {
  display: -webkit-box !important;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  white-space: normal !important;
  overflow: hidden !important;
}
.line-clamp-3 {
  display: -webkit-box !important;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  white-space: normal !important;
  overflow: hidden !important;
}
</style>
