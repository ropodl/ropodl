<script setup lang="ts">
const route = useRoute();

defineProps({
  form: {
    type: Object,
    required: true,
  },
});
</script>
<template>
  <v-card border flat class="mb-3">
    <v-card-title>Actions</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <span class="font-weight-bold">Status:&nbsp;</span>
      {{ form.status ? "Published" : "Draft" }}
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn
        type="submit"
        color="warning"
        class="text-capitalize"
        @click="form.status = false"
      >
        Save as Draft
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        variant="flat"
        type="submit"
        color="primary"
        class="text-capitalize px-6"
        @click="form.status = true"
      >
        {{ route.params.id ? "Update" : "Publish Now" }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
