<template>
  <v-app>
    <v-system-bar color="primary" height="10"></v-system-bar>
    <v-content>
      <v-container>
        <v-row>
          <v-col cols="12" xs="12" sm="12" md="3" lg="3" xl="3">
            <v-img max-height="300" contain src="https://api.adorable.io/avatars/285/abott@adorable.png">
            </v-img>
          </v-col>
          <v-col cols="12" xs="12" sm="12" md="9" lg="9" xl="9">
            <div class="mb-6">
              <h1 class="display-2 font-weight-bold" style="text-transform:uppercase;">
                Damian Keller
              </h1>
              <h5 class="primary--text display-1 font-weight-light">
                Freelance Web Designer
              </h5>
            </div>
            <p class="body-1 mb-6">
              Credibly embrace visionary internal or "organic" sources and business benefits. Collaboratively integrate
              efficient portals rather than customized customer service. Assetively deliver frictionless services via
              leveraged interfaces. Conveniently evisculate accurate sources and process-centric expertise.
              Energistically fabricate customized imperatives through cooperative for change.
            </p>
            <v-row no-gutters class="mb-6">
              <v-col cols="20" xs="12" sm="4" md="4" lg="4" xl="4" class="py-0">
                <p class="ma-0 pa-0 title">OCTOBER 17, 1996</p>
                <p class="ma-0 pa-0 caption">BIRTH</p>
              </v-col>
              <v-col cols="20" xs="12" sm="4" md="4" lg="4" xl="4" class="py-0">
                <p class="ma-0 pa-0 title">NEPAL</p>
                <p class="ma-0 pa-0 caption">NATIONALITY</p>
              </v-col>
              <v-col cols="20" xs="12" sm="4" md="4" lg="4" xl="4" class="py-0">
                <p class="ma-0 pa-0 title">NEPALI
                  <!-- <span class="overline">(NATIVE)</span> -->, ENGLISH
                  <!-- <span class="overline">(INTERMEDIATE)</span> -->
                </p>
                <p class="ma-0 pa-0 caption">LANGUAGE</p>
              </v-col>
            </v-row>
            <v-row no-gutters class="mb-6">
              <v-col cols="12" md="4" class="d-flex justify-space-between">
                <v-btn icon outlined style="border:0px;">
                  <v-icon> fab fa-facebook
                  </v-icon>
                </v-btn>
                <v-btn icon outlined style="border:0px;">
                  <v-icon> fab fa-twitter
                  </v-icon>
                </v-btn>
                <v-btn icon outlined style="border:0px;">
                  <v-icon> fab fa-linkedin
                  </v-icon>
                </v-btn>
                <v-btn icon outlined style="border:0px;">
                  <v-icon> fab fa-slack
                  </v-icon>
                </v-btn>
                <v-btn icon outlined style="border:0px;">
                  <v-icon> fab fa-dribbble
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row class="mb-6">
          <v-col cols="12" lg="3" class="d-flex">
            <span class="title ml-auto">MY ACTIVITY</span>
          </v-col>
          <v-col cols="12" lg="2">
            <p class="ma-0">100%</p>
            <p class="ma-0">JOBS SUCCESS</p>
          </v-col>
          <v-col cols="12" lg="2">
            <p class="ma-0">96%</p>
            <p class="ma-0">ON BUDGET</p>
          </v-col>
          <v-col cols="12" lg="2">
            <p class="ma-0">99%</p>
            <p class="ma-0">ON TIME</p>
          </v-col>
          <v-col cols="12" lg="2">
            <p class="ma-0">89%</p>
            <p class="ma-0">REPEAT HIRE RATE</p>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    name: 'App',

    components: {},

    data: () => ({
      //
    }),
  };
</script>