<template>
  <v-app>
    <v-btn fixed dark fab bottom right small color="primary" @click="$vuetify.goTo('#app')" v-scroll="onScroll"
      v-show="fab">
      <v-icon>keyboard_arrow_up</v-icon>
    </v-btn>
    <v-system-bar color="primary" height="4"></v-system-bar>
    <v-content>
      <v-container>

        <v-row>
          <v-col cols="12" xs="12" sm="12" md="3" lg="3" xl="3">
            <v-img max-height="300" contain src="avatar.png">
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="primary"></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-col>

          <v-col cols="12" xs="12" sm="12" md="9" lg="9" xl="9">
            <div class="mb-6">
              <h1 class="display-2 font-weight-bold d-flex justify-space-between" style="text-transform:uppercase;">
              BETA TESTING</h1>
              <h1 class="display-2 font-weight-bold d-flex justify-space-between" style="text-transform:uppercase;">
                <span>Saroj Poudel</span>
                <span>
                  <v-btn icon color="primary" @click="darkmode">
                    <v-icon v-if="!this.$vuetify.theme.dark">brightness_3</v-icon>
                    <v-icon v-if="this.$vuetify.theme.dark">brightness_high</v-icon>
                  </v-btn>
                </span>
              </h1>
              <h5 class="primary--text display-1 font-weight-light">
                <!-- Freelance  -->
                Web Designer
              </h5>
            </div>
            <p class="body-1 mb-6"></p>
            <v-row no-gutters class="mb-6">
              <v-col cols="20" xs="12" sm="4" md="4" lg="4" xl="4" class="py-0">
                <p class="ma-0 pa-0 title">APRIL 24, 1994</p>
                <p class="ma-0 pa-0 caption">BIRTH</p>
              </v-col>
              <v-col cols="20" xs="12" sm="4" md="4" lg="4" xl="4" class="py-0">
                <p class="ma-0 pa-0 title">NEPAL</p>
                <p class="ma-0 pa-0 caption">NATIONALITY</p>
              </v-col>
              <v-col cols="20" xs="12" sm="4" md="4" lg="4" xl="4" class="py-0">
                <p class="ma-0 pa-0 title">NEPALI, ENGLISH
                </p>
                <p class="ma-0 pa-0 caption">LANGUAGE</p>
              </v-col>
            </v-row>

            <v-row no-gutters class="mb-6">
              <v-col cols="12" md="4" class="d-flex justify-space-between">
                <v-btn icon outlined style="border:0px;" color="primary" router link
                  href="https://www.github.com/erskull" target="_blank">
                  <v-icon> fab fa-github
                  </v-icon>
                </v-btn>
                <v-btn icon outlined style="border:0px;" color="primary" router link
                  href="https://www.twitter.com/ropodl" target="_blank">
                  <v-icon> fab fa-twitter
                  </v-icon>
                </v-btn>
                <v-btn icon outlined style="border:0px;" color="primary" router link href="https://www.linkedin.com/"
                  target="_blank">
                  <v-icon> fab fa-linkedin
                  </v-icon>
                </v-btn>
                <v-btn icon outlined style="border:0px;" color="primary" router link href="https://www.slack.com/"
                  target="_blank">
                  <v-icon> fab fa-slack
                  </v-icon>
                </v-btn>
                <v-btn icon outlined style="border:0px;" color="primary" router link
                  href="https://www.dribbble.com/ropodl" target="_blank">
                  <v-icon> fab fa-dribbble
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <!-- <v-row class="mb-6">
          <v-col cols="12" lg="3" class="d-flex">
            <span class="title ml-auto font-weight-light">MY ACTIVITY</span>
          </v-col>
          <v-col>
            <v-row no-gutters>
              <v-col cols="12" xs="6" sm="6" md="3" lg="3" xl="3">
                <p class="ma-0 display-1 font-weight-black">100%</p>
                <p class="ma-0">JOBS SUCCESS</p>
              </v-col>
              <v-col cols="12" xs="6" sm="6" md="3" lg="3" xl="3">
                <p class="ma-0 display-1 font-weight-black">96%</p>
                <p class="ma-0">ON BUDGET</p>
              </v-col>
              <v-col cols="12" xs="6" sm="6" md="3" lg="3" xl="3">
                <p class="ma-0 display-1 font-weight-black">99%</p>
                <p class="ma-0">ON TIME</p>
              </v-col>
              <v-col cols="12" xs="6" sm="6" md="3" lg="3" xl="3">
                <p class="ma-0 display-1 font-weight-black">89%</p>
                <p class="ma-0">REPEAT HIRE RATE</p>
              </v-col>
            </v-row>
          </v-col>
        </v-row> -->

        <v-row class="mb-6">
          <v-col cols="12" lg="3" class="d-flex">
            <span class="title ml-auto font-weight-light">WORK HISTORY</span>
          </v-col>
          <v-col>
            <v-row no-gutters>
              <v-col cols="12" lg="3">
                <p class="ma-0 display-1 font-weight-black">2 +</p>
                <p class="ma-0">YEARS WORKED</p>
              </v-col>
              <v-col cols="12" lg="3">
                <p class="ma-0 display-1 font-weight-black">30 +</p>
                <p class="ma-0">WORK DONE</p>
              </v-col>
              <v-col cols="12" lg="3">
                <p class="ma-0 display-1 font-weight-black">30</p>
                <p class="ma-0">HOURS WEEKLY AVAILABLE</p>
              </v-col>
              <v-col cols="12" lg="3">
                <p class="ma-0 display-1 font-weight-black">12</p>
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
                <p class="ma-0 display-1 font-weight-black">VUE JS APPLICATION DEVELOPMENT</p>
                <p class="ma-0">Progressive Javascript with lightweight twist.</p>
              </v-col>
              <v-col cols="12" lg="6" class="pt-0">
                <p class="ma-0 display-1 font-weight-black">HTML WEBSITE DEVELOPMENT</p>
                <p class="ma-0">HTML, CSS and JS is the father of web frameworks.</p>
              </v-col>
              <v-col cols="12" lg="6">
                <p class="ma-0 display-1 font-weight-black">ADOBE XD UI TEMPLATING</p>
                <p class="ma-0">Prototype you website/application.</p>
              </v-col>
              <v-col cols="12" lg="6">
                <p class="ma-0 display-1 font-weight-black">GRAPHIC DESIGN</p>
                <p class="ma-0">Unique Designs to seperate you from competition.</p>
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
                <v-progress-linear rounded class="mb-4" value="96"></v-progress-linear>
                <p class="mb-2 d-flex justify-space-between">
                  <span>
                    CSS3
                  </span>
                  <span>
                    85%
                  </span>
                </p>
                <v-progress-linear rounded class="mb-2" value="85"></v-progress-linear>
                <p class="mb-2 d-flex justify-space-between">
                  <span>
                    JAVASCRIPT
                  </span>
                  <span>
                    40%
                  </span>
                </p>
                <v-progress-linear rounded class="mb-2" value="40"></v-progress-linear>
                <p class="mb-2 d-flex justify-space-between">
                  <span>
                    VUEJS
                  </span>
                  <span>
                    60%
                  </span>
                </p>
                <v-progress-linear rounded value="60"></v-progress-linear>
              </v-col>
              <v-col cols="12" lg="6" class="pt-0">
                <p class="display-1 font-weight-black">DESIGN TOOLS</p>
                <p class="mb-2 d-flex justify-space-between">
                  <span>
                    Photoshop
                  </span>
                  <span>
                    70%
                  </span>
                </p>
                <v-progress-linear rounded class="mb-4" value="70"></v-progress-linear>
                <p class="mb-2 d-flex justify-space-between">
                  <span>
                    Illustrator
                  </span>
                  <span>
                    80%
                  </span>
                </p>
                <v-progress-linear rounded class="mb-2" value="80"></v-progress-linear>
                <p class="mb-2 d-flex justify-space-between">
                  <span>
                    Adobe XD
                  </span>
                  <span>
                    90%
                  </span>
                </p>
                <v-progress-linear rounded="" class="mb-2" value="96"></v-progress-linear>
                <!-- <p class="mb-2 d-flex justify-space-between">
                  <span>
                    Adobe Premiere Pro
                  </span>
                  <span>
                    55%
                  </span>
                </p>
                <v-progress-linear rounded value="55"></v-progress-linear> -->
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row class="mb-6">
          <v-col cols="12" lg="3" class="d-flex">
            <span class="title ml-auto font-weight-light">WORK EXPERIENCE</span>
          </v-col>
          <v-col>
            <v-row no-gutters>
              <!-- put mb-6 if more than 2 items  -->
              <v-col cols="12" lg="6" class="mb-6">
                <p class="body-2 ma-0">2019 - Present</p>
                <p class="display-1 font-weight-black ma-0">CHIEF WEB DESIGNER</p>
                <p class="ma-0 title">SoftMahal Technologies</p>
                <p class="subtitle ma-0">Mid Baneshwor, Kathmandu</p>
              </v-col>
              <v-col cols="12" lg="6" class="mb-6">
                <p class="body-2 ma-0">2018 - 2019</p>
                <p class="display-1 font-weight-black ma-0">GRAPHIC DESIGNER</p>
                <p class="ma-0 title">FIVONEST TECHNOLOGY</p>
                <p class="subtitle ma-0">Solteemode, Kathmandu</p>
              </v-col>
              <v-col cols="12" lg="6">
                <p class="body-2 ma-0">2018</p>
                <p class="display-1 font-weight-black ma-0">FREELANCING GRAPHIC DESIGNER</p>
                <!-- <p class="ma-0 title">HOME</p> -->
                <!-- <p class="subtitle ma-0">Mahalaxmisthan, Lalitpur</p> -->
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row class="mb-6">
          <v-col cols="12" lg="3" class="d-flex">
            <span class="title ml-auto font-weight-light">EDUCATION</span>
          </v-col>
          <v-col>
            <v-row no-gutters>
              <v-col cols="12" lg="12" class="mb-6">
                <p class="body-2 ma-0">2010 - 2012</p>
                <p class="display-1 font-weight-black ma-0">BESE</p>
                <p class="ma-0 title">NCIT</p>
                <p class="subtitle ma-0">Balkumari, Lalitpur</p>
              </v-col>
              <v-col cols="12" lg="12" class="mb-6">
                <p class="body-2 ma-0">2007 - 2010</p>
                <p class="display-1 font-weight-black ma-0">TEN PLUS TWO (+2)</p>
                <p class="ma-0 title">Arniko International College/HSS</p>
                <p class="subtitle ma-0">Talchikhel,Lalitpur</p>
              </v-col>
              <v-col cols="12" lg="12" class="mb-6">
                <p class="body-2 ma-0">2002 - 2006</p>
                <p class="display-1 font-weight-black ma-0">SLC (School Leaving Certificate)</p>
                <p class="ma-0 title">National United School</p>
                <p class="subtitle ma-0">Ganesh Chowk, Kathmandu</p>
              </v-col>
              <!-- <v-col cols="12" lg="12" class="mb-6">
                <p class="body-2 ma-0">2010 - 2012</p>
                <p class="display-1 font-weight-black ma-0">FRONT-END DEVELOPER</p>
                <p class="ma-0 title">Somsom LLC</p>
                <p class="subtitle ma-0">United Kingdom, London</p>
              </v-col> -->
            </v-row>
          </v-col>
        </v-row>

        <v-row class="mb-6">
          <v-col cols="12" lg="3" class="d-flex">
            <span class="title ml-auto font-weight-light">PORTFOLIO</span>
          </v-col>
          <v-col>
            <v-row>
              <v-col cols="12" lg="4" class="pt-0">
                <v-img max-height="300" contain src="https://api.adorable.io/avatars/285/abott@adorable.png">
                  <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                      <v-progress-circular indeterminate color="primary"></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-col>
              <v-col cols="12" lg="4" class="pt-0">
                <v-img max-height="300" src="https://api.adorable.io/avatars/285/abott@adorable.png">
                  <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                      <v-progress-circular indeterminate color="primary"></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-col>
              <v-col cols="12" lg="4" class="pt-0">
                <v-img max-height="300" src="https://api.adorable.io/avatars/285/abott@adorable.png">
                  <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                      <v-progress-circular indeterminate color="primary"></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-col>
              <v-col cols="12" lg="4" class="pt-0">
                <v-img max-height="300" src="https://api.adorable.io/avatars/285/abott@adorable.png">
                  <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                      <v-progress-circular indeterminate color="primary"></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row class="mb-6">
          <v-col cols="12" lg="3" class="d-flex pt-0">
            <span class="title ml-auto font-weight-light">CONTACT</span>
          </v-col>
          <v-col class="pt-0">
            <v-row>
              <v-col cols="12" lg="6" class="pt-0">
                <p class="body-2 ma-0">ADDRESS</p>
                <p class="display-1 font-weight-black ma-0">Maitri Nagar, Kalanki</p>
                <p class="ma-0 title">Kathmandu</p>
                <!-- <p class="subtitle ma-0">United Kingdom, London</p> -->
              </v-col>
              <v-col cols="12" lg="6" class="pt-0">
                <p class="body-2 ma-0">PHONE NUMBER</p>
                <p class="display-1 font-weight-black ma-0">N/A</p>
                <!-- <p class="ma-0 title">BlissNiss</p> -->
                <!-- <p class="subtitle ma-0">United Kingdom, London</p> -->
              </v-col>
              <v-col cols="12" lg="6">
                <p class="body-2 ma-0">MOBILE NUMBER</p>
                <p class="display-1 font-weight-black ma-0">9849808471</p>
                <!-- <p class="ma-0 title">Unique Soft</p> -->
                <!-- <p class="subtitle ma-0">United Kingdom, London</p> -->
              </v-col>
              <v-col cols="12" lg="6">
                <p class="body-2 ma-0">EMAIL</p>
                <p class="display-1 font-weight-black ma-0">
                  <a href="mailto:sarox14@gmail.com" target="_blank" style="text-decoration:none;outline:none;">
                    sarox14@gmail.com
                  </a>
                </p>
                <!-- <p class="ma-0 title">Somsom LLC</p> -->
                <!-- <p class="subtitle ma-0">United Kingdom, London</p> -->
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row class="mb-6">
          <v-col cols="12" lg="3">
          </v-col>
          <v-col>
            <v-row no-gutters>
              <v-col cols="12" class="pt-0">
                <p class="display-1 font-weight-black">GET IN TOUCH</p>
                <v-form>
                  <v-row>
                    <v-col cols="6" class="py-0">
                      <v-text-field class="input" label="Full Name" solo></v-text-field>
                    </v-col>
                    <v-col cols="6" class="py-0">
                      <v-text-field label="Email Address Name" solo></v-text-field>
                    </v-col>
                    <v-col cols="12" class="py-0">
                      <v-text-field label="Subject" solo></v-text-field>
                    </v-col>
                    <v-col cols="12" class="py-0">
                      <v-textarea label="Subject" solo></v-textarea>
                    </v-col>
                  </v-row>
                  <v-btn color="primary" class="px-12">Submit</v-btn>
                </v-form>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-spacer></v-spacer>
          <v-col cols="12" class="d-flex justify-end align-center ma-0 pa-0">
            <v-img class="avatar" src="avatar.png" max-height="50" max-width="50" contain></v-img>
            <p class="ma-0 pa-0">
              <span class="display-1 font-weight-black primary--text">erskull</span></p>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <v-system-bar color="primary" height="4"></v-system-bar>
  </v-app>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        fab: false,
        dark: true
      }
    },
    created() {
      this.dark = localStorage.getItem('darkmode') === 'true';
      this.$vuetify.theme.dark = this.dark
    },
    watch: {
      darkmodemethod() {
        this.dark = !this.dark
        localStorage.setItem('darkmode', this.dark);
        this.$vuetify.theme.dark = this.dark
      },
    },
    methods: {
      darkmode() {
        this.dark = !this.dark
        localStorage.setItem('darkmode', this.dark);
        this.$vuetify.theme.dark = this.dark
      },
      onScroll(e) {
        if (typeof window === 'undefined') return
        const top = window.pageYOffset || e.target.scrollTop || 0
        this.fab = top > 300
      },
    }
  };
</script>
<style>
  * {
    scrollbar-color: #121212 #1c1e1f;
  }
  *::selection{
    color: white !important;
    background: #EF5047 !important;
  }

  *::-moz-selection{
    color: white !important;
    background: #EF5047 !important;
  }

  div.v-input__slot {
    border-bottom: 2px solid #EF5047 !important;
  }
</style>