export const usePortfolioDialog = defineStore("dialog", {
  state: () => ({
    dialogs: reactive([]),
    currentDialog: ref(null),
    info: ref(false),
  }),
  getters: {
    getCount: (state) => state.dialogs,
  },
  actions: {
    openDialog(i) {
      this.currentDialog = i;
      this.dialogs[i] = true;
    },
    closeDialog(i) {
      this.currentDialog = null;
      this.dialogs[i] = false;
    },
    infoDialogToggle() {
      this.info = !this.info;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePortfolioDialog, import.meta.hot));
}
