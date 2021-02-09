<template>
  <!-- <div> -->
  <v-row class="mb-6 d-flex">
    <v-col
      v-for="(image, i) in images"
      :key="i"
      class="mx-auto"
      cols="12"
      sm="6"
      md="4"
    >
      <a target="_blank" :href="image.src">
        <v-card class="rounded-lg ma-0 pa-0">
          <v-img width="100%" height="250px" :src="image.src">
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="primary"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </v-card>
      </a>
    </v-col>
  </v-row>
  <!-- </div> -->
</template>

<script>
export default {
  data() {
    return {
      index: null,
      images: [
        {
          id: "1",
          src:
            "https://cdn.dribbble.com/users/1462542/screenshots/15078907/media/77d0f57efb1d67aeb81b8b520e143b36.png"
        },
        {
          id: "2",
          src:
            "https://cdn.dribbble.com/users/1462542/screenshots/13964553/media/de7681bf963d621cf0804f95d24f63f7.jpg"
        },
        {
          id: "3",
          src:
            "https://cdn.dribbble.com/users/1462542/screenshots/14226800/media/510b014866a5d2873bbde1ff8a285218.png"
        }
      ]
    };
  },
  methods: {}
};
</script>

<style></style>
