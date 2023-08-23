import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/index"),
  },
  {
    path: "/about",
    name: "About",
    component: () => import("@/views/about"),
  },
  {
    path: "/portfolio",
    name: "Portfolio",
    component: () => import("@/views/portfolio"),
  },
  {
    path: "/contact",
    name: "Contact",
    component: () => import("@/views/contact"),
  },
  {
    path: "/:pathMatch(.*)",
    component: () => import("@/views/NotFoundComponent.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
});

export default router;
