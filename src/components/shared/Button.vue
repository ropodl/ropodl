<script setup>
import { mdiArrowRight } from "@mdi/js";

defineProps({
  text: {
    type: String,
  },
});
</script>
<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-btn
      size="large"
      variant="text"
      color="primary"
      class="text-capitalize"
      v-bind="props"
    >
      <span>{{ text }}</span>
      <v-icon
        size="small"
        :icon="mdiArrowRight"
        :class="isHovering ? 'ml-4' : 'ml-2'"
        style="transition: all 100ms linear"
      ></v-icon>
    </v-btn>
  </v-hover>
</template>
