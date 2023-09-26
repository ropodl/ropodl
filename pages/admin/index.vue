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
          Welcome back,
          {{ user.userData.name }}
          <!-- {{ data.value }} -->
          <!-- {{ error }} -->
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped></style>
