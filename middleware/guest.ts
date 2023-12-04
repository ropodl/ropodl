export default defineNuxtRouteMiddleware((to, from) => {
  const { loggedIn } = useUserSession();

  if (loggedIn && to.meta.middleware === "admin") {
    navigateTo("/admin/", { replace: true });
  }
});
