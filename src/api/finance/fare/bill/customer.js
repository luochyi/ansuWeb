import { axios } from '../../../auth/auth'

// 生成账单
export const gen = params => {
  return axios({
    url: '/finance/fare/bill/customer/gen',
    method: 'post',
    data: params
  })
}

// 账单列表
export const lists = params => {
  return axios({
    url: '/finance/fare/bill/customer/lists',
    method: 'post',
    data: params
  })
}
