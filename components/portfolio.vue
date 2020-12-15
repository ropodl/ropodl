<template>
  <v-row class="mb-6">
    <v-col cols="12" lg="3" class="d-flex">
      <span class="title ml-auto font-weight-light">Portfolio</span>
    </v-col>
    <v-col>
      <v-row>
        <v-col
          v-for="portfolio in portfolios"
          :key="portfolio.id"
          class="py-0"
          cols="12"
          xs="6"
          sm="6"
          md="2"
          lg="2"
          xl="2"
        >
          <v-card color="transparent" flat>
            <v-btn
              :href="portfolio.url"
              target="_blank"
              class="mx-auto"
              text
              color="primary"
              >{{ portfolio.title }}
              <v-icon right small>launch</v-icon>
            </v-btn>
          </v-card>
        </v-col>
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
          id: "1",
          title: "VueDash",
          url: "https://vuedash.now.sh/"
        },
        {
          id: "2",
          title: "SoftMahal",
          url: "https://www.softmahal.com/"
        }
      ]
    };
  }
};
</script>

<style></style>
