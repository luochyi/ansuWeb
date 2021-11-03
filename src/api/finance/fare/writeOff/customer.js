import { axios } from '../../../auth/auth'

// 客户核销列表
export const lists = params => {
  return axios({
    url: '/finance/fare/write_off/customer/lists',
    method: 'post',
    data: params
  })
}

// 客户核销账单列表
export const bill = params => {
  return axios({
    url: '/finance/fare/write_off/customer/bill',
    method: 'post',
    data: params
  })
}

// 核销费用列表
export const cost = params => {
  return axios({
    url: '/finance/fare/write_off/customer/cost',
    method: 'post',
    data: params
  })
}

// 核销处理
export const handle = params => {
  return axios({
    url: '/finance/fare/write_off/customer/handle',
    method: 'post',
    data: params
  })
}

// 核销处理
export const history = params => {
  return axios({
    url: '/finance/fare/write_off/customer/history',
    method: 'post',
    data: params
  })
}
