export default defineNuxtRouteMiddleware((to, from) => {
  const { loggedIn } = useUserSession();

  console.log(loggedIn.value);

  if (!loggedIn.value) {
    return navigateTo("/", { replace: true });
  }
});
