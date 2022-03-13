<template>
  <v-footer>
    <v-container>
      <v-row class="py-3 text-overline text-capitalize">
        <v-col cols="12" md="4">
          <v-avatar size="32">
            <v-img src="avatar.png"></v-img>
          </v-avatar>
        </v-col>
        <v-col cols="12" md="4">
          <div class="d-flex flex-wrap">
            <ul class="list-style-none d-flex flex-wrap mx-auto">
              <li v-for="(social, i) in socials" :key="i" class="mr-3">
                <v-btn icon target="_blank" :href="social['href']">
                  <v-icon color="white">{{ social["icon"] }}</v-icon>
                </v-btn>
              </li>
            </ul>
          </div>
        </v-col>
        <v-col cols="12" md="4"
          ><div class="d-flex flex-wrap">
            <v-spacer></v-spacer>
            From Nepal With&nbsp;<v-icon small color="pink" class="mr-3"
              >fa-solid fa-heart</v-icon
            >
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      socials: [
        {
          icon: "fa-brands fa-github",
          title: "Facebook",
          href: "https://www.github.com/ropodl",
        },
        {
          icon: "fa-brands fa-twitter",
          title: "Facebook",
          href: "https://www.twitter.com/ropodl",
        },
        {
          icon: "fa-brands fa-instagram",
          title: "Facebook",
          href: "https://www.instagram.com/ropodl",
        },
      ],
    };
  },
};
</script>

<style></style>
