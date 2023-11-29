import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "myUserStore",
  state: () => ({
    me: <Object>reactive({}),
  }),
  actions: {
    async getMe(email: string) {
      const { data, error } = await useFetch("/api/user/me", {
        method: "POST",
        body: {
          email,
        },
      });
      if (error.value) return console.log(error.value);
      this.me = data?.value;
    },
  },
});
