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
                <v-card-title
                  class="text-h1 font-weight-black justify-center primary--text"
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
              <v-col cols="12" md="6" v-for="(number, i) in numbers" :key="i">
                <v-card tile class="text-center py-5">
                  <v-card-title
                    class="text-h4 font-weight-bold justify-center primary--text pb-0"
                    v-html="number['title']"
                  ></v-card-title>
                  <v-card-text
                    class="text-h6 font-weight-light text-capitalize white--text"
                    v-html="number['desc']"
                  ></v-card-text>
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
export default {
  name: "NumberCard",
  data() {
    return {
      numbers: [
        {
          title: "60+",
          desc: "Clients",
        },
        {
          title: "4",
          desc: "Years Work Experience",
        },
        {
          title: "100+",
          desc: "Completed Projects",
        },
        {
          title: "0",
          desc: "Achievements",
        },
      ],
    };
  },
};
</script>

<style></style>
