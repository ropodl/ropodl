<script setup>
const { show, text, showSnackbar, closeSnackbar } = useSnackbar()
</script>
<template>
   <NuxtLoadingIndicator color="white" :height="1" />
   <NuxtLayout>
      <NuxtPage />
      {{ show }}
      <v-btn @click="showSnackbar('hi am i test?')">Show Snackbar</v-btn>
      <v-snackbar v-model="show" dismissible color="surface" rounded="xl" variant="flat">
            {{ text }}
            <template v-slot:actions>
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
