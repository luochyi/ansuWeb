import Vue from 'vue'
import Router from 'vue-router'

import order from '@/router/order.js'
import channel from '@/router/channel.js'
import customerManage from '@/router/customerManage.js'
import Configurationcenter from '@/router/Configurationcenter.js'
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
      redirect: '/prediction',
      component: () => import('./views/layout/index.vue'),
      children: [
        // 订单管理
        ...order,
        // 渠道管理
        ...channel,
        // 客户管理
        ...customerManage,
        // 配置中心
        ...Configurationcenter
      ]
    }
  ]
})

// 防止路由重复点击报错，

const originalPush = Router.prototype.push

Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
