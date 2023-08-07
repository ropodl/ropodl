<script setup>
import { mdiArrowRight } from "@mdi/js";
import { defineAsyncComponent } from "vue";

const DashText = defineAsyncComponent(() =>
  import("@/components/shared/DashText.vue")
);
</script>
<template>
  <div style="background-color: #333646">
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
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
        <v-col cols="12" md="6"> </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style lang="scss" scoped></style>
