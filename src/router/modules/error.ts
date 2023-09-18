export default {
  path: "/error",
  redirect: "/error/403",
  meta: {
    title: "",
  },
  children: [
    {
      path: "/error/403",
      name: "403",
      component: () => import("@/views/error/403.vue"),
      meta: {
        title: "无权访问",
      },
    },
    {
      path: "/error/404",
      name: "404",
      component: () => import("@/views/error/404.vue"),
      meta: {
        title: "页面不存在",
      },
    },
    {
      path: "/error/500",
      name: "500",
      component: () => import("@/views/error/500.vue"),
      meta: {
        title: "服务器出错",
      },
    },
  ],
} as RouteConfigsTable;
