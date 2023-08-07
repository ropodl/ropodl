<script setup>
const clients = [
  {
    name: "API Technology",
    img: "image/clients/apitech.webp",
  },
  {
    name: "Genese Solution",
    img: "image/clients/genese.svg",
  },
];
</script>
<template>
  <div style="background-color: #333646">
    <v-container class="pb-16">
      <v-row justify="center">
        <v-col cols="12" md="2" v-for="(client, i) in clients">
          <v-img
            height="100"
            :src="client['img']"
            style="filter: grayscale(1)"
          ></v-img>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style lang="scss" scoped></style>
