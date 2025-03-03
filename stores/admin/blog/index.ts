import { defineStore } from "pinia";

export const useAdminBlogStore = defineStore(
  "useAdminBlogStore",
  () => {
    const blogs = ref([]);
    const pagination = ref({
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: 1,
      totalPages: 2,
    });
    const headers = ref([
      {
        title: "Title",
        key: "title",
      },
      { title: "Created At", key: "created_at", align: "center", width: 150 },
      {
        title: "Status",
        key: "status",
        align: "center",
        sortable: false,
        width: 100,
      },
      {
        title: "Actions",
        key: "actions",
        align: "center",
        sortable: false,
        width: 200,
      },
    ]);
    const filters = ref({
      status: null,
      date: null
    });
    const loading = ref(false);

    const all = async (sortBy: any, search: string) => {
      loading.value = true;
      await useAxios.get("/api/blog", {
        query: {
          page: pagination.value.currentPage,
          itemsPerPage: pagination.value.itemsPerPage,
          sortBy,
          search,
          status: filters.value?.status
        },
      })
        .then((res: any) => {
          blogs.value = res.blogs;
          pagination.value = res.pagination;
        })
        .finally(() => {
          loading.value = false;
        });
    };

    watch(filters.value, () => {
      all([], '')
    });

    return {
      headers: headers.value,
      blogs,
      pagination,
      loading,
      filters: filters.value,
      all,
    };
  },
  {
    persist: true,
  }
);

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAdminBlogStore, import.meta.hot));
}
