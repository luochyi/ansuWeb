import { axios } from '../../auth/auth'

// 费用确认
export const lists = (params) => {
  return axios({
    url: '/cost/confirm/lists',
    method: 'post',
    data: params
  })
}
// 费用确认
export const affirm = (params) => {
  return axios({
    url: '/cost/confirm/affirm',
    method: 'post',
    data: params
  })
}
// 取消费用确认
export const cancel = (params) => {
  return axios({
    url: '/cost/confirm/cancel',
    method: 'post',
    data: params
  })
}
