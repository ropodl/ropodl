import { defineStore } from "pinia";

export const useFrontendBlogStore = defineStore({
  id: "frontendBlog",
  state: () => ({
    blogs: reactive<any>([]),
  }),
  actions: {
    async getAllBlogs(page: number, itemsPerPage: number) {
      const { data, error } = await useFetch("/api/frontend/blog", {
        params: {
          page,
          per_page: itemsPerPage,
        },
      });
      if (error.value) return console.log(error);
      this.blogs = data.value;
      return data.value;
    },
  },
  persist: true,
});
if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useFrontendBlogStore, import.meta.hot)
  );
}
