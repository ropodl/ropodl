<script setup>
const { isOnline } = useNetwork();
// const user = useUser();

onMounted(() => {
   const token = localStorage.getItem("user_auth_token");
   if (!token) return;
  //  user.checkAuth(token);
});
</script>

<template>
  <div>
    <VitePwaManifest />
    <NuxtLoadingIndicator color="rgb(var(--v-theme-primary))" />
    <v-app>
      <NuxtLayout>
        <NuxtPage keepalive />
      </NuxtLayout>
      <LazyLayoutOfflineBanner v-if="!isOnline" />
      <LazyLayoutGoTop />
      <LazyLayoutSnackbar />
    </v-app>
  </div>
</template>
<style lang="scss">
.list-style-none {
  list-style: none;
}
</style>
