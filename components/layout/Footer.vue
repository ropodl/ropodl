<script setup>
import { Icon } from "@iconify/vue";

const i = ref(0);

const socials = [
  {
    name: "Instagram",
    icon: "fa6-brands:instagram",
    link: "https://instagram.com/ropodl/",
  },
  {
    name: "Dribbble",
    icon: "fa6-brands:dribbble",
    link: "https://dribbble.com/ropodl/",
  },
  {
    name: "Linkedin",
    icon: "fa6-brands:linkedin-in",
    link: "https://linkedin.com/in/ropodl/",
  },
  {
    name: "GitHub",
    icon: "fa6-brands:github",
    link: "https://github.com/ropodl/",
  },
];

const goToAdmin = () => {
  i.value++;
  if (i.value === 10) navigateTo("/sign-in");
  else return;
};
</script>
<template>
  <v-card class="pt-6 pb-16" rounded="0" elevation="10" color="#3a3d4f">
    <v-card-text class="text-center">
      <LazySharedLogo @click="goToAdmin" />
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
              <v-icon>
                <Icon :icon="social['icon']" />
              </v-icon>
            </v-btn>
          </v-hover>
        </li>
      </ul>
    </v-card-text>
  </v-card>
</template>
