<script setup>
import { Icon } from "@iconify/vue";

const { loggedIn, user } = useUserSession();

const loading = ref(true);

onMounted(() => {
  nextTick(() => {
    loading.value = true;
    if (loggedIn.value && user.value.role === "admin") {
      navigateTo("/admin/", { replace: true });
    }
    loading.value = false;
  });
});
</script>
<template>
  <v-container class="h-100">
    <v-row align="center" justify="center" class="h-100">
      <v-col cols="2" class="d-flex align-center h-100">
        <div class="w-100">
          <v-card-title class="text-center">Sign In With</v-card-title>
          <v-btn
            block
            elevation="0"
            rounded="lg"
            class="text-capitalize"
            href="/auth/github"
          >
            <v-icon start>
              <Icon icon="fa6-brands:github" />
            </v-icon>
            GitHub
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
