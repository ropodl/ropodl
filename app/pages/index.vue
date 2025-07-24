<script setup>
useSeoMeta({
  title: "Saroj Poudel",
  description:
    "Web Developer and Graphic Designer specializing in VueJs and Express JS",
  ogTitle: "Saroj Poudel",
  ogDescription:
    "Web Developer and Graphic Designer specializing in VueJs and Express JS",
  ogUrl: "https://ropodl.com",
  twitterTitle: "Saroj Poudel",
  twitterDescription:
    "Web Developer and Graphic Designer specializing in VueJs and Express JS",
  twitterCard: "summary_large_image",
});
</script>
<template>
  <section class="pt-16">
    <v-container>
      <v-row justify="center">
        <v-col
          cols="12"
          sm="12"
          md="8"
          lg="6"
          class="d-flex flex-column justify-center align-center"
        >
          <v-avatar size="256" class="mb-n10">
            <v-img src="/avatar.jpg">
              <div
                class="w-100 h-100"
                style="
                  background: linear-gradient(
                    transparent 50%,
                    rgba(var(--v-theme-background))
                  );
                "
              ></div>
            </v-img>
          </v-avatar>
          <div
            class="text-center text-h3 font-weight-bold mb-6"
            style="z-index: 1"
          >
            Hi, I'm <br />
            Saroj Poudel <br />
            FullStack Developer
          </div>
          <div class="text-center mb-6">
            Crafting thoughtful, user-first digital experiences at the
            <br />
            intersection of design and development. Proudly Nepal-based.
          </div>
          <!-- <div class="mb-6">
            <v-btn color="white">Use this template</v-btn>
          </div> -->
          <div>
            <ul class="list-style-none d-flex">
              <template v-for="social in socials">
                <li>
                  <v-btn
                    icon
                    size="small"
                    rounded="lg"
                    color="primary"
                    variant="text"
                    class="mr-3"
                  >
                    <v-icon>
                      <Icon :name="social.icon" />
                    </v-icon>
                  </v-btn>
                </li>
              </template>
            </ul>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>
