import { defineStore } from "pinia";

export const useAdminBreadcrumbStore = defineStore(
  "useAdminBreadcrumbStore",
  () => {
    const items = <Ref>ref([]);

    const setBreadcrumb = (item: any) => {
      items.value = [
        {
          title: "Home",
          disabled: false,
          to: "/admin",
        },
        ...item,
      ];
    };

    return {
      items,
      setBreadcrumb,
    };
  },
  {
    persist: true,
  }
);

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useAdminBreadcrumbStore, import.meta.hot)
  );
}
