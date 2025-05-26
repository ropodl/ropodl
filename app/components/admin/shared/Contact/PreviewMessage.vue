<script setup lang="ts">
defineProps({
  id: {
    type: Number,
  },
});

const request = <Ref>ref({});
const loading = <Ref>ref(false);
const getMessageById = async (id?: number) => {
  loading.value = true;
  await useAxios(`/api/contact-request/${id}`, {
    method: "GET",
  })
    .then((res) => {
      request.value = res;
    })
    .finally(() => {
      loading.value = false;
    });
};

const close = (dialog: Ref) => {
  request.value = {};
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
            icon="mdi-eye"
            rounded="lg"
            class="mr-2"
            variant="text"
            size="small"
            @click="getMessageById(id)"
          ></v-btn>
        </template>
      </v-tooltip>
    </template>
    <template v-slot:default="{ isActive }">
      <v-card :loading>
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
          <v-card-title> Contact Request Details</v-card-title>
        </v-skeleton-loader>
        <template v-if="loading">
          <v-skeleton-loader
            color="transparent"
            type="paragraph, chip, list-item-three-line"
            :loading
          >
          </v-skeleton-loader>
        </template>
        <template v-else>
          <v-card-text class="pb-0">
            Viewing a message from {{ request.name }} :
            <span class="text-decoration-underline">
              {{ request.email }}
            </span>
          </v-card-text>
          <v-card-text>
            {{ request.message }}
          </v-card-text>
        </template>
      </v-card>
    </template>
  </v-dialog>
</template>
