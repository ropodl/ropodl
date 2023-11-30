<script lang="ts" setup>
import { Icon } from "@iconify/vue";
import { socials } from "@/utils/socials";
</script>
<template>
  <v-card flat rounded="0" class="position-relative">
    <v-container class="py-16">
      <v-row class="position-relative py-16">
        <v-col cols="12" md="6">
          <div class="text-overline" id="hi">Hello, World! I am</div>
          <div class="text-h1 font-weight-bold mb-3">Saroj Poudel.</div>
          <div id="line" class="mt-4 mb-10 rounded-pill"></div>
          <ul class="d-flex list-style-none">
            <li v-for="(social, i) in socials" class="social">
              <v-hover v-slot="{ isHovering, props }">
                <v-btn
                  icon
                  variant="text"
                  target="_blank"
                  :href="social['link']"
                  :aria-label="social['name']"
                  v-bind="props"
                  :color="isHovering ? 'primary' : 'white'"
                >
                  <v-icon size="20">
                    <Icon :icon="social['icon']" />
                  </v-icon>
                </v-btn>
              </v-hover>
            </li>
          </ul>
        </v-col>
        <v-col cols="12" md="1"></v-col>
        <v-col cols="12" md="5">
          <div class="d-flex align-center h-100">
            <div>
              <LazySharedDashText text="Introduction" />
              <div
                class="text-h4 font-weight-medium split w-100"
                style="height: 40px"
              >
                <span>Fullstack developer</span>
              </div>
              <div
                class="text-h4 font-weight-medium split"
                style="height: 40px"
              >
                <span>based in Kathmandu, Nepal.</span>
              </div>
              <v-card-text class="pl-0 paragraph">
                Hello, world. I am Web Designer and Web Application Developer. I
                have rich experience in web site design and building, also I am
                good at Vue JS. Recently I am enhancing my ExpressJS skills.
              </v-card-text>
              <div id="btn">
                <v-hover v-slot="{ isHovering, props }">
                  <v-btn
                    size="large"
                    variant="tonal"
                    color="primary"
                    class="text-capitalize"
                    v-bind="props"
                    to="/about"
                  >
                    My Story
                    <v-icon
                      size="x-small"
                      :class="isHovering ? 'ml-4' : 'ml-2'"
                      style="transition: all 100ms linear"
                    >
                      <Icon icon="material-symbols:arrow-right-alt" />
                    </v-icon>
                  </v-btn>
                </v-hover>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<style scoped>
#line {
  height: 8px;
  width: 100px;
  background-color: rgb(var(--v-theme-primary));
}
</style>
