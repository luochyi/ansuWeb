import { axios } from '../../auth/auth'

// 费用追加
export const lists = (params) => {
  return axios({
    url: '/cost/additional/lists',
    method: 'post',
    data: params
  })
}
export const info = (params) => {
  return axios({
    url: '/cost/additional/info',
    method: 'post',
    data: params
  })
}
export const history = (params) => {
  return axios({
    url: '/cost/additional/history',
    method: 'post',
    data: params
  })
}
export const costs = (params) => {
  return axios({
    url: '/cost/additional/costs',
    method: 'post',
    data: params
  })
}
export const add = (params) => {
  return axios({
    url: '/cost/additional/add',
    method: 'post',
    data: params
  })
}
// 追加费用审核
export const examineLists = (params) => {
  return axios({
    url: '/cost/additional/examine/lists',
    method: 'post',
    data: params
  })
}
export const examineAdopt = (params) => {
  return axios({
    url: '/cost/additional/examine/adopt',
    method: 'post',
    data: params
  })
}
export const examineReject = (params) => {
  return axios({
    url: '/cost/additional/examine/reject',
    method: 'post',
    data: params
  })
}
export const examineInfo = (params) => {
  return axios({
    url: '/cost/additional/examine/reject',
    method: 'post',
    data: params
  })
}
export const examineHistory = (params) => {
  return axios({
    url: '/cost/additional/examine/history',
    method: 'post',
    data: params
  })
}
export const examineCosts = (params) => {
  return axios({
    url: '/cost/additional/examine/costs',
    method: 'post',
    data: params
  })
}
