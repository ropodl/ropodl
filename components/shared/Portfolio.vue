<script setup>
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
</script>
<template>
  <div>
    <v-container class="py-16">
      <v-row>
        <v-col cols="12" md="4">
          <LazySharedDashText text="Portfolio" />
          <div class="text-h4">
            All Creative Works,<br />
            Selected projects.
          </div>
          <v-card-text class="pl-0">
            Here are some cherry picked portfolio items, check them out.
          </v-card-text>
          <v-hover v-slot="{ isHovering, props }">
            <v-btn
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
        </v-col>
        <v-col cols="12" md="2" v-for="(work, i) in works">
          <v-hover v-slot="{ isHovering, props }">
            <v-card
              border
              rounded="lg"
              elevation="0"
              color="transparent"
              v-bind="props"
            >
              <v-img cover height="400" :src="work['image']">
                <div
                  class="d-flex align-end w-100 h-100"
                  :class="isHovering ? 'blur-8' : ''"
                >
                  <!-- :style="
                    ((backgroundColor = `rgba(var(--v-theme-surface), 0.3)`),
                    (backdropFilter = `blur(8px)`))
                  " -->
                  <div v-if="isHovering">
                    <v-card-title style="transform: translateZ(30px)">
                      {{ work["title"] }}
                    </v-card-title>
                    <v-card-text>{{ work["text"] }}</v-card-text>
                  </div>
                </div>
              </v-img>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
