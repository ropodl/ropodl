<script setup lang="ts">
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
    <template v-slot:activator="{ props: dialog }">
      <v-btn
        v-bind="dialog"
        v-tooltip="'Delete Post'"
        icon="mdi-delete-outline"
        size="small"
        rounded="lg"
        variant="text"
      />
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
            variant="text"
            height="40"
            text="Cancel"
            class="text-capitalize px-10"
            @click="isActive.value = false"
          ></v-btn>
          <v-btn
            rounded="lg"
            color="primary"
            variant="flat"
            text="Delete"
            class="text-capitalize px-10"
            @click="$emit('delete-action', isActive.value)"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
