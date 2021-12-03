import { axios } from '../../auth/auth'

// 报价
// 报价列表
export const lists = (params) => {
  return axios({
    url: '/cost/offer/lists',
    method: 'post',
    data: params
  })
}
// 报价详情 waybillId
export const detail = (params) => {
  return axios({
    url: '/cost/offer/detail',
    method: 'post',
    data: params
  })
}
