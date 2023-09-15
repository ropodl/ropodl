export const useUser = defineStore("user", {
  state: () => ({
    user: reactive([]),
  }),
  getters: {
    getUser: (state) => state.user,
  },
  actions: {
    async login({ email, password }) {
      const { data, error } = await useFetch("/api/login", { method: "post", body: { email, password } });
      return {
        data: data.value,
        error: error.value,
      };
      //   this.user = data.value.user;
      //   localStorage.setItem("auth_token", data.value.user.token);
      //   navigateTo("/");
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUser, import.meta.hot));
}
