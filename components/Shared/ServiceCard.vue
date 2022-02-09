<template>
  <div class="service-card">
    <v-container class="py-16">
      <v-row>
        <v-col cols="12" md="4" v-for="i in 3" :key="i">
          <v-card tile class="py-8 px-5">
            <v-card-title class="pb-0">
              <v-icon x-large>fa-solid fa-newspaper</v-icon>
            </v-card-title>
            <v-card-title class="font-weight-bold">
              Service Title
            </v-card-title>
            <v-card-text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laudantium, at.
            </v-card-text>
            <v-card-actions>
              <v-btn text>Know More</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "ServiceCard",
};
</script>

<style></style>
