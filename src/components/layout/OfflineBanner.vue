<script setup>
import { mdiWifiStrengthAlertOutline } from "@mdi/js";
</script>
<template>
  <v-container class="pb-0">
    <v-banner
      border
      sticky
      elevation="0"
      lines="one"
      rounded="xl"
      :icon="mdiWifiStrengthAlertOutline"
      text="You are currently not connect to the internet."
      style="background-color: #2a2c3b"
    ></v-banner>
  </v-container>
</template>
<style>
.v-banner__content {
  align-content: center !important;
  display: grid !important;
}
</style>
