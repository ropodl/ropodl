export const useAdminContactStore = defineStore(
  "useAdminContactStore",
  () => {
    const requests = ref([]);
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
    const searching = ref(false);
    const loading = ref(false);
    // computed
    const isFiltered = computed(() => {
      return Object.values(filters.value).some((value) => value !== null);
    });
    const currentDisplayedRange = computed(() => {
      const start =
        (pagination.value?.currentPage - 1) * pagination.value?.itemsPerPage + 1;
      const end = Math.min(
        pagination.value?.currentPage * pagination.value?.itemsPerPage,
        pagination.value?.totalItems
      );
      return { start, end };
    });
    // watch
    watch(filters, () => {
      pagination.value.currentPage = 1;
      all('')
    }, {
      deep: true
    })
    // methods
    const all = async (sortBy: any, search?: string) => {
      loading.value = true;
      await useAxios
        .get("/api/contact-request", {
          query: {
            page: pagination.value?.currentPage || 1,
            itemsPerPage: pagination.value?.itemsPerPage || 10,
            sortBy,
            search,
            status: filters.value?.status,
            date: filters.value?.date
          },
        })
        .then((res: { requests: any, pagination: typeof pagination.value }) => {
          requests.value = res.requests;
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
        date: null
      }
    };
    return {
      headers,
      requests,
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
    acceptHMRUpdate(useAdminContactStore, import.meta.hot)
  );
}
