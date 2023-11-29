<script setup>
definePageMeta({
  layout: "blank",
  middleware: "auth",
});

const { session, signOut } = useAuth();
const user = useUserStore();

const loading = ref(false);

onMounted(() => {
  nextTick(() => {
    // callUser();
    user.getMe(session.value.user.email);
  });
});

const callUser = () => {
  console.log(session.value);
  const { data, error } = useFetch("/api/user/me", {
    method: "POST",
    body: { email: session.value.user.email },
  });
  if (error.value) return console.log(error.value);
  console.log(data);
  if (data.value.role === "admin") {
    navigateTo("/admin/");
  } else {
    navigateTo("/");
    signOut();
  }
};
</script>
<template>
  <v-container class="h-100">
    <v-row justify="center" align="center" class="h-100">
      <v-col cols="6" sm="4" md="3" lg="2">
        <v-img class="mb-9" height="100" src="/favicon-192.png"></v-img>
        <v-progress-linear indeterminate color="primary"></v-progress-linear>
        <v-card-title class="text-center mt-3">Loading</v-card-title>
        <v-btn @click="test">click</v-btn>
        {{ session }}
      </v-col>
    </v-row>
  </v-container>
</template>

<style></style>
