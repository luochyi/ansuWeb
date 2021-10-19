import { axios } from '../../auth/auth'

// 费用确认列表
export const lists = (params) => {
  return axios({
    url: '/finance/fare/audit/lists',
    method: 'post',
    data: params
  })
}

// 审核通过
export const adopt = (auditIds) => {
  return axios({
    url: '/finance/fare/audit/adopt',
    method: 'post',
    data: {
      auditIds: auditIds
    }
  })
}

// 审核驳回
export const fail = (params) => {
  return axios({
    url: '/finance/fare/audit/fail',
    method: 'post',
    data: params
  })
}
