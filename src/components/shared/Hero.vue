<script setup>
import { mdiArrowRight } from "@mdi/js";
import gsap from "gsap";
import { defineAsyncComponent, onMounted } from "vue";

const DashText = defineAsyncComponent(() =>
  import("@/components/shared/DashText.vue")
);

const socials = [
  {
    name: "Instagram",
    icon: "fa:fa-brands fa-instagram",
    link: "https://instagram.com/ropodl/",
  },
  {
    name: "Dribbble",
    icon: "fa:fa-brands fa-dribbble",
    link: "https://dribbble.com/ropodl/",
  },
  {
    name: "Linkedin",
    icon: "fa:fa-brands fa-linkedin-in",
    link: "https://linkedin.com/in/ropodl/",
  },
  {
    name: "GitHub",
    icon: "fa:fa-brands fa-github",
    link: "https://github.com/ropodl/",
  },
];

onMounted(() => {
  gsap.from(".social", {
    duration: 1,
    y: 100,
    stagger: 0.2,
  });
  gsap.from("#image", {
    duration: 1,
    opacity: 0,
    stagger: 0.2,
  });
});
</script>
<template>
  <v-card rounded="0" elevation="0" color="#333646" class="py-16">
    <v-container class="pb-0 pt-10">
      <v-row class="position-relative">
        <v-col cols="12" md="6">
          <div class="text-overline" id="this">Hi, I am</div>
          <div
            class="font-weight-bold"
            style="font-size: 10rem; line-height: 10.4rem"
          >
            Saroj<br />Poudel.
          </div>
          <div
            class="mt-4"
            style="
              height: 8px;
              width: 100px;
              background-color: rgb(var(--v-theme-primary));
            "
          ></div>
          <ul class="d-flex list-style-none mt-16">
            <li v-for="(social, i) in socials" class="social">
              <v-hover v-slot="{ isHovering, props }">
                <v-btn
                  rounded
                  height="40"
                  variant="text"
                  target="_blank"
                  :href="social['link']"
                  :aria-label="social['name']"
                  v-bind="props"
                  :color="isHovering ? 'primary' : 'white'"
                  size="small"
                >
                  <v-icon :icon="social['icon']"></v-icon>
                </v-btn>
              </v-hover>
            </li>
          </ul>
        </v-col>
        <v-col cols="12" md="1"></v-col>
        <v-col cols="12" md="5">
          <div class="pt-16 mt-16">
            <DashText text="Introduction" />
            <div class="text-h4 font-weight-medium">
              Fullstack developer<br />
              based in Kathmandu, Nepal.
            </div>
            <v-card-text class="pl-0">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut quas
              culpa, similique sapiente consectetur suscipit eos totam in
              dignissimos labore.
            </v-card-text>
            <v-hover v-slot="{ isHovering, props }">
              <v-btn
                size="large"
                variant="text"
                color="primary"
                class="text-capitalize"
                v-bind="props"
              >
                My Story
                <v-icon
                  size="x-small"
                  :icon="mdiArrowRight"
                  :class="isHovering ? 'ml-4' : 'ml-2'"
                  style="transition: all 100ms linear"
                ></v-icon>
              </v-btn>
            </v-hover>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-img
      id="image"
      src="/image/me2_no_bg.webp"
      height="700"
      style="
        position: absolute;
        bottom: 0;
        right: 0;
        left: -3%;
        pointer-events: none;
        z-index: -1;
        filter: drop-shadow(0px 25px 15px #222);
      "
    ></v-img>
  </v-card>
</template>
