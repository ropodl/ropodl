export default defineNuxtRouteMiddleware(() => {
  const { loggedIn, user } = useUserSession();
  const { role } = user;

  if (!loggedIn.value || role === "user") {
    return navigateTo("/", { replace: true });
  }
});
