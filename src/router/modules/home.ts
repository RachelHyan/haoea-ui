export default {
  path: "/home",
  name: "Home",
  component: () => import("@/views/home/index.vue"),
  meta: {
    title: "主页",
  },
} as RouteConfigsTable;
