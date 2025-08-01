<script setup lang="ts">
const snackbar = useSnackbarStore();
</script>
<template>
  <v-snackbar
    v-model="snackbar.snackbar.show"
    location="top right"
    variant="outlined"
    :color="snackbar.snackbar.color"
  >
    {{ snackbar.snackbar.text }}
    <template v-slot:actions>
      <v-btn
        icon="mdi-close"
        size="x-small"
        rounded="lg"
        variant="text"
        @click="snackbar.snackbar.show = false"
      >
      </v-btn>
    </template>
  </v-snackbar>
</template>
