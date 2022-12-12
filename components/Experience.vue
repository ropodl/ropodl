<template>
  <v-row class="mb-6">
    <v-col cols="12" lg="3" class="d-flex">
      <span class="title ml-auto font-weight-light">WORK EXPERIENCE</span>
    </v-col>
    <v-col>
      <v-row no-gutters>
        <v-col
          v-for="(experience, i) in experiences"
          :key="i"
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
          <p class="ma-0 title">{{ experience.company }}</p>
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
          date: "2023",
          post: "FREELANCE GRAPHIC/WEB DESIGNER",
        },
        {
          date: "2019 - 2022",
          post: "CHIEF TECHNOLOGY OFFICER",
          company: "SoftMahal Technologies",
          address: "Mid Baneshwor, Kathmandu",
        },
        {
          date: "2018 - 2019",
          post: "GRAPHIC DESIGNER",
          company: "Fivonest Technology",
          address: "Solteemode, Kathmandu",
        },
        {
          date: "2018",
          post: "FREELANCE GRAPHIC DESIGNER",
        },
      ],
    };
  },
};
</script>
