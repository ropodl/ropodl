<script setup>
import {
  mdiCheck,
  mdiClose,
  mdiEye,
  mdiMagnifyPlusOutline,
  mdiMagnifyMinusOutline,
  mdiFullscreen,
  mdiFullscreenExit,
} from "@mdi/js";
import { defineAsyncComponent, ref, reactive } from "vue";

const PageTitle = defineAsyncComponent(() =>
  import("@/components/layout/PageTitle.vue")
);

let dialog = reactive([]);
let fullWidth = ref(false);
let zoomPlusScale = ref(0)
let zoomMinusScale = ref(0)

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
  {
    img: "/image/portfolio/VueDash.png",
    link: "https://vuedash.vercel.app/",
    category: "Web",
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
              <v-hover v-slot="{ isHovering, props: hover }">
                <v-dialog
                fullscreen
                v-model="dialog[i]"
                transition="none"
                  scrim="black"
                  width="auto"
                  content-class="d-flex w-100"
                >
                  <template v-slot:activator="{ props: overlay }">
                    <v-card flat v-bind="{ ...hover }">
                      <v-img eager cover height="200" :src="work['img']">
                        <v-overlay
                          contained
                          persistent
                          scrim="black"
                          :model-value="isHovering"
                          class="align-center justify-center"
                        >
                          <v-btn icon flat v-bind="{ ...overlay }">
                            <v-icon :icon="mdiEye"></v-icon>
                          </v-btn>
                        </v-overlay>
                      </v-img>
                    </v-card>
                  </template>
                  <div class="d-flex w-100 h-100">
                    <v-card
                      flat
                      color="rgba(0,0,0,0.8)"
                      rounded="0"
                      class="h-100"
                      :class="fullWidth ? 'w-100' : 'w-75'"
                      style="backdrop-filter: blur(4px)"
                    >
                      <v-card-text
                        class="d-flex w-100 position-absolute z-index-1"
                      >
                        <v-btn
                          icon
                          variant="tonal"
                          color="black"
                          @click="dialog[i] = false"
                        >
                          <v-icon color="white" :icon="mdiClose"></v-icon>
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn icon class="mr-3" variant="tonal" color="black">
                          <v-icon
                            color="white"
                            :icon="mdiMagnifyPlusOutline"
                          ></v-icon>
                        </v-btn>
                        <v-btn icon class="mr-3" variant="tonal" color="black">
                          <v-icon
                            color="white"
                            :icon="mdiMagnifyMinusOutline"
                          ></v-icon>
                        </v-btn>
                        <v-btn
                          icon
                          variant="tonal"
                          color="black"
                          @click="fullWidth = !fullWidth"
                        >
                          <v-icon
                            color="white"
                            :icon="
                              fullWidth ? mdiFullscreenExit : mdiFullscreen
                            "
                          ></v-icon>
                        </v-btn>
                      </v-card-text>
                      <v-img :src="works[i].img"></v-img>
                      <v-card-text>Image Info</v-card-text>
                    </v-card>
                    <v-card
                      flat
                      v-if="!fullWidth"
                      rounded="0"
                      class="h-100"
                      :class="fullWidth ? '' : 'w-25'"
                    >
                      <v-card-title>This is a test</v-card-title>
                    </v-card>
                  </div>
                </v-dialog>
              </v-hover>
            </v-col>
          </template>
        </v-row>
      </v-container>
    </v-row>
  </v-container>
</template>
<style>
.z-index-1 {
  z-index: 1;
}
</style>
