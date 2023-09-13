import { createRouter, createWebHistory } from "vue-router";
import App from "@/App.vue";
import AppAdmin from "@/pages/AppAdmin.vue";
import { API_APP } from "./api";
import { StoreApp } from "./stores";

// Web clien
import RoutesHome from "@/views/home/services/routes";
import RoutesProducts from "@/views/products/services/routes";
import RoutesCart from "@/views/cart/services/routes";
import RoutesWarehouse from "@/views/warehouse/services/routes";
import RoutesPersonal from "@/views/personal/services/routes";

// Web admin
import RoutesHomeAdmin from "@/pages/views/home/services/routes";
import RoutesAccountAdmin from "@/pages/views/account/services/routes";

const routes = [
  {
    path: "",
    name: "App",
    component: App,
    children: [
      ...RoutesHome,
      ...RoutesProducts,
      ...RoutesCart,
      ...RoutesWarehouse,
      ...RoutesPersonal,
    ],
  },
  {
    path: "/admin",
    name: "AppAdmin",
    component: AppAdmin,
    children: [...RoutesHomeAdmin, ...RoutesAccountAdmin],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/admin/login",
    name: "LoginAdmin",
    component: () => import("@/pages/LoginAdmin.vue"),
  },
  {
    path: "/notfound",
    name: "NotFound",
    component: () => import("@/components/common/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);

  if (!to.name) {
    return next({ name: "NotFound" });
  }

  API_APP.onApiGetUserInfo().then(({ data: res }) => {
    if (res.success) {
      if (to.fullPath.split("/")[1] === "admin") {
        if (res?.data?.type_account === "ADMIN_ACCOUNT") {
          if (to.name === "LoginAdmin") {
            return next({ name: "HomeAdmin" });
          } else {
            next();
          }
        } else {
          return next({ name: "NotFound" });
        }
      } else {
        if (res?.data?.type_account === "USER_ACCOUNT") {
          next();
        } else {
          return next({ name: "HomeAdmin" });
        }
      }
    } else {
      if (to.fullPath.split("/")[1] === "admin") {
        if (to.name !== "LoginAdmin") {
          return next({ name: "LoginAdmin" });
        } else {
          next();
        }
      } else {
        if (to.meta.requiresAuth) {
          setTimeout(() => {
            StoreApp().onActionLoadingActive(false);
            StoreApp().onActionOpenPopupAuth();
            if (to.name !== "Home") {
              return next({ name: "Home" });
            } else {
              next();
            }
          }, 300);
        } else {
          next();
        }
      }
    }
  });
});

export default router;
