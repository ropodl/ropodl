<script setup>
import { defineAsyncComponent } from "vue";
const PageTitle = defineAsyncComponent(() =>
  import("@/components/layout/PageTitle.vue")
);
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-card flat :to="'/blog/' + i">
          <v-img cover height="200" src="/image/blog/magisk.png"></v-img>
          <v-card-text>Does Rooting a phone matter anymore</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card border flat>
          <v-card-text>Nothing yet but stay tuned.</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
