export const useBlog = defineStore("blog", {
    state: () => ({
        blogs: reactive([]),
    }),
    getters: {
        getBlogs: (state) => state.blogs
    },
    actions: {
        async create(formData) {
            const runtimeConfig = useRuntimeConfig()
            const snackbar = useSnackbar();
            const token = localStorage.getItem("user_auth_token");
            const { error } = await useFetch(runtimeConfig.public.api_url + "/blog/create", {
                method: "post",
                body: formData,
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
            if (error.value)
                return snackbar.showSnackbar(error.value.data?.error || error.value.message, "error");
            snackbar.showSnackbar("Blog added successfully", "success");
            navigateTo("/admin/blog");
        },
        async latest() {
            const runtimeConfig = useRuntimeConfig()
            const { data, error } = await useFetch(runtimeConfig.public.api_url + "/blog/latest")
            if (error.value)
                return snackbar.showSnackbar(error.value.data?.error || error.value.message, "error");
            this.blogs = data.value;
        },
        async remove(id) {
            const runtimeConfig = useRuntimeConfig()
            const snackbar = useSnackbar();
            const token = localStorage.getItem("user_auth_token");
            const { data, error } = await useFetch(runtimeConfig.public.api_url + "/blog/" + id, {
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
    import.meta.hot.accept(acceptHMRUpdate(useBlog, import.meta.hot));
}
