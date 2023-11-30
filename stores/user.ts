import { defineStore } from "pinia";

interface Me {
  id: String;
  name: String;
  email: String;
  image: String;
  role: String;
  emailVerified: null | boolean;
}
export const useUserStore = defineStore({
  id: "myUserStore",
  state: () => ({
    me: <Me>reactive({}),
  }),
  actions: {
    async getMe(email: string) {
      const { signOut } = useAuth();
      const snackbar = useSnackbar();
      const { data, error } = await useFetch("/api/user/me", {
        method: "POST",
        body: {
          email,
        },
      });
      if (error.value) return console.log(error.value);
      if (data.value?.role !== "admin") {
        signOut();
        snackbar.showSnackbar("Sorry, only admins are allowed here", "error");
        return navigateTo("/");
      }
      this.me = data?.value;
      return navigateTo("/admin/");
    },
  },
});
