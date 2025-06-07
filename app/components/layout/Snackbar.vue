<script setup lang="ts">
const snackbar = useSnackbarStore();
const { snackbar: toast } = storeToRefs(snackbar);
const { color } = toast.value;
</script>
<template>
  <v-snackbar
    v-model="toast.show"
    location="top right"
    variant="outlined"
    :color
    content-class="background"
  >
    {{ toast.text }}
    <template v-slot:actions>
      <v-btn
        icon="mdi-close"
        size="x-small"
        rounded="lg"
        variant="text"
        @click="toast.show = false"
      >
      </v-btn>
    </template>
  </v-snackbar>
</template>
