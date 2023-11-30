import { defineStore } from "pinia";

export const useFrontendBlogStore = defineStore({
  id: "frontendBlog",
  state: () => ({
    blogs: reactive([]),
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
