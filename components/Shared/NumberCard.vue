<template>
  <div class="number-card">
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
