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
      <v-row>
        <v-col cols="6">
          <v-btn
            block
            color="warning"
            height="40"
            class="text-capitalize"
            @click="form.status = false"
          >
            Save as Draft
          </v-btn>
        </v-col>
        <v-col cols="6">
          <v-btn
            block
            type="submit"
            color="primary"
            height="40"
            variant="tonal"
            class="text-capitalize"
            @click="form.status = true"
          >
            {{ route.params.id ? "Update" : "Publish Now" }}
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>
