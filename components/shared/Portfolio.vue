<script lang="ts" setup>
import { Icon } from "@iconify/vue";

const works = [
  {
    image: "/image/portfolio/api(new)/api.avif",
    title: "API Technology",
    text: "Web Design",
  },
  {
    image: "/image/portfolio/vuedash/vuedash.avif",
    title: "VueDash",
    text: "Web Design",
  },
  {
    image: "/image/portfolio/animezone/animezone.avif",
    title: "Anime Zone",
    text: "Web Design",
  },
  {
    image: "/image/portfolio/images/2.avif",
    title: "Life's a prank",
    text: "Design",
  },
];

const { data: portfolios, error } = await useLazyFetch(
  "/api/frontend/portfolio"
);
</script>
<template>
  <div>
    <v-container class="py-16">
      <v-row>
        <v-col cols="12" md="4">
          <LazySharedDashText text="Portfolio" />
          <div class="text-h4 font-weight-bold">
            All Creative Works,<br />
            Selected projects.
          </div>
          <v-card-text class="pl-0">
            Here are some cherry picked portfolio items, check them out.
          </v-card-text>
          <v-card-actions class="px-0">
            <v-hover v-slot="{ isHovering, props }">
              <v-btn
                width="200"
                height="50"
                variant="tonal"
                color="primary"
                class="text-capitalize"
                v-bind="props"
                to="/portfolio"
              >
                Explore More
                <v-icon
                  :class="isHovering ? 'ml-4' : 'ml-2'"
                  style="transition: all 100ms linear"
                >
                  <Icon icon="mdi:arrow-right" />
                </v-icon>
              </v-btn>
            </v-hover>
          </v-card-actions>
        </v-col>
        <template v-for="({ title, id, featured_image }, i) in portfolios">
          <v-col cols="12" sm="4" md="4" lg="3">
            <v-hover v-slot="{ isHovering, props }">
              <v-card flat rounded="lg" v-bind="props" :to="`/portfolio/${id}`">
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
                    style="background-color: rgba(var(--v-theme-surface), 0.8)"
                  >
                    <v-card-text
                      class="text-center"
                      style="white-space: normal"
                    >
                      {{ title }}{{ id }}
                    </v-card-text>
                  </v-card>
                </v-img>
              </v-card>
            </v-hover>
          </v-col>
        </template>
      </v-row>
    </v-container>
  </div>
</template>
