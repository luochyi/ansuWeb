import Vue from "vue";
import Router from "vue-router";

import order from "@/router/order.js";
import channel from "@/router/channel.js";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "layout",
      redirect: "/prediction",
      component: () => import("./views/layout/index.vue"),
      children: [
        // 订单管理
        ...order,
        // 渠道管理
        ...channel
      ]
    }
  ]
});

// 防止路由重复点击报错，

const originalPush = Router.prototype.push;

Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
