export const useCategoryStore = defineStore("category", {
  state: () => ({
    categories: reactive([]),
    pagination: reactive([]),
  }),
  getters: {
    getCategories: (state) => state.categories,
  },
  actions: {
    async create(formData) {
      const snackbar = useSnackbarStore();
      const { data, error } = await useFetch("/api/category/create", {
        method: "POST",
        body: formData,
      });
      if (error.value)
        return snackbar.showSnackbar(error.value.message, "error");
      snackbar.showSnackbar("Category added successfully", "success");
      navigateTo("/admin/blog/" + data.id);
    },
    async getAllCategories(page: number, itemsPerPage: number) {
      const snackbar = useSnackbarStore();
      const { data, error } = await useFetch(
        `/api/category?page=${page}&per_page=${itemsPerPage}`
      );
      if (error.value)
        return snackbar.showSnackbar(error.value.message, "error");
      this.categories = data.value?.category;
      this.pagination = data.value?.pagination;
      return data.value;
    },
    async remove(id: string) {
      const snackbar = useSnackbarStore();
      const { data, error } = await useFetch("/api/category/" + id, {
        method: "DELETE",
      });
      if (error.value)
        return snackbar.showSnackbar(error.value.message, "error");
      return snackbar.showSnackbar("Category deleted successfully", "success");
      console.log(data);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCategoryStore, import.meta.hot));
}
