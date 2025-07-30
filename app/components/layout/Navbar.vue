<script setup lang="ts">
const route = useRoute();

const drawer = ref(false);
const pages = [
  {
    icon: "mdi-post-outline",
    title: "home",
    to: "/",
  },
  // {
  //   icon: "mdi-post-outline",
  //   title: "blogs",
  //   to: "/blogs",
  // },
  // {
  //   icon: "mdi-file-certificate-outline",
  //   title: "portfolio",
  //   to: "/portfolio",
  // },
  {
    icon: "mdi-contacts-outline",
    title: "contact",
    to: "/contact",
  },
  {
    icon: "mdi-information-outline",
    title: "about",
    to: "/about",
  },
];
</script>
<template>
  <v-card
    flat
    height="50"
    location="top"
    class="position-fixed"
    style="
      top: 10px;
      z-index: 1010;
      background-color: rgba(var(--v-theme-surface), 0.7);
      backdrop-filter: blur(8px);
    "
  >
    <v-card-text class="pa-0 h-100 d-flex align-center">
      <v-tabs hide-slider height="50" class="hidden-md-and-down">
        <template v-for="{ title, to } in pages">
          <v-tab
            rounded="0"
            :to
            :variant="route.path === to ? 'tonal' : 'text'"
          >
            {{ title }}
          </v-tab>
        </template>
      </v-tabs>
      <v-btn
        rounded="0"
        class="hidden-lg-and-up"
        height="50"
        icon="mdi-menu"
        @click="drawer = !drawer"
      ></v-btn>
    </v-card-text>
  </v-card>
  <v-bottom-sheet v-model="drawer" inset scrim="black">
    <v-card
      rounded="t-lg"
      class="border-b-0"
      style="
        background-color: rgba(var(--v-theme-surface), 0.7);
        backdrop-filter: blur(8px);
      "
    >
      <v-list bg-color="transparent">
        <v-list-subheader>Navigate to</v-list-subheader>
        <template v-for="{ title, icon, to } in pages">
          <v-list-item
            :title="`${title}.`"
            :to
            density="compact"
            :prepend-icon="icon"
            active-class="text-brand"
            @click="drawer = false"
          />
        </template>
      </v-list>
    </v-card>
  </v-bottom-sheet>
</template>
