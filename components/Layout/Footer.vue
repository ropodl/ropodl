<template>
  <!-- <v-card> -->
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
              <li class="mr-3">
                <v-btn
                  icon
                  target="_blank"
                  href="https://www.github.com/ropodl"
                >
                  <v-icon color="#545454">fa-brands fa-github</v-icon>
                </v-btn>
              </li>
              <li class="mr-3">
                <v-btn
                  icon
                  target="_blank"
                  href="https://www.twitter.com/ropodl"
                >
                  <v-icon color="#545454">fa-brands fa-twitter</v-icon>
                </v-btn>
              </li>
              <li>
                <v-btn
                  icon
                  target="_blank"
                  href="https://www.instagram.com/ropodl"
                >
                  <v-icon color="#545454">fa-brands fa-instagram</v-icon>
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
  <!-- </v-card> -->
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style></style>
