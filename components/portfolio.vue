<template>
  <v-row class="mb-6">
    <v-col cols="12" lg="3" class="d-flex">
      <span class="title ml-auto font-weight-light">Portfolio</span>
    </v-col>
    <v-col>
      <v-row no-gutters>
        <!-- <v-col
          cols="12"
          xs="6"
          sm="6"
          md="2"
          lg="2"
          xl="2"
        > -->
        <!-- <v-card color="transparent" flat> -->
        <v-btn
          v-for="portfolio in portfolios"
          :key="portfolio.id"
          :href="portfolio.url"
          text
          target="_blank"
          class="mx-auto"
          color="primary"
          >{{ portfolio.title }}
          <v-icon right small>launch</v-icon>
        </v-btn>
        <!-- </v-card> -->
        <!-- </v-col> -->
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      portfolios: [
        {
          id: "0",
          title: "AnimeZone",
          url: "https://animezone.info/"
        },
        {
          id: "1",
          title: "VueDash",
          url: "https://vuedash.now.sh/"
        },
        {
          id: "2",
          title: "SoftMahal",
          url: "https://www.softmahal.com/"
        },
        {
          id: "3",
          title: "API Technology",
          url: "https://www.apitechnepal.com/"
        },
        {
          id: "4",
          title: "Instagram Concept",
          url: "https://instaconcept.now.sh/"
        }
      ]
    };
  }
};
</script>

<style></style>
