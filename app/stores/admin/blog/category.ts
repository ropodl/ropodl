export const useAdminBlogCategoryStore = defineStore(
  "useAdminBlogCategoryStore",
  () => {
    const categories = ref([]);
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
      {
        title: "Count",
        key: "count",
        align: "center",
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
        width: 150,
      },
    ]);
    const showFilters = ref(false);
    const filters = ref({
      status: null,
      date: null,
    });
    const searching = ref(false);
    const loading = ref(false);
    // computed
    const isFiltered = computed(() => {
      return Object.values(filters.value).some((item) => item !== null);
    });
    const currentDisplayedRange = computed(() => {
      const start =
        (pagination.value?.currentPage - 1) * pagination.value?.itemsPerPage +
        1;
      const end = Math.min(
        pagination.value?.currentPage * pagination.value?.itemsPerPage,
        pagination.value?.totalItems
      );
      return { start, end };
    });
    // watch
    watch(
      filters,
      () => {
        pagination.value.currentPage = 1;
        all("");
      },
      {
        deep: true,
      }
    );
    // methods
    const all = (sortBy: any, search?: string) => {
      loading.value = true;
      useAxios
        .get("/api/blog-category", {
          query: {
            page: pagination.value?.currentPage || 1,
            itemsPerPage: pagination.value?.itemsPerPage || 10,
            sortBy,
            search,
            status: filters.value?.status,
            date: filters.value?.date,
          },
        })
        .then((res: any) => {
          categories.value = res.categories;
          pagination.value = res.pagination;
        })
        .finally(() => {
          loading.value = false;
          searching.value = false;
        });
    };
    const resetFilters = () => {
      filters.value = {
        status: null,
        date: null,
      };
    };

    return {
      headers,
      categories,
      pagination,
      loading,
      showFilters,
      filters,
      isFiltered,
      searching,
      currentDisplayedRange,
      all,
      resetFilters,
    };
  },
  {
    persist: true,
  }
);

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useAdminBlogCategoryStore, import.meta.hot)
  );
}
