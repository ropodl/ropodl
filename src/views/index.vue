<script setup>
import {
  mdiHeart,
  mdiHandshake,
  mdiPencilRuler,
  mdiPaletteSwatch,
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
              As a frontend developer with more than four years of experience, I
              have a strong understanding of modern web development practices
              and technologies, including cross-browser compatibility,
              responsive web design, SASS, jQuery, and single-page applications.
            </p>
            <br />
            <p>
              At Softmahal Technologies, I have been responsible for designing
              and implementing a wide range of web applications and sites. I
              have worked on projects that require creating complex front-end
              architectures, optimizing web content for search engines, and
              enhancing user interface. My role at Softmahal has allowed me to
              develop skills in Git, GitHub, GitLab, which allowed me to become
              an effective collaborator and team player. As the lead frontend
              developer, I was responsible for designing a user interface that
              would make it easy for users to navigate the website and make the
              site optimized for search engines and responsive on all devices.
            </p>
            <br />
            <p>
              In addition to my work at Softmahal Technologies, I have also been
              involved in a range of freelance projects at API Technology Pvt.
              Ltd. Here, I have been able to expand my skills in video editing
              and web development. I have worked on a variety of projects,
              including creating landing pages, designing print graphics like ID
              Cards, Visintg Cards, etc. As a freelancer, I have also had the
              opportunity to work on a variety of projects with different
              clients. This has allowed me to gain experience in a range of
              industries and made me adept at tailoring my approach to suit the
              needs of different clients.
            </p>
            <br />
            <p>
              Prior to my current role, I worked as a graphic designer at
              Fivonest Technology Pvt. Ltd. Here, I gained valuable experience
              in graphic design, logo design, and HTML5. My experience in
              graphic design has given me an eye for detail that I bring to all
              my frontend development projects. I believe that creating visually
              appealing interfaces is crucial to enhancing the user experience
              and building brand recognition.
            </p>
            <br />
            <p>
              Throughout my career, I have been dedicated to staying up-to-date
              with the latest trends and technologies in frontend development. I
              have attended numerous web development conferences and workshops,
              where I have learned about new frameworks, libraries, and best
              practices. I have used this knowledge to build websites and
              applications that are not only visually appealing but also highly
              functional, scalable, and optimized for the best possible user
              experience.
            </p>
            <br />
            <p>
              In my free time, I enjoy experimenting with new frontend
              development technologies and creating personal projects. This has
              allowed me to hone my skills and develop a creative approach to
              front-end development. I am also an active contributor to several
              open-source projects, where I provide feedback on usecase and
              userflow with other developers to create tools and frameworks that
              can benefit the web development community as a whole.
            </p>
            <br />
            <p>
              Overall, as a frontend developer with a passion for user-centric
              design and a strong skill set in modern web development
              technologies, I am confident that I can contribute significantly
              to any dynamic and innovative organization looking to create
              world-class websites and applications. My experience in project
              management, collaboration, and design allows me to approach
              projects with a comprehensive perspective, ensuring that every
              aspect of the user experience is optimized. I believe that my
              skills and experience make me an excellent candidate for any
              organization looking for a dedicated and creative front-end
              developer.
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
