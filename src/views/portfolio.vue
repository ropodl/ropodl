<script setup>
import { defineAsyncComponent, ref, watch, reactive } from "vue";

const PageTitle = defineAsyncComponent(() =>
  import("@/components/layout/PageTitle.vue")
);

let current = ref("all");
let categories = ["Graphic Design", "Web"];

let works = [
  {
    img: "https://cdn.dribbble.com/users/1462542/screenshots/15078907/media/77d0f57efb1d67aeb81b8b520e143b36.png",
    link: "https://google.com",
    category: "Web",
  },
  {
    img: "https://cdn.dribbble.com/users/1462542/screenshots/15078907/media/77d0f57efb1d67aeb81b8b520e143b36.png",
    link: "https://google.com",
    category: "Graphic Design",
  },
];
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <PageTitle title="Portfolio"></PageTitle>
        <v-btn
          class="text-capitalize mr-3"
          flat
          variant="flat"
          @click="current = 'all'"
          >All
        </v-btn>
        <v-btn
          flat
          class="text-capitalize mr-3"
          variant="flat"
          v-for="cat in categories"
          v-text="cat"
          @click="current = cat"
        ></v-btn>
      </v-col>
      <v-container>
        <v-row>
          <template v-for="(work, i) in works">
            <v-col
              cols="12"
              md="4"
              v-if="work['category'] === current || current === 'all'"
            >
              <v-card border flat>
                <v-img eager :src="work['img']"></v-img>
              </v-card>
            </v-col>
          </template>
        </v-row>
      </v-container>
    </v-row>
  </v-container>
</template>
