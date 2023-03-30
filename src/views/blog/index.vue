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
        <PageTitle title="Blogs"></PageTitle>
        <v-card border flat>
          <v-card-text>Nothing yet but stay tuned.</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
