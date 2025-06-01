export const useAdminAppearanceStore = defineStore(
  "useAdminAppearanceStore",
  () => {
    const isDark = ref(false);
    const isCompact = ref("default");
    const isFluid = ref(false);

    return {
      isDark,
      isCompact,
      isFluid,
    };
  },
  {
    persist: true,
  }
);

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useAdminAppearanceStore, import.meta.hot)
  );
}
