<script setup>
import { mdiCheck, mdiEye } from "@mdi/js";
import { defineAsyncComponent, ref, watch, reactive } from "vue";

const PageTitle = defineAsyncComponent(() =>
  import("@/components/layout/PageTitle.vue")
);

let current = ref("All");
let categories = ["All", "Graphic Design", "Web"];

let works = [
  {
    img: "https://cdn.dribbble.com/users/1462542/screenshots/15078907/media/77d0f57efb1d67aeb81b8b520e143b36.png",
    link: "https://google.com",
    category: "Web",
  },
  {
    img: "https://cdn.dribbble.com/users/1462542/screenshots/13964553/media/de7681bf963d621cf0804f95d24f63f7.jpg",
    link: "https://google.com",
    category: "Graphic Design",
  },
  {
    img: "https://cdn.dribbble.com/userupload/5525097/file/original-bec38402c952bde85d074df812cabebc.png",
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
          flat
          class="text-capitalize mr-1"
          :color="current == cat ? 'primary' : 'white'"
          variant="text"
          v-for="cat in categories"
          @click="current = cat"
        >
          <v-icon start v-if="current == cat" :icon="mdiCheck"></v-icon>
          {{ cat }}
        </v-btn>
      </v-col>
      <v-container class="pt-0">
        <v-row v-auto-animate>
          <template v-for="(work, i) in works">
            <v-col
              cols="12"
              md="4"
              v-if="work['category'] === current || current === 'All'"
            >
              <v-hover v-slot="{ isHovering, props }">
                <v-card flat v-bind="props">
                  <v-img eager cover height="200" :src="work['img']">
                    <v-overlay
                      contained
                      persistent
                      scrim="black"
                      :model-value="isHovering"
                      class="align-center justify-center"
                    >
                      <v-btn icon flat>
                        <v-icon :icon="mdiEye"></v-icon>
                      </v-btn>
                    </v-overlay>
                  </v-img>
                </v-card>
              </v-hover>
            </v-col>
          </template>
        </v-row>
      </v-container>
    </v-row>
  </v-container>
</template>
