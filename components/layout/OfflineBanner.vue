<template>
  <v-snackbar
    dense
    elevation="0"
    rounded="lg"
    :model-value="true"
    theme="light"
    color="bg-surface"
    :timeout="-1"
  >
    <v-icon class="mr-3" icon="mdi-wifi-strength-alert-outline" />
    Looks like you are currently offline.
  </v-snackbar>
</template>
<style>
.v-banner__content {
  align-content: center !important;
  display: grid !important;
}
</style>
