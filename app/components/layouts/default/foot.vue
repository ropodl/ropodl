<script setup lang="ts">
import socials from "@/utils/social";
import { useDisplay, useGoTo } from "vuetify";

const goTo = useGoTo();
const { mobile } = useDisplay();

const goTop = () => {
   goTo(0, {
      easing: "linear",
      duration: 250,
   });
};
</script>
<template>
   <v-footer
      absolute
      border="t"
      class="blur-8 position-relative"
      :class="{ 'pb-16': mobile }"
   >
      <!-- color="rgba(var(--v-theme-background),0.7)" -->
      <v-container
         max-width="1200"
         class="position-absolute left-0 right-0 mx-auto z-1010"
         style="top: -40px; pointer-events: none"
      >
         <v-row>
            <v-col cols="12" class="d-flex">
               <v-spacer />
               <v-btn
                  v-tooltip="{
                     location: 'top',
                     text: 'Go To Top',
                  }"
                  border
                  rounded="circle"
                  icon="mdi-arrow-up-right"
                  style="pointer-events: all"
                  @click="goTop"
               />
            </v-col>
         </v-row>
      </v-container>
      <v-card
         color="transparent"
         border="0"
         rounded="0"
         class="pt-16 w-100 overflow-visible"
      >
         <v-container max-width="1200">
            <v-row>
               <v-col cols="12">
                  <div class="text-h5 mb-6">
                     Liked my works? Let's Talk and work together
                  </div>
                  <div
                     class="text-lg-h1 text-h4 font-weight-bold d-flex align-start"
                  >
                     <span class="text-primary-darken-2">hello</span>@ropodl.com
                     <template v-if="!mobile">
                        <v-btn
                           border
                           icon="mdi-arrow-top-right"
                           color="primary"
                           variant="tonal"
                           rounded="circle"
                           class="ms-3"
                           href="mailto:hello@ropodl.com"
                        />
                     </template>
                  </div>
               </v-col>
            </v-row>
         </v-container>
         <v-container max-width="1200">
            <v-row align="center" justify="center">
               <v-col cols="12" md="6">
                  <div class="d-flex align-center text-body-1">
                     Copyright © {{ new Date().getFullYear() }}.
                  </div>
               </v-col>
               <v-col cols="12" md="6">
                  <ul class="list-none d-flex justify-sm-center justify-md-end">
                     <template v-for="{ icon, link } in socials" :key="link">
                        <li>
                           <v-btn
                              icon
                              rounded="lg"
                              color="primary"
                              variant="text"
                              class="mr-3"
                              :href="link"
                           >
                              <v-icon>
                                 <Icon :name="icon" />
                              </v-icon>
                           </v-btn>
                        </li>
                     </template>
                  </ul>
               </v-col>
            </v-row>
         </v-container>
      </v-card>
   </v-footer>
</template>
