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
    <v-card-title>
      Actions
      <v-spacer></v-spacer>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text class="pa-0">
      <v-list bg-color="transparent">
        <v-list-item>
          <v-list-item-title class="d-flex align-center">
            <div class="font-weight-bold">Status:</div>
            <v-select
              v-model="form.status"
              class="ml-3"
              rounded="lg"
              hide-details
              density="compact"
              :items="[
                {
                  title: 'Published',
                  value: true,
                },
                {
                  title: 'Draft',
                  value: false,
                },
              ]"
              style="max-width: 140px"
            ></v-select>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <template v-if="form.id">
        <v-btn
          variant="text"
          type="submit"
          color="primary"
          class="text-capitalize px-6"
          target="_blank"
          :href="`/blogs/${form.slug}`"
        >
          Preview
        </v-btn>
      </template>
      <v-spacer></v-spacer>
      <v-btn
        variant="flat"
        type="submit"
        color="primary"
        class="text-capitalize px-6"
      >
        Submit
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
