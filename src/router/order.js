// 订单管理
export default [
  {
    path: '/order',
    name: 'order',
    meta: {
      title: '订单管理',
      icon: 'orderIcon',
      hidden: false
    },
    redirect: '/prediction'
  },
  {
    path: '/prediction',
    name: 'prediction',
    meta: {
      title: '预报管理',
      icon: 'predictionIcon',
      hidden: false
    },
    component: () => import('@/views/orderManager/prediction/prediction.vue')
  },
  {
    path: '/waybill',
    name: 'waybill',
    meta: {
      title: '运单管理',
      icon: 'waybillIcon',
      hidden: false
    },
    component: () => import('@/views/orderManager/waybill/waybill.vue')
  },
  {
    path: '/waybill/orderDetials',
    name: 'orderDetials',
    meta: {
      title: '订单详情',
      icon: 'orderDetialsIcon',
      hidden: false
    },
    component: () => import('@/views/orderManager/waybill/orderDetials.vue')
  }
]
