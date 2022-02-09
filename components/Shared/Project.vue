<template>
  <div class="project">
    <v-card flat color="transparent">
      <v-container class="py-16">
        <v-row align="center">
          <v-col cols="12" md="6">
            <div class="text-h4 font-weight-bold text-uppercase">
              Featured Projects
            </div>
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta.
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <div class="d-flex">
              <v-spacer></v-spacer>
              <v-btn tile x-large>View All</v-btn>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6" v-for="i in 4" :key="i">
            <v-card flat color="transparent">
              <v-card flat tile>
                <v-card-text>
                  <v-card tile class="my-10">
                    <!-- <v-responsive :aspect-ratio="1 / 1"> -->
                    <v-img
                      tile
                      src="https://images.unsplash.com/photo-1644079956630-4ee4a85859a5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                      height="300"
                    ></v-img>
                    <!-- </v-responsive> -->
                  </v-card>
                </v-card-text>
              </v-card>
              <v-card-title class="pb-0"> Lorem ipsum </v-card-title>
              <v-card-actions>
                <v-btn text x-large>Know More</v-btn>
              </v-card-actions>
            </v-card>
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
