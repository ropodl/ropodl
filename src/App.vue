<template>
  <v-app>
    <v-system-bar color="primary" height="4"></v-system-bar>
    <v-content>
      <v-container>
        <v-row>
          <v-col cols="12" xs="12" sm="12" md="3" lg="3" xl="3">
            <v-img max-height="300" contain src="https://api.adorable.io/avatars/285/abott@adorable.png">
            </v-img>
          </v-col>
          <v-col cols="12" xs="12" sm="12" md="9" lg="9" xl="9">
            <div class="mb-6">
              <h1 class="display-2 font-weight-bold d-flex justify-space-between" style="text-transform:uppercase;">
                <span>
                Damian Keller
                </span>
                <span>
                  <v-btn icon color="primary" @click="darkmode">
                    <v-icon v-if="!this.$vuetify.theme.dark">brightness_high</v-icon>
                    <v-icon v-if="this.$vuetify.theme.dark">brightness_1</v-icon>
                  </v-btn>
                </span>
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
                <v-btn icon outlined style="border:0px;" color="primary">
                  <v-icon> fab fa-facebook
                  </v-icon>
                </v-btn>
                <v-btn icon outlined style="border:0px;" color="primary">
                  <v-icon> fab fa-twitter
                  </v-icon>
                </v-btn>
                <v-btn icon outlined style="border:0px;" color="primary">
                  <v-icon> fab fa-linkedin
                  </v-icon>
                </v-btn>
                <v-btn icon outlined style="border:0px;" color="primary">
                  <v-icon> fab fa-slack
                  </v-icon>
                </v-btn>
                <v-btn icon outlined style="border:0px;" color="primary">
                  <v-icon> fab fa-dribbble
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row class="mb-6">
          <v-col cols="12" lg="3" class="d-flex">
            <span class="title ml-auto font-weight-light">MY ACTIVITY</span>
          </v-col>
          <v-col>
            <v-row no-gutters>
              <v-col cols="12" lg="3">
                <p class="ma-0 display-1 font-weight-black">100%</p>
                <p class="ma-0">JOBS SUCCESS</p>
              </v-col>
              <v-col cols="12" lg="3">
                <p class="ma-0 display-1 font-weight-black">96%</p>
                <p class="ma-0">ON BUDGET</p>
              </v-col>
              <v-col cols="12" lg="3">
                <p class="ma-0 display-1 font-weight-black">99%</p>
                <p class="ma-0">ON TIME</p>
              </v-col>
              <v-col cols="12" lg="3">
                <p class="ma-0 display-1 font-weight-black">89%</p>
                <p class="ma-0">REPEAT HIRE RATE</p>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row class="mb-6">
          <v-col cols="12" lg="3" class="d-flex">
            <span class="title ml-auto font-weight-light">WORK HISTORY</span>
          </v-col>
          <v-col>
            <v-row no-gutters>
              <v-col cols="12" lg="3">
                <p class="ma-0 display-1 font-weight-black">15096</p>
                <p class="ma-0">HOURS WORKED</p>
              </v-col>
              <v-col cols="12" lg="3">
                <p class="ma-0 display-1 font-weight-black">687</p>
                <p class="ma-0">WORK DONE</p>
              </v-col>
              <v-col cols="12" lg="3">
                <p class="ma-0 display-1 font-weight-black">30</p>
                <p class="ma-0">HOURS WEEKLY AVAILABLE</p>
              </v-col>
              <v-col cols="12" lg="3">
                <p class="ma-0 display-1 font-weight-black">24</p>
                <p class="ma-0">HOUR RESPONSE TIME</p>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row class="mb-6">
          <v-col cols="12" lg="3" class="d-flex">
            <span class="title ml-auto font-weight-light">MY SPECIALITIES</span>
          </v-col>
          <v-col>
            <v-row>
              <v-col cols="12" lg="6" class="pt-0">
                <p class="ma-0 display-1 font-weight-black">WORDPRESS THEME DEVELOPMENT</p>
                <p class="ma-0">Synergistically strategize customer directed resources rather than principle.</p>
              </v-col>
              <v-col cols="12" lg="6" class="pt-0">
                <p class="ma-0 display-1 font-weight-black">JOOMLA TEMPLATE DEVELOPMENT</p>
                <p class="ma-0">Quickly repurpose reliable customer service with orthogonal ideas. Competently.</p>
              </v-col>
              <v-col cols="12" lg="6">
                <p class="ma-0 display-1 font-weight-black">DRUPAL TEMPLATE DEVELOPMENT</p>
                <p class="ma-0">Interactively myocardinate high standards in initiatives rather than next-generation.
                </p>
              </v-col>
              <v-col cols="12" lg="6">
                <p class="ma-0 display-1 font-weight-black">SHOPIFY THEME DESIGN</p>
                <p class="ma-0">Dynamically initiate client-based convergence vis-a-vis performance based.</p>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row class="mb-6">
          <v-col cols="12" lg="3" class="d-flex">
            <span class="title ml-auto font-weight-light">SKILLS</span>
          </v-col>
          <v-col>
            <v-row>
              <v-col cols="12" lg="6" class="pt-0">
                <p class="display-1 font-weight-black">CODING SKILLS</p>
                <p class="mb-2 d-flex justify-space-between">
                  <span>
                  HTML5
                  </span>
                  <span>
                  90%
                  </span>
                </p>
                <v-progress-linear class="mb-4" value="96"></v-progress-linear>
                <p class="mb-2 d-flex justify-space-between">
                  <span>
                  CSS3
                  </span>
                  <span>
                  90%
                  </span>
                </p>
                <v-progress-linear class="mb-2" value="96"></v-progress-linear>
                <p class="mb-2 d-flex justify-space-between">
                  <span>
                  PHP
                  </span>
                  <span>
                  90%
                  </span>
                </p>
                <v-progress-linear class="mb-2" value="96"></v-progress-linear>
                <p class="mb-2 d-flex justify-space-between">
                  <span>
                  JAVASCRIPT
                  </span>
                  <span>
                  90%
                  </span>
                </p>
                <v-progress-linear value="96"></v-progress-linear>
              </v-col>
              <v-col cols="12" lg="6" class="pt-0">
                <p class="display-1 font-weight-black">DESIGN TOOLS</p>
                <p class="mb-2 d-flex justify-space-between">
                  <span>
                  Photoshop
                  </span>
                  <span>
                  90%
                  </span>
                </p>
                <v-progress-linear class="mb-4" value="96"></v-progress-linear>
                <p class="mb-2 d-flex justify-space-between">
                  <span>
                  Illustrator
                  </span>
                  <span>
                  90%
                  </span>
                </p>
                <v-progress-linear class="mb-2" value="96"></v-progress-linear>
                <p class="mb-2 d-flex justify-space-between">
                  <span>
                  Sketch
                  </span>
                  <span>
                  90%
                  </span>
                </p>
                <v-progress-linear class="mb-2" value="96"></v-progress-linear>
                <p class="mb-2 d-flex justify-space-between">
                  <span>
                  MACAW
                  </span>
                  <span>
                  55%
                  </span>
                </p>
                <v-progress-linear value="55"></v-progress-linear>
              </v-col>              
            </v-row>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="12" class="d-flex">
            <v-spacer></v-spacer>
            <p class="ma-0 pa-0">Online CV. Made By: <span class="primary--text">uiCookies</span></p>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    name: 'App',
    data(){
      return{

      }
    },
    methods: {
      darkmode(){
        this.$vuetify.theme.dark = !this.$vuetify.theme.dark
      }
    }
  };
</script>