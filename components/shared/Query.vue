<script setup>
import { Icon } from "@iconify/vue";
</script>
<template>
  <div class="position-relative py-16">
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <LazySharedDashText text="Contact" />
          <v-card-title class="target text-h4 font-weight-medium mb-3 pl-0">
            Any Type of Query<br />
            & Discussion.
          </v-card-title>
          <v-card-text class="pl-0">
            Whether it's questions, requests, or discussions<br />on any topic
            or subject matter feel free to contact me.
          </v-card-text>
          <v-row>
            <v-col cols="6">
              <v-hover v-slot="{ isHovering, props }">
                <v-btn
                  block
                  rounded="lg"
                  height="50"
                  variant="tonal"
                  color="primary"
                  class="text-capitalize px-10"
                  to="contact"
                  v-bind="props"
                >
                  Let's Chat
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
          </v-row>
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
              <v-row align="center" justify="center">
                <v-col cols="5">
                  <div
                    class="text-primary text-h2 font-weight-black text-center"
                  >
                    5+
                  </div>
                </v-col>
                <v-col cols="7">
                  <v-card-title>Years of<br />Experience</v-card-title>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" md="12" lg="6">
              <v-row no-gutters align="center" justify="center">
                <v-col cols="5">
                  <div
                    class="text-primary text-h2 font-weight-black text-center"
                  >
                    10+
                  </div>
                </v-col>
                <v-col cols="7">
                  <v-card-title>Satisfied<br />Clients</v-card-title>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
