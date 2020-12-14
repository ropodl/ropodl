<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" xs="12" sm="12" md="3" lg="3" xl="3">
          <v-avatar size="256">
            <v-img src="/saroj.jpg">
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="primary"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-avatar>
        </v-col>

        <v-col cols="12" xs="12" sm="12" md="9" lg="9" xl="9">
          <div class="mb-6">
            <!-- <h1 class="display-2 font-weight-bold d-flex justify-space-between" style="text-transform:uppercase;">
                BETA TESTING</h1> -->
            <h1
              class="display-2 font-weight-bold d-flex justify-space-between"
              style="text-transform:uppercase;"
            >
              <span>Saroj Poudel</span>
              <!-- <span>
                <v-btn icon color="primary" @click="darkmode">
                  <v-icon v-if="!this.$vuetify.theme.dark">brightness_3</v-icon>
                  <v-icon v-if="this.$vuetify.theme.dark"
                    >brightness_high</v-icon
                  >
                </v-btn>
              </span> -->
            </h1>
            <h5 class="primary--text display-1 font-weight-light">
              Web Designer
            </h5>
          </div>
          <v-row no-gutters class="mb-6">
            <v-col cols="6" sm="6" md="4" lg="4" xl="4" class="py-0">
              <p class="ma-0 pa-0 title">APRIL 27, 1994</p>
              <p class="ma-0 pa-0 caption">BIRTH</p>
            </v-col>
            <v-col cols="6" sm="6" md="4" lg="4" xl="4" class="py-0">
              <p class="ma-0 pa-0 title">NEPAL</p>
              <p class="ma-0 pa-0 caption">NATIONALITY</p>
            </v-col>
            <v-col cols="6" sm="6" md="4" lg="4" xl="4" class="py-0">
              <p class="ma-0 pa-0 title">NEPALI, ENGLISH</p>
              <p class="ma-0 pa-0 caption">LANGUAGE</p>
            </v-col>
          </v-row>

          <v-row no-gutters class="mb-6">
            <v-col
              cols="12"
              xs="12"
              sm="4"
              md="4"
              lg="4"
              xl="4"
              class="d-flex justify-space-between"
            >
              <v-btn
                icon
                outlined
                style="border:0px;"
                color="primary"
                router
                link
                href="https://www.github.com/erskull"
                target="_blank"
              >
                <v-icon>fab fa-github</v-icon>
              </v-btn>
              <v-btn
                icon
                outlined
                style="border:0px;"
                color="primary"
                router
                link
                href="https://www.twitter.com/ropodl"
                target="_blank"
              >
                <v-icon>fab fa-twitter</v-icon>
              </v-btn>
              <v-btn
                icon
                outlined
                style="border:0px;"
                color="primary"
                router
                link
                href="https://dribbble.com/erskull"
                target="_blank"
              >
                <v-icon>fab fa-dribbble</v-icon>
              </v-btn>
              <v-btn
                icon
                outlined
                style="border:0px;"
                color="primary"
                router
                link
                href="mailto:sarox14@gmail.com"
                target="_blank"
              >
                <v-icon>fas fa-envelope</v-icon>
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
        <v-col cols="12" xl="12" lg="3" class="d-flex">
          <span class="title ml-auto font-weight-light">WORK HISTORY</span>
        </v-col>
        <v-col>
          <v-row no-gutters>
            <v-col cols="6" sm="6" md="3" lg="3" xl="3">
              <p class="ma-0 display-1 font-weight-black">2+</p>
              <p class="ma-0">YEARS WORKED</p>
            </v-col>
            <v-col cols="6" sm="6" md="3" lg="3" xl="3">
              <p class="ma-0 display-1 font-weight-black">50+</p>
              <p class="ma-0">WORK DONE</p>
            </v-col>
            <v-col cols="6" sm="6" md="3" lg="3" xl="3">
              <p class="ma-0 display-1 font-weight-black">
                30 <span class="overline">hours</span>
              </p>
              <p class="ma-0">WEEKLY AVAILABLE</p>
            </v-col>
            <v-col cols="6" sm="6" md="3" lg="3" xl="3">
              <p class="ma-0 display-1 font-weight-black">
                8 <span class="overline">hours</span>
              </p>
              <p class="ma-0">RESPONSE TIME</p>
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

      <v-row class="mb-6">
        <v-col cols="12" lg="3" class="d-flex">
          <span class="title ml-auto font-weight-light">WORK EXPERIENCE</span>
        </v-col>
        <v-col>
          <v-row no-gutters>
            <!-- put mb-6 if more than 2 items  -->
            <v-col
              v-for="experience in experiences"
              :key="experience.id"
              cols="12"
              sm="6"
              md="6"
              lg="6"
              xl="6"
              class="mb-6"
            >
              <p class="body-2 ma-0">{{ experience.date }}</p>
              <p class="display-1 font-weight-black ma-0">
                {{ experience.post }}
              </p>
              <p class="ma-0 title text-uppercase">{{ experience.company }}</p>
              <p class="subtitle ma-0">{{ experience.address }}</p>
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
            <v-col
              v-for="education in educations"
              :key="education.id"
              cols="12"
              sm="12"
              md="6"
              lg="6"
              xl="6"
              class="mb-6"
            >
              <p class="body-2 ma-0">{{ education.date }}</p>
              <p class="display-1 font-weight-black ma-0">
                {{ education.subject }}
              </p>
              <p class="ma-0 title">{{ education.institute }}</p>
              <p class="subtitle ma-0">{{ education.address }}</p>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <!-- <v-row class="mb-6">
          <v-col cols="12" lg="3" class="d-flex">
            <span class="title ml-auto font-weight-light">PORTFOLIO</span>
          </v-col>
          <v-col>
            <v-row>
              <v-col v-for="portfolio in portfolios" :key="portfolio.id" cols="6" sm="6" md="4" lg="4" xl="4"
                class="pt-0">
                <v-img max-height="300" contain :src="portfolio.src">
                  <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                      <v-progress-circular indeterminate color="primary"></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-col>
            </v-row>
          </v-col>
        </v-row> -->

      <v-row class="mb-6">
        <v-col cols="12" lg="3" class="d-flex pt-0">
          <span class="title ml-auto font-weight-light">CONTACT</span>
        </v-col>
        <v-col class="pt-0">
          <v-row>
            <v-col cols="12" lg="6" class="pt-0">
              <p class="body-2 ma-0">ADDRESS</p>
              <p class="display-1 font-weight-black ma-0">
                Maitri Nagar, Kalanki
              </p>
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
                <a
                  href="mailto:sarox14@gmail.com"
                  target="_blank"
                  style="text-decoration:none;outline:none;"
                >
                  sarox14@gmail.com
                </a>
              </p>
              <!-- <p class="ma-0 title">Somsom LLC</p> -->
              <!-- <p class="subtitle ma-0">United Kingdom, London</p> -->
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <!-- <v-row class="mb-6">
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
        </v-row> -->

      <v-row no-gutters>
        <v-col cols="12" class="d-flex justify-end align-center ma-0 pa-0">
          <v-img
            eager
            class="avatar"
            src="avatar.png"
            max-height="50"
            max-width="50"
            contain
          ></v-img>
          <p class="ma-0 pa-0">
            <span class="display-1 font-weight-black primary--text"
              >erskull</span
            >
          </p>
          <v-spacer></v-spacer>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      fab: false,
      dark: true,
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
      ],
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
      ],
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
      ],
      experiences: [
        {
          id: "1",
          date: "2019 - Present",
          post: "CHIEF WEB DESIGNER",
          company: "SoftMahal Technologies",
          address: "Mid Baneshwor, Kathmandu"
        },
        {
          id: "2",
          date: "2018 - 2019",
          post: "GRAPHIC DESIGNER",
          company: "FIVONEST TECHNOLOGY",
          address: "Solteemode, Kathmandu"
        },
        {
          id: "3",
          date: "2018",
          post: "FREELANCING GRAPHIC DESIGNER"
        }
      ],
      educations: [
        {
          id: "1",
          date: "2014 - 2018",
          subject: "BESE",
          institute: "NCIT",
          address: "Balkumari, Lalitpur"
        },
        {
          id: "2",
          date: "2012 - 2014",
          subject: "TEN PLUS TWO (+2)",
          institute: "Arniko International College/HSS",
          address: "Talchikhel, Lalitpur"
        },
        {
          id: "3",
          date: "2011",
          subject: "SLC (School Leaving Certificate)",
          institute: "National United High School",
          address: "Ganesh Chowk, Kathmandu"
        }
      ]
    };
  },
  methods: {
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > 300;
    }
  }
};
</script>
<style lang="scss">
* {
  scrollbar-color: #121212 #1c1e1f;
}

*::selection {
  color: white !important;
  background: #ef5047 !important;
}

*::-moz-selection {
  color: white !important;
  background: #ef5047 !important;
}

div.v-input__slot {
  border-bottom: 2px solid #ef5047 !important;
}
</style>
