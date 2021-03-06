import Vue from 'vue'
import Router from 'vue-router'

import login from '@/views/Login.vue'
import wel from '@/router/wel.js'
import order from '@/router/order.js'
import channel from '@/router/channel.js'
import configureCenter from '@/router/configureCenter.js'
import customerManage from '@/router/customerManage.js'
import finance from '@/router/finance.js'
import price from '@/router/price.js'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  // 路由命名尽量规范 第一层 必须是路由中的name（即第一斜杠后面的路由名 要是后端返回的路由内的名字）用于显示菜单的位置 后面随便加
  // 例
  routes: [
    {
      path: '/',
      name: 'layout',
      redirect: '/login',
      component: () => import('./views/layout/index.vue'),
      children: [
        ...wel,
        // 订单管理
        ...order,
        // 渠道管理
        ...channel,
        ...configureCenter,
        ...customerManage,
        ...finance,
        ...price
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '*',
      redirect: '/Home'
    }
  ]
})

// 防止路由重复点击报错，

const originalPush = Router.prototype.push

Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
