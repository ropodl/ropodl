<script setup>
definePageMeta({
  keepalive: true,
});

useSeoMeta({
  title: "Saroj Poudel",
  description:
    "Web Developer and Graphic Designer specializing in VueJs and Express JS",
  ogTitle: "Saroj Poudel",
  ogDescription:
    "Web Developer and Graphic Designer specializing in VueJs and Express JS",
  ogUrl: "https://ropodl.vercel.app",
  twitterTitle: "Saroj Poudel",
  twitterDescription:
    "Web Developer and Graphic Designer specializing in VueJs and Express JS",
  twitterCard: "summary",
});

const current = ref("All");
const categories = ["All", "Graphic Design", "Web", "Branding"];

const works = [
  {
    title: "Life's a prank",
    category: "Graphic Design",
    image: {
      thumbnail: "/image/portfolio/images/2.png",
      full: "/image/portfolio/images/2.png",
    },
  },
  {
    title: "Same Person",
    category: "Graphic Design",
    image: {
      thumbnail: "/image/portfolio/images/3.png",
      full: "/image/portfolio/images/3.png",
    },
  },
  {
    title: "You are star stuff",
    category: "Graphic Design",
    image: {
      thumbnail: "/image/portfolio/images/1.jpg",
      full: "/image/portfolio/images/1.jpg",
    },
  },
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
    title: "API Technology Website",
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
      thumbnail: "/image/portfolio/bishwaskhabar/full.webp",
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
    link: "https://renodesign.vercel.app/",
    image: {
      thumbnail: "/image/portfolio/reno/reno-min.png",
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

// const { data: portfolios, error } = await useLazyFetch(
//   "/api/frontend/portfolio"
// );
</script>
<template>
  <NuxtLayout name="page-title">
    <template #title>Portfolio</template>
    <v-container>
      <v-row>
        <v-col>
          <v-card class="pa-1" style="max-width: max-content">
            <v-tabs
              v-model="current"
              color="primary"
              density="compact"
              hide-slider
              show-arrows
              rounded="lg"
            >
              <template v-for="item in categories">
                <v-tab
                  color="brand"
                  rounded="lg"
                  class="px-12"
                  :value="item"
                  :variant="current === item ? 'tonal' : 'text'"
                >
                  {{ item }}
                </v-tab>
              </template>
            </v-tabs>
          </v-card>
        </v-col>
        <v-col cols="12" class="position-relative">
          <v-row>
            <!-- here -->
            <!-- <template
              v-for="({ title, slug, featured_image }, i) in portfolios"
            >
              <v-col cols="12" sm="4" md="4" lg="4">
                <v-hover v-slot="{ isHovering, props: hover }">
                  <v-card
                    flat
                    rounded="lg"
                    v-bind="{ ...hover }"
                    :to="`/portfolio/${slug}`"
                  >
                    <v-img
                      cover
                      :aspect-ratio="1"
                      class="w-100 h-100 align-end"
                      :class="isHovering ? 'zoom-image' : ''"
                      :src="featured_image.url"
                    >
                      <v-card
                        rounded="0"
                        elevation="10"
                        class="blur-8 border border-s-0 border-e-0 border-b-0"
                        style="
                          background-color: rgba(var(--v-theme-surface), 0.8);
                        "
                      >
                        <v-card-text
                          class="text-center"
                          style="white-space: normal"
                        >
                          {{ title }}
                        </v-card-text>
                      </v-card>
                    </v-img>
                  </v-card>
                </v-hover>
              </v-col>
            </template> -->
            <!-- here -->
            <template v-for="(work, i) in works" :key="i">
              <template v-if="work.category === current || current === 'All'">
                <v-col
                  cols="12"
                  sm="4"
                  md="4"
                  lg="4"
                  v-motion-fade-visible-once
                  :duration="500"
                >
                  <v-hover v-slot="{ isHovering, props: hover }">
                    <v-dialog
                      persistent
                      width="600"
                      height="auto"
                      scrim="black"
                    >
                      <template v-slot:activator="{ props: activatorProps }">
                        <v-card
                          flat
                          max-height="500"
                          width="auto"
                          rounded="lg"
                          v-bind="{ ...hover, ...activatorProps }"
                        >
                          <v-img
                            cover
                            :aspect-ratio="1"
                            width="100"
                            height="100"
                            class="w-100 h-100 align-end"
                            :class="isHovering ? 'zoom-image' : ''"
                            :src="work.image?.thumbnail"
                          >
                            <v-card
                              rounded="0"
                              elevation="10"
                              class="blur-8 border border-s-0 border-e-0 border-b-0"
                              style="
                                background-color: rgba(
                                  var(--v-theme-surface),
                                  0.8
                                );
                              "
                            >
                              <v-card-text
                                class="text-center"
                                style="white-space: normal"
                              >
                                {{ work.title }}
                              </v-card-text>
                            </v-card>
                          </v-img>
                        </v-card>
                      </template>
                      <template v-slot:default="{ isActive }">
                        <v-card>
                          <v-btn
                            size="x-small"
                            class="position-absolute"
                            color="primary"
                            rounded="circle"
                            icon="mdi-close"
                            style="z-index: 1; top: 5px; right: 5px"
                            @click="isActive.value = false"
                          ></v-btn>
                          <v-img contain :src="work.image?.full"></v-img>
                        </v-card>
                      </template>
                    </v-dialog>
                  </v-hover>
                </v-col>
              </template>
            </template>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </NuxtLayout>
</template>
