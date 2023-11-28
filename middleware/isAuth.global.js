export default defineNuxtRouteMiddleware((to) => {
  if (process.client) {
    const token = localStorage.getItem("user_auth_token");

    if (!token && to.fullPath.includes("/admin")) {
      return navigateTo("/", { external: true });
    }

    // console.log(token && to.fullPath === "/sign-in");
    if (token && to.fullPath === "/sign-in") {
      return navigateTo("/admin/", { replace: true });
    }
  }
  // return;
});
