<template>
  <v-container class="py-0">
    <v-card
      border
      rounded
      class="border-b-0 rounded-b-0"
      style="
        background-color: rgba(var(--v-theme-surface), 0.7);
        backdrop-filter: blur(8px);
      "
    >
      <v-card-title class="d-flex justify-center text-overline text-capitalize">
        Copyright © {{ new Date().getFullYear() }} - Saroj Poudel
      </v-card-title>
    </v-card>
  </v-container>
</template>
