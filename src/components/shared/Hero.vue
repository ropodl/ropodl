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
  gsap
    .timeline()
    .from("#image", {
      duration: 2,
      // delay: 3,
      opacity: 0,
      ease: "Power4.out",
    })
    .from(
      ".social",
      {
        duration: 0.5,
        y: 100,
        stagger: 0.2,
      },
      "<"
    )
    .from(
      "#hi",
      {
        y: -40,
        opacity: 0,
        duration: 1,
      },
      "<"
    )
    .from(
      ".elastic span",
      {
        y: 250,
        ease: "elastic",
        duration: 2,
        delay: 0,
        skewY: 15,
        stagger: {
          amount: 0.4,
        },
      },
      "<"
    )
    .from(
      "#line",
      {
        width: 0,
        opacity: 0,
        duration: 0.3,
        delay: 1,
      },
      "<"
    )
    .from(
      ".split span",
      {
        y: 250,
        ease: "Power4.in",
        duration: 2,
        delay: 0,
        skewY: 15,
        stagger: {
          amount: 0.4,
        },
      },
      "<"
    )
    .from(".paragraph", { opacity: 0, duration: 1 })
    .from(
      "#btn",
      {
        duration: 0.5,
        y: 40,
        opacity: 0,
        stagger: 0.2,
      },
      "<"
    );
});
</script>
<template>
  <v-card rounded="0" elevation="0" color="#333646">
    <div class="py-16"
      v-tilt="{
        gyroscope: false,
      }"
    >
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
            <div class="d-flex align-center h-100">
              <div>
                <DashText text="Introduction" />
                <div
                  class="text-h4 font-weight-medium split"
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
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
                  quas culpa, similique sapiente consectetur suscipit eos totam
                  in dignissimos labore.
                </v-card-text>
                <div id="btn">
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
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
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
<style lang="scss" scoped>
.elastic {
  position: relative;
  overflow: hidden;
  font-size: 10rem;
  line-height: 10.4rem;
  height: 172px;
  @media (max-width: 600px) {
    font-size: 10px;
  }
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
