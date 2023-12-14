<script lang="ts" setup>
import { Icon } from "@iconify/vue";

let lottieContainer = ref();

const startAnimation = () => {
  lottieContainer.value.playSegments([160, 386], true);
};
</script>
<template>
  <v-card
    flat
    rounded="0"
    class="position-relative h-100"
    style="padding-top: 50px"
  >
    <div
      class="position-absolute w-100 h-100"
      style="
        mask-image: radial-gradient(circle, #fff, transparent);
        opacity: 0.1;
      "
    >
      <svg aria-hidden="true" class="position-absolute w-100 h-100">
        <defs>
          <pattern
            id=":Rem:"
            width="128"
            height="128"
            patternUnits="userSpaceOnUse"
            x="50%"
            y="100%"
          >
            <path d="M0 128V.5H128" fill="none" stroke="currentColor"></path>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#:Rem:)"></rect>
      </svg>
    </div>
    <v-container class="h-100">
      <v-row justify="center" class="position-relative h-100">
        <v-col cols="12" md="4">
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
              <div class="text-h1 font-weight-bold mb-3">Saroj Poudel.</div>
              <div>
                <div class="text-h4 font-weight-medium">
                  Fullstack developer from Kathmandu, Nepal.
                </div>
                <v-card-text class="pl-0">
                  Hello, world. I am Web Designer and Web Application Developer.
                  I have rich experience in web site design and building, also I
                  am good at Vue JS. Recently I am enhancing my ExpressJS
                  skills.
                </v-card-text>
                <v-row>
                  <v-col cols="3">
                    <v-hover v-slot="{ isHovering, props }">
                      <v-btn
                        block
                        height="50"
                        rounded="lg"
                        variant="tonal"
                        color="primary"
                        class="text-capitalize font-weight-medium"
                        v-bind="props"
                        to="/about"
                      >
                        About
                        <v-icon
                          :class="isHovering ? 'ml-4' : 'ml-2'"
                          style="transition: all 100ms linear"
                        >
                          <Icon icon="material-symbols:arrow-right-alt" />
                        </v-icon>
                      </v-btn>
                    </v-hover>
                  </v-col>
                  <v-col cols="3">
                    <v-hover v-slot="{ isHovering, props }">
                      <v-btn
                        block
                        height="50"
                        rounded="lg"
                        variant="tonal"
                        color="primary"
                        class="text-capitalize font-weight-medium"
                        v-bind="props"
                        to="/contact"
                      >
                        Contact
                        <v-icon
                          :class="isHovering ? 'ml-4' : 'ml-2'"
                          style="transition: all 100ms linear"
                        >
                          <Icon icon="material-symbols:arrow-right-alt" />
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
