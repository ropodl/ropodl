<template>
  <div class="service-card" style="position: relative">
    <div style="position: absolute; inset: 0; z-index: 0">
      <v-card dark tile color="#181818" height="100%" width="50%"> </v-card>
    </div>
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
    <v-card flat color="transparent">
      <v-container class="pb-16">
        <v-row>
          <v-col cols="12" md="4">
            <v-card
              flat
              tile
              height="100%"
              class="d-flex align-center justify-center text-center"
              color="transparent"
            >
              <div>
                <v-card-title class="text-h1 font-weight-black justify-center"
                  >5</v-card-title
                >
                <v-card-text class="text-h4 font-weight-bold">
                  Years Experience
                </v-card-text>
              </div>
            </v-card>
          </v-col>
          <v-col cols="12" md="8">
            <v-row>
              <v-col cols="12" md="6" v-for="i in 4" :key="i">
                <v-card class="text-center">
                  <v-card-title class="justify-center">title</v-card-title>
                  <v-card-text> text </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
