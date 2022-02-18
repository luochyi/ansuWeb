import { axios } from '../../auth/auth'

// 费用明细
export const lists = (params) => {
  return axios({
    url: '/cost/amount/lists',
    method: 'post',
    data: params
  })
}
export const detail = (params) => {
  return axios({
    url: '/cost/amount/detail',
    method: 'post',
    data: params
  })
}
export const add = (params) => {
  return axios({
    url: '/cost/amount/add',
    method: 'post',
    data: params
  })
}
export const edit = (params) => {
  return axios({
    url: '/cost/amount/edit',
    method: 'post',
    data: params
  })
}
export const del = (params) => {
  return axios({
    url: '/cost/amount/delete',
    method: 'post',
    data: params
  })
}
// 生成费用确认单
export const gen = (params) => {
  return axios({
    url: '/cost/amount/gen',
    method: 'post',
    data: params
  })
}
// 改货
export const cargoEdit = (params) => {
  return axios({
    url: '/cost/amount/cargo/edit',
    method: 'post',
    data: params
  })
}
export const cargoInfo = (params) => {
  return axios({
    url: '/cost/amount/cargo/info',
    method: 'post',
    data: params
  })
}
export const cargohistory = (params) => {
  return axios({
    url: '/cost/amount/cargo/history',
    method: 'post',
    data: params
  })
}
