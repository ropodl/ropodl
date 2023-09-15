<script setup>
const { isOnline } = useNetwork();
const user = useUser();

onMounted(() => {
  getIsAuth();
});

const getIsAuth = async () => {
  // getIsAuth();
  console.log("Running isAuth");
  const token = localStorage.getItem("user_auth_token");
  if (!token) return;

  const { data, error } = await useFetch("/api/login/is-auth", {
    headers: {
      Authorization: `Bearer ${token}`,
      accept: "application/json",
    },
  });
  if (error) return console.log(error);
  console.log(data.value);
  user.user = data.value;
};
</script>

<template>
  <div>
    <!-- <VitePwaManifest /> -->
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
