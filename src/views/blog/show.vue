<script setup>
import { defineAsyncComponent } from "vue";
const PageTitle = defineAsyncComponent(() =>
  import("@/components/layout/PageTitle.vue")
);
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <PageTitle :title="'a'"></PageTitle>
      </v-col>
    </v-row>
  </v-container>
</template>
