<script setup>
const user = useUser();
definePageMeta({
  layout: "admin",
});
// onMounted(async () => {
//   const { data, error } = await useFetch("http://127.0.0.1:3001/api/v1/");
//   console.log(data)
// })
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <div class="text-h4 font-weight-bold">
          Welcome back, {{ user.userData.name || "User" }}
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

<style lang="scss" scoped></style>
