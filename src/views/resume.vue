<script setup>
import {
  mdiLightningBolt,
  mdiBookOpenPageVariantOutline,
  mdiAnvil,
  mdiHandPeace,
} from "@mdi/js";

const experience = [
  {
    title: "Freelance Graphic/Web Designer",
    year: "2023",
  },
  {
    title: "Chief Technology Officer",
    year: "2019 - 2022",
    desc: "SoftMahal Technologies @ Mid Baneshwor, Kathmandu",
  },
  {
    title: "Graphic/Web Designer",
    year: "2018",
    desc: "Fivonest Technology @ Solteemode, Kathmandu",
  },
  {
    title: "FREELANCE GRAPHIC DESIGNER",
    year: "2017",
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
  {
    title: "BSCSIT",
    year: "2021",
    desc: "Sagarmatha College of Information Technology @ Sanepa, Lalitpur",
  },
  {
    title: "BE.SE",
    year: "2014 - 2017",
    desc: " Nepal College of Information Technology @ Balkumari, Lalitpur (Dropped Out)",
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
</script>
<template>
  <v-container class="px-0">
    <v-row>
      <v-col cols="12" class="mb-3">
        <v-card-title class="d-flex align-center">
          <v-icon
            start
            class="mr-3"
            color="primary"
            :icon="mdiLightningBolt"
          ></v-icon>
          Experience
        </v-card-title>
        <v-divider></v-divider>
        <v-card flat color="transparent">
          <div class="d-flex justify-start">
            <v-timeline side="end" align="center">
              <v-timeline-item
                dot-color="primary"
                size="10"
                v-for="exp in experience"
              >
                <v-card border flat>
                  <v-card-text>
                    <v-list-item class="w-100 pa-0">
                      <v-list-item-title
                        class="w-100 font-weight-bold"
                        v-text="exp['title']"
                      ></v-list-item-title>
                      <v-list-item-subtitle
                        :class="exp['desc'] ? 'mb-3' : ''"
                        v-text="exp['year']"
                      ></v-list-item-subtitle>
                      <v-list-item-subtitle
                        v-if="exp['desc']"
                        v-text="exp['desc']"
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
          <v-icon
            start
            class="mr-3"
            color="primary"
            :icon="mdiHandPeace"
          ></v-icon>
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
          <v-icon start class="mr-3" color="primary" :icon="mdiAnvil"></v-icon>
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
          <v-icon
            start
            class="mr-3"
            color="primary"
            :icon="mdiBookOpenPageVariantOutline"
          ></v-icon>
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
  </v-container>
</template>
