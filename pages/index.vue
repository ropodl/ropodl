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
  ogUrl: "https://ropodl.vercel.app",
  twitterTitle: "Saroj Poudel",
  twitterDescription:
    "Web Developer and Graphic Designer specializing in VueJs and Express JS",
  twitterCard: "summary_large_image",
});

// defineOgImageComponent("NuxtSeo");

// defineOgImage({
//   component: "Main",
//   headline: "Website",
//   title: "Saroj Poudel",
//   description:
//     "Web Developer and Graphic Designer specializing in VueJs and Express JS",
// });

let lottieContainer = ref(null);

const startAnimation = () => {
  lottieContainer.value.playSegments([160, 386], true);
};
</script>
<template>
  <v-card
    flat
    color="transparent"
    rounded="0"
    class="position-relative h-100"
    style="padding-top: 50px"
  >
    <v-container class="h-100">
      <v-row justify="center" class="position-relative h-100">
        <v-col cols="12" md="4" class="hidden-sm-and-down">
          <ClientOnly>
            <Vue3Lottie
              ref="lottieContainer"
              :loop="true"
              direction="alternate"
              animationLink="https://lottie.host/ab468c4a-fb60-4a2f-9000-4ddf87c1aae7/shGXbIaJxm.json"
              @onLoopComplete="startAnimation"
            />
          </ClientOnly>
        </v-col>
        <v-col cols="12" md="8">
          <div class="d-flex align-center justify-center h-100">
            <div>
              <div class="text-overline">Hello, World! I am</div>
              <div class="text-h1 font-weight-bold mb-3">
                Saroj Poudel<span class="text-brand">.</span>
              </div>
              <div>
                <div class="text-h4 font-weight-medium">
                  Fullstack developer from Kathmandu, Nepal.
                </div>
                <v-card-text class="pl-0">
                  Hey their, I am a Full Stack Developer, especializing in
                  ExpressJS and VueJs/Nuxt.
                </v-card-text>
                <v-row>
                  <v-col cols="6" sm="4" md="4">
                    <v-hover v-slot="{ isHovering, props }">
                      <v-btn
                        block
                        rounded="lg"
                        color="brand"
                        height="40"
                        variant="tonal"
                        v-bind="props"
                        to="/blogs"
                      >
                        Blogs
                        <v-icon
                          :class="isHovering ? 'ml-4' : 'ml-2'"
                          style="transition: all 100ms linear"
                        >
                          <Icon icon="lucide:arrow-right" />
                        </v-icon>
                      </v-btn>
                    </v-hover>
                  </v-col>
                  <v-col cols="6" sm="4" md="4">
                    <v-hover v-slot="{ isHovering, props }">
                      <v-btn
                        block
                        rounded="lg"
                        color="primary"
                        height="40"
                        variant="text"
                        v-bind="props"
                        to="/portfolio"
                      >
                        Portfolio
                        <v-icon
                          :class="isHovering ? 'ml-4' : 'ml-2'"
                          style="transition: all 100ms linear"
                        >
                          <Icon icon="lucide:arrow-right" />
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
