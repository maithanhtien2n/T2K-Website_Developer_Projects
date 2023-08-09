export default [
  {
    path: "/cart",
    name: "Cart",
    component: () => import("../Cart.vue"),
    meta: {
      requiresAuth: true,
    },
  },
];
