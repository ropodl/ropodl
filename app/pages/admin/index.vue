<script setup lang="ts">
const appearance = useAdminAppearanceStore();
const { isFluid } = storeToRefs(appearance);

definePageMeta({
  layout: "admin",
});

useHead({
  title: "Admin Dashboard",
});

onMounted(() => {
  getDashboard();
});

const stats = ref([]);
const getDashboard = async () => {
  await useAxios.get("/api/dashboard").then((res) => {
    stats.value = res.stats;
  });
};
</script>
<template>
  <v-container :fluid="isFluid">
    <v-row>
      <v-col cols="12">
        <div class="text-h4 font-weight-bold">Welcome back, {{ "User" }}</div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="3" v-for="{ icon, number, title, growth } in stats">
        <v-card border>
          <v-icon
            color="primary"
            size="40"
            class="position-absolute"
            style="top: 10px; right: 10px"
          >
            <Icon :name="icon" />
          </v-icon>
          <v-card-title>
            <div class="text-h4 font-weight-bold">
              {{ number }}
            </div>
            <div>{{ title }}</div>
          </v-card-title>
          <template v-if="growth">
            <v-card-text class="d-flex align-center">
              <v-chip size="small" :color="growth > 1 ? 'success' : ''">
                {{ growth }} % </v-chip
              >&nbsp; since last month
            </v-card-text>
          </template>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
