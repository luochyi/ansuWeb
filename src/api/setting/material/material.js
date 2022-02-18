import { axios } from '../../auth/auth'

export const select = (params) => {
  return axios({
    url: '/setting/material_cate/select',
    method: 'post',
    data: params
  })
}
export const lists = (params) => {
  return axios({
    url: '/setting/material_cate/lists',
    method: 'post',
    data: params
  })
}
// materialCateId
export const add = (params) => {
  return axios({
    url: '/setting/material_cate/add',
    method: 'post',
    data: params
  })
}
export const edit = (params) => {
  return axios({
    url: '/setting/material_cate/edit',
    method: 'post',
    data: params
  })
}
