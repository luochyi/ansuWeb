// 订单管理
export default [
  {
    path: '/orderManager',
    name: 'orderManager',
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
      icon: 'sell',
      hidden: false
    },
    component: () => import('@/views/orderManager/prediction/prediction.vue')
  },
  {
    path: '/Orderdetails',
    name: 'Orderdetails',
    meta: {
      title: '订单详情',
      icon: 'OrderdetailsIcon',
      hidden: true
    },
    component: () => import('@/views/orderManager/prediction/Orderdetails.vue')
  },
  {
    path: '/Coordinated',
    name: 'Coordinated',
    meta: {
      title: '协同运单',
      icon: 'CoordinatedIcon',
      hidden: false
    },
    component: () => import('@/views/orderManager/prediction/Coordinated.vue')
  },
  {
    path: '/waybill',
    name: 'waybill',
    meta: {
      title: '入库管理',
      icon: 'waybillIcon',
      hidden: false
    },
    component: () => import('@/views/orderManager/waybill/waybill.vue')
  },
  // waybillDetail
  {
    path: '/waybillDetail',
    name: 'waybillDetail',
    meta: {
      title: '预报运单',
      icon: 'waybillIcon',
      hidden: true
    },
    component: () => import('@/views/orderManager/waybill/orderDetials.vue')
  },
  {
    path: '/management',
    name: 'management',
    meta: {
      title: '运单管理',
      icon: 'management',
      hidden: false
    },
    component: () => import('@/views/orderManager/management/management.vue')
  },
  {
    path: '/historyOrder',
    name: 'historyOrder',
    meta: {
      title: '历史订单',
      icon: 'historyOrder',
      hidden: false
    },
    component: () => import('@/views/orderManager/historyOrder/historyOrder.vue')
  },
  {
    path: '/portissues',
    name: 'portissues',
    meta: {
      title: '港前问题件',
      icon: 'portissues',
      hidden: false
    },
    component: () => import('@/views/orderManager/portissues/portissues.vue')
  },
  {
    path: '/Postportissues',
    name: 'Postportissues',
    meta: {
      title: '港后问题件',
      icon: 'Postportissues',
      hidden: false
    },
    component: () => import('@/views/orderManager/Postportissues/Postportissues.vue')
  },
  {
    path: '/sjmssq',
    name: 'sjmssq',
    meta: {
      title: '收件免扫申请',
      icon: 'sjmssq',
      hidden: false
    },
    component: () => import('@/views/orderManager/sjmssq/sjmssq.vue')
  },
  // sjmssqDetail
  {
    path: '/sjmssqDetail',
    name: 'sjmssqDetail',
    meta: {
      title: '收件免扫申请',
      icon: 'sjmssq',
      hidden: false
    },
    component: () => import('@/views/orderManager/sjmssq/sjmssqDetail.vue')
  },
  {
    path: '/gmbxyd',
    name: 'gmbxyd',
    meta: {
      title: '购买保险运单',
      icon: 'gmbxyd',
      hidden: false
    },
    component: () => import('@/views/orderManager/gmbxyd/gmbxyd.vue')
  },
  {
    path: '/safeOrder',
    name: 'safeOrder',
    meta: {
      title: '保单管理',
      icon: 'safeOrder',
      hidden: false
    },
    component: () => import('@/views/orderManager/gmbxyd/safeOrder.vue')
  },
  {
    path: '/eject',
    name: 'eject',
    meta: {
      title: '出仓单',
      icon: 'eject',
      hidden: false
    },
    component: () => import('@/views/orderManager/eject/eject.vue')
  },
  {
    path: '/ejectWaybill',
    name: 'ejectWaybill',
    meta: {
      title: '出仓单',
      icon: 'eject',
      hidden: true
    },
    component: () => import('@/views/orderManager/eject/ejectWaybill.vue')
  }

]
