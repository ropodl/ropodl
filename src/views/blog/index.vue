<script setup>
import { defineAsyncComponent } from "vue";
const PageTitle = defineAsyncComponent(() =>
  import("@/components/layout/PageTitle.vue")
);
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6" v-for="i in 20">
        <v-card flat :to="'/blog/' + i">
          <v-img cover height="200" src="/image/portfolio/VueDash.png"></v-img>
          <v-card-text>Blog 1</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <!-- <PageTitle title="Blogs"></PageTitle> -->
        <v-card border flat>
          <v-card-text>Nothing yet but stay tuned.</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
