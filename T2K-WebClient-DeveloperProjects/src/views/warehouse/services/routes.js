export default [
  {
    path: "/warehouse",
    name: "Warehouse",
    component: () => import("../Warehouse.vue"),
    meta: {
      requiresAuth: true,
    },
  },
];
