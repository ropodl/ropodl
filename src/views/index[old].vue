<script setup>
import {
  mdiHandshake,
  mdiHeart,
  mdiPaletteSwatch,
  mdiPencilRuler,
  mdiXml,
} from "@mdi/js";

const clients = [
  {
    name: "API Technology",
    img: "image/clients/apitech.webp",
  },
  {
    name: "Genese Solution",
    img: "image/clients/genese.svg",
  },
];

const loves = [
  {
    title: "Web Design",
    icon: mdiPaletteSwatch,
    desc: "Modern web design with help of design frameworks.",
  },
  {
    title: "Web Development",
    icon: mdiXml,
    desc: "High quality code with performance in mind.",
  },
  {
    title: "Graphic Design",
    icon: mdiPencilRuler,
    desc: "Any kind of high quality graphic from branding to every day use banner.",
  },
];
</script>
<template>
  <v-container class="px-0">
    <v-row>
      <v-col cols="12">
        <v-card border flat rounded="xl">
          <v-card-text class="text-subtitle-1">
            <p>
              As a full stack developer with expertise in Laravel and Vue.js, I
              possess over four years of experience in modern web development
              practices and technologies. I am well-versed in cross-browser
              compatibility, responsive web design, SASS, jQuery, and
              single-page applications.
            </p>
            <br />
            <p>
              At Softmahal Technologies, I have been responsible for designing
              and implementing a wide range of web applications and sites using
              my skills in Git, GitHub, and GitLab. As the lead frontend
              developer, I was responsible for designing user interfaces that
              were optimized for search engines and responsive on all devices.
            </p>
            <br />
            <p>
              Apart from my work at Softmahal Technologies, I have also been
              involved in a range of freelance projects at API Technology Pvt.
              Ltd. Here, I have expanded my skills in video editing and web
              development by working on landing pages, designing print graphics
              such as ID Cards, Visiting Cards, etc. As a freelancer, I have had
              the opportunity to work on projects in various industries, gaining
              experience in tailoring my approach to meet the needs of different
              clients.
            </p>
            <br />
            <p>
              Before my current role, I worked as a graphic designer at Fivonest
              Technology Pvt. Ltd. Here, I gained valuable experience in graphic
              design, logo design, and HTML5. This experience has given me an
              eye for detail that I bring to all my frontend development
              projects.
            </p>
            <br />
            <p>
              I believe in staying up-to-date with the latest trends and
              technologies in frontend development, attending numerous web
              development conferences and workshops. I have used this knowledge
              to build websites and applications that are visually appealing,
              functional, scalable, and optimized for the best possible user
              experience.
            </p>
            <br />
            <p>
              In my free time, I experiment with new frontend development
              technologies and create personal projects, honing my skills and
              developing a creative approach to frontend development. I am also
              an active contributor to several open-source projects, providing
              feedback on use case and user flow with other developers to create
              tools and frameworks that can benefit the web development
              community as a whole.
            </p>
            <br />
            <p>
              Overall, as a full stack developer with a passion for user-centric
              design and a strong skill set in modern web development
              technologies, I am confident that I can contribute significantly
              to any dynamic and innovative organization looking to create
              world-class websites and applications. My experience in project
              management, collaboration, and design allows me to approach
              projects with a comprehensive perspective, ensuring that every
              aspect of the user experience is optimized. I believe that my
              skills and experience make me an excellent candidate for any
              organization looking for a dedicated and creative full stack
              developer with Laravel and Vue.js expertise.
            </p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" class="mb-3">
        <v-card-title class="d-flex align-center">
          <v-icon start class="mr-3" color="primary" :icon="mdiHeart"></v-icon>
          What I love doing
        </v-card-title>
        <v-row>
          <v-col
            cols="12"
            sm="6"
            md="6"
            class="pb-0"
            v-for="(love, i) in loves"
          >
            <v-card border flat rounded="xl">
              <v-list color="transparent" class="py-0" lines="three">
                <v-list-item>
                  <template #prepend>
                    <v-avatar size="60">
                      <v-icon color="primary" :icon="love['icon']"></v-icon>
                    </v-avatar>
                  </template>
                  <v-list-item-title v-text="love['title']"></v-list-item-title>
                  <v-list-item-subtitle
                    v-text="love['desc']"
                  ></v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12">
        <v-card-title class="d-flex align-center">
          <v-icon
            start
            class="mr-3"
            color="primary"
            :icon="mdiHandshake"
          ></v-icon>
          Clients
        </v-card-title>
        <v-row>
          <v-col cols="12" sm="4" md="3" v-for="(client, i) in clients">
            <v-card border flat class="px-2">
              <v-img
                height="100"
                :alt="client['name']"
                :src="client['img']"
              ></v-img>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
