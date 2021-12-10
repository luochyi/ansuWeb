import { axios } from '../../auth/auth'

// 审核
// 总经理 审核列表
export const managerLists = (params) => {
  return axios({
    url: '/cost/offer/examine/manager/lists',
    method: 'post',
    data: params
  })
}
export const managerAdopt = (params) => {
  return axios({
    url: '/cost/offer/examine/manager/adopt',
    method: 'post',
    data: params
  })
}
export const managerReject = (params) => {
  return axios({
    url: '/cost/offer/examine/manager/reject',
    method: 'post',
    data: params
  })
}
// 总监审核
export const directorLists = (params) => {
  return axios({
    url: '/cost/offer/examine/director/lists',
    method: 'post',
    data: params
  })
}
export const directorAdopt = (params) => {
  return axios({
    url: '/cost/offer/examine/director/adopt',
    method: 'post',
    data: params
  })
}
export const directorrReject = (params) => {
  return axios({
    url: '/cost/offer/examine/director/reject',
    method: 'post',
    data: params
  })
}
