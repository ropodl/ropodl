export const useBlogStore = defineStore("blog", {
  state: () => ({
    blogs: reactive([]),
    pagination: reactive({
      totalPage: 1,
      totalItems: 0,
      itemsPerPage: 10,
      currentPage: 1,
    }),
    headers: reactive([
      {
        title: "Featured Image",
        key: "image",
        align: "start",
        sortable: false,
        width: 0,
      },
      {
        title: "Title",
        align: "start",
        sortable: false,
        key: "title",
      },
      // {
      //   title: "Categories",
      //   align: "center",
      //   sortable: false,
      //   key: "categories",
      // },
      // { title: "Tags", align: "center", sortable: false, key: "tags" },
      {
        title: "Actions",
        align: "center",
        sortable: false,
        key: "actions",
        width: 200,
      },
    ]),
  }),
  actions: {
    async create(formData: any) {
      const snackbar = useSnackbarStore();
      const { error } = await useFetch("/api/blog/create", {
        method: "POST",
        body: formData,
      });
      if (error.value)
        return snackbar.showSnackbar(error.value.message, "error");
      snackbar.showSnackbar("Blog added successfully", "success");
      navigateTo("/admin/blog");
    },
    async getAllBlogs(page: number, itemsPerPage: number) {
      const snackbar = useSnackbarStore();
      const { data, error } = await useFetch(
        `/api/blog?page=${page}&per_page=${itemsPerPage}`
      );
      if (error.value)
        return snackbar.showSnackbar(error.value.message, "error");
      console.log(data.value?.pagination);
      this.blogs = data.value?.blogs;
      this.pagination = data.value?.pagination;
      return data.value;
    },
    async getBlog(slug: string) {
      const snackbar = useSnackbarStore();
      const { data, error } = await useFetch("/api/blog/" + slug);
      if (error.value)
        return snackbar.showSnackbar(error.value.message, "error");
      return data.value;
    },
    async updateBlog(formData: any, id: string) {
      const snackbar = useSnackbarStore();
      const { data, error } = await useFetch("/api/blog/" + id, {
        method: "PATCH",
        body: formData,
      });
      if (error.value)
        return snackbar.showSnackbar(error.value.message, "error");
      snackbar.showSnackbar(data.value.message, "success");
      return data.value;
    },
    async remove(id: string) {
      const supabase = useSupabaseClient();
      const snackbar = useSnackbarStore();
      const { data, error } = await supabase
        .from("blogs")
        .delete()
        .eq("id", id);
      if (error) {
        return snackbar.showSnackbar(error.message, "error");
      }
      snackbar.showSnackbar(data.value.message, "success");
      this.getAllBlogs(1, 10);
    },
    async removeBulk(ids: Array<any>) {
      const snackbar = useSnackbarStore();
      const { data, error } = await useFetch("/api/blog/delete-bulk", {
        method: "delete",
        body: { ids },
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (error.value)
        return snackbar.showSnackbar(error.value.message, "error");
      snackbar.showSnackbar(data.value.message, "success");
      this.getAllBlogs(1, 10);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useBlogStore, import.meta.hot));
}
