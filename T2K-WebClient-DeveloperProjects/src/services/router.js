import { createRouter, createWebHistory } from "vue-router";
import App from "@/App.vue";
import { API_APP } from "./api";

import RoutesHome from "@/views/home/services/routes";
import RoutesProducts from "@/views/products/services/routes";
import RoutesCart from "@/views/cart/services/routes";
import RoutesWarehouse from "@/views/warehouse/services/routes";

const routes = [
  {
    path: "",
    name: "App",
    component: App,
    meta: {
      requiresAuth: true,
    },
    children: [
      ...RoutesHome,
      ...RoutesProducts,
      ...RoutesCart,
      ...RoutesWarehouse,
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/pages/Login.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach((to, from, next) => {
//   window.scrollTo(0, 0);

//   if (to.meta.requiresAuth) {
//     API_APP.onApiGetGetUserInfo(
//       JSON.parse(localStorage.getItem("AppLocalStorage"))?.account_id
//     ).then(({ data: res }) => {
//       if (res.success && to.name !== "Login") {
//         next();
//       } else {
//         return next({ name: "Login" });
//       }
//     });
//   } else {
//     next();
//   }
// });

export default router;
