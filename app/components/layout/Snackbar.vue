<script lang="ts" setup>
import { Icon } from "@iconify/vue";

const { show, text, color } = useSnackbar();

defineComponent({
  name: "Snackbar",
});
</script>
<template>
  <v-snackbar
    dense
    rounded="pill"
    theme="light"
    v-model="show"
    :color="color"
    class="global-snackbar"
    :timeout="-1"
  >
    {{ text }}
    <template v-slot:actions>
      <v-btn
        icon
        variant="tonal"
        theme="dark"
        color="white"
        @click="show = false"
      >
        <v-icon>
          <Icon icon="mdi:close" />
        </v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>
<style>
.global-snackbar .v-snackbar__actions {
  margin: 0 !important;
}
</style>
