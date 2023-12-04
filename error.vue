<script setup lang="ts">
const props = defineProps({
  error: Object,
});
</script>

<template>
  <v-app>
    <NuxtLayout class="h-100">
      <v-container class="h-100">
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
                  height="50"
                  rounded="lg"
                  variant="tonal"
                  class="text-capitalize px-10"
                  to="/"
                  replace="true"
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
