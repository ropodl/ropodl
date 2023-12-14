<script setup>
import { SpeedInsights } from "@vercel/speed-insights/nuxt";

const { isOnline } = useNetwork();

const route = useRoute();
// const user = useUser();

// onMounted(() => {
//   const token = localStorage.getItem("user_auth_token");
//   if (!token) return;
//   nextTick(() => {
//     user.checkAuth(token);
//   });
// });
</script>

<template>
  <div>
    <SpeedInsights />
    <VitePwaManifest />
    <NuxtLoadingIndicator :height="1" color="rgb(var(--v-theme-primary))" />
    <div
      class="position-fixed w-100 h-100"
      style="
        opacity: 0.1;
        mask-image: radial-gradient(circle, #fff, transparent);
      "
    >
      <svg aria-hidden="true" class="position-absolute w-100 h-100">
        <defs>
          <pattern
            id=":Rem:"
            width="128"
            height="128"
            patternUnits="userSpaceOnUse"
            x="50%"
            y="100%"
          >
            <path d="M0 128V.5H128" fill="none" stroke="currentColor"></path>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#:Rem:)"></rect>
      </svg>
    </div>
    <v-app>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
      <LazyLayoutOfflineBanner v-if="!isOnline" />
      <LazyLayoutGoTop v-if="!route.fullPath.includes('/admin/')" />
      <LazyLayoutSnackbar />
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
