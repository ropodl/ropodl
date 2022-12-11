<template>
  <div>
    <v-container>
      <MainBar />
      <WorkHistory />
      <MySpeciality />
      <Skills />
      <Portfolio />
      <ImageGallery />
      <Experience />
      <Education />
      <Contacts />
      <!-- <Footer /> -->
    </v-container>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      fab: false,
      dark: true
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
