<script lang="ts" setup>
import { Icon } from "@iconify/vue";

defineProps({
  id: {
    type: Number,
  },
});

const tempPost = <Ref>ref({});
const tempPostLoading = <Ref>ref(false);
const getPostById = async (id?: number) => {
  tempPostLoading.value = true;
  await useAxios("/api/blog/" + id)
    .then((res) => {
      tempPost.value = res;
    })
    .finally(() => {
      tempPostLoading.value = false;
    });
};

const closeTempPost = (dialog: Ref) => {
  tempPost.value = {};
  dialog.value = false;
};
</script>
<template>
  <v-dialog persistent scrim="black" width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-tooltip theme="light" text="View Post">
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="{ ...props, ...activatorProps }"
            icon
            rounded="lg"
            class="mr-2"
            variant="text"
            size="small"
            @click="getPostById(id)"
          >
            <v-icon>
              <Icon icon="mdi:eye" />
            </v-icon>
          </v-btn>
        </template>
      </v-tooltip>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card :loading="tempPostLoading">
        <v-btn
          size="x-small"
          variant="flat"
          color="primary"
          icon="mdi-close"
          rounded="circle"
          class="position-absolute"
          style="z-index: 99; top: 5px; right: 5px"
          @click="closeTempPost(isActive)"
        ></v-btn>
        <template v-if="tempPost.featured_image">
          <v-img :src="tempPost.featured_image.url" />
        </template>
        <v-card-title>
          {{ tempPost.title }}
        </v-card-title>
        <v-card-text>{{ tempPost.excerpt }}</v-card-text>
        <lazy-shared-dynamic-content :contet="tempPost.content" />
        <!-- <v-card-text>{{ tempPost.content }}</v-card-text> -->
        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<style></style>
