<script setup lang="ts">
defineProps({
  id: {
    type: Number,
  },
});

const post = <Ref>ref({});
const loading = <Ref>ref(false);
const getPostById = async (id?: number) => {
  loading.value = true;
  await useAxios(`/api/blog/${id}`, {
    method: "GET",
  })
    .then((res) => {
      post.value = res;
    })
    .finally(() => {
      loading.value = false;
    });
};

const close = (dialog: Ref) => {
  post.value = {};
  dialog.value = false;
};
</script>
<template>
  <v-dialog persistent scrim="black" width="500" height="600">
    <template v-slot:activator="{ props: activatorProps }">
      <v-tooltip theme="light" text="View Post">
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="{ ...props, ...activatorProps }"
            icon="mdi-eye"
            rounded="lg"
            class="mr-2"
            variant="text"
            size="small"
            @click="getPostById(id)"
          ></v-btn>
        </template>
      </v-tooltip>
    </template>
    <template v-slot:default="{ isActive }">
      <v-card :loading="loading">
        <v-skeleton-loader :loading type="image" rounded="0" height="250">
          <template v-if="post.featured_image">
            <v-img cover height="250" :src="post.featured_image.url"> </v-img>
          </template>
        </v-skeleton-loader>
        <v-btn
          size="x-small"
          variant="flat"
          color="primary"
          icon="mdi-close"
          rounded="circle"
          class="position-absolute"
          style="z-index: 99; top: 5px; right: 5px"
          @click="close(isActive)"
        ></v-btn>
        <v-skeleton-loader color="transparent" type="heading" :loading>
          <v-card-title>
            {{ post.title }}
          </v-card-title>
        </v-skeleton-loader>
        <v-skeleton-loader
          color="transparent"
          type="paragraph, chip, list-item-three-line"
          :loading
        >
          <v-card-text class="pt-0">{{ post.excerpt }}</v-card-text>
          <v-card-text>
            <lazy-shared-dynamic-content :content="post.content" />
          </v-card-text>
        </v-skeleton-loader>
      </v-card>
    </template>
  </v-dialog>
</template>

<style></style>
