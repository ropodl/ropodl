<script setup>
import {
  mdiClose,
  mdiEye,
  mdiInformationOutline,
  mdiLink,
  mdiArrowRight,
} from "@mdi/js";
import { ref, reactive, nextTick } from "vue";
import Panzoom from "@panzoom/panzoom";

let dialogs = reactive([]);
let info = ref(true);
let zoomLevel = ref(0);

let current = ref("All");
let categories = ["All", "Graphic Design", "Web", "Branding"];

let works = [
  {
    title: "API Technology Website (New)",
    category: "Web",
    link: "https://www.apitechnology.com.np/",
    image: {
      thumbnail: "/image/portfolio/api(new)/thumb.webp",
      full: "/image/portfolio/api(new)/full.webp",
    },
  },
  {
    title: "API Technology Concept Branding",
    category: "Branding",
    link: "https://dribbble.com/shots/15078907-API-Technology-Logo-Mockup",
    image: {
      thumbnail:
        "https://cdn.dribbble.com/users/1462542/screenshots/15078907/media/77d0f57efb1d67aeb81b8b520e143b36.png?compress=1&resize=768x576&vertical=top",
      full: "https://cdn.dribbble.com/users/1462542/screenshots/15078907/media/77d0f57efb1d67aeb81b8b520e143b36.png",
    },
  },
  {
    title: "Honiko Multiple Branding",
    category: "Branding",
    link: "https://dribbble.com/shots/13964553-Letterhead",
    image: {
      thumbnail:
        "https://cdn.dribbble.com/users/1462542/screenshots/13964553/media/de7681bf963d621cf0804f95d24f63f7.jpg",
      full: "https://cdn.dribbble.com/users/1462542/screenshots/13964553/media/de7681bf963d621cf0804f95d24f63f7.jpg",
    },
  },
  {
    title: "Be Curious not Judgemental",
    category: "Graphic Design",
    link: "https://dribbble.com/shots/20980483-Be-curious",
    image: {
      thumbnail:
        "https://cdn.dribbble.com/userupload/5525097/file/original-bec38402c952bde85d074df812cabebc.png",
      full: "https://cdn.dribbble.com/userupload/5525097/file/original-bec38402c952bde85d074df812cabebc.png",
    },
  },
  {
    title: "Vuetify Dashboard",
    category: "Web",
    link: "https://vuedash.vercel.app/",
    image: {
      thumbnail: "/image/portfolio/vuedash/thumb.webp",
      full: "/image/portfolio/vuedash/full.webp",
    },
  },
  {
    title: "Bishwas Khabar Logo",
    category: "Branding",
    link: "https://bishwashkhabar.com/",
    image: {
      thumbnail: "/image/portfolio/bishwaskhabar/thumb.webp",
      full: "/image/portfolio/bishwaskhabar/full.webp",
    },
  },
  {
    title: "API Technology Website (Old)",
    category: "Web",
    link: "https://www.apitechnology.com.np/",
    image: {
      thumbnail: "/image/portfolio/api/thumb.webp",
      full: "/image/portfolio/api/full.webp",
    },
  },
  {
    title: "Anime Zone Website",
    category: "Web",
    link: "https://animezone.vercel.app/",
    image: {
      thumbnail: "/image/portfolio/animezone/thumb.webp",
      full: "/image/portfolio/animezone/full.webp",
    },
  },
  {
    title: "Reno Website",
    category: "Web",
    link: "https://vuedash.vercel.app/",
    image: {
      thumbnail: "/image/portfolio/reno/thumb.webp",
      full: "/image/portfolio/reno/full.webp",
    },
  },
  {
    title: "Legends",
    category: "Graphic Design",
    link: "https://dribbble.com/shots/6586732-Legends",
    image: {
      thumbnail:
        "https://cdn.dribbble.com/users/1462542/screenshots/6586732/legends.png",
      full: "https://cdn.dribbble.com/users/1462542/screenshots/6586732/legends.png",
    },
  },
];

