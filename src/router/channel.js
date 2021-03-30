// 渠道
export default [
  {
    path: "/channel",
    name: "channel",
    meta: {
      title: "渠道代理",
      icon: "channelIcon",
      hidden: false
    },
    redirect: "/channelAllocation"
  },
  {
    path: "/channelAllocation",
    name: "channelAllocation",
    meta: {
      title: "渠道配置",
      icon: "channelAllocation",
      hidden: false
    },
    component: () =>
      import("@/views/channel/channelAllocation/channelAllocation.vue")
  },
  {
    path: "/invoiceTemplate",
    name: "invoiceTemplate",
    meta: {
      title: "发票模板",
      icon: "invoiceTemplate",
      hidden: false
    },
    component: () =>
      import("@/views/channel/invoiceTemplate/invoiceTemplate.vue")
  }
];
