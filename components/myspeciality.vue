<template>
  <v-row class="mb-6">
    <v-col cols="12" lg="3" class="d-flex">
      <span class="title ml-auto font-weight-light">MY SPECIALITIES</span>
    </v-col>
    <v-col>
      <v-row>
        <v-col
          v-for="speciality in specialities"
          :key="speciality.id"
          cols="12"
          sm="12"
          md="6"
          lg="6"
          xl="6"
          class="pt-0"
        >
          <p class="ma-0 display-1 font-weight-black">
            {{ speciality.title }}
          </p>
          <p class="ma-0">{{ speciality.desc }}</p>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      specialities: [
        {
          id: "1",
          title: "VUE JS APPLICATION DEVELOPMENT",
          desc: "Progressive Javascript with lightweight twist."
        },
        {
          id: "2",
          title: "HTML WEBSITE DEVELOPMENT",
          desc: "HTML, CSS and JS are the backbone of web frameworks."
        },
        {
          id: "3",
          title: "ADOBE XD UI TEMPLATING",
          desc: "Prototyping your website/application."
        },
        {
          id: "4",
          title: "GRAPHIC DESIGN",
          desc:
            "Unique Designs to seperate you from competition. From branding to simple graphic design with Illustrator and Photoshop."
        },
        {
          id: "5",
          title: "ADOBE PREMIERE PRO",
          desc: "Video Editing with Adobe Premiere Pro."
        }
      ]
    };
  }
};
</script>

<style></style>
