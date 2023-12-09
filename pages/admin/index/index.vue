<script setup>
definePageMeta({
  layout: "admin",
  middleware: "admin",
});

const { user } = useUserSession();
// })
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <div class="text-h4 font-weight-bold">
          Welcome back, {{ user?.name || "User" }}
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="3" v-for="i in 4">
        <v-card>
          <v-card-title>Total Blogs</v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
