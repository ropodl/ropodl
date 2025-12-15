<script setup lang="ts">
const { show, text, color, closeSnackbar } = useSnackbar();
</script>

<template>
   <v-snackbar
      v-model="show"
      :color="color"
      timeout="3000"
      location="top right"
   >
      {{ text }}
      <template #actions>
         <v-btn variant="text" icon="mdi-close" @click="closeSnackbar" />
      </template>
   </v-snackbar>
</template>
