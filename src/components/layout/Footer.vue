<script setup>
import { defineAsyncComponent } from "vue";
const Logo = defineAsyncComponent(() => import("@/components/shared/Logo.vue"));
const socials = [
  {
    name: "Instagram",
    icon: "fa:fa-brands fa-instagram",
    link: "https://instagram.com/ropodl/",
  },
  {
    name: "Dribbble",
    icon: "fa:fa-brands fa-dribbble",
    link: "https://dribbble.com/ropodl/",
  },
  {
    name: "Linkedin",
    icon: "fa:fa-brands fa-linkedin-in",
    link: "https://linkedin.com/in/ropodl/",
  },
  {
    name: "GitHub",
    icon: "fa:fa-brands fa-github",
    link: "https://github.com/ropodl/",
  },
];
</script>
<template>
  <v-card class="pt-16 pb-10" rounded="0" elevation="0" color="#3a3d4f">
    <v-card-text class="text-center">
      <Logo />
    </v-card-text>
    <v-card-text class="text-center">
      <strong> Thanks for scrolling, </strong>that's all folks.

      <ul class="d-flex justify-center list-style-none mt-8">
        <li v-for="(social, i) in socials">
          <v-hover v-slot="{ isHovering, props }">
            <v-btn
              rounded
              height="40"
              variant="text"
              target="_blank"
              :href="social['link']"
              :aria-label="social['name']"
              v-bind="props"
              :color="isHovering ? 'primary' : 'white'"
              size="small"
              class="mr-3"
            >
              <v-icon :icon="social['icon']"></v-icon>
            </v-btn>
          </v-hover>
        </li>
      </ul>
    </v-card-text>
  </v-card>
</template>

<style lang="scss" scoped></style>
