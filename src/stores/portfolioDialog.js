import { defineStore } from "pinia";
import { reactive, ref } from "vue";

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
