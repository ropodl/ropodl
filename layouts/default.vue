<template>
  <v-app>
    <transition name="slide-fade">
      <v-btn fixed dark fab bottom right color="primary" @click="$vuetify.goTo('#app')" v-scroll="onScroll" v-show="fab">
        <v-icon>north</v-icon>
      </v-btn>
    </transition>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
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
<style lang="scss">
.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.3s ease-in-out;
}

.slide-fade-enter,
.slide-fade-leave-to

/* .slide-fade-leave-active below version 2.1.8 */
  {
  transform: translateY(50px);
  opacity: 0;
}
</style>
