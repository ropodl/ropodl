<script setup>
import { mdiArrowRight } from "@mdi/js";
</script>
<template>
  <div style="background-color: #3a3d4f">
    <v-container class="pb-16" style="padding-top: 100px">
      <v-row justify="space-between">
        <v-col cols="12" md="5">
          <div class="text-h4 font-weight-medium mb-3">Got a project?</div>
          <div class="text-h4 font-weight-medium mb-3">Let's talk.</div>
          <div class="mb-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus,
            nemo?
          </div>
          <v-hover v-slot="{ isHovering, props }">
            <v-btn
              size="large"
              variant="text"
              color="primary"
              class="text-capitalize"
              v-bind="props"
            >
              <span class="text-lowercase">sarox14@gmail.com</span>
              <v-icon
                size="x-small"
                :icon="mdiArrowRight"
                :class="isHovering ? 'ml-4' : 'ml-2'"
                style="transition: all 100ms linear"
              ></v-icon>
            </v-btn>
          </v-hover>
        </v-col>
        <v-col cols="12" md="5">
          <div class="text-h4">Estimate your project?</div>
          <div class="text-h4 mb-6">Let me know here.</div>

          <v-text-field
            bg-color="transparent"
            placeholder="What's your name?"
          ></v-text-field>
          <v-text-field
            bg-color="transparent"
            placeholder="Your fancy email"
          ></v-text-field
          ><v-textarea
            bg-color="transparent"
            placeholder="Tell me about your project"
          ></v-textarea>
          <v-hover v-slot="{ isHovering, props }">
            <v-btn
              size="large"
              variant="text"
              color="primary"
              class="text-capitalize"
              v-bind="props"
            >
              <span>Send Message</span>
              <v-icon
                size="x-small"
                :icon="mdiArrowRight"
                :class="isHovering ? 'ml-4' : 'ml-2'"
                style="transition: all 100ms linear"
              ></v-icon>
            </v-btn>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
