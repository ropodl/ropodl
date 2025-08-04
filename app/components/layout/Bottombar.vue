<script setup lang="ts">
import { pages } from "@/utils/constants";
</script>
<template>
  <v-bottom-navigation mode="shift">
    <template v-for="{ icon, title, to } in pages">
      <v-btn stacked :to>
        <v-icon>
          <Icon :name="icon" />
        </v-icon>
        <span>
          {{ title }}
        </span>
      </v-btn>
    </template>
  </v-bottom-navigation>
</template>
