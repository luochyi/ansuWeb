// 渠道
export default [
  {
    path: '/channel',
    name: 'channel',
    meta: {
      title: '渠道代理',
      icon: 'channelIcon',
      hidden: false
    },
    redirect: '/agentManage'
  },
  // 代理管理
  {
    path: '/agentManage',
    name: 'agentManage',
    meta: {
      title: '代理管理',
      icon: 'agentManage',
      hidden: false
    },
    component: () => import('@/views/channel/agentManage/agentManage')
  },
  {
    path: '/agentManage/addAgent',
    name: 'addAgent',
    meta: {
      title: '添加代理',
      icon: 'addAgent',
      hidden: false
    },
    component: () => import('@/views/channel/agentManage/addAgent.vue')
  },
  // 渠道设置
  {
    path: '/channelSetting',
    name: 'channelSetting',
    meta: {
      title: '渠道设置',
      icon: 'channelSetting',
      hidden: false
    },
    component: () =>
      import('@/views/channel/channelSetting/channelSetting')
  },
  // 渠道设置--新增渠道
  {
    path: '/channelSetting/addChannel',
    name: 'addChannel',
    meta: {
      title: '渠道设置',
      icon: 'addChannel',
      hidden: false
    },
    component: () =>
      import('@/views/channel/channelSetting/addChannel')
  },
  // 渠道设置--查看价格曲线图
  {
    path: '/channelSetting/diagram',
    name: 'diagram',
    meta: {
      title: '渠道设置',
      icon: 'diagram',
      hidden: false
    },
    component: () =>
      import('@/views/channel/channelSetting/diagram.vue')
  },
  // 渠道下属代理
  {
    path: '/channelBrandAgent',
    name: 'channelBrandAgent',
    meta: {
      title: '渠道下属代理',
      icon: 'channelBrandAgent',
      hidden: false
    },
    component: () =>
      import('@/views/channel/channelBrandAgent/channelBrandAgent')
  },
  // 新建代理
  {
    path: '/channelBrandAgent/newlyAddedAgent',
    name: 'newlyAddedAgent',
    meta: {
      title: '添加代理',
      icon: 'newlyAddedAgent',
      hidden: false
    },
    component: () => import('@/views/channel/channelBrandAgent/newlyAddedAgent.vue')
  },
  // 子公司渠道
  {
    path: '/subsidiaryChannel',
    name: 'subsidiaryChannel',
    meta: {
      title: '子公司渠道',
      icon: 'subsidiaryChannel',
      hidden: false
    },
    component: () =>
      import('@/views/channel/subsidiaryChannel/subsidiaryChannel')
  },
  // 发票模板
  {
    path: '/invoiceTemplate',
    name: 'invoiceTemplate',
    meta: {
      title: '发票模板',
      icon: 'invoiceTemplate',
      hidden: false
    },
    component: () =>
      import('@/views/channel/invoiceTemplate/invoiceTemplate')
  }
]
