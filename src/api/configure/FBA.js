import { axios } from '../auth/auth'

export const lists = (params) => {
  return axios({
    url: '/setting/storehouse/fba/lists',
    method: 'post',
    data: params
  })
}
// storehouseFbaId countryId
export const edit = (params) => {
  return axios({
    url: '/setting/storehouse/fba/edit',
    method: 'post',
    data: params
  })
}
export const add = (params) => {
  return axios({
    url: '/setting/storehouse/fba/add',
    method: 'post',
    data: params
  })
}
export const Import = path => {
  return axios({
    url: '/setting/storehouse/fba/import',
    method: 'post',
    data: {
      path: path
    }
  })
}
export const del = (params) => {
  return axios({
    url: '/setting/storehouse/fba/del',
    method: 'post',
    data: params
  })
}
