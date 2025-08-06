<script setup lang="ts">
defineProps({
  error: Object,
});
</script>
<template>
  <v-app>
    <NuxtLayout>
      <Title>Error</Title>
      <v-container class="h-100" style="padding-top: 100px">
        <v-row class="h-100">
          <v-col cols="12" md="4" class="h-100">
            <div class="d-flex align-center h-100">
              <div>
                <div class="text-h1 font-weight-black">
                  {{ error.statusCode }}
                </div>
                <div class="text-h6 mb-6">{{ error.message }}</div>
                <v-btn
                  color="primary"
                  rounded="lg"
                  class="text-capitalize"
                  to="/"
                  :replace="true"
                  >Let's go home</v-btn
                >
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="8"></v-col>
        </v-row>
      </v-container>
    </NuxtLayout>
  </v-app>
</template>
