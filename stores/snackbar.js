export const useSnackbar = defineStore("snackbar", {
  state: () => ({
    snackbar: reactive({ show: false, text: "", color: "" }),
  }),
  getters: {
    // getSnackbar: (state) => state.snackbar,
  },
  actions: {
    showSnackbar(text, color) {
      this.snackbar.show = true;
      this.snackbar.text = text;
      this.snackbar.color = color;
    },
  },
});
