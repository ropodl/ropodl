<script setup>
import { Icon } from "@iconify/vue";
import { socials } from "~/utils/socials";

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
  twitterCard: "summary",
});

const experience = [
  // {
  //   title: "Freelance Web Developer",
  //   year: "2023",
  // },
  {
    title: "Graphic/Web Designer",
    year: "2018",
    desc: "Fivonest Technology @ Solteemode, Kathmandu",
  },
  {
    title: "Chief Technology Officer",
    year: "2019 - 2022",
    desc: "SoftMahal Technologies @ Mid Baneshwor, Kathmandu",
  },
  // {
  //   title: "FREELANCE GRAPHIC DESIGNER",
  //   year: "2017",
  // },
];

const frameworks = [
  {
    icon: "fa:fa-brands fa-laravel",
    title: "Vue JS",
  },
  {
    title: "Laravel",
  },
  {
    title: "Express JS",
  },
  {
    title: "React JS",
  },
];

const skills = [
  {
    title: "Product Design",
  },
  {
    title: "Video Editing",
  },
  {
    title: "Team Player / Manager",
  },
  {
    title: "Research and Development",
  },
  {
    title: "Problem Solving",
  },
];

const software = [
  {
    title: "Adobe Illustrator",
  },
  {
    title: "Adobe Photoshop",
  },
  {
    title: "Adobe XD",
  },
  {
    title: "Adobe Premiere Pro",
  },
  {
    title: "MS Office",
  },
  {
    title: "VS Code",
  },
];

const education = [
  // {
  //   title: "BSCSIT",
  //   year: "2021",
  //   desc: "Sagarmatha College of Information Technology @ Sanepa, Lalitpur",
  // },
  {
    title: "BE.SE",
    year: "2014 - 2017",
    desc: " Nepal College of Information Technology @ Balkumari, Lalitpur",
  },
  {
    title: "Ten Plus Two (+2)",
    year: "2012 - 2013",
    desc: "Arniko International College/HSS @ Talchikhel, Lalitpur",
  },
  {
    title: "SLC (School Leaving Certificate)",
    year: "2011",
    desc: "National United High School @ Ganesh Chowk, Kathmandu",
  },
];

