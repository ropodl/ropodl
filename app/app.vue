<script setup>
const { show, text, color, closeSnackbar } = useSnackbar()
</script>
<template>
   <NuxtLoadingIndicator color="white" :height="1" />
   <NuxtLayout>
      <NuxtPage />
      <v-snackbar v-model="show" dismissible color="surface" rounded="xl" variant="flat">
            {{ text }}
            <template #actions>
               <v-btn
                  size="small"
                  rounded="xl"
                  icon="carbon:close"
                  variant="text"
                  :color
                  @click="closeSnackbar"
               />
            </template>
         </v-snackbar>
   </NuxtLayout>
</template>
