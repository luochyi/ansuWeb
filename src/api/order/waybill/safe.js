import { axios } from '../../auth/auth'

// 投保运单列表
export const lists = (params) => {
  return axios({
    url: '/order/waybill/safe/lists',
    method: 'post',
    data: params
  })
}
