<script setup>
const display = useDisplay();
console.log(display);

const active = computed(() => {
  return false;
});

const page = ref("/blog");
const pages = [
  {
    icon: "lucide:sticky-note",
    title: "blogs",
    to: "/blogs",
  },
  {
    icon: "mdi-file-certificate-outline",
    title: "portfolio",
    to: "/portfolio",
  },
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
  <!-- <template> -->
  <!-- <lazy-layout-navbar /> -->
  <!-- </template> -->
  <v-main style="margin-top: 50px">
    <slot />
  </v-main>
  <lazy-layout-footer />
  <template v-if="active">
    <v-bottom-navigation
      v-model="page"
      mode="shift"
      style="
        background-color: rgba(var(--v-theme-surface), 0.7);
        backdrop-filter: blur(8px);
      "
    >
      <template v-for="page in pages">
        <v-btn>
          <v-icon>
            <Icon :name="page.icon" />
          </v-icon>
          <span> Text </span>
        </v-btn>
      </template>
    </v-bottom-navigation>
  </template>
</template>
