import { axios } from '../../auth/auth'

// 费用登记
export const lists = (params) => {
  return axios({
    url: '/cost/enrolment/lists',
    method: 'post',
    data: params
  })
}
export const detail = (params) => {
  return axios({
    url: '/cost/enrolment/detail',
    method: 'post',
    data: params
  })
}
export const add = (params) => {
  return axios({
    url: '/cost/enrolment/add',
    method: 'post',
    data: params
  })
}
export const edit = (params) => {
  return axios({
    url: '/cost/enrolment/edit',
    method: 'post',
    data: params
  })
}
export const del = (params) => {
  return axios({
    url: '/cost/enrolment/delete',
    method: 'post',
    data: params
  })
}
