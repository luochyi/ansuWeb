import { axios } from '../../auth/auth'

// currencyId
export const select = (params) => {
  return axios({
    url: '/setting/currency/select',
    method: 'post',
    data: params
  })
}
export const lists = (params) => {
  return axios({
    url: '/setting/currency/lists',
    method: 'post',
    data: params
  })
}
export const add = (params) => {
  return axios({
    url: '/setting/currency/add',
    method: 'post',
    data: params
  })
}
export const edit = (params) => {
  return axios({
    url: '/setting/currency/edit',
    method: 'post',
    data: params
  })
}
export const currencyDefault = (params) => {
  return axios({
    url: '/setting/currency/default',
    method: 'post',
    data: params
  })
}
