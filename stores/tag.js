export const useTag = defineStore("tag", {
    state: () => ({
        tags: reactive([]),
    }),
    getters: {
        getTags: (state) => state.tags
    },
    actions: {
        async create(formData) {
            const runtimeConfig = useRuntimeConfig()
            const snackbar = useSnackbar();
            const token = localStorage.getItem("user_auth_token");
            const { error } = await useFetch(runtimeConfig.public.api_url + "/tag/create", {
                method: "post",
                body: formData,
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
            if (error.value)
                return snackbar.showSnackbar(error.value.data?.error || error.value.message, "error");
            snackbar.showSnackbar("Blog added successfully", "success");
            navigateTo("/admin/tag");
        },
        async latest() {
            const runtimeConfig = useRuntimeConfig()
            const { data, error } = await useFetch(runtimeConfig.public.api_url + "/tag/latest", {
            })
            if (error.value)
                return snackbar.showSnackbar(error.value.data?.error || error.value.message, "error");
            this.tags = data.value;
        },
        // async all(){

        // },
        async remove(id) {
            const runtimeConfig = useRuntimeConfig()
            const snackbar = useSnackbar();
            const token = localStorage.getItem("user_auth_token");
            const { data, error } = await useFetch(runtimeConfig.public.api_url + "/tag/" + id, {
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
    import.meta.hot.accept(acceptHMRUpdate(useTag, import.meta.hot));
}
