// 渠道
export default [
    {
      path: '/highSeaCustomers',
      name: 'highSeaCustomers',
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
  ]
  