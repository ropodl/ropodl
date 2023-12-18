<script setup lang="ts"></script>
<template>
  <v-card flat color="transparent" rounded="0" class="pt-16">
    <v-container>
      <v-row align="center">
        <v-col cols="12" md="6">
          <v-card-title
            class="text-h1 font-weight-bold"
            style="line-height: normal !important"
          >
            <slot name="title" /><span class="text-primary">.</span>
          </v-card-title>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
  <slot />
</template>
