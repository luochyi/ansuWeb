import { axios } from '../../auth/auth'

// 投保运单列表
export const lists = (params) => {
  return axios({
    url: '/order/waybill/safe/lists',
    method: 'post',
    data: params
  })
}

// 修改货值
export const change = (params) => {
  return axios({
    url: '/order/waybill/safe/change',
    method: 'post',
    data: params
  })
}

// 保单列表
export const order = (params) => {
  return axios({
    url: '/order/waybill/safe/order',
    method: 'post',
    data: params
  })
}
