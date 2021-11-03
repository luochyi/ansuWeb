import * as customer from './confirm/customer'
import { axios } from '../../auth/auth'

// 费用确认列表
export const lists = (params) => {
  return axios({
    url: '/finance/fare/confirm/lists',
    method: 'post',
    data: params
  })
}

// 费用确认列表
export const offer = (params) => {
  return axios({
    url: '/finance/fare/confirm/offer',
    method: 'post',
    data: params
  })
}

// 费用确认列表
export const reOffer = (params) => {
  return axios({
    url: '/finance/fare/confirm/re_offer',
    method: 'post',
    data: params
  })
}

export {
  customer
}
