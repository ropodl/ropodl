<template>
  <v-row class="mb-6">
    <v-col cols="12" lg="3" class="d-flex">
      <span class="title ml-auto font-weight-light">SKILLS</span>
    </v-col>
    <v-col>
      <v-row>
        <v-col cols="12" sm="6" lg="6" class="pt-0">
          <p class="display-1 font-weight-black">CODING SKILLS</p>
          <v-chip-group column>
            <v-chip color="primary" class="rounded-0" text v-for="coding, i in codings" :key="i">
              {{ coding.title }}
            </v-chip>
          </v-chip-group>
        </v-col>
        <v-col cols="12" sm="6" lg="6" class="pt-0">
          <p class="display-1 font-weight-black">DESIGN TOOLS</p>
          <v-chip-group column>
            <v-chip class="rounded-0" color="primary" v-for="design, i in designs" :key="i">
              {{ design.title }}
            </v-chip>
          </v-chip-group>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      codings: [
        {
          id: "1",
          title: "HTML5",
          percentage: "90"
        },
        {
          id: "2",
          title: "CSS3",
          percentage: "85"
        },
        {
          id: "3",
          title: "JAVASCRIPT",
          percentage: "40"
        },
        {
          id: "4",
          title: "VUEJS",
          percentage: "60"
        }
      ],
      designs: [
        {
          id: "1",
          title: "PHOTOSHOP",
          percentage: "70"
        },
        {
          id: "2",
          title: "ILLUSTRATOR",
          percentage: "60"
        },
        {
          id: "3",
          title: "ADOBE XD",
          percentage: "65"
        },
        {
          id: "4",
          title: "ADOBE PREMIERE PRO",
          percentage: "56"
        }
      ]
    };
  }
};
</script>

<style>

</style>
