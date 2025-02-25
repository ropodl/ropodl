import { defineStore } from "pinia";

export const useAdminBlogStore = defineStore(
  "useAdminBlogStore",
  () => {
    const blogs = ref([]);
    const pagination = ref({
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: 1,
      totalPages: 1,
    });
    const filter = ref({
      sortBy: "",
    });
    const loading = ref(false);

    const all = async (page: number, itemsPerPage: number, sortBy: any, search: string) => {
      loading.value = true;
      await useAxios.get("/api/blog", {
        query: {
          page,
          itemsPerPage,
          sortBy,
          search
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

    return {
      blogs,
      pagination,
      loading,
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
