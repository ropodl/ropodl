<template>
  <v-row class="mb-6">
    <v-col cols="12" lg="3" class="d-flex">
      <span class="title ml-auto font-weight-light">Portfolio</span>
    </v-col>
    <v-col>
      <v-row no-gutters>
        <v-chip-group class="pt-0">
          <v-chip
            class="rounded"
            v-for="(portfolio, i) in portfolios"
            :key="i"
            :href="portfolio.url"
            target="_blank"
            color="primary"
            v-text="portfolio['title']"
          />
        </v-chip-group>
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
          url: "https://www.apitechnepal.com/",
        },
        {
          title: "SoftMahal",
          url: "https://www.softmahal.com/",
        },
        {
          title: "VueDash",
          url: "https://vuedash.vercel.app/",
        },
        {
          title: "AnimeZone",
          url: "https://animezone.vercel.app/",
        },
        {
          title: "Instagram Concept",
          url: "https://instaconcept.vercel.app/",
        },
        {
          title: "Reno Design",
          url: "https://renodesign.vercel.app/",
        },
      ],
    };
  },
};
</script>

<style></style>
