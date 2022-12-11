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
        <v-chip-group class="pt-0">
          <v-chip outlined v-for="portfolio, i in portfolios" :key="i" :href="portfolio.url" text target="_blank" color="primary">{{ portfolio.title }}
          </v-chip>
        </v-chip-group>
        <!-- <v-icon right small>launch</v-icon> -->
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
          title: "API Technology",
          url: "https://www.apitechnepal.com/"
        },
        {
          title: "SoftMahal",
          url: "https://www.softmahal.com/"
        },
        {
          title: "VueDash",
          url: "https://vuedash.vercel.app/"
        },
        {
          title: "AnimeZone",
          url: "https://animezone.vercel.app/"
        },
        {
          title: "Instagram Concept",
          url: "https://instaconcept.vercel.app/"
        },
        {
          title: "Reno Design",
          url: "https://renodesign.vercel.app/"
        }
      ]
    };
  }
};
</script>

<style>

</style>
