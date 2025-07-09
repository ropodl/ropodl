<script setup lang="ts"></script>
<template>
  <v-card border="0" flat color="transparent" rounded="0">
    <v-container>
      <v-row align="center">
        <v-col cols="12">
          <v-card-title
            class="text-lg-h1 text-h3 font-weight-bold pl-0"
            style="line-height: normal !important"
          >
            <slot name="title" /><span class="text-brand">.</span>
          </v-card-title>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
  <slot />
</template>
