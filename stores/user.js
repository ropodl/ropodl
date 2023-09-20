export const useUser = defineStore("user", {
  state: () => ({
    userData: reactive({}),
  }),
  getters: {
    getUser: (state) => state.userData,
  },
  actions: {
    async login({ email, password }) {
      const { data, error } = await useFetch("/api/login", {
        method: "post",
        body: { email, password },
      });
      console.log(data)
      return {
        data: data.value,
        error: error.value,
      };
      //   this.user = data.value.user;
      //   localStorage.setItem("auth_token", data.value.user.token);
      //   navigateTo("/");
    },
    async checkAuth(token) {
      const { data, error } = await useFetch("/api/login/is-auth", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "*/*",
        },
      });
      // console.log(data.value);
      // if (error) return console.log("error", error);
      this.userData = data.value?.user;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUser, import.meta.hot));
}
