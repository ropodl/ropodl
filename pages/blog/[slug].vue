<script setup>
const runtimeConfig = useRuntimeConfig()

definePageMeta({
    layout: "with-page-title",
});

let blog = ref()

onMounted(() => {
    const { data, error } = useFetch(runtimeConfig.public.api_url + "/blog/" + $route.params.slug)
    blog.value = data.value
})
</script>
<template>
    <div>
        {{ $route.params.slug }}
        {{ blog }}
    </div>
</template>


<style lang="scss" scoped></style>