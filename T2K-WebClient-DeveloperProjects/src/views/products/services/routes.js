export default [
  {
    path: "/products",
    name: "Products",
    component: () => import("../Products.vue"),
  },
  {
    path: "/products/:id",
    name: "ProductDetail",
    component: () => import("../ProductDetail.vue"),
  },
];
