export const useUser = defineStore("user", {
  state: () => ({
    userData: reactive({}),
  }),
  getters: {
    getUser: (state) => state.userData,
  },
  actions: {
    async login({ email, password }) {
      const runtimeConfig = useRuntimeConfig();
      const snackbar = useSnackbar()

      const { data, error } = await useFetch(runtimeConfig.public.api_url + "/login", {
        method: "post",
        body: { email, password },
      });
      if (error.value)
        return snackbar.showSnackbar(error.value.data?.error || error.value.message, "error");

      snackbar.showSnackbar("Log In Successfull", "success")
      localStorage.setItem("user_auth_token", data.value.token);
      this.userData = data.value.user
      navigateTo("/admin/", { replace: true });
    },
    async checkAuth(token) {
      const runtimeConfig = useRuntimeConfig();
      const snackbar = useSnackbar()
      console.log("token call")

      const { data, error } = await useFetch(runtimeConfig.public.api_url + "/login/is-auth", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      if (error.value) return snackbar.showSnackbar(error.value?.error || error.value.message, "error")

      console.log(data)

      snackbar.showSnackbar("Welcome back " + data.value?.user.name, "success")
      this.userData = data.value?.user;
    },
    logout() {
      localStorage.removeItem("user_auth_token")
      this.userData = [];
      navigateTo("/", { replace: true })
    }
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUser, import.meta.hot));
}
