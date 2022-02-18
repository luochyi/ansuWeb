import { axios } from '../../auth/auth'

// 附加费
export const lists = (params) => {
  return axios({
    url: '/cost/waybill/lists',
    method: 'post',
    data: params
  })
}
export const detail = (params) => {
  return axios({
    url: '/cost/waybill/detail',
    method: 'post',
    data: params
  })
}
export const add = (params) => {
  return axios({
    url: '/cost/waybill/add',
    method: 'post',
    data: params
  })
}
export const edit = (params) => {
  return axios({
    url: '/cost/waybill/edit',
    method: 'post',
    data: params
  })
}
export const del = (params) => {
  return axios({
    url: '/cost/waybill/delete',
    method: 'post',
    data: params
  })
}
