import { axios } from '../../auth/auth'

// 付款审核列表
export const lists = (params) => {
  return axios({
    url: '/finance/payabble/audit/lists',
    method: 'post',
    data: params
  })
}

// 审核通过
export const adopt = (params) => {
  return axios({
    url: '/finance/payabble/audit/adopt',
    method: 'post',
    data: params
  })
}

// 审核驳回
export const reject = (params) => {
  return axios({
    url: '/finance/payabble/audit/reject',
    method: 'post',
    data: params
  })
}
