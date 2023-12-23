<script setup lang="ts">
import { Icon } from "@iconify/vue";

definePageMeta({
  layout: "admin",
});

useHead({
  title: "All Contact Request",
});

const loading = ref(true);
const selected = ref([]);
const requests = ref([]);
const pagination = ref({
  itemsPerPage: 10,
  currentPage: 1,
  totalItems: 100,
  totalPages: 10,
});

const headers = [
  {
    title: "Date/Time",
    key: "date",
  },
  {
    title: "Name",
    key: "name",
  },
  {
    title: "Email",
    key: "email",
  },
  {
    title: "Actions",
    key: "actions",
  },
];

const loadContactRequest = async ({ page, itemsPerPage, sortBy }) => {
  const { data, error } = await useFetch("/api/contact-request", {
    params: {
      page,
      itemsPerPage,
      sortBy,
    },
  });
  if (error.value) {
    loading.value = false;
    return console.log(error.value);
  }
  requests.value = data.value?.requests;
  loading.value = false;
};

const removeRequest = (id) => {
  console.log(id);
};
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-data-table-server
          show-select
          v-model="selected"
          :items-per-page="pagination.itemsPerPage"
          :headers="headers"
          :items="requests"
          :loading="loading"
          :items-length="pagination.totalItems"
          item-value="id"
          @update:options="loadContactRequest"
        >
          <template v-slot:item.date="{ item }">
            <div
              v-html="
                useDateFormat(item.created_at, 'YYYY-MM-DD HH:mm:ss').value
              "
            ></div>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-dialog scrim="black" width="500">
              <template v-slot:activator="{ props }">
                <v-btn
                  v-bind="props"
                  icon
                  color="success"
                  rounded="lg"
                  variant="tonal"
                  class="mr-2"
                >
                  <v-icon icon="mdi-eye"></v-icon>
                </v-btn>
              </template>

              <template v-slot:default="{ isActive }">
                <v-card title="Message">
                  <v-btn
                    icon
                    rounded="lg"
                    variant="tonal"
                    class="position-absolute top-0 right-0 rounded-t-0 rounded-e-0"
                    @click="isActive.value = false"
                  >
                    <v-icon icon="mdi-close"></v-icon>
                  </v-btn>
                  <v-card-text>
                    {{ item.message }}
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
            <AdminSharedDelete
              type="Request"
              :title="item.name"
              @delete-action="removeRequest(item.id)"
            />
          </template>
        </v-data-table-server>
      </v-col>
    </v-row>
  </v-container>
</template>

<style></style>
