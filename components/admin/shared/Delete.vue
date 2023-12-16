<script setup lang="ts">
import { Icon } from "@iconify/vue";

defineProps({
  type: { type: String, required: true },
  title: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <v-dialog persistent scrim="black" width="500">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" icon rounded="lg" color="error" variant="tonal">
        <v-icon>
          <Icon icon="mdi:delete" />
        </v-icon>
      </v-btn>
    </template>
    <template v-slot:default="{ isActive }">
      <v-card border :title="`Delete ${type}`">
        <v-card-text class="pb-0">
          Are you sure you want to delete "{{ title }}"? This action cannot be
          undone.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            rounded="lg"
            variant="tonal"
            color="success"
            height="40"
            text="Cancel"
            class="text-capitalize px-10"
            @click="isActive.value = false"
          ></v-btn>
          <v-btn
            rounded="lg"
            variant="tonal"
            color="error"
            height="40"
            text="Delete"
            class="text-capitalize px-10"
            @click="$emit('delete-action')"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
