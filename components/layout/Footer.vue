<script setup>
import { Icon } from "@iconify/vue";
import { socials } from "@/utils/socials";
const i = ref(0);

const goToAdmin = () => {
  i.value++;
  if (i.value === 10) navigateTo("/sign-in");
  else return;
};
</script>
<template>
  <v-card
    border
    flat
    class="pt-6 pb-16"
    rounded="0"
    style="border-bottom: 0; border-left: 0; border-right: 0"
  >
    <v-card-text class="text-center">
      <LazySharedLogo @click="goToAdmin" />
    </v-card-text>
    <v-card-text class="text-center">
      <strong> Thanks for scrolling,</strong>&nbsp;that's all folks.
      <ul class="d-flex justify-center list-style-none mt-8">
        <li v-for="(social, i) in socials">
          <v-hover v-slot="{ isHovering, props }">
            <v-btn
              rounded="lg"
              height="40"
              target="_blank"
              v-bind="props"
              size="small"
              class="mr-3"
              :variant="isHovering ? 'tonal' : 'text'"
              :href="social['link']"
              :aria-label="social['name']"
              :color="isHovering ? 'primary' : 'white'"
            >
              <v-icon>
                <Icon :icon="social['icon']" />
              </v-icon>
            </v-btn>
          </v-hover>
        </li>
      </ul>
    </v-card-text>
  </v-card>
</template>
