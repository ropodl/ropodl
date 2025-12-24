<script lang="ts" setup>
import { itemsPerPage } from "@/utils/shared/pagination";
import { ref } from "vue";
import useApiFetch from "~/utils/shared/useApiFetch";

definePageMeta({
   layout: "admin",
   middleware: ["is-auth"],
});

// const breadcrumbs = defineAsyncComponent(() => import('@/components/admin/layout/breadcrumbs.vue'));

// const { blogs, search, pagination } = defineProps<{
//   blogs: blog[];
//   search?: string;
//   pagination: pagination;
// }>();

// const searchQuery = ref(search);
// const paginate = ref(pagination);
// const filters = ref({
//    status: null,
// });

const headers = [
   { title: "Title", key: "title", sortable: true },
   { title: "Status", key: "status", sortable: true },
   { title: "Created At", key: "created_at", sortable: true },
   { title: "Actions", key: "actions", sortable: false },
];

const blogs = ref([
   {
      title: "ji",
      status: "Draft",
   },
   {
      title: "ji",
      status: "Draft",
   },
   {
      title: "ji",
      status: "Draft",
   },
   {
      title: "ji",
      status: "Draft",
   },
   {
      title: "ji",
      status: "Draft",
   },
   {
      title: "ji",
      status: "Draft",
   },
   {
      title: "ji",
      status: "Draft",
   },
   {
      title: "ji",
      status: "Draft",
   },
   {
      title: "ji",
      status: "Draft",
   },
   {
      title: "ji",
      status: "Draft",
   },
   {
      title: "ji",
      status: "Draft",
   },
   {
      title: "ji",
      status: "Draft",
   },
]);

const getUpdate = (options: { key: string; order?: boolean }[]) => {
   // const params = {
   //   search: searchQuery.value,
   //   page: paginate.value.current_page,
   //   per_page: paginate.value.per_page,
   //   sort_by: options[0],
   //   status: filters.value.status,
   // };
   // router.get(route('blog.index'), clearParamKey(params), {
   //   showProgress: true,
   //   async: true,
   //   preserveState: true,
   //   preserveScroll: true,
   // });
};

// const handleSearch = useDebounceFn((value: string) => {
//   searchQuery.value = value;
//   paginate.value.current_page = 1; // Reset to first page when searching
//   getUpdate([]);
// }, 300);

const getColor = (value: string) => {
   return value === "published" ? "green" : "yellow";
};

// const bread = ref<BreadcrumbItem[]>([
//   {
//     title: 'blog',
//     href: '/admin/blog',
//   },
// ]);

// const resetFilters = () => {};

const pagination = { total: "", current_page: "", per_page: 10 };

const rightNav = ref(false);

onMounted(()=>{
   getBlog()
})

const getBlog = async() => {
   await useApiFetch("blog/").then((res)=>{
      console.log(res)
   }).catch((err)=>{
      console.log(err)
   })
}
</script>

<template>
   <v-container>
      <v-row align="center">
         <v-col cols="12" md="4">
            <!-- v-model="searchQuery" -->
            <v-text-field
               hide-details
               clearable
               persistent-clear
               rounded="lg"
               placeholder="Search blogs"
            >
               <!-- @update:model-value="handleSearch" -->
               <template #prepend-inner>
                  <v-icon icon="carbon:search" />
               </template>
            </v-text-field>
         </v-col>
         <v-spacer />
         <v-col cols="12" md="6">
            <div class="d-flex">
               <v-spacer />
               <v-btn
                  v-tooltip:top="'Filters'"
                  flat
                  class="me-3"
                  @click="rightNav = !rightNav"
               >
                  <v-icon icon="carbon:filter" />
               </v-btn>
               <v-btn flat color="primary" to="/admin/blog/create">
                  Add New
               </v-btn>
            </div>
         </v-col>
      </v-row>
      <v-row>
         <v-col cols="12">
            <v-card rounded="lg">
               <v-data-table-server
                  :headers="headers"
                  :items="blogs"
                  :items-length="pagination.total"
                  :page="pagination.current_page"
                  :items-per-page="pagination.per_page"
                  hide-default-footer
                  @update:sort-by="getUpdate"
               >
                  <template #[`item.status`]="{ value }">
                     <v-chip
                        :color="getColor(value)"
                        variant="tonal"
                        class="text-capitalize"
                     >
                        {{ value }}
                     </v-chip>
                  </template>
                  <template #[`item.created_at`]="{ value }">
                     {{ useDateFormat(value, "MMMM D, YYYY") }}
                  </template>
                  <template #[`item.actions`]="{ item }">
                     <v-hover v-slot="{ isHovering, props }">
                        <v-btn
                           v-bind="props"
                           icon
                           size="small"
                           rounded="lg"
                           :variant="isHovering ? 'tonal' : 'text'"
                           @click="router.visit(`/admin/portfolio/${item.id}`)"
                        >
                           <v-icon icon="carbon:edit" />
                        </v-btn>
                     </v-hover>
                  </template>
               </v-data-table-server>
            </v-card>
         </v-col>
      </v-row>
      <v-row align="center">
         <v-col cols="12" md="6">
            <div class="d-flex justify-start">
               <!-- <v-pagination
              v-model="paginate.current_page"
              density="compact"
              :total-visible="5"
              :length="pagination.last_page"
              @update:model-value="
                (value) => {
                  paginate.current_page = value;
                  getUpdate([]);
                }
              "
            ></v-pagination> -->
            </div>
         </v-col>
         <v-col cols="12" md="6">
            <div class="d-flex align-center justify-end">
               <span class="mr-3">Items Per Page:</span>
               <v-select
                  v-model="pagination.per_page"
                  hide-details
                  density="compact"
                  max-width="100"
                  :items="itemsPerPage"
               />
               <!-- @update:model-value="
                (value) => {
                  paginate.per_page = value;
                  getUpdate([]);
                }
              " -->
            </div>
         </v-col>
      </v-row>
   </v-container>
   <v-navigation-drawer v-model="rightNav" app temporary location="right">
      hi
   </v-navigation-drawer>
</template>
