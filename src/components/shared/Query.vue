<script setup>
import { Icon } from "@iconify/vue";
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
            Whether it's questions, requests, or discussions<br />on any topic
            or subject matter feel free to contact me.
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
                :class="isHovering ? 'ml-4' : 'ml-2'"
                style="transition: all 100ms linear"
              >
                <Icon icon="material-symbols:arrow-right-alt" />
              </v-icon>
            </v-btn>
          </v-hover>
        </v-col>
        <v-col cols="12" md="6">
          <v-card-text class="text-h4 font-weight-medium pl-0 pb-0">
            You can't use up creativity,<br />the more you use, more you have<br />in
            your significant mind.
          </v-card-text>
          <v-card-text class="pl-0">
            Every creative endeavor, every idea explored, every project
            undertaken, and every problem solved is a catalyst for the expansion
            of your creative capacity. It's like a muscle that grows stronger
            with exercise, or a tree that bears more fruit as it matures. The
            more you nurture and harness your creativity, the more you unlock
            its potential and discover fresh, uncharted territories of
            imagination.
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
