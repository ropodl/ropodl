<script setup></script>
<template>
  <v-container class="py-1">
    <v-row justify="center">
      <v-col cols="12" md="7">
        <div class="d-flex align-center justify-space-between text-body-2">
          Copyright © {{ new Date().getFullYear() }} - Saroj Poudel
          <v-spacer></v-spacer>
          <ul class="list-style-none d-flex">
            <template v-for="social in socials">
              <li>
                <v-btn
                  icon
                  size="small"
                  rounded="lg"
                  color="primary"
                  variant="text"
                  class="mr-3"
                >
                  <v-icon>
                    <Icon :name="social.icon" />
                  </v-icon>
                </v-btn>
              </li>
            </template>
          </ul>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
