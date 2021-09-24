// 渠道
export default [
  {
    path: '/Financialexpenses',
    name: 'Financialexpenses',
    meta: {
      title: '财务费用',
      icon: 'Financialexpensesicon',
      hidden: false
    },
    redirect: '/Waybillfee'
  },
  // 代理管理
  {
    path: '/Waybillfee',
    name: 'Waybillfee',
    meta: {
      title: '运单费用',
      icon: 'Waybillfee',
      hidden: false
    },
    component: () => import('@/views/Financialexpensesicon/Waybillfee/expenseConfirmation/expenseConfirmation.vue')
  },
  {
    path: '/expenseConfirmation',
    name: 'expenseConfirmation',
    meta: {
      title: '费用确认',
      icon: 'expenseConfirmation',
      hidden: false
    },
    component: () => import('@/views/Financialexpensesicon/Waybillfee/expenseConfirmation/expenseConfirmation.vue')
  },
  {
    path: '/detailspage',
    name: 'detailspage',
    meta: {
      title: '录入报价',
      icon: 'detailspage',
      hidden: false
    },
    component: () => import('@/views/Financialexpensesicon/Waybillfee/expenseConfirmation/detailspage.vue')
  },
  {
    path: '/expenseAudit',
    name: 'expenseAudit',
    meta: {
      title: '费用审核',
      icon: 'expenseAudit',
      hidden: false
    },
    component: () => import('@/views/Financialexpensesicon/Waybillfee/expenseAudit/expenseAudit.vue')
  },
  {
    path: '/expenseConfirmationForm',
    name: 'expenseConfirmationForm',
    meta: {
      title: '费用确认单',
      icon: 'expenseConfirmationForm',
      hidden: false
    },
    component: () => import('@/views/Financialexpensesicon/Waybillfee/expenseConfirmationForm/expenseConfirmationForm.vue')
  },
  {
    path: '/expenseRegister',
    name: 'expenseRegister',
    meta: {
      title: '费用登记',
      icon: 'expenseRegistericon',
      hidden: false
    },
    component: () => import('@/views/Financialexpensesicon/Waybillfee/expenseRegister/expenseRegister.vue')
  },
  {
    path: '/Rmanagement',
    name: 'Rmanagement',
    meta: {
      title: '应收管理',
      icon: 'Rmanagement',
      hidden: false
    },
    component: () => import('@/views/Financialexpensesicon/Rmanagement/receivablestatement/receivablestatement.vue')
  },
  {
    path: '/receivablestatement',
    name: 'receivablestatement',
    meta: {
      title: '应收对账单',
      icon: 'receivablestatement',
      hidden: false
    },
    component: () => import('@/views/Financialexpensesicon/Rmanagement/receivablestatement/receivablestatement.vue')
  },
  {
    path: '/paymentrecord',
    name: 'paymentrecord',
    meta: {
      title: '来款记录',
      icon: 'paymentrecord',
      hidden: false
    },
    component: () => import('@/views/Financialexpensesicon/Rmanagement/paymentrecord/paymentrecord.vue')
  },
  {
    path: '/Billwriteoff',
    name: 'Billwriteoff',
    meta: {
      title: '账单核销',
      icon: 'Billwriteoff',
      hidden: false
    },
    component: () => import('@/views/Financialexpensesicon/Rmanagement/Billwriteoff/Billwriteoff.vue')
  },
  {
    path: '/Writeoffrecord',
    name: 'Writeoffrecord',
    meta: {
      title: '核销记录',
      icon: 'Writeoffrecord',
      hidden: false
    },
    component: () => import('@/views/Financialexpensesicon/Rmanagement/Writeoffrecord/Writeoffrecord.vue')
  },

  {
    path: '/Payablemanagement',
    name: 'Payablemanagement',
    meta: {
      title: '应付管理',
      icon: 'Payablemanagement',
      hidden: false
    },
    component: () => import('@/views/Financialexpensesicon/Payablemanagement/Payablemanagement/Payablemanagement.vue')
  },
  {
    path: '/Payablemanagement',
    name: 'Payablemanagement',
    meta: {
      title: '应付管理',
      icon: 'Payablemanagement',
      hidden: false
    },
    component: () => import('@/views/Financialexpensesicon/Payablemanagement/Payablemanagement/Payablemanagement.vue')
  },
  {
    path: '/Paymentapplication',
    name: 'Paymentapplication',
    meta: {
      title: '付款申请',
      icon: 'Paymentapplication',
      hidden: false
    },
    component: () => import('@/views/Financialexpensesicon/Payablemanagement/Paymentapplication/Paymentapplication.vue')
  },
  {
    path: '/Paymentapproval',
    name: 'Paymentapproval',
    meta: {
      title: '付款审核',
      icon: 'Paymentapproval',
      hidden: false
    },
    component: () => import('@/views/Financialexpensesicon/Payablemanagement/Paymentapproval/Paymentapproval.vue')
  },
  {
    path: '/other',
    name: 'other',
    meta: {
      title: '其他',
      icon: 'other',
      hidden: false
    },
    component: () => import('@/views/Financialexpensesicon/other/Losssheet/Losssheet.vue')
  },
  {
    path: '/Losssheet',
    name: 'Losssheet',
    meta: {
      title: '亏损单',
      icon: 'Losssheet',
      hidden: false
    },
    component: () => import('@/views/Financialexpensesicon/other/Losssheet/Losssheet.vue')
  },
  {
    path: '/Deductgrossprofit',
    name: 'Deductgrossprofit',
    meta: {
      title: '扣毛利',
      icon: 'Deductgrossprofit',
      hidden: false
    },
    component: () => import('@/views/Financialexpensesicon/other/Deductgrossprofit/Deductgrossprofit.vue')
  }
]
