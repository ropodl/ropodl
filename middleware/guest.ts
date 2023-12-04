export default defineNuxtRouteMiddleware((to, from) => {
  const { loggedIn } = useUserSession();

  console.log("from guest" + loggedIn.value);

  if (loggedIn.value && to.meta.middleware === "admin") {
    return navigateTo("/admin/", { replace: true });
  }
});
