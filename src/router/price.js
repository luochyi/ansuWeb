// 订单管理
export default [
  {
    path: '/priceManager',
    name: 'priceManager',
    meta: {
      title: '运单管理',
      icon: 'orderIcon',
      hidden: false
    },
    redirect: '/waybillprice'
  },
  {
    path: '/waybillprice',
    name: 'waybillprice',
    meta: {
      title: '运单报价',
      icon: 'sell',
      hidden: false
    },
    component: () => import('@/views/priceManager/waybillprice/waybillprice.vue')
  }

]
