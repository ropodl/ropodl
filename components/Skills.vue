<template>
  <v-row class="mb-6">
    <v-col cols="12" lg="3" class="d-flex">
      <span class="title ml-auto font-weight-light">SKILLS</span>
    </v-col>
    <v-col>
      <v-row>
        <v-col cols="12" sm="6" lg="6" class="pt-0">
          <p class="display-1 font-weight-black">CODING SKILLS</p>
          <div v-for="coding in codings" :key="coding.id">
            <p class="mb-2 d-flex justify-space-between">
              <span>{{ coding.title }}</span>
              <span>{{ coding.percentage }}%</span>
            </p>
            <v-progress-linear
              rounded
              class="mb-4"
              :value="coding.percentage"
            ></v-progress-linear>
          </div>
        </v-col>
        <v-col cols="12" sm="6" lg="6" class="pt-0">
          <p class="display-1 font-weight-black">DESIGN TOOLS</p>
          <div v-for="design in designs" :key="design.id">
            <p class="mb-2 d-flex justify-space-between">
              <span>{{ design.title }}</span>
              <span>{{ design.percentage }}%</span>
            </p>
            <v-progress-linear
              rounded
              class="mb-4"
              :value="design.percentage"
            ></v-progress-linear>
          </div>
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

<style></style>
