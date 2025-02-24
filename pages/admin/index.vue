<script setup lang="ts">
import { Icon } from "@iconify/vue";

definePageMeta({
  layout: "admin",
});

const user = useSupabaseUser();
const { setBreadcrumb } = useAdminBreadcrumbStore();
setBreadcrumb([]);

useHead({
  title: "Admin Dashboard",
});
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <div class="text-h4 font-weight-bold">
          Welcome back, {{ user?.email || "User" }}
        </div>
      </v-col>
    </v-row>
    <v-row>
      <!-- <v-col cols="12" md="3" v-for="(stat, i) in data.stats">
        <v-card border>
          <v-icon
            :color="stat.color"
            size="100"
            class="position-absolute"
            style="bottom: -20px; right: -20px"
          >
            <Icon :icon="stat.icon" />
          </v-icon>
          <v-card-title class="pb-0">
            <div class="text-h4 font-weight-bold">
              {{ stat.number }}
            </div>
            <div>{{ stat.title }}</div>
          </v-card-title>
          <v-card-text>This is a test</v-card-text>
        </v-card>
      </v-col> -->
    </v-row>
  </v-container>
</template>
