import { axios } from '../../auth/auth'

// 应付列表
export const lists = (params) => {
  return axios({
    url: '/finance/payabble/agent/lists',
    method: 'post',
    data: params
  })
}
export const verify = (params) => {
  return axios({
    url: '/finance/payabble/agent/verify',
    method: 'post',
    data: params
  })
}
// 开始对账
export const start = (params) => {
  return axios({
    url: '/finance/payabble/agent/start',
    method: 'post',
    data: params
  })
}
export const finish = (params) => {
  return axios({
    url: '/finance/payabble/agent/finish',
    method: 'post',
    data: params
  })
}
// 差异列表
export const diversityLists = (params) => {
  return axios({
    url: '/finance/payabble/diversity/lists',
    method: 'post',
    data: params
  })
}
export const info = (params) => {
  return axios({
    url: '/finance/payabble/diversity/info',
    method: 'post',
    data: params
  })
}
export const diversityConfirm = (params) => {
  return axios({
    url: '/finance/payabble/diversity/confirm',
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
