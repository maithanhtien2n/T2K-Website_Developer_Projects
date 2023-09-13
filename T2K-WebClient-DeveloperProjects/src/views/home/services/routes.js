export default [
  {
    path: "",
    name: "Home",
    component: () => import("../Home.vue"),
  },
  {
    path: "/notification",
    name: "Notification",
    component: () => import("../Notification.vue"),
  },
];
