<script setup>
import {
  mdiCheck,
  mdiClose,
  mdiEye,
  mdiMagnifyPlusOutline,
  mdiMagnifyMinusOutline,
  mdiArrowExpand,
  mdiArrowCollapse,
} from "@mdi/js";
import { defineAsyncComponent, ref, reactive } from "vue";

const PageTitle = defineAsyncComponent(() =>
  import("@/components/layout/PageTitle.vue")
);

let dialogs = reactive([]);
let fullWidth = ref(false);
let zoomLevel = ref(0);

let current = ref("All");
let categories = ["All", "Graphic Design", "Web", "Branding"];

let works = [
  {
    img: "https://cdn.dribbble.com/users/1462542/screenshots/15078907/media/77d0f57efb1d67aeb81b8b520e143b36.png",
    link: "https://google.com",
    category: "Branding",
    title: "API Technology Concept Branding",
  },
  {
    img: "https://cdn.dribbble.com/users/1462542/screenshots/13964553/media/de7681bf963d621cf0804f95d24f63f7.jpg",
    link: "https://google.com",
    category: "Branding",
    title: "Honiko Multiple Branding",
  },
  {
    title: "Be Curious not Judgemental",
    category: "Graphic Design",
    link: "https://google.com",
    img: "https://cdn.dribbble.com/userupload/5525097/file/original-bec38402c952bde85d074df812cabebc.png",
    image: {
      thumbnail:
        "https://cdn.dribbble.com/userupload/5525097/file/original-bec38402c952bde85d074df812cabebc.png",
      full: "",
    },
  },
  {
    img: "/image/portfolio/VueDash.png",
    link: "https://vuedash.vercel.app/",
    category: "Web",
    title: "Vuetify Dashboard",
  },
  {
    img: "/image/portfolio/api.png",
    link: "https://vuedash.vercel.app/",
    category: "Web",
    title: "API Technology Website",
  },
  {
    img: "/image/portfolio/animezone.png",
    link: "https://vuedash.vercel.app/",
    category: "Web",
    title: "Anime Zone Website",
  },
  {
    img: "/image/portfolio/reno.png",
    link: "https://vuedash.vercel.app/",
    category: "Web",
    title: "Reno Website",
  },
];

const closeDialog = (i) => {
  dialogs[i] = false;
  fullWidth.value = false;
  zoomLevel.value = 0;
};
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-btn-group>
          <v-btn
            flat
            class="text-capitalize mr-1"
            :color="current == cat ? 'primary' : 'white'"
            variant="text"
            v-for="cat in categories"
            @click="current = cat"
          >
            <!-- <v-icon start v-if="current == cat" :icon="mdiCheck"></v-icon> -->
            {{ cat }}
          </v-btn>
        </v-btn-group>
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
                  persistent
                  no-click-animation
                  v-model="dialogs[i]"
                  transition="fade-transition"
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
                      class="h-100 d-flex align-center justify-center"
                      :class="fullWidth ? 'w-100' : 'w-75'"
                      style="backdrop-filter: blur(10px)"
                    >
                      <v-card-text
                        class="d-flex w-100 position-absolute z-index-1 pb-0"
                        style="top: 0"
                      >
                        <v-hover v-slot="{ isHovering, props: button }">
                          <v-btn
                            icon
                            size="small"
                            variant="tonal"
                            :color="isHovering ? 'white' : 'black'"
                            @click="closeDialog(i)"
                            v-bind="button"
                          >
                            <v-icon
                              size="large"
                              color="white"
                              :icon="mdiClose"
                            ></v-icon>
                          </v-btn>
                        </v-hover>
                        <v-spacer></v-spacer>
                        <v-hover v-slot="{ isHovering, props: button }">
                          <v-btn
                            icon
                            size="small"
                            variant="tonal"
                            class="mr-3"
                            :disabled="zoomLevel == 3"
                            :color="isHovering ? 'white' : 'black'"
                            v-bind="button"
                            @click="zoomLevel++"
                          >
                            <v-icon
                              size="large"
                              color="white"
                              :icon="mdiMagnifyPlusOutline"
                            ></v-icon>
                          </v-btn>
                        </v-hover>
                        <v-hover v-slot="{ isHovering, props: button }">
                          <v-btn
                            icon
                            size="small"
                            variant="tonal"
                            class="mr-3"
                            :disabled="zoomLevel == 0"
                            :color="isHovering ? 'white' : 'black'"
                            v-bind="button"
                            @click="zoomLevel--"
                          >
                            <v-icon
                              size="large"
                              color="white"
                              :icon="mdiMagnifyMinusOutline"
                            ></v-icon>
                          </v-btn>
                        </v-hover>
                        <v-hover v-slot="{ isHovering, props: button }">
                          <v-btn
                            icon
                            size="small"
                            variant="tonal"
                            class="mr-3"
                            :color="isHovering ? 'white' : 'black'"
                            v-bind="button"
                            @click="fullWidth = !fullWidth"
                          >
                            <v-icon
                              size="large"
                              color="white"
                              :icon="
                                fullWidth ? mdiArrowCollapse : mdiArrowExpand
                              "
                            ></v-icon>
                          </v-btn>
                        </v-hover>
                      </v-card-text>
                      <v-img
                        :src="works[i].img"
                        :class="['zoom-scale-' + zoomLevel]"
                      ></v-img>
                    </v-card>
                    <v-card
                      flat
                      v-if="!fullWidth"
                      rounded="0"
                      class="h-100"
                      :class="fullWidth ? '' : 'w-25'"
                    >
                      <v-card-title class="text-wrap">
                        {{ work["title"] }}
                      </v-card-title>
                      <v-card-text>
                        <v-chip>{{ work["category"] }}</v-chip>
                      </v-card-text>
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
<style lang="scss">
.z-index-1 {
  z-index: 1;
}
// image zoom effect
.v-img {
  .v-img__img {
    transform: scale(1);
  }
  &.zoom-scale-1 {
    .v-img__img {
      transform: scale(1.3);
    }
  }
  &.zoom-scale-2 {
    .v-img__img {
      transform: scale(1.7);
    }
  }
  &.zoom-scale-3 {
    .v-img__img {
      transform: scale(2.1);
    }
  }
}
</style>
