<script setup>
import { mdiArrowRight } from "@mdi/js";
import { defineAsyncComponent } from "vue";

const DashText = defineAsyncComponent(() =>
  import("@/components/shared/DashText.vue")
);

const works = [
  {
    image: "/image/portfolio/api(new)/api.png",
    title: "API Technology",
    text: "Web Design",
  },
  {
    image: "/image/portfolio/vuedash/vuedash.png",
    title: "VueDash",
    text: "Web Design",
  },
  {
    image: "/image/portfolio/animezone/animezone.png",
    title: "Anime Zone",
    text: "Web Design",
  },
  {
    image: "/image/portfolio/images/2.png",
    title: "Life's a prank",
    text: "Design",
  },
];
</script>
<template>
  <div style="background-color: #333646">
    <v-container class="py-16">
      <v-row>
        <v-col cols="12" md="4">
          <DashText text="Portfolio" />
          <div class="text-h4">
            All Creative Works,<br />
            Selected projects.
          </div>
          <v-card-text class="pl-0">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus
            ducimus saepe eveniet voluptatibus rem voluptatum asperiores vel
            tempora sit sunt!
          </v-card-text>
          <v-hover v-slot="{ isHovering, props }">
            <v-btn
              size="large"
              variant="text"
              color="primary"
              class="text-capitalize"
              v-bind="props"
              :to="{ name: 'Portfolio' }"
            >
              Explore More
              <v-icon
                size="x-small"
                :icon="mdiArrowRight"
                :class="isHovering ? 'ml-4' : 'ml-2'"
                style="transition: all 100ms linear"
              ></v-icon>
            </v-btn>
          </v-hover>
        </v-col>
        <v-col cols="12" md="2" v-for="(work, i) in works">
          <v-card
            v-tilt="{
              scale: 1.1,
              gyroscope: false,
            }"
            elevation="0"
            color="transparent"
          >
            <v-img cover height="400" :src="work['image']">
              <v-overlay
                contained
                scrim="black"
                :model-value="true"
                persistent
                no-click-animation
                class="align-end justify-center text-center"
              >
                <v-card-title style="transform: translateZ(30px)">
                  {{ work["title"] }}
                </v-card-title>
                <v-card-text>{{ work["text"] }}</v-card-text>
              </v-overlay>
            </v-img>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
