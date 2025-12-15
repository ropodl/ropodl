<script setup lang="ts">
// import type { PortfolioType } from '@/types/portfolio';
// import { itemsPerPage } from '@/utils/shared/pagination';

definePageMeta({
  layout: "admin",
  middleware: ['is-auth']
})

// const { types, search, pagination } = defineProps<{
//   types: PortfolioType[];
//   search?: string;
//   pagination: pagination;
// }>();

// const searchQuery = ref(search);
// const paginate = ref(pagination);

// const getUpdate = (options: { key: string; order?: boolean }[]) => {
//   const params = {
//     search: searchQuery.value,
//     page: paginate.value.current_page,
//     per_page: paginate.value.per_page,
//     sort_by: options[0],
//   };

//   router.get(route('portfolio.index'), params, {
//     showProgress: true,
//     async: true,
//     preserveState: false,
//     preserveScroll: false,
//     replace: true,
//     only: ['types', 'pagination'],
//   });
// };

const headers = ref([
  {
    title: 'Title',
    value: 'title',
  },
  { title: 'Actions', value: 'actions' },
]);
</script>
<template>
    <v-container>
      <v-row align="center">
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field hide-details />
        </v-col>
        <v-spacer />
        <v-col
          cols="12"
          md="6"
        >
          <div class="d-flex">
            <v-spacer />
            <!-- <add-new-dialog /> -->
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card rounded="lg">
            <v-data-table-server
              :headers
              hide-default-footer
              :items-length="10"
              :items-per-page="10"
            >
              <template #[`item.actions`]="{ item }">
                {{ item }}
                <v-hover v-slot="{ isHovering, props }">
                  <v-btn
                    v-bind="props"
                    icon
                    size="small"
                    rounded="lg"
                    :variant="isHovering ? 'tonal' : 'text'"
                  >
                    <v-icon icon="carbon:edit" />
                  </v-btn>
                </v-hover>
                <v-dialog max-width="500">
                  <template #activator="{ props: activatorProps }">
                    <v-btn
                      v-bind="activatorProps"
                      color="surface-variant"
                      text="Open Dialog"
                      variant="flat"
                    />
                  </template>

                  <template #default="{ isActive }">
                    <v-card title="Dialog">
                      <v-card-text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua.
                      </v-card-text>

                      <v-card-actions>
                        <v-spacer />

                        <v-btn
                          text="Close Dialog"
                          @click="isActive.value = false"
                        />
                      </v-card-actions>
                    </v-card>
                  </template>
                </v-dialog>
              </template>
            </v-data-table-server>
          </v-card>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col
          cols="12"
          md="6"
        >
          <div class="d-flex justify-start">
            <!-- <v-pagination
              v-model="pagination.current_page"
              density="compact"
              :total-visible="5"
              :length="paginate.last_page"
              @update:model-value="
                (value) => {
                  paginate.current_page = value;
                  getUpdate([]);
                }
              "
            ></v-pagination> -->
          </div>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <div class="d-flex align-center justify-end">
            <span class="mr-3">Items Per Page:</span>
            <!-- <v-select
              v-model="paginate.per_page"
              hide-details
              density="compact"
              max-width="100"
              :items="itemsPerPage"
              @update:model-value="
                (value) => {
                  paginate.per_page = value;
                  getUpdate([]);
                }
              "
            ></v-select> -->
          </div>
        </v-col>
      </v-row>
    </v-container>
</template>