export const useSnackbarStore = defineStore("snackbar", {
  state: () => ({
    snackbar: reactive({ show: false, text: "", color: "" }),
  }),
  getters: {
    // getSnackbar: (state) => state.snackbar,
  },
  actions: {
    showSnackbar(text: string, color: string) {
      this.snackbar.show = true;
      this.snackbar.text = text;
      this.snackbar.color = color;
    },
  },
});
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSnackbarStore, import.meta.hot));
}
