<script setup>
import { mdiArrowRight } from "@mdi/js";
import { defineAsyncComponent } from "vue";

const DashText = defineAsyncComponent(() =>
  import("@/components/shared/DashText.vue")
);
</script>
<template>
  <div style="background-color: #333646">
    <v-container class="py-16">
      <v-row justify="space-between">
        <v-col cols="12" md="5">
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
        <v-col cols="12" md="5">
          <v-card color="#252734">
            <v-img cover height="400" src="/image/portfolio/api(new)/api.png">
              <v-overlay
                contained
                scrim="black"
                :model-value="true"
                persistent
                no-click-animation=""
              >
                <div class="text-h3 mt-5 mx-5">VueDash</div>
                <v-card-text class="mx-5">Web Design</v-card-text>
              </v-overlay>
            </v-img>
          </v-card>
        </v-col>
        <v-col cols="12" md="5">
          <v-card color="#252734">
            <v-img cover height="400" src="/image/portfolio/vuedash/test.png">
              <v-overlay
                contained
                scrim="black"
                :model-value="true"
                persistent
                no-click-animation=""
              >
                <div class="text-h3 mt-5 mx-5">VueDash</div>
                <v-card-text class="mx-5">Web Design</v-card-text>
              </v-overlay>
            </v-img>
          </v-card>
        </v-col>
        <v-col cols="12" md="5">
          <v-card class="mt-10" color="#252734">
            <v-img cover height="400" src="/image/portfolio/vuedash/test.png">
              <v-overlay
                contained
                scrim="black"
                :model-value="true"
                persistent
                no-click-animation=""
              >
                <div class="text-h3 mt-5 mx-5">VueDash</div>
                <v-card-text class="mx-5">Web Design</v-card-text>
              </v-overlay>
            </v-img>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style lang="scss" scoped></style>
