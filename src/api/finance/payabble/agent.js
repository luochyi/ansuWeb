import { axios } from '../../auth/auth'

// 应付列表
export const lists = (params) => {
  return axios({
    url: '/finance/payabble/agent/lists',
    method: 'post',
    data: params
  })
}

// 代理费用
export const amount = (params) => {
  return axios({
    url: '/finance/payabble/agent/amount',
    method: 'post',
    data: params
  })
}

// 代理费用确认
export const confirm = (params) => {
  return axios({
    url: '/finance/payabble/agent/confirm',
    method: 'post',
    data: params
  })
}

// 申请付款审核
export const audit = billAgentIds => {
  return axios({
    url: '/finance/payabble/agent/audit',
    method: 'post',
    data: {
      billAgentIds: billAgentIds
    }
  })
}
