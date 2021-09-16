// 渠道
export default [
  {
    path: '/configureCenter',
    name: 'configureCenter',
    meta: {
      title: '配置中心',
      icon: 'configIcon',
      hidden: false
    },
    redirect: '/organizationalStructure'
  },
  // 代理管理
  {
    path: '/organizationalStructure',
    name: 'organizationalStructure',
    meta: {
      title: '组织架构',
      icon: 'organizationalStructureIcon',
      hidden: false
    },
    component: () => import('@/views/configureCenter/organizationalStructure')
  },
  {
    path: '/distributionDriver',
    name: 'distributionDriver',
    meta: {
      title: '司机管理',
      icon: 'distributionDriver',
      hidden: false
    },
    component: () => import('@/views/configureCenter/driverManagement/distributionDriver.vue')
  },
  {
    path: '/truckManagement',
    name: 'truckManagement',
    meta: {
      title: '车辆管理',
      icon: 'distributionDriver',
      hidden: false
    },
    component: () => import('@/views/configureCenter/truckManagement/truckManagement.vue')
  },
  {
    path: '/truckManagement/addTruck',
    name: 'addTruck',
    meta: {
      title: '新增车辆',
      icon: 'addTruck',
      hidden: false
    },
    component: () => import('@/views/configureCenter/truckManagement/addTruck.vue')
  },
  {
    path: '/customerAccount',
    name: 'customerAccount',
    meta: {
      title: '客户账户',
      icon: 'customerAccount',
      hidden: false
    },
    component: () => import('@/views/configureCenter/customerAccount/customerAccount.vue')
  },
  {
    path: '/customerAccount/addAccount',
    name: 'addAccount',
    meta: {
      title: '客户账户',
      icon: 'addAccount',
      hidden: false
    },
    component: () => import('@/views/configureCenter/customerAccount/addAccount.vue')
  },
  {
    path: '/receivingWarehouseManage',
    name: 'receivingWarehouseManage',
    meta: {
      title: '收货仓管理',
      icon: 'receivingWarehouseManage',
      hidden: false
    },
    component: () => import('@/views/configureCenter/receivingWarehouseManage/receivingWarehouseManage.vue')
  },
  {
    path: '/receivingWarehouseManage/addWarehouse',
    name: 'addWarehouse',
    meta: {
      title: '新建仓库',
      icon: 'addWarehouse',
      hidden: false
    },
    component: () => import('@/views/configureCenter/receivingWarehouseManage/addWarehouse.vue')
  },
  // 仓库操作
  {
    path: '/warehouseOperation',
    name: 'warehouseOperation',
    meta: {
      title: '仓库操作管理',
      icon: 'warehouseOperation',
      hidden: false
    },
    component: () => import('@/views/configureCenter/warehouseOperation/responsibleWarehouse.vue')
  },
  {
    path: '/warehouseOperation/responsibleWarehouse',
    name: 'responsibleWarehouse',
    meta: {
      title: '操作员负责仓库',
      icon: 'responsibleWarehouse',
      hidden: false
    },
    component: () => import('@/views/configureCenter/warehouseOperation/responsibleWarehouse.vue')
  },
  {
    path: '/countryManagement',
    name: 'countryManagement',
    meta: {
      title: '目的国管理',
      icon: 'countryManagement',
      hidden: false
    },
    component: () => import('@/views/configureCenter/countryManagement/countryManagement.vue')
  },
  {
    path: '/countryManagement/addCountry',
    name: 'addCountry',
    meta: {
      title: '新增目的国',
      icon: 'countryManagement',
      hidden: false
    },
    component: () => import('@/views/configureCenter/countryManagement/addCountry.vue')
  },
  {
    path: '/FBAmanage',
    name: 'FBAmanage',
    meta: {
      title: 'FBA仓管理',
      icon: 'FBAmanage',
      hidden: false
    },
    component: () => import('@/views/configureCenter/FBAmanage/FBAmanage.vue')
  },
  {
    path: '/FBAmanage/addFBA',
    name: 'addFBA',
    meta: {
      title: '新增FBA仓',
      icon: 'addFBA',
      hidden: false
    },
    component: () => import('@/views/configureCenter/FBAmanage/addFBA.vue')
  }
]
