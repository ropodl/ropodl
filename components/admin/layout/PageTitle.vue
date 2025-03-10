<script lang="ts" setup>
const {
  title,
  backLink: to,
  items,
} = defineProps({
  title: {
    type: String,
    required: true,
  },
  backLink: {
    type: String,
    required: false,
  },
  items: {
    type: Array,
    default: [
      {
        title: "Home",
        to: "/admin/",
      },
    ],
  },
});
</script>
<template>
  <v-row align="start">
    <v-col cols="12" sm="8" md="8">
      <div class="d-flex align-center">
        <template v-if="backLink">
          <v-btn
            icon="mdi-chevron-left"
            class="mr-3"
            size="small"
            rounded="lg"
            variant="tonal"
            :to
          ></v-btn>
        </template>
        <div class="text-h4 font-weight-bold">
          {{ title }}
        </div>
      </div>
      <v-breadcrumbs :items class="pa-0" />
    </v-col>
    <v-col cols="12" sm="4" md="4">
      <div class="d-flex flex-wrap justify-end align-center">
        <slot />
      </div>
    </v-col>
  </v-row>
</template>
