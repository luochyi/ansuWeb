import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "layout",
      redirect: "prediction",
      component: () => import("./views/layout/index.vue"),
      children: [
        {
          path: "prediction",
          name: "prediction",
          component: () => import("./views/orderManager/prediction.vue")
        }
      ]
    }
  ]
});
