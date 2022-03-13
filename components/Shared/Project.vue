<template>
  <div class="project">
    <v-card flat color="transparent">
      <v-container class="py-16">
        <v-row align="center">
          <v-col cols="12" md="6">
            <div class="text-h4 font-weight-bold text-uppercase">
              Featured Projects
            </div>
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta.
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <div class="d-flex">
              <v-spacer></v-spacer>
              <v-btn tile x-large color="primary">View All</v-btn>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6" v-for="(project, i) in projects" :key="i">
            <v-card flat color="transparent" class="pt-16">
              <v-card
                flat
                tile
                style="
                  border-radius: 50px !important;
                  border-bottom-right-radius: 0px;
                "
              >
                <v-card-text class="pl-0">
                  <v-card tile class="mr-10" elevation="10">
                    <v-hover v-slot:default="{ hover }">
                      <v-img
                        class="mt-n16 mb-16 d-flex align-end"
                        :src="project['image']"
                        height="300"
                      >
                        <v-card-title class="pb-0" v-html="project['title']" />
                        <v-card-actions>
                          <v-btn
                            text
                            tile
                            color="primary"
                            class="text-capitalize"
                            >Know More
                            <v-icon small :class="hover ? 'pl-4' : ' pl-2'"
                              >fa-regular fa-arrow-right</v-icon
                            >
                          </v-btn>
                        </v-card-actions>
                      </v-img>
                    </v-hover>
                  </v-card>
                </v-card-text>
              </v-card>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "FeaturedProjects",
  data() {
    return {
      projects: [
        {
          image:
            "https://images.unsplash.com/photo-1610123598195-eea6b6be4c48?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80",
          title: "adf asf ",
          desc: "test",
        },
        {
          image:
            "https://images.unsplash.com/photo-1610123598195-eea6b6be4c48?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80",
          title: "adf asf ",
          desc: "test",
        },
      ],
    };
  },
};
</script>

<style></style>
