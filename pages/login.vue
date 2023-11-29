<script setup>
import { Icon } from "@iconify/vue";

definePageMeta({
  layout: "blank",
  middleware: "guest-only",
  auth: { authenticatedRedirectTo: "/loading" },
});

const { signIn } = useAuth();
</script>
<template>
  <v-container class="h-100">
    <v-row align="center" justify="center" class="h-100">
      <v-col cols="2" class="d-flex align-center h-100">
        <div class="w-100">
          <v-card-title class="text-center">Sign In With</v-card-title>
          <v-btn
            block
            rounded="lg"
            class="text-capitalize"
            @click="signIn('github')"
          >
            <v-icon start> <Icon icon="fa6-brands:github" /> </v-icon>
            GitHub
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style></style>
