<script setup>
const { show, text, closeSnackbar } = useSnackbar();

const loadingIndicatorColor = 'linear-gradient(90deg, rgb(var(--v-theme-primary)) 0%, #ffffff 100%)';
</script>
<template>
  <NuxtLoadingIndicator :color="loadingIndicatorColor" :height="1" />
  <NuxtLayout>
    <NuxtPage />
    <v-snackbar
      v-model="show"
      dismissible
      color="surface"
      rounded="xl"
      variant="flat"
    >
      {{ text }}
      <template #actions>
        <v-btn
          size="small"
          rounded="xl"
          icon="carbon:close"
          variant="text"
          @click="closeSnackbar"
        />
      </template>
    </v-snackbar>
  </NuxtLayout>
</template>
