<template>
  <div class="service-card">
    <v-container class="py-16">
      <v-row>
        <v-col cols="12" md="4" v-for="(service, i) in services" :key="i">
          <v-card tile class="py-8 px-5" :color="i === 1 ? 'primary' : ''">
            <v-card-title class="pb-0">
              <v-icon x-large :color="i === 1 ? 'white' : 'primary'">{{
                service.icon
              }}</v-icon>
            </v-card-title>
            <v-card-title class="font-weight-bold" v-html="service.title">
            </v-card-title>
            <v-card-text v-html="service.desc"></v-card-text>
            <v-card-actions>
              <v-btn text :color="i === 1 ? 'white' : 'primary'"
                >Know More
                <v-icon small class="ml-2">fa-thin fa-arrow-right</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "ServiceCard",
  data() {
    return {
      services: [
        {
          icon: "fa-solid fa-newspaper",
          title: "UI Design",
          desc: "Lorem ipsum is simply text of printing type.",
        },
        {
          icon: "fa-solid fa-newspaper",
          title: "Product Design",
          desc: "Lorem ipsum is simply text of printing type.",
        },
        {
          icon: "fa-solid fa-newspaper",
          title: "Branding",
          desc: "Lorem ipsum is simply text of printing type.",
        },
      ],
    };
  },
};
</script>

<style></style>
