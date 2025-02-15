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
    text: "Adobe Illustrator",
    icon: "iconoir:adobe-illustrator",
  },
  {
    text: "Adobe Photoshop",
    icon: "iconoir:adobe-photoshop",
  },
  {
    text: "Adobe XD",
    icon: "iconoir:adobe-xd",
  },
  {
    text: "Adobe Premiere Pro",
    icon: "basil:adobe-premiere-outline",
  },
  {
    text: "MS Office",
    icon: "simple-icons:microsoftoffice",
  },
  {
    text: "VS Code",
    icon: "tabler:brand-vscode",
  },
  {
    text: "Linux",
    icon: "carbon:linux",
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

const { data: profile, error: profileError } = await useLazyFetch(
  "https://api.github.com/users/ropodl"
);
const { data: repos, error: reposError } = await useLazyFetch(
  "https://api.github.com/users/ropodl/repos"
);
</script>
<template>
  <NuxtLayout name="page-title">
    <template #title>About</template>
    <v-container>
      <v-row dense>
        <v-col cols="12" md="3">
          <v-row dense>
            <v-col cols="12" sm="6" md="12">
              <v-card
                border
                height="121"
                color="brand"
                class="d-flex align-end"
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
            </v-col>
            <v-col cols="12" sm="6" md="12">
              <v-card border height="121" class="d-flex justify-end align-end">
                <v-icon size="90" class="bg-icon left">
                  <Icon icon="streamline:business-handshake" />
                </v-icon>
                <div>
                  <v-card-title
                    class="text-h3 mb-3 font-weight-black text-brand"
                  >
                    10+
                  </v-card-title>
                  <v-card-text>Satisfied Clients</v-card-text>
                </div>
              </v-card>
            </v-col>
          </v-row>
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
                <v-card-title>Website Design</v-card-title>
              </v-img>
            </v-hover>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-card
            border
            height="250"
            class="d-flex justify-center align-center"
          >
            <v-card-text
              class="text-h3 font-weight-bold"
              style="line-height: 50px"
            >
              <span class="text-brand">Designer</span> by Nature,
              <span class="text-brand">Developer by</span> Choice
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-card border height="121" color="brand" class="mb-2">
            <v-card-title class="h-100">
              <ul
                class="list-style-none h-100 d-flex justify-center align-center flex-wrap"
              >
                <template v-for="{ text, icon } in backend">
                  <li>
                    <v-tooltip :text location="bottom" theme="light">
                      <template v-slot:activator="{ props }">
                        <v-btn flat icon v-bind="props" color="transparent">
                          <v-icon size="40">
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
          <v-card border height="121">
            <v-card-title class="h-100">
              <ul
                class="list-style-none h-100 d-flex justify-center align-center flex-wrap"
              >
                <template v-for="{ text, icon } in frontend">
                  <li>
                    <v-tooltip :text location="bottom" theme="light">
                      <template v-slot:activator="{ props }">
                        <v-btn flat icon v-bind="props" color="transparent">
                          <v-icon color="brand" size="40">
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
          <v-row dense>
            <v-col cols="12">
              <v-card border height="250">
                <v-hover v-slot="{ isHovering, props }">
                  <v-img
                    cover
                    v-bind="props"
                    class="h-100"
                    :class="isHovering ? 'zoom-image' : ''"
                    src="/image/portfolio/bishwaskhabar/full.webp"
                  >
                    <v-card-title>Branding</v-card-title>
                  </v-img>
                </v-hover>
              </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="12">
              <v-card border color="brand" height="121">
                <v-card-title class="h-100">
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
                              v-bind="props"
                              :href="link"
                              target="_blank"
                              color="transparent"
                            >
                              <v-icon>
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
            <v-col cols="12" sm="6" md="12">
              <v-card border height="250">
                <v-card-title>Contact Me</v-card-title>
                <v-divider />
                <v-card-text>Please feel free to contact me.</v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="3">
          <v-row dense>
            <v-col cols="12" sm="6" md="12">
              <v-card border height="379">
                <v-card-title>Experience</v-card-title>
                <v-divider></v-divider>
                <v-card-text class="pt-0">
                  <v-timeline
                    direction="vertical"
                    side="end"
                    line-thickness="1"
                  >
                    <v-timeline-item
                      size="10"
                      density="compact"
                      dot-color="brand"
                      v-for="{ year, title, desc } in experience"
                    >
                      <v-card-title
                        class="pa-0"
                        style="white-space: unset; word-break: normal"
                      >
                        {{ title }}
                      </v-card-title>
                      <v-card-subtitle class="px-0">{{ year }}</v-card-subtitle>
                      <v-card-text class="px-0 pb-0">{{ desc }}</v-card-text>
                    </v-timeline-item>
                  </v-timeline>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="6" sm="6" md="12">
              <v-card border height="121">
                <v-img
                  height="70"
                  class="h-100"
                  src="/image/clients/apitech.avif"
                  alt="api technology"
                ></v-img>
              </v-card>
            </v-col>
            <v-col cols="6" sm="12">
              <v-card border height="121">
                <v-img
                  height="70"
                  class="h-100"
                  src="/image/clients/genese.avif"
                  alt="api technology"
                ></v-img>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="6">
          <v-row dense>
            <v-col cols="12" sm="12" md="12">
              <v-card border height="121">
                <v-hover v-slot="{ isHovering, props }">
                  <v-img
                    cover
                    v-bind="props"
                    class="h-100"
                    :class="isHovering ? 'zoom-image' : ''"
                    src="https://cdn.dribbble.com/users/1462542/screenshots/6586732/legends.png"
                  >
                    <v-card-title>Graphic Design</v-card-title>
                  </v-img>
                </v-hover>
              </v-card>
            </v-col>
            <v-col cols="12">
              <v-row dense>
                <v-col cols="12" sm="6" md="6">
                  <v-card border height="508">
                    <v-card-title>Education</v-card-title>
                    <v-divider></v-divider>
                    <v-card-text class="pt-0">
                      <v-timeline
                        side="end"
                        direction="vertical"
                        height="100%"
                        line-thickness="1"
                      >
                        <v-timeline-item
                          size="10"
                          density="compact"
                          dot-color="brand"
                          v-for="{ year, title, desc } in education"
                        >
                          <v-card-title
                            class="pa-0"
                            style="white-space: unset; word-break: normal"
                          >
                            {{ title }}
                          </v-card-title>
                          <v-card-subtitle class="px-0">{{
                            year
                          }}</v-card-subtitle>
                          <v-card-text class="px-0 pb-0">{{
                            desc
                          }}</v-card-text>
                        </v-timeline-item>
                      </v-timeline>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-card border height="121" class="mb-2">
                    <v-card-title
                      class="d-flex h-100 justify-center align-center"
                    >
                      <ul class="list-style-none d-flex flex-wrap">
                        <template v-for="{ text, icon } in software">
                          <li>
                            <v-tooltip :text location="bottom" theme="light">
                              <template v-slot:activator="{ props }">
                                <v-btn
                                  flat
                                  icon
                                  v-bind="props"
                                  target="_blank"
                                  color="transparent"
                                >
                                  <v-icon size="x-large">
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
                  <v-row dense>
                    <v-col cols="12" md="6">
                      <v-card border height="121" class="mb-2 pa-0">
                        <v-img cover src="/image/me2_optimized.webp"></v-img>
                      </v-card>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-card
                        border
                        height="121"
                        class="mb-2"
                        :class="[
                          profileError
                            ? ''
                            : 'd-flex align-center justify-center',
                        ]"
                      >
                        <div v-if="profile">
                          <v-card-title
                            class="text-h4 text-center font-weight-black text-brand pb-0"
                          >
                            {{ profile.public_repos }}
                          </v-card-title>
                          <v-card-text class="text-center pb-0">
                            Public Repos
                          </v-card-text>
                        </div>
                        <div v-else>
                          <v-alert
                            rounded="0"
                            type="error"
                            text="Error loading GitHub profile"
                          ></v-alert>
                        </div>
                      </v-card>
                    </v-col>
                  </v-row>
                  <v-card border height="250" title="Repos">
                    <v-divider></v-divider>
                    <v-card-text
                      class="pa-0"
                      style="height: 200px; overflow-y: scroll"
                    >
                      <template v-if="repos">
                        <v-list density="compact">
                          <template v-for="({ name, html_url }, i) in repos">
                            <v-list-item
                              :title="name[0].toUpperCase() + name.substring(1)"
                            >
                              <template v-slot:append>
                                <v-btn
                                  icon
                                  size="small"
                                  :href="html_url"
                                  target="_blank"
                                  variant="text"
                                >
                                  <v-icon>
                                    <Icon icon="mdi:open-in-new" />
                                  </v-icon>
                                </v-btn>
                              </template>
                            </v-list-item>
                          </template>
                        </v-list>
                        <v-divider></v-divider>
                      </template>
                      <template v-else>
                        <v-alert
                          rounded="0"
                          type="error"
                          text="Error loading GitHub repo infos"
                        ></v-alert>
                      </template>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
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
