<script lang="ts" setup>
import { Icon } from "@iconify/vue";
import { socials } from "@/utils/socials";
</script>
<template>
  <v-card
    flat
    rounded="0"
    class="position-relative h-100"
    style="padding-top: 50px"
  >
    <v-container class="h-100">
      <v-row justify="center" class="position-relative h-100">
        <v-col cols="12" md="8">
          <div class="d-flex align-center justify-center h-100">
            <div>
              <div class="text-overline text-center">Hello, World! I am</div>
              <div class="text-h2 font-weight-bold mb-3 text-center">
                Saroj Poudel.
              </div>
              <div>
                <div class="text-h4 font-weight-medium text-center">
                  Fullstack developer from Kathmandu, Nepal.
                </div>
                <v-card-text class="pl-0 text-center">
                  Hello, world. I am Web Designer and Web Application Developer.
                  I have rich experience in web site design and building, also I
                  am good at Vue JS. Recently I am enhancing my ExpressJS
                  skills.
                </v-card-text>
                <v-row justify="center" id="btn">
                  <v-col cols="4">
                    <v-hover v-slot="{ isHovering, props }">
                      <v-btn
                        block
                        size="large"
                        variant="tonal"
                        color="primary"
                        class="text-capitalize font-weight-medium"
                        v-bind="props"
                        to="/about"
                      >
                        About
                        <v-icon
                          size="x-small"
                          :class="isHovering ? 'ml-4' : 'ml-2'"
                          style="transition: all 100ms linear"
                        >
                          <Icon icon="material-symbols:arrow-right-alt" />
                        </v-icon>
                      </v-btn>
                    </v-hover>
                  </v-col>
                  <v-col cols="4">
                    <v-hover v-slot="{ isHovering, props }">
                      <v-btn
                        block
                        size="large"
                        variant="text"
                        color="primary"
                        class="text-capitalize font-weight-medium"
                        v-bind="props"
                        to="/about"
                      >
                        Contact
                        <v-icon
                          size="x-small"
                          :class="isHovering ? 'ml-4' : 'ml-2'"
                          style="transition: all 100ms linear"
                        >
                          <Icon icon="material-symbols:arrow-right-alt" />
                        </v-icon>
                      </v-btn>
                    </v-hover>
                  </v-col>
                </v-row>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<style scoped>
#line {
  height: 8px;
  width: 100px;
  background-color: rgb(var(--v-theme-primary));
}
</style>
