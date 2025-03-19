<script setup>
definePageMeta({
  layout: "admin-settings",
});

const appearance = useAdminAppearanceStore();
const { isDark, isCompact, isFluid } = storeToRefs(appearance);

const density = ref([
  { title: "Default", value: "default" },
  { title: "Comfortable", value: "comfortable" },
  { title: "Compact", value: "compact" },
]);
</script>
<template>
  <v-row>
    <v-col cols="12">
      <v-card border flat>
        <v-list>
          <v-list-item
            title="Dark Theme"
            subtitle="Toggle the dark mode to enjoy darker"
          >
            <template #append>
              <v-switch v-model="isDark" hide-details></v-switch>
            </template>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item
            title="Compact Mode"
            subtitle="Toogle the density of various ui elements"
          >
            <template #append>
              <v-select
                v-model="isCompact"
                hide-details
                rounded="lg"
                class="pt-3"
                density="compact"
                variant="outlined"
                :items="density"
                style="min-width: 170px"
              ></v-select>
            </template>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item
            title="Fluid Mode"
            subtitle="Make the page have more width"
          >
            <template #append>
              <v-switch v-model="isFluid" hide-details></v-switch>
            </template>
          </v-list-item>
        </v-list>
      </v-card>
    </v-col>
  </v-row>
</template>
