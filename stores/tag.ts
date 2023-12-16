export const useTagStore = defineStore("tag", {
  state: () => ({
    tags: reactive([]),
    pagination: reactive({
      totalPage: 1,
      totalItems: 0,
      itemsPerPage: 10,
      currentPage: 1,
    }),
  }),
  actions: {
    async create(formData: any) {
      const snackbar = useSnackbarStore();
      const { data, error } = await useFetch("/api/tag/create", {
        method: "POST",
        body: formData,
      });
      if (error.value)
        return snackbar.showSnackbar(error.value.message, "error");
      snackbar.showSnackbar("Tag added successfully", "success");
      navigateTo("/admin/tag/" + data.value?.id);
    },
    async remove(id: string) {
      const snackbar = useSnackbarStore();
      const { error } = await useFetch("/api/tag/" + id, {
        method: "DELETE",
      });
      if (error.value)
        return snackbar.showSnackbar(error.value.message, "error");
      return snackbar.showSnackbar("Tag deleted successfully", "success");
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTagStore, import.meta.hot));
}
