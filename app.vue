<script setup>
const { isOnline } = useNetwork();

const route = useRoute();
const user = useUser();

onMounted(() => {
  const token = localStorage.getItem("user_auth_token");
  if (!token) return;
  nextTick(() => {
    user.checkAuth(token);
  });
});
</script>

<template>
  <div>
    <VitePwaManifest />
    <NuxtLoadingIndicator color="rgb(var(--v-theme-primary))" />
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
.list-style-none {
  list-style: none;
}
.v-skeleton-loader__image {
  height: 100% !important;
}
</style>