const frontend = [
  {
    text: "VueJS",
    icon: "fa6-brands:vuejs",
  },
  {
    text: "Vuetify",
    icon: "mdi:vuetify",
  },
  {
    text: "NuxtJS",
    icon: "tabler:brand-nuxt",
  },
];
const backend = [
  {
    text: "ExpressJs",
    icon: "simple-icons:express",
  },
  {
    text: "MongoDB",
    icon: "tabler:brand-mongodb",
  },
  {
    text: "SupaBase",
    icon: "tabler:brand-supabase",
  },
];
</script>
<template>
  <NuxtLayout name="page-title">
    <template #title>About</template>
    <v-container>
      <v-row dense>
        <v-col cols="12" md="3">
          <v-card
            border
            height="121"
            color="primary"
            class="d-flex align-end mb-2"
          >
            <v-icon size="90" class="bg-icon right">
              <Icon icon="mdi:calendar-clock-outline" />
            </v-icon>
            <div class="w-100">
              <v-card-title class="text-h3 font-weight-black text-white">
                5+
              </v-card-title>
              <v-card-text>Years of Experience</v-card-text>
            </div>
          </v-card>
          <v-card border height="121" class="d-flex justify-end align-end">
            <v-icon size="90" class="bg-icon left">
              <Icon icon="streamline:business-handshake" />
            </v-icon>
            <div>
              <v-card-title class="text-h3 mb-3 font-weight-black text-primary">
                10+
              </v-card-title>
              <v-card-text>Satisfied Clients</v-card-text>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" md="3">
          <v-card border height="250">
            <v-hover v-slot="{ isHovering, props }">
              <v-img
                cover
                v-bind="props"
                class="h-100"
                :class="isHovering ? 'zoom-image' : ''"
                src="/image/portfolio/api(new)/api.avif"
              >
                <v-overlay
                  contained
                  persistent
                  no-click-animation
                  :model-value="true"
                  scrim="black"
                  class="align-end"
                >
                  <v-card-title>Website Design</v-card-title>
                </v-overlay>
              </v-img>
            </v-hover>
          </v-card>
        </v-col>
        <v-col cols="12" md="3">
          <v-card
            border
            height="250"
            class="d-flex justify-center align-center"
          >
            <v-card-text
              class="text-h3 font-weight-bold"
              style="line-height: 50px"
            >
              <span class="text-primary">Designer</span> by Nature,
              <span class="text-primary">Developer by</span> Choice
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="3">
          <v-card
            border
            height="121"
            color="primary"
            subtitle="Backend"
            class="mb-2"
          >
            <v-card-title>
              <ul
                class="list-style-none h-100 d-flex justify-center align-center flex-wrap"
              >
                <template v-for="{ text, icon } in backend">
                  <li>
                    <v-tooltip :text location="bottom" theme="light">
                      <template v-slot:activator="{ props }">
                        <v-btn flat icon color="transparent">
                          <v-icon v-bind="props" size="40">
                            <Icon :icon />
                          </v-icon>
                        </v-btn>
                      </template>
                    </v-tooltip>
                  </li>
                </template>
              </ul>
            </v-card-title>
          </v-card>
          <v-card border height="121" subtitle="Frontend">
            <v-card-title>
              <ul
                class="list-style-none h-100 d-flex justify-center align-center flex-wrap"
              >
                <template v-for="{ text, icon } in frontend">
                  <li>
                    <v-tooltip :text location="bottom" theme="light">
                      <template v-slot:activator="{ props }">
                        <v-btn flat icon color="transparent">
                          <v-icon color="primary" v-bind="props" size="40">
                            <Icon :icon />
                          </v-icon>
                        </v-btn>
                      </template>
                    </v-tooltip>
                  </li>
                </template>
              </ul>
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col cols="12" md="3">
          <v-card border height="121" class="mb-2">
            <v-hover v-slot="{ isHovering, props }">
              <v-img
                cover
                v-bind="props"
                class="h-100"
                :class="isHovering ? 'zoom-image' : ''"
                src="/image/portfolio/bishwaskhabar/full.webp"
              >
                <v-overlay
                  contained
                  persistent
                  no-click-animation
                  :model-value="true"
                  scrim="black"
                  class="align-end"
                >
                  <v-card-title>Branding</v-card-title>
                </v-overlay>
              </v-img>
            </v-hover>
          </v-card>
          <v-card border color="primary" height="121" subtitle="Socials">
            <v-card-title>
              <ul
                class="list-style-none h-100 d-flex justify-center align-center flex-wrap"
              >
                <template v-for="{ name, icon, link } in socials">
                  <li>
                    <v-tooltip :text="name" location="bottom" theme="light">
                      <template v-slot:activator="{ props }">
                        <v-btn
                          flat
                          icon
                          :href="link"
                          target="_blank"
                          color="transparent"
                        >
                          <v-icon v-bind="props">
                            <Icon :icon />
                          </v-icon>
                        </v-btn>
                      </template>
                    </v-tooltip>
                  </li>
                </template>
              </ul>
            </v-card-title>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card border height="250">
            <v-card-title>Experience</v-card-title>
            <v-card-text class="px-0">
              <v-timeline direction="horizontal" side="end" line-thickness="1">
                <v-timeline-item
                  size="10"
                  density="compact"
                  dot-color="primary"
                  v-for="{ year, title, desc } in experience"
                >
                  <v-card
                    border
                    flat
                    :title
                    :subtitle="year"
                    :text="desc"
                    density="compact"
                  ></v-card>
                </v-timeline-item>
              </v-timeline>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="3">
          <v-card border height="250">
            <v-hover v-slot="{ isHovering, props }">
              <v-img
                cover
                v-bind="props"
                class="h-100"
                :class="isHovering ? 'zoom-image' : ''"
                src="https://cdn.dribbble.com/users/1462542/screenshots/6586732/legends.png"
              >
                <v-overlay
                  contained
                  persistent
                  no-click-animation
                  :model-value="true"
                  scrim="black"
                  class="align-end"
                >
                  <v-card-title>Graphic Design</v-card-title>
                </v-overlay>
              </v-img>
            </v-hover>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <!-- <LazySharedQuery />
    <LazySharedLoves />
    <LazySharedClients />
    <LazySharedPortfolio />
    <v-container class="px-0 py-16">
      <v-row justify="center">
        <v-col cols="12">
          <v-row>
            <v-col cols="12" class="mb-3">
              <v-card-title class="d-flex align-center">
                <v-icon start class="mr-3" color="primary">
                  <Icon icon="mdi:lightning-bolt" />
                </v-icon>
                Experience
              </v-card-title>
              <v-divider></v-divider>
              <v-card flat color="transparent">
                <div class="d-flex justify-start">
                  <v-timeline direction="horizontal">
                    <v-timeline-item
                      dot-color="primary"
                      size="10"
                      v-for="exp in experience"
                    >
                      <template v-slot:opposite>
                        {{ exp.year }}
                      </template>
                      <v-card border flat>
                        <v-card-text>
                          <v-list-item class="pa-0">
                            <v-list-item-title
                              class="font-weight-bold"
                              v-text="exp.title"
                            ></v-list-item-title>
                            <v-list-item-subtitle
                              v-if="exp.desc"
                              v-text="exp.desc"
                            ></v-list-item-subtitle>
                          </v-list-item>
                        </v-card-text>
                      </v-card>
                    </v-timeline-item>
                  </v-timeline>
                </div>
              </v-card>
            </v-col>
            <v-col cols="12" class="mb-3">
              <v-card-title class="d-flex align-center">
                <v-icon start class="mr-3" color="primary">
                  <Icon icon="mdi:hand-peace" />
                </v-icon>
                Platform/Frameworks
              </v-card-title>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="3"
                  class="pb-0"
                  v-for="frame in frameworks"
                >
                  <v-card border flat class="h-100">
                    <v-card-text v-text="frame['title']"></v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" class="mb-3">
              <v-card-title class="d-flex align-center">
                <v-icon start class="mr-3" color="primary">
                  <Icon icon="mdi:hand-peace" />
                </v-icon>
                Skills
              </v-card-title>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                  class="pb-0"
                  v-for="skill in skills"
                >
                  <v-card border flat class="h-100">
                    <v-card-text v-text="skill['title']"></v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" class="mb-3">
              <v-card-title class="d-flex align-center">
                <v-icon start class="mr-3" color="primary">
                  <Icon icon="mdi:anvil" />
                </v-icon>
                Software
              </v-card-title>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                  class="pb-0"
                  v-for="sof in software"
                >
                  <v-card border flat class="h-100">
                    <v-card-text v-text="sof['title']"></v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12">
              <v-card-title class="d-flex align-center">
                <v-icon start class="mr-3" color="primary">
                  <Icon icon="mdi:book-open-page-variant-outline" />
                </v-icon>
                Education
              </v-card-title>
              <v-divider></v-divider>
              <div class="d-flex justify-start">
                <v-timeline side="end" align="center">
                  <v-timeline-item
                    dot-color="primary"
                    size="10"
                    v-for="edu in education"
                  >
                    <v-card border flat>
                      <v-card-text>
                        <v-list-item class="pa-0">
                          <v-list-item-title
                            class="font-weight-bold"
                            v-text="edu['title']"
                          ></v-list-item-title>
                          <v-list-item-subtitle
                            class="mb-3"
                            v-text="edu['year']"
                          ></v-list-item-subtitle>
                          <v-list-item-subtitle
                            v-text="edu['desc']"
                          ></v-list-item-subtitle>
                        </v-list-item>
                      </v-card-text>
                    </v-card>
                  </v-timeline-item>
                </v-timeline>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container> -->
  </NuxtLayout>
</template>
<style scoped lang="scss">
.bg-icon.right {
  position: absolute;
  right: 0;
  bottom: 0;
  opacity: 0.5;
}
.bg-icon.left {
  position: absolute;
  left: 0;
  bottom: 0;
  opacity: 0.5;
}
</style>
