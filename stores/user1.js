export const useUser = defineStore("user", {
  state: () => ({
    me: reactive({}),
  }),
  getters: {
    getUser: (state) => state.me,
  },
  actions: {
    async login({ email, password }) {
      const snackbar = useSnackbar();

      const { data, error } = await useFetch("/api/user/signin", {
        method: "post",
        body: { email, password },
      });
      if (error.value)
        return snackbar.showSnackbar(
          error.value.data?.error || error.value.message,
          "error"
        );

      snackbar.showSnackbar("Log In Successfull", "success");
      localStorage.setItem("user_auth_token", data.value.token);
      this.me = data.value.user;
      navigateTo("/admin/", { replace: true });
    },
    async checkAuth(token) {
      const snackbar = useSnackbar();

      const { data, error } = await useFetch("/api/user/is-auth", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      if (error.value) {
        if (error.value.data.message === "Token Expired") {
          snackbar.showSnackbar(
            error.value.data.message + ", please login again",
            "error"
          );
          return this.logout();
        }
        return snackbar.showSnackbar(
          error.value?.error || error.value.message,
          "error"
        );
      }

      // snackbar.showSnackbar("Welcome back " + data.value?.user.name, "success")
      this.me = data.value?.user;
    },
    logout() {
      localStorage.removeItem("user_auth_token");
      this.me = [];
      navigateTo("/", { replace: true });
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUser, import.meta.hot));
}
