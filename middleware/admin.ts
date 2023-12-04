export default defineNuxtRouteMiddleware((to, from) => {
  const { loggedIn } = useUserSession();

  if (loggedIn && to.meta.middleware === "guest") {
    navigateTo("/", { replace: true });
  }
});
