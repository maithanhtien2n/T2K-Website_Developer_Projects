export default [
  {
    path: "/personal",
    name: "Personal",
    component: () => import("../Personal.vue"),
    meta: {
      requiresAuth: true,
    },
  },
];