const openDialog = (i) => {
  dialogs[i] = true;
  info.value = true;
  nextTick(() => {
    const elem = document.getElementById("scene");
    console.log(elem);
    const panzoom = Panzoom(elem, {
      maxScale: 5,
    });
    elem.parentElement.addEventListener("wheel", panzoom.zoomWithWheel);
  });
};

const closeDialog = (i) => {
  dialogs[i] = false;
  nextTick(() => {
    info.value = true;
  });
};
</script>
<template>
  <v-container class="px-0">
    <v-row>
      <v-col cols="12">
        <v-card border flat>
          <v-btn-group rounded="0" variant="outlined">
            <v-btn
              flat
              class="text-capitalize mr-1"
              :color="current == cat ? 'primary' : 'white'"
              variant="text"
              v-for="cat in categories"
              @click="current = cat"
            >
              {{ cat }}
            </v-btn>
          </v-btn-group>
        </v-card>
      </v-col>
      <v-container class="pt-0">
        <v-row v-auto-animate>
          <template v-for="(work, i) in works">
            <v-col
              cols="12"
              sm="6"
              md="6"
              lg="4"
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
                    <v-card flat height="150" v-bind="{ ...hover }">
                      <v-img cover :src="work['image'].thumbnail">
                        <v-overlay
                          contained
                          persistent
                          scrim="black"
                          :model-value="isHovering"
                          class="align-center justify-center"
                        >
                          <v-btn
                            icon
                            flat
                            v-bind="{ ...overlay }"
                            @click="openDialog(i)"
                          >
                            <v-icon :icon="mdiEye"></v-icon>
                          </v-btn>
                        </v-overlay>
                      </v-img>
                    </v-card>
                  </template>
                  <div class="w-100 h-100">
                    <v-card
                      flat
                      color="rgba(0,0,0,0.8)"
                      rounded="0"
                      class="h-100 align-center justify-center"
                      style="backdrop-filter: blur(2px)"
                    >
                      <v-card-text
                        class="position-absolute z-index-1 pb-0 pr-0"
                        style="top: 0"
                      >
                        <v-hover v-slot="{ isHovering, props: button }">
                          <v-btn
                            icon
                            variant="tonal"
                            :color="isHovering ? 'white' : 'black'"
                            @click="closeDialog(i)"
                            v-bind="button"
                          >
                            <v-icon color="white" :icon="mdiClose"></v-icon>
                          </v-btn>
                        </v-hover>
                      </v-card-text>

                      <v-card-text
                        class="position-absolute z-index-1 pb-0 pl-0"
                        style="top: 0; right: 0"
                      >
                        <v-hover v-slot="{ isHovering, props: button }">
                          <v-btn
                            icon
                            variant="tonal"
                            :color="isHovering ? 'white' : 'black'"
                            @click="info = !info"
                            v-bind="button"
                          >
                            <v-icon
                              color="white"
                              :icon="mdiInformationOutline"
                            ></v-icon>
                          </v-btn>
                        </v-hover>
                      </v-card-text>
                      <div id="scene">
                        <v-img :src="works[i].image['full']" />
                      </div>
                      <v-card
                        v-if="info"
                        border
                        flat
                        rounded="xl"
                        width="400"
                        class="position-absolute mx-auto"
                        style="bottom: 20px; left: 0; right: 0"
                      >
                        <v-card-title
                          class="text-wrap"
                          v-text="work['title']"
                        ></v-card-title>
                        <v-card-text>
                          Category:
                          {{ work["category"] }}
                        </v-card-text>
                        <v-btn
                          block
                          variant="tonal"
                          rounded="0"
                          height="50"
                          class="text-capitalize"
                          target="_blank"
                          :href="work['link']"
                        >
                          <v-icon start :icon="mdiLink"></v-icon>
                          Open link
                          <v-icon end :icon="mdiArrowRight"></v-icon>
                        </v-btn>
                      </v-card>
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
