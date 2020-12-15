<template>
  <v-row class="mb-6">
    <v-col cols="12" lg="3" class="d-flex">
      <span class="title ml-auto font-weight-light">EDUCATION</span>
    </v-col>
    <v-col>
      <v-row no-gutters>
        <v-col
          v-for="education in educations"
          :key="education.id"
          cols="12"
          sm="12"
          md="6"
          lg="6"
          xl="6"
          class="mb-6"
        >
          <p class="body-2 ma-0">{{ education.date }}</p>
          <p class="display-1 font-weight-black ma-0">
            {{ education.subject }}
          </p>
          <p class="ma-0 title">{{ education.institute }}</p>
          <p class="subtitle ma-0">{{ education.address }}</p>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      educations: [
        {
          id: "1",
          date: "2014 - 2018",
          subject: "BESE",
          institute: "NCIT",
          address: "Balkumari, Lalitpur"
        },
        {
          id: "2",
          date: "2012 - 2014",
          subject: "TEN PLUS TWO (+2)",
          institute: "Arniko International College/HSS",
          address: "Talchikhel, Lalitpur"
        },
        {
          id: "3",
          date: "2011",
          subject: "SLC (School Leaving Certificate)",
          institute: "National United High School",
          address: "Ganesh Chowk, Kathmandu"
        }
      ]
    };
  }
};
</script>

<style></style>
