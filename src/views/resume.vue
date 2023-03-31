<script setup>
import { defineAsyncComponent } from "vue";
import { mdiLightningBolt, mdiBookOpenPageVariantOutline } from "@mdi/js";

const PageTitle = defineAsyncComponent(() =>
  import("@/components/layout/PageTitle.vue")
);
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card flat class="mb-3">
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
          <div class="d-flex justify-start">
            <v-timeline side="end" align="start">
              <v-timeline-item dot-color="primary" size="10">
                <v-list-item class="w-100 pa-0">
                  <v-list-item-title class="w-100 font-weight-bold">
                    FREELANCE GRAPHIC/WEB DESIGNER
                  </v-list-item-title>
                  <v-list-item-subtitle class="mb-3">2023</v-list-item-subtitle>
                </v-list-item>
              </v-timeline-item>
              <v-timeline-item dot-color="primary" size="10">
                <v-list-item class="w-100 pa-0">
                  <v-list-item-title class="w-100 font-weight-bold">
                    Chief Technology Officer
                  </v-list-item-title>
                  <v-list-item-subtitle class="mb-3">
                    2019 - 2022
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    SoftMahal Technologies @ Mid Baneshwor, Kathmandu
                  </v-list-item-subtitle>
                </v-list-item>
              </v-timeline-item>
              <v-timeline-item dot-color="primary" size="10">
                <v-list-item class="w-100 pa-0">
                  <v-list-item-title class="w-100 font-weight-bold">
                    GRAPHIC/WEB DESIGNER
                  </v-list-item-title>
                  <v-list-item-subtitle class="mb-3">
                    2018
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    Fivonest Technology @ Solteemode, Kathmandu
                  </v-list-item-subtitle>
                </v-list-item>
              </v-timeline-item>
              <v-timeline-item dot-color="primary" size="10">
                <v-list-item class="w-100 pa-0">
                  <v-list-item-title class="w-100 font-weight-bold">
                    FREELANCE GRAPHIC DESIGNER
                  </v-list-item-title>
                  <v-list-item-subtitle class="mb-3">
                    2017
                  </v-list-item-subtitle>
                </v-list-item>
              </v-timeline-item>
            </v-timeline>
          </div>
        </v-card>

        <v-card flat class="mb-3">
          <v-card-title class="d-flex align-center">
            <v-icon
              start
              class="mr-3"
              color="primary"
              :icon="mdiBookOpenPageVariantOutline"
            ></v-icon>
            Skills
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="3" class="pb-0">
                <v-card border flat class="h-100">
                  <v-card-text>Product Design</v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="3" class="pb-0">
                <v-card border flat class="h-100">
                  <v-card-text>Video Editing</v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="3" class="pb-0">
                <v-card border flat class="h-100">
                  <v-card-text>Problem Solving</v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="3" class="pb-0">
                <v-card border flat class="h-100">
                  <v-card-text>Problem Solving</v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="3" class="pb-0">
                <v-card border flat class="h-100">
                  <v-card-text>Team Player / Manager</v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="3" class="pb-0">
                <v-card border flat class="h-100">
                  <v-card-text>Research and Development</v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <v-card flat class="mb-3">
          <v-card-title class="d-flex align-center">
            <v-icon
              start
              class="mr-3"
              color="primary"
              :icon="mdiBookOpenPageVariantOutline"
            ></v-icon>
            Software
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="3" class="pb-0">
                <v-card border flat class="h-100">
                  <v-card-text>Adobe Illustrator</v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="3" class="pb-0">
                <v-card border flat class="h-100">
                  <v-card-text>Adobe Photoshop</v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="3" class="pb-0">
                <v-card border flat class="h-100">
                  <v-card-text>Adobe Premiere Pro</v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="3" class="pb-0">
                <v-card border flat class="h-100">
                  <v-card-text>MS Office</v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="3" class="pb-0">
                <v-card border flat class="h-100">
                  <v-card-text>VS Code</v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <v-card flat class="mb-3">
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
            <v-timeline side="end" align="start">
              <v-timeline-item dot-color="primary" size="10">
                <v-list-item class="w-100 pa-0">
                  <v-list-item-title class="w-100 font-weight-bold">
                    BSC.CSIT
                  </v-list-item-title>
                  <v-list-item-subtitle class="mb-3">
                    2021
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    Sagarmatha College of Information Technology @ Sanepa,
                    Lalitpur
                  </v-list-item-subtitle>
                </v-list-item>
              </v-timeline-item>
              <v-timeline-item dot-color="primary" size="10">
                <v-list-item class="w-100 pa-0">
                  <v-list-item-title class="w-100 font-weight-bold">
                    BE.SE
                  </v-list-item-title>
                  <v-list-item-subtitle class="mb-3">
                    2014 - 2017
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    Nepal College of Information Technology @ Balkumari,
                    Lalitpur (Dropped Out)
                  </v-list-item-subtitle>
                </v-list-item>
              </v-timeline-item>
              <v-timeline-item dot-color="primary" size="10">
                <v-list-item class="w-100 pa-0">
                  <v-list-item-title class="w-100 font-weight-bold">
                    TEN PLUS TWO (+2)
                  </v-list-item-title>
                  <v-list-item-subtitle class="mb-3">
                    2012 - 2013
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    Arniko International College/HSS @ Talchikhel, Lalitpur
                  </v-list-item-subtitle>
                </v-list-item>
              </v-timeline-item>
              <v-timeline-item dot-color="primary" size="10">
                <v-list-item class="w-100 pa-0">
                  <v-list-item-title class="w-100 font-weight-bold">
                    SLC (School Leaving Certificate)
                  </v-list-item-title>
                  <v-list-item-subtitle class="mb-3">
                    2011
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    National United High School @ Ganesh Chowk, Kathmandu
                  </v-list-item-subtitle>
                </v-list-item>
              </v-timeline-item>
            </v-timeline>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
