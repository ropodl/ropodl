<script setup>
import { Icon } from "@iconify/vue";

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
  ogUrl: "https://ropodl.com",
  twitterTitle: "Saroj Poudel",
  twitterDescription:
    "Web Developer and Graphic Designer specializing in VueJs and Express JS",
  twitterCard: "summary_large_image",
});
</script>
<template>
  <v-card
    border="0"
    color="transparent"
    rounded="0"
    class="position-relative h-100"
    style="padding-top: 100px; padding-bottom: 100px"
  >
    <v-container class="h-100">
      <v-row justify="center" class="position-relative h-100">
        <v-col cols="12" md="8">
          <div class="d-flex align-center justify-center h-100">
            <div>
              <div v-motion-slide-left :duration="500" class="text-overline">
                Hello, World! I am
              </div>
              <div
                v-motion-fade
                :duration="500"
                class="text-h1 font-weight-bold mb-3"
              >
                Saroj Poudel<span class="text-brand">.</span>
              </div>
              <div>
                <div
                  v-motion-slide-right
                  :duration="500"
                  class="text-h4 font-weight-medium mb-6"
                >
                  Fullstack developer from Kathmandu, Nepal.
                </div>
                <v-row justify="end">
                  <v-col cols="6" sm="4" md="4">
                    <v-hover v-slot="{ isHovering, props }">
                      <v-btn
                        v-bind="props"
                        block
                        rounded="lg"
                        color="brand"
                        height="40"
                        variant="tonal"
                        v-motion-slide-visible-once-bottom
                        to="/blogs"
                      >
                        Blogs
                        <v-icon
                          size="small"
                          :class="isHovering ? 'ml-4' : 'ml-2'"
                          style="transition: all 100ms linear"
                        >
                          <Icon icon="line-md:arrow-right" />
                        </v-icon>
                      </v-btn>
                    </v-hover>
                  </v-col>
                  <v-col cols="6" sm="4" md="4">
                    <v-hover v-slot="{ isHovering, props }">
                      <v-btn
                        v-bind="props"
                        block
                        rounded="lg"
                        color="primary"
                        height="40"
                        variant="text"
                        v-motion-slide-visible-once-bottom
                        :delay="200"
                        to="/portfolio"
                      >
                        Portfolio
                        <v-icon
                          size="small"
                          :class="isHovering ? 'ml-4' : 'ml-2'"
                          style="transition: all 100ms linear"
                        >
                          <Icon icon="line-md:arrow-right" />
                        </v-icon>
                      </v-btn>
                    </v-hover>
                  </v-col>
                </v-row>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
