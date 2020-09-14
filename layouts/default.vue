<template>
  <v-app>
    <v-system-bar color="primary" height="4"></v-system-bar>
    <v-btn
      fixed
      dark
      fab
      bottom
      right
      small
      color="primary"
      @click="$vuetify.goTo('#app')"
      v-scroll="onScroll"
      v-show="fab"
    >
      <v-icon small>fal fa-arrow-up</v-icon>
    </v-btn>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-system-bar color="primary" height="4"></v-system-bar>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      fab: false
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
