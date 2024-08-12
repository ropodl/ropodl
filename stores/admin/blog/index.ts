import { defineStore } from "pinia";

export const useAdminBlogStore = defineStore("useAdminBlogStore", {
  state: () => ({
    blogs: <Object>[],
  }),
  actions: {
    read(id: number) {
      this.blogs = useFetch("/api/blog/");
      console.log(this.blogs);
    },
    create() {
      console.log("create");
    },
    update() {
      console.log("update");
    },
    delete() {
      console.log("delete");
    },
  },
  persist: true,
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAdminBlogStore, import.meta.hot));
}
