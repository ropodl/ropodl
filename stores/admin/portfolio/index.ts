export const useAdminPortfolioStore = defineStore(
  "useAdminPortfolioStore",
  () => {
    const portfolios = ref([]);
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
        align: "start",
      },
      {
        title: "Actions",
        key: "actions",
        width: 150,
        align: "center",
      },
    ]);
    const showFilters = ref(false);
    const filters = ref({
      status: null,
      date: null,
    });
    const loading = ref(false);
    const hasActiveFilters = computed(() => {
      return Object.values(filters.value).some((value) => value !== null);
    });

    const all = async (sortBy: any, search: string) => {
      loading.value = true;
      await useAxios
        .get("/api/portfolio", {
          query: {
            page: pagination.value.currentPage,
            itemsPerPage: pagination.value.itemsPerPage,
            sortBy,
            search,
            status: filters.value?.status,
          },
        })
        .then((res: any) => {
          portfolios.value = res.portfolios;
          pagination.value = res.pagination;
        })
        .finally(() => {
          loading.value = false;
        });
    };
    const remove = () => {
      loading.value = true;
    };
    return {
      headers: headers.value,
      portfolios,
      loading,
      pagination,
      showFilters,
      filters: filters.value,
      hasActiveFilters,
      all,
      remove,
    };
  },
  {
    persist: true,
  }
);

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useAdminPortfolioStore, import.meta.hot)
  );
}
