// 渠道
export default [
  {
    path: '/config',
    name: 'config',
    meta: {
      title: '配置中心',
      icon: 'configIcon',
      hidden: false
    },
    redirect: '/config'
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
  }
]
