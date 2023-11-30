<script setup>
import { Icon } from "@iconify/vue";
import { socials } from "@/utils/socials";
</script>
<template>
  <v-card
    min-height="670"
    height="100vh"
    max-height="700"
    rounded="0"
    elevation="0"
    class="hidden-sm-and-down"
  >
    <div class="py-16 h-100 w-100">
      <v-container class="pb-0 pt-10">
        <v-row class="position-relative">
          <v-col cols="12" md="6">
            <div class="text-overline" id="hi">Hi, I am</div>
            <div class="font-weight-bold">
              <div class="elastic">
                <span>Saroj</span>
              </div>
              <div class="elastic">
                <span>Poudel.</span>
              </div>
            </div>
            <div id="line" class="mt-4"></div>
            <ul class="d-flex list-style-none mt-10">
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
                  Hello, world. I am Full Stack Developer. I have rich
                  experience in Vue JS. Recently I am enhancing my ExpressJS
                  skills.
                </v-card-text>
                <div id="btn">
                  <v-hover v-slot="{ isHovering, props }">
                    <v-btn
                      variant="tonal"
                      height="50"
                      color="primary"
                      class="text-capitalize px-10"
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
    </div>
    <v-img
      id="image"
      src="/image/me2_no_bg.png"
      height="600"
      alt="Saroj Poudel"
      style="
        position: absolute;
        bottom: 0;
        right: 0;
        left: -3%;
        pointer-events: none;
        z-index: -1;
        filter: drop-shadow(0px 25px 15px #222);
      "
    />
  </v-card>
  <!-- Small Device -->
  <v-card class="rounded-t-0 hidden-md-and-up">
    <v-container class="py-16">
      <v-row class="position-relative pt-16">
        <v-col cols="12" md="6">
          <div class="text-overline" id="hi">Hi, I am</div>
          <div class="font-weight-bold">
            <div class="text-h1 font-weight-bold mb-3">Saroj</div>
            <div class="text-h1 font-weight-bold">Poudel.</div>
          </div>
          <div id="line" class="mt-4"></div>
          <ul class="d-flex list-style-none mt-10">
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
<style lang="scss" scoped>
.elastic {
  position: relative;
  overflow: hidden;
  font-size: 10rem;
  line-height: 10.4rem;
  height: 172px;
  span {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }
}
.split {
  position: relative;
  overflow: hidden;
  span {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }
}

#line {
  height: 8px;
  width: 100px;
  background-color: rgb(var(--v-theme-primary));
}
</style>
