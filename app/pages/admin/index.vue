<script setup lang="ts">
definePageMeta({
   layout: "admin",
   middleware: ['is-auth']
});
</script>
<template>
   <v-container>
      <v-row>
         <v-col cols="12">
            <div class="text-h6 font-weight-bold">Overview</div>
            <div class="text-caption">Allow all</div>
         </v-col>
      </v-row>
   </v-container>
</template>
