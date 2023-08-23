<script setup>
import { mdiArrowRight, mdiEye, mdiLink } from "@mdi/js";
import Panzoom from "@panzoom/panzoom";
import { defineAsyncComponent, nextTick, ref } from "vue";

import { usePortfolioDialog } from "@/stores/portfolioDialog";

const dialog = usePortfolioDialog();

const PageTitle = defineAsyncComponent(() =>
  import("@/components/layout/PageTitle.vue")
);

const items = [
  {
    title: "Home",
    to: "/",
  },
  {
    title: "Portfolio",
    to: "/portfolio",
  },
];

let current = ref("All");
let categories = ["All", "Graphic Design", "Web", "Branding"];

let works = [
  {
    title: "Rohan Bhandari's Website",
    category: "Web",
    link: "https://rohan-website.vercel.app/",
    image: {
      thumbnail: "/image/portfolio/rohan/full.webp",
      full: "/image/portfolio/rohan/full.webp",
    },
  },
  {
    title: "API Technology Website (New)",
    category: "Web",
    link: "https://www.apitechnology.com.np/",
    image: {
      thumbnail: "/image/portfolio/api(new)/api.png",
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
      thumbnail: "/image/portfolio/vuedash/vuedash.png",
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
  // {
  //   title: "API Technology Website (Old)",
  //   category: "Web",
  //   link: "https://www.apitechnology.com.np/",
  //   image: {
  //     thumbnail: "/image/portfolio/api/thumb.webp",
  //     full: "/image/portfolio/api/full.webp",
  //   },
  // },
  {
    title: "Anime Zone Website",
    category: "Web",
    link: "https://animezone.vercel.app/",
    image: {
      thumbnail: "/image/portfolio/animezone/animezone.png",
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
  dialog.openDialog(i);
  nextTick(() => {
    const elem = document.getElementById("scene");
    const panzoom = Panzoom(elem, {
      maxScale: 5,
    });
    elem.parentElement.addEventListener("wheel", panzoom.zoomWithWheel);
  });
};
</script>
<template>
  <PageTitle title="Portfolio" :items="items" />
  <v-container class="px-0 pb-16">
    <v-row justify="center">
      <v-col cols="10"> </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="10" class="position-relative">
        <v-card
          border
          flat
          color="#3a3d4f99"
          class="w-100 mb-10 position-sticky"
          style="top: 80px; backdrop-filter: blur(10px); z-index: 10"
        >
          <v-tabs grow height="50" variant="tonal">
            <template v-for="catgory in categories">
              <v-tab
                rounded="0"
                class="text-capitalize"
                :color="current == catgory ? 'primary' : 'white'"
                variant="text"
                @click="current = catgory"
              >
                {{ catgory }}
              </v-tab>
            </template>
          </v-tabs>
        </v-card>
        <v-row>
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
                  v-model="dialog.dialogs[i]"
                  transition="fade-transition"
                  scrim="black"
                  width="auto"
                  content-class="d-flex w-100"
                >
                  <template v-slot:activator="{ props: overlay }">
                    <v-card
                      flat
                      height="400"
                      v-tilt="{scale:1.05,
                        gyroscope: false,
                      }"
                      v-bind="{ ...hover }"
                    >
                      <v-img
                        cover
                        class="w-100 h-100 align-end"
                        :src="work['image'].thumbnail"
                      >
                        <v-card class="ma-4">
                          <v-card-text style="white-space: normal;">{{ work['title'] }}</v-card-text>
                        </v-card>
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
                      <div id="scene">
                        <v-img :src="works[i].image['full']" />
                      </div>
                      <template v-if="dialog.info">
                        <v-card
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
                      </template>
                    </v-card>
                  </div>
                </v-dialog>
              </v-hover>
            </v-col>
          </template>
        </v-row>
      </v-col>
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


.single-product {
    background-size: cover;
    transform-style: preserve-3d;
    background-position: center;
    &.preserve {
        transform-style: preserve-3d;
    }
    &.no-preserve {
        transform-style: flat;
    }
    .hover-panel {
        width: 90%;
        margin: auto;
        transition: all 0.5s;
        &.top {
            margin-top: 5%;
        }
        &.bottom {
            margin-bottom: 5%;
        }
        &.transform {
            transform: translateZ(30px);
        }
    }
}
</style>
