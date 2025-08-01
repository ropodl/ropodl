export default defineNuxtRouteMiddleware(async (to, _from) => {
  // Skip middleware during server-side rendering
  if (process.server) return;

  const user = useStrapiUser();

  // Wait for hydration to complete
  await nextTick();

  if (!user.value) {
    useCookie("redirect", { path: "/" }).value = to.fullPath;
    return navigateTo("/login");
  }
});
