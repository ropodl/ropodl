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
  getters: {
    getBlogs: (state) => state.blogs,
  },
  actions: {
    async create(formData: any) {
      const snackbar = useSnackbar();
      const token = localStorage.getItem("user_auth_token");
      const { error } = await useFetch("/api/blog/create", {
        method: "post",
        body: formData,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      if (error.value)
        return snackbar.showSnackbar(
          error.value.data?.error[0].msg || error.value.message,
          "error"
        );
      snackbar.showSnackbar("Blog added successfully", "success");
      navigateTo("/admin/blog");
    },
    async latest() {
      const runtimeConfig = useRuntimeConfig();
      const snackbar = useSnackbar();
      const { data, error } = await useFetch(
        runtimeConfig.public.api_url + "/blog/latest"
      );
      if (error.value)
        return snackbar.showSnackbar(
          error.value.data?.error || error.value.message,
          "error"
        );
      this.blogs = data.value;
    },
    async getAllBlogs(page: number, itemsPerPage: number) {
      const runtimeConfig = useRuntimeConfig();
      const snackbar = useSnackbar();
      const { data, error } = await useFetch(
        `/api/blog?page=${page}&per_page=${itemsPerPage}`
      );
      if (error.value)
        return snackbar.showSnackbar(
          error.value.data?.error || error.value.message,
          "error"
        );
      this.blogs = data.value;
      return data.value;
    },
    async remove(id: string) {
      const runtimeConfig = useRuntimeConfig();
      const snackbar = useSnackbar();
      const token = localStorage.getItem("user_auth_token");
      const { data, error } = await useFetch(
        runtimeConfig.public.api_url + "/api/blog/" + id,
        {
          method: "delete",
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (error.value)
        return snackbar.showSnackbar(
          error.value.data?.error || error.value.message,
          "error"
        );
      console.log(data);
      snackbar.showSnackbar(data.value.message, "success");
      this.getAllBlogs(1, 10);
    },
    async removeBulk(ids: Array<any>) {
      const runtimeConfig = useRuntimeConfig();
      const snackbar = useSnackbar();
      const token = localStorage.getItem("user_auth_token");

      const { data, error } = await useFetch(
        runtimeConfig.public.api_url + "/api/blog/delete-bulk",
        {
          method: "delete",
          body: { ids },
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (error.value)
        return snackbar.showSnackbar(
          error.value.data?.error || error.value.message,
          "error"
        );

      snackbar.showSnackbar(data.value.message, "success");
      this.getAllBlogs(1, 10);
    },
    async getBlog(slug: string) {
      const snackbar = useSnackbar();
      const { data, error } = await useFetch("/api/blog/" + slug);
      if (error.value)
        return snackbar.showSnackbar(
          error.value.data?.error || error.value.message,
          "error"
        );
      return data.value;
    },
    async updateBlog(formData: any, id: string) {
      const runtimeConfig = useRuntimeConfig();
      const snackbar = useSnackbar();
      const token = localStorage.getItem("user_auth_token");
      const { data, error } = await useFetch(
        runtimeConfig.public.api_url + "/blog/" + id,
        {
          method: "patch",
          body: formData,
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (error.value)
        return snackbar.showSnackbar(
          error.value.data?.error || error.value.message,
          "error"
        );
      snackbar.showSnackbar(data.value.message, "success");
      return data.value;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useBlogStore, import.meta.hot));
}
