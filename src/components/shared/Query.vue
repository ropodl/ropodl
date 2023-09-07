<script setup>
import { mdiArrowRight } from "@mdi/js";
import { defineAsyncComponent } from "vue";

const DashText = defineAsyncComponent(() =>
  import("@/components/shared/DashText.vue")
);
</script>
<template>
  <div class="position-relative">
    <v-container class="py-16">
      <v-row class="pt-16">
        <v-col cols="12" md="6">
          <DashText text="Contact" />
          <v-card-title class="text-h4 font-weight-medium mb-3 pl-0">
            Any Type of Query<br />
            & Discussion.
          </v-card-title>
          <v-card-text class="pl-0">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae,
            cum.
          </v-card-text>
          <v-hover v-slot="{ isHovering, props }">
            <v-btn
              size="large"
              variant="text"
              color="primary"
              class="text-capitalize"
              v-bind="props"
            >
              <span class="text-lowercase">sarox14@gmail.com</span>
              <v-icon
                size="x-small"
                :icon="mdiArrowRight"
                :class="isHovering ? 'ml-4' : 'ml-2'"
                style="transition: all 100ms linear"
              ></v-icon>
            </v-btn>
          </v-hover>
        </v-col>
        <v-col cols="12" md="6">
          <v-card-text class="text-h4 font-weight-medium mb-3 pl-0">
            You can't use up creativity,<br />the more you use, more you have<br />in
            your significant mind.
          </v-card-text>
          <v-card-text class="pl-0">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci at
            suscipit explicabo doloribus nemo sed voluptas nobis eaque facere
            illo.
          </v-card-text>
          <v-row>
            <v-col cols="12" md="12" lg="6">
              <v-list bg-color="transparent">
                <v-list-item>
                  <v-card-title>Years of<br />Experience</v-card-title>
                  <template v-slot:prepend>
                    <div class="text-primary text-h3 font-weight-black pr-4">
                      5+
                    </div>
                  </template>
                </v-list-item>
              </v-list>
            </v-col>
            <v-col cols="12" md="12" lg="6">
              <v-list bg-color="transparent">
                <v-list-item>
                  <v-card-title>Satisfied<br />Clients</v-card-title>
                  <template v-slot:prepend>
                    <div class="text-primary text-h3 font-weight-black pr-4">
                      10+
                    </div>
                  </template>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
