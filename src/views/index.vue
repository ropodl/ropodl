<script setup>
import { defineAsyncComponent } from "vue";
const PageTitle = defineAsyncComponent(() =>
  import("@/components/layout/PageTitle.vue")
);
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <PageTitle title="About Me" />
        <div>
          I am a Web Performance Optimization Specialist dedicated to optimizing
          website speed and user experience. I keep up with the latest industry
          trends and have expertise in Vue.js, Linux, and UX optimization. My
          passion for sports translates into my work, where I enjoy
          collaborating with teams to achieve exceptional results. With
          extensive experience in web performance optimization, data analysis,
          and delivering cutting-edge solutions, I am able to drive tangible
          business results for my clients.
          <br />
          <br />
          As an introverted individual, I am focused on delivering quality work
          and committed to ongoing learning and professional development.
          Additionally, I have experience in front-end development, responsive
          design, and website accessibility. I provide tailored and effective
          solutions to my clients, continuously striving for web optimization
          excellence.
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
