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
    redirect: '/Subsidiarymanagement'
  },
  {
    path: '/Subsidiarymanagement',
    name: 'Subsidiarymanagement',
    meta: {
      title: '子公司管理',
      icon: 'SubsidiarymanagementIcon',
      hidden: false
    },
    component: () => import('@/views/configureCenter/Subsidiarymanagement/Subsidiarymanagement.vue')
  },
  {
    path: '/subsidiaries',
    name: 'subsidiaries',
    meta: {
      title: '新增子公司',
      icon: 'subsidiariesIcon',
      hidden: true
    },
    component: () => import('@/views/configureCenter/Subsidiarymanagement/subsidiaries.vue')
  },
  {
    path: '/Subsidiarymanagement/subsidiaryDetails',
    name: 'subsidiaryDetails',
    meta: {
      title: '子公司详情',
      icon: 'subsidiaryDetails',
      hidden: false
    },
    component: () => import('@/views/configureCenter/Subsidiarymanagement/subsidiaryDetails.vue')
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
    component: () => import('@/views/configureCenter/organizationalStructure/organizationalStructure')
  },
  {
    path: '/Employeeaccount',
    name: 'Employeeaccount',
    meta: {
      title: '员工账号',
      icon: 'Employeeaccount',
      hidden: false
    },
    component: () => import('@/views/configureCenter/Employeeaccount/Employeeaccount.vue')
  },
  {
    path: '/employeeaccounta',
    name: 'employeeaccounta',
    meta: {
      title: '新建账号',
      icon: 'employeeaccounta',
      hidden: true
    },
    component: () => import('@/views/configureCenter/Employeeaccount/employeeaccounta.vue')
  },
  {
    path: '/menuManagement',
    name: 'menuManagement',
    meta: {
      title: '菜单管理',
      icon: 'menuManagement',
      hidden: false
    },
    component: () => import('@/views/configureCenter/menuManagement/menuManagement.vue')
  },
  {
    path: '/apiManagement',
    name: 'apiManagement',
    meta: {
      title: 'api管理',
      icon: 'apiManagement',
      hidden: false
    },
    component: () => import('@/views/configureCenter/menuManagement/apiManagement.vue')
  },
  {
    path: '/driverManagement',
    name: 'driverManagement',
    meta: {
      title: '司机管理',
      icon: 'driverManagement',
      hidden: false
    },
    component: () => import('@/views/configureCenter/driverManagement/driverManagement.vue')
  },
  {
    path: '/distributionDriver',
    name: 'distributionDriver',
    meta: {
      title: '分配区域',
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
    path: '/addTruck',
    name: 'addTruck',
    meta: {
      title: '新增车辆',
      icon: 'addTruck',
      hidden: true
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
    path: '/addAccount',
    name: 'addAccount',
    meta: {
      title: '新建客户账户',
      icon: 'addAccount',
      hidden: true
    },
    component: () => import('@/views/configureCenter/customerAccount/addAccount.vue')
  },
  {
    path: '/Customerlevel',
    name: 'Customerlevel',
    meta: {
      title: '客户等级',
      icon: 'Customerlevel',
      hidden: false
    },
    component: () => import('@/views/configureCenter/Customerlevel/Customerlevel.vue')
  },
  {
    path: '/Settlementperiod',
    name: 'Settlementperiod',
    meta: {
      title: '结算账期',
      icon: 'Settlementperiod',
      hidden: false
    },
    component: () => import('@/views/configureCenter/Settlementperiod/Settlementperiod.vue')
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
    path: '/equipment',
    name: 'equipment',
    meta: {
      title: '仓库设备',
      icon: 'equipment',
      hidden: false
    },
    component: () => import('@/views/configureCenter/receivingWarehouseManage/equipment.vue')
  },
  {
    path: '/receivingWarehouseManage/addWarehouse',
    name: 'addWarehouse',
    meta: {
      title: '新建仓库',
      icon: 'addWarehouse',
      hidden: true
    },
    component: () => import('@/views/configureCenter/receivingWarehouseManage/addWarehouse.vue')
  },
  {
    path: '/receivingWarehouseManage/receivingWarehouseDetails',
    name: 'receivingWarehouseDetails',
    meta: {
      title: '仓库详情',
      icon: 'receivingWarehouseDetails',
      hidden: false
    },
    component: () => import('@/views/configureCenter/receivingWarehouseManage/receivingWarehouseDetails.vue')
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
    component: () => import('@/views/configureCenter/warehouseOperation/warehouseOperation.vue')
  },
  {
    path: '/responsibleWarehouse',
    name: 'responsibleWarehouse',
    meta: {
      title: '操作员负责仓库',
      icon: 'responsibleWarehouse',
      hidden: true
    },
    component: () => import('@/views/configureCenter/warehouseOperation/responsibleWarehouse.vue')
  },
  {
    path: '/currencyExchangerate',
    name: 'currencyExchangerate',
    meta: {
      title: '货币汇率',
      icon: 'currencyExchangerate',
      hidden: false
    },
    component: () => import('@/views/configureCenter/currencyExchangerate/currencyExchangerate.vue')
  },
  {
    path: '/materialCate',
    name: 'materialCate',
    meta: {
      title: '材质分类',
      icon: 'materialCate',
      hidden: false
    },
    component: () => import('@/views/configureCenter/materialCate/materialCate.vue')
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
      hidden: true
    },
    component: () => import('@/views/configureCenter/countryManagement/addCountry.vue')
  },
  {
    path: '/milestoneConfiguration',
    name: 'milestoneConfiguration',
    meta: {
      title: '里程碑配置',
      icon: 'milestoneConfiguration',
      hidden: false
    },
    component: () => import('@/views/configureCenter/milestoneConfiguration/milestoneConfiguration.vue')
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
  },
  {
    path: '/FBAmanage/addFBA',
    name: 'addFBA2',
    meta: {
      title: '新建目的国',
      icon: 'addFBA2',
      hidden: false
    },
    component: () => import('@/views/configureCenter/FBAmanage/addFBA2.vue')
  }
]
