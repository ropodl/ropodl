export default defineNuxtRouteMiddleware((to, from) => {
  const user = useUser();
  console.log(user.user.id);
  console.log("test");
});
