// 渠道
export default [
  {
    path: '/finance',
    name: 'finance',
    meta: {
      title: '财务费用',
      icon: 'financeIcon',
      hidden: false
    },
    redirect: '/expenseConfirmation'
  },
  // 代理管理
  {
    path: '/expenseConfirmation',
    name: 'expenseConfirmation',
    meta: {
      title: '费用确认',
      icon: 'expenseConfirmation',
      hidden: false
    },
    component: () => import('@/views/finance/waybillFee/expenseConfirmation/expenseConfirmation.vue')
  },
  {
    path: '/expenseAudit',
    name: 'expenseAudit',
    meta: {
      title: '费用审核',
      icon: 'expenseAudit',
      hidden: false
    },
    component: () => import('@/views/finance/waybillFee/expenseAudit/expenseAudit.vue')
  },
  {
    path: '/expenseConfirmationForm',
    name: 'expenseConfirmationForm',
    meta: {
      title: '费用确认单',
      icon: 'expenseConfirmationForm',
      hidden: false
    },
    component: () => import('@/views/finance/waybillFee/expenseConfirmationForm/expenseConfirmationForm.vue')
  },
  {
    path: '/expenseRegister',
    name: 'expenseRegister',
    meta: {
      title: '费用登记',
      icon: 'expenseConfirmation',
      hidden: false
    },
    component: () => import('@/views/finance/waybillFee/expenseRegister/expenseRegister.vue')
  }
]
