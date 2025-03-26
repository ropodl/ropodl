<script setup>
const defaults = ref({
  global: {
    theme: "front",
  },
});

const bgPattern = ``;
</script>
<template>
  <lazy-layout-navbar />
  <v-main class="pt-5">
    <slot />
  </v-main>
  <lazy-layout-footer />
  <div
    class="position-fixed w-100 h-100"
    style="
      opacity: 0.05;
      mask-image: radial-gradient(circle, #fff, transparent);
    "
  >
    <svg aria-hidden="true" class="position-absolute w-100 h-100">
      <defs>
        <pattern
          id=":Rem:"
          width="64"
          height="64"
          patternUnits="userSpaceOnUse"
          x="50%"
          y="100%"
        >
          <path d="M0 128V.5H128" fill="none" stroke="currentColor"></path>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#:Rem:)"></rect>
    </svg>
  </div>
</template>
