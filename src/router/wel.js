// 订单管理
export default [
  {
    path: '/welcome',
    name: 'welcome',
    meta: {
      title: '首页',
      icon: 'welcome',
      hidden: false
    },
    component: () => import('@/views/welcome.vue')
  }
]
