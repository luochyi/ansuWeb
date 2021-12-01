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
  },
  {
    path: '/priceDetail',
    name: 'priceDetail',
    meta: {
      title: '确认报价',
      icon: 'sell',
      hidden: true
    },
    component: () => import('@/views/priceManager/waybillprice/priceDetail.vue')
  },
  {
    path: '/chiefExamine',
    name: 'chiefExamine',
    meta: {
      title: '总监审批报价',
      icon: 'sell',
      hidden: false
    },
    component: () => import('@/views/priceManager/chiefExamine/chiefExamine.vue')
  },
  {
    path: '/chiefExamineDetail',
    name: 'chiefExamineDetail',
    meta: {
      title: '确认报价',
      icon: 'sell',
      hidden: true
    },
    component: () => import('@/views/priceManager/chiefExamine/chiefExamineDetail.vue')
  },
  {
    path: '/presidentExamine',
    name: 'presidentExamine',
    meta: {
      title: '总经理审批报价',
      icon: 'sell',
      hidden: false
    },
    component: () => import('@/views/priceManager/presidentExamine/presidentExamine.vue')
  },
  {
    path: '/presidentExamineDetail',
    name: 'presidentExamineDetail',
    meta: {
      title: '确认报价',
      icon: 'sell',
      hidden: true
    },
    component: () => import('@/views/priceManager/presidentExamine/presidentExamineDetail.vue')
  },
  // receivableList
  {
    path: '/receivableList',
    name: 'receivableList',
    meta: {
      title: '应收明细',
      icon: 'sell',
      hidden: true
    },
    component: () => import('@/views/priceManager/receivableList/receivableList.vue')
  },
  {
    path: '/receivableDetail',
    name: 'receivableDetail',
    meta: {
      title: '应收详情',
      icon: 'sell',
      hidden: true
    },
    component: () => import('@/views/priceManager/receivableList/receivableDetail.vue')
  },
  {
    path: '/editWeight',
    name: 'editWeight',
    meta: {
      title: '修改重量',
      icon: 'sell',
      hidden: true
    },
    component: () => import('@/views/priceManager/editWeight/editWeight.vue')
  },
  {
    path: '/editDetail',
    name: 'editDetail',
    meta: {
      title: '修改重量',
      icon: 'sell',
      hidden: true
    },
    component: () => import('@/views/priceManager/editWeight/editDetail.vue')
  },
  {
    path: '/feeRegister',
    name: 'feeRegister',
    meta: {
      title: '费用登记',
      icon: 'sell',
      hidden: true
    },
    component: () => import('@/views/priceManager/feeRegister/feeRegister.vue')
  },
  {
    path: '/feeRegisterDetail',
    name: 'feeRegisterDetail',
    meta: {
      title: '账单明细',
      icon: 'sell',
      hidden: true
    },
    component: () => import('@/views/priceManager/feeRegister/feeRegisterDetail.vue')
  }
]
