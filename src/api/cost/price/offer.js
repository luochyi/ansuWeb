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

export const subscript = (params) => {
  return axios({
    url: '/cost/offer/subscript',
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
export const directorDetail = (params) => {
  return axios({
    url: '/cost/offer/examine/director/detail',
    method: 'post',
    data: params
  })
}
export const managerDetail = (params) => {
  return axios({
    url: '/cost/offer/examine/manager/detail',
    method: 'post',
    data: params
  })
}
export const history = (params) => {
  return axios({
    url: '/cost/offer/history',
    method: 'post',
    data: params
  })
}
export const offer = (params) => {
  return axios({
    url: '/cost/offer/offer',
    method: 'post',
    data: params
  })
}
