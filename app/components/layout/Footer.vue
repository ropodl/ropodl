<script setup></script>
<template>
  <v-container>
    <v-row dense align="center" justify="center">
      <v-col cols="12" md="4">
        <div
          class="d-flex align-center justify-sm-center justify-md-start text-body-2"
        >
          Copyright © {{ new Date().getFullYear() }}
        </div>
      </v-col>
      <v-col cols="12" md="4">
        <ul class="list-style-none d-flex justify-sm-center justify-md-end">
          <template v-for="{ icon, link } in socials">
            <li>
              <v-btn
                icon
                size="x-small"
                rounded="lg"
                color="primary"
                variant="text"
                class="mr-3"
                :href="link"
              >
                <v-icon>
                  <Icon :name="icon" />
                </v-icon>
              </v-btn>
            </li>
          </template>
        </ul>
      </v-col>
    </v-row>
  </v-container>
</template>
