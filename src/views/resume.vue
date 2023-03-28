<script setup>
import { defineAsyncComponent } from "vue";
import { mdiBookOpenPageVariantOutline } from "@mdi/js";

const PageTitle = defineAsyncComponent(() =>
  import("@/components/layout/PageTitle.vue")
);
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <PageTitle title="Resume"></PageTitle>
        <v-card flat>
          <v-card-title class="d-flex align-center">
            <v-icon
              color="primary"
              start
              :icon="mdiBookOpenPageVariantOutline"
            ></v-icon>
            Experience
          </v-card-title>
          <v-timeline side="end" align="start">
            <v-timeline-item dot-color="primary" size="10">
              <v-list-item class="w-100 pa-0">
                <v-list-item-title class="w-100"
                  >This is the title</v-list-item-title
                >
                <v-list-item-subtitle>This is desc</v-list-item-subtitle>
              </v-list-item>
            </v-timeline-item>

            <v-timeline-item dot-color="teal-lighten-3" size="small">
              <div class="d-flex">
                <strong class="me-4">3-4pm</strong>
                <div>
                  <strong>Design Stand Up</strong>
                  <div class="text-caption mb-2">Hangouts</div>
                </div>
              </div>
            </v-timeline-item>

            <v-timeline-item dot-color="pink" size="small">
              <div class="d-flex">
                <strong class="me-4">12pm</strong>
                <div>
                  <strong>Lunch break</strong>
                </div>
              </div>
            </v-timeline-item>

            <v-timeline-item dot-color="teal-lighten-3" size="small">
              <div class="d-flex">
                <strong class="me-4">9-11am</strong>
                <div>
                  <strong>Finish Home Screen</strong>
                  <div class="text-caption">Web App</div>
                </div>
              </div>
            </v-timeline-item>
          </v-timeline>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
