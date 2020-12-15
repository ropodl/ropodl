<template>
  <v-row class="mb-6">
    <v-col cols="12" lg="3" class="d-flex">
      <span class="title ml-auto font-weight-light">WORK EXPERIENCE</span>
    </v-col>
    <v-col>
      <v-row no-gutters>
        <!-- put mb-6 if more than 2 items  -->
        <v-col
          v-for="experience in experiences"
          :key="experience.id"
          cols="12"
          sm="6"
          md="6"
          lg="6"
          xl="6"
          class="mb-6"
        >
          <p class="body-2 ma-0">{{ experience.date }}</p>
          <p class="display-1 font-weight-black ma-0">
            {{ experience.post }}
          </p>
          <p class="ma-0 title text-uppercase">{{ experience.company }}</p>
          <p class="subtitle ma-0">{{ experience.address }}</p>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      experiences: [
        {
          id: "1",
          date: "2019 - Present",
          post: "CHIEF WEB DESIGNER",
          company: "SoftMahal Technologies",
          address: "Mid Baneshwor, Kathmandu"
        },
        {
          id: "2",
          date: "2018 - 2019",
          post: "GRAPHIC DESIGNER",
          company: "FIVONEST TECHNOLOGY",
          address: "Solteemode, Kathmandu"
        },
        {
          id: "3",
          date: "2018",
          post: "FREELANCING GRAPHIC DESIGNER"
        }
      ]
    };
  }
};
</script>

<style></style>
