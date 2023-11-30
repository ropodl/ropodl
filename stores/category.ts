export const useCategory = defineStore("category", {
    state: () => ({
        categories: reactive([]),
    }),
    getters: {
        getCategories: (state) => state.categories
    },
    actions: {
        async create(formData) {
            const runtimeConfig = useRuntimeConfig()
            const snackbar = useSnackbar();
            const token = localStorage.getItem("user_auth_token");
            const { error } = await useFetch(runtimeConfig.public.api_url + "/category/create", {
                method: "post",
                body: formData,
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
            if (error.value)
                return snackbar.showSnackbar(error.value.data?.error || error.value.message, "error");
            snackbar.showSnackbar("Category added successfully", "success");
            navigateTo("/admin/blog");
        },
        async latest() {
            const runtimeConfig = useRuntimeConfig()
            const snackbar = useSnackbar();
            const { data, error } = await useFetch(runtimeConfig.public.api_url + "/category/latest", {
            })
            if (error.value)
                return snackbar.showSnackbar(error.value.data?.error || error.value.message, "error");
            this.categories = data.value;
        },
        async getAllCategories(page, itemsPerPage) {
            const runtimeConfig = useRuntimeConfig()
            const { data, error } = await useFetch(runtimeConfig.public.api_url + `/category?page=${page}&per_page=${itemsPerPage}`)
            if (error.value)
                return snackbar.showSnackbar(error.value.data?.error || error.value.message, "error");
            this.categories = data.value;
            console.log(this.categories)
            return data.value;
        },
        async remove(id) {
            const runtimeConfig = useRuntimeConfig()
            const snackbar = useSnackbar();
            const token = localStorage.getItem("user_auth_token");
            const { data, error } = await useFetch(runtimeConfig.public.api_url + "/category/" + id, {
                method: "delete",
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
            if (error.value)
                return snackbar.showSnackbar(error.value.data?.error || error.value.message, "error");
            console.log(data)
        }
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCategory, import.meta.hot));
}
