<script lang="ts" setup>
const clients = [
  {
    name: "API Technology",
    img: "image/clients/apitech.avif",
  },
  {
    name: "Genese Solution",
    img: "image/clients/genese.avif",
  },
];
</script>
<template>
  <div style="background-color: #313131">
    <v-container class="py-16">
      <v-row justify="center">
        <v-col cols="12" md="2" v-for="(client, i) in clients">
          <v-img height="100" :src="client['img']"></v-img>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style lang="scss" scoped></style>
