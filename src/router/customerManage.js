// 客户管理
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
    component: () => import('@/views/customerManage/highSeaCustomers/highSeaCustomers')
  },
  {
    path: '/privateSea',
    name: 'privateSea',
    meta: {
      title: '私海客户',
      icon: 'privateSea',
      hidden: false
    },
    component: () => import('@/views/customerManage/privateSea/privateSea')
  },
  {
    path: '/myCustomer',
    name: 'myCustomer',
    meta: {
      title: '我的客户',
      icon: 'myCustomer',
      hidden: false
    },
    component: () => import('@/views/customerManage/myCustomer/myCustomer')
  },
  {
    path: '/add',
    name: 'add',
    meta: {
      title: '添加客户',
      icon: 'add',
      hidden: false
    },
    component: () => import('@/views/customerManage/highSeaCustomers/add.vue')
  },
  {
    path: '/addcustomerp',
    name: 'addcustomerp',
    meta: {
      title: '添加客户',
      icon: 'addcustomerp',
      hidden: false
    },
    component: () => import('@/views/customerManage/addcustomerp.vue')
  },
  {
    path: '/Visitrecord',
    name: 'Visitrecord',
    meta: {
      title: '拜访记录',
      icon: 'Visitrecord',
      hidden: false
    },
    component: () => import('@/views/customerManage/privateSea/Visitrecord.vue')
  },
  {
    path: '/record',
    name: 'record',
    meta: {
      title: '新增拜访记录',
      icon: 'record',
      hidden: false
    },
    component: () => import('@/views/customerManage/privateSea/record.vue')
  },
  {
    path: '/Viewdetails',
    name: 'Viewdetails',
    meta: {
      title: '查看详情',
      icon: 'Viewdetails',
      hidden: false
    },
    component: () => import('@/views/customerManage/myCustomer/Viewdetails.vue')
  },
  {
    path: '/modify',
    name: 'modify',
    meta: {
      title: '修改',
      icon: 'modify',
      hidden: false
    },
    component: () => import('@/views/customerManage/myCustomer/modify.vue')
  }

]
