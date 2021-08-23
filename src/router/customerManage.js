// 渠道
export default [
  {
    path: '/customerManage',
    name: 'customerManage',
    meta: {
      title: '客户管理',
      icon: 'channelIcon',
      hidden: false
    },
    redirect: '/highSeaCustomers'
  },
  {
    path: '/highSeaCustomers',
    name: 'highSeaCustomers',
    meta: {
      title: '公海客户',
      icon: 'highSeaCustomers',
      hidden: false
    },
    component: () => import('@/views/customerManage/highSeaCustomers')
  },
  {
    path: '/privateSea',
    name: 'privateSea',
    meta: {
      title: '私海客户',
      icon: 'privateSea',
      hidden: false
    },
    component: () => import('@/views/customerManage/privateSea')
  },
  {
    path: '/myCustomer',
    name: 'myCustomer',
    meta: {
      title: '私海客户',
      icon: 'privateSea',
      hidden: false
    },
    component: () => import('@/views/customerManage/myCustomer')
  }
]
