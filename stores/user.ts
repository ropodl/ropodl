import { defineStore } from "pinia";

interface User {
  id: String;
  name: String;
  email: String;
  image: String;
  role?: String;
  emailVerified: boolean | null;
}
export const useUserStore = defineStore({
  id: "myUserStore",
  state: () => ({
    me: reactive<User>({}),
  }),
  actions: {
    async getMe(email: string): Promise<void> {
      const snackbar = useSnackbar();
      const { data, error } = await useFetch("/api/user/me", {
        method: "POST",
        body: {
          email,
        },
      });
      if (error.value) return console.log(error.value);
      if (data.value?.role !== "admin") {
        snackbar.showSnackbar("Sorry, only admins are allowed here", "error");
        navigateTo("/");
        return;
      }
      this.me = data?.value as User;
      navigateTo("/admin/");
      return;
    },
  },
});
