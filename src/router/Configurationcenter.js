// 配置中心
export default [
  {
    path: '/Configurationcenter',
    name: 'Configurationcenter',
    meta: {
      title: '配置中心',
      icon: 'channelIcon',
      hidden: false
    },
    redirect: '/Subsidiarymanagement'
  },
  {
    path: '/Subsidiarymanagement',
    name: 'Subsidiarymanagement',
    meta: {
      title: '子公司管理',
      icon: 'Subsidiarymanagement',
      hidden: false
    },
    component: () => import('@/views/Configurationcenter/Subsidiarymanagement/Subsidiarymanagement.vue')
  },
  {
    path: '/subsidiaries',
    name: 'subsidiaries',
    meta: {
      title: '新增子公司',
      icon: 'subsidiaries',
      hidden: false
    },
    component: () => import('@/views/Configurationcenter/Subsidiarymanagement/subsidiaries.vue')
  },

  {
    path: '/organizational',
    name: 'organizational',
    meta: {
      title: '组织架构',
      icon: 'organizational',
      hidden: false
    },
    component: () => import('@/views/Configurationcenter/organizational/organizational.vue')
  },
  {
    path: '/Employeeaccount',
    name: 'Employeeaccount',
    meta: {
      title: '员工账户',
      icon: 'Employeeaccount',
      hidden: false
    },
    component: () => import('@/views/Configurationcenter/Employeeaccount/Employeeaccount.vue')
  },
  {
    path: '/employeeaccounta',
    name: 'employeeaccounta',
    meta: {
      title: '新建员工账号',
      icon: 'employeeaccounta',
      hidden: false
    },
    component: () => import('@/views/Configurationcenter/Employeeaccount/employeeaccounta.vue')
  },
  {
    path: '/Driver',
    name: 'Driver',
    meta: {
      title: '司机管理',
      icon: 'Driver',
      hidden: false
    },
    component: () => import('@/views/Configurationcenter/Driver/Driver.vue')
  },
  {
    path: '/distributions',
    name: 'distributions',
    meta: {
      title: '分配区域',
      icon: 'distributions',
      hidden: false
    },
    component: () => import('@/views/Configurationcenter/Driver/distributions.vue')
  },
  {
    path: '/vehicle',
    name: 'vehicle',
    meta: {
      title: '货车管理',
      icon: 'vehicle',
      hidden: false
    },
    component: () => import('@/views/Configurationcenter/vehicle/vehicle.vue')
  },
  {
    path: '/vehicles',
    name: 'vehicles',
    meta: {
      title: '新增车辆',
      icon: 'vehicles',
      hidden: false
    },
    component: () => import('@/views/Configurationcenter/vehicle/vehicles.vue')
  },
  {
    path: '/account',
    name: 'account',
    meta: {
      title: '客户账户',
      icon: 'account',
      hidden: false
    },
    component: () => import('@/views/Configurationcenter/account/account.vue')
  },
  {
    path: '/Newaccount',
    name: 'Newaccount',
    meta: {
      title: '新建账户',
      icon: 'Newaccount',
      hidden: false
    },
    component: () => import('@/views/Configurationcenter/account/Newaccount.vue')
  },
  {
    path: '/Customerlevel',
    name: 'Customerlevel',
    meta: {
      title: '客户等级',
      icon: 'Customerlevel',
      hidden: false
    },
    component: () => import('@/views/Configurationcenter/Customerlevel/Customerlevel.vue')
  },
  {
    path: '/Receiving',
    name: 'Receiving',
    meta: {
      title: '收货仓管理',
      icon: 'Receiving',
      hidden: false
    },
    component: () => import('@/views/Configurationcenter/Receiving/Receiving.vue')
  },
  {
    path: '/warehouses',
    name: 'warehouses',
    meta: {
      title: '新建仓库',
      icon: 'warehouses',
      hidden: false
    },
    component: () => import('@/views/Configurationcenter/Receiving/warehouses.vue')
  },
  {
    path: '/equipment',
    name: 'equipment',
    meta: {
      title: '仓库设备',
      icon: 'equipment',
      hidden: false
    },
    component: () => import('@/views/Configurationcenter/Receiving/equipment.vue')
  },
  {
    path: '/Warehouseoperation',
    name: 'Warehouseoperation',
    meta: {
      title: '仓库操作管理',
      icon: 'Warehouseoperation',
      hidden: false
    },
    component: () => import('@/views/Configurationcenter/Warehouseoperation/Warehouseoperation.vue')
  },
  {
    path: '/Responsible',
    name: 'Responsible',
    meta: {
      title: '负责仓库',
      icon: 'Responsible',
      hidden: false
    },
    component: () => import('@/views/Configurationcenter/Warehouseoperation/Responsible.vue')
  },
  {
    path: '/currency',
    name: 'currency',
    meta: {
      title: '货币汇率',
      icon: 'currency',
      hidden: false
    },
    component: () => import('@/views/Configurationcenter/currency/currency.vue')
  },
  {
    path: '/Destinationcountry',
    name: 'Destinationcountry',
    meta: {
      title: '目的国管理',
      icon: 'Destinationcountry',
      hidden: false
    },
    component: () => import('@/views/Configurationcenter/Destinationcountry/Destinationcountry.vue')
  },
  {
    path: '/country',
    name: 'country',
    meta: {
      title: '新增目的国',
      icon: 'country',
      hidden: false
    },
    component: () => import('@/views/Configurationcenter/Destinationcountry/country.vue')
  },
  {
    path: '/Milestone',
    name: 'Milestone',
    meta: {
      title: '里程碑配置',
      icon: 'Milestone',
      hidden: false
    },
    component: () => import('@/views/Configurationcenter/Milestone/Milestone.vue')
  }

]
