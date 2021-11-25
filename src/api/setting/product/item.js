import { axios } from '../../auth/auth'

// 品名列表
export const lists = (params) => {
  return axios({
    url: '/setting/product/item/lists',
    method: 'post',
    data: params
  })
}
// 添加品名
export const add = (params) => {
  return axios({
    url: '/setting/product/item/add',
    method: 'post',
    data: params
  })
}
// 编辑品名
export const edit = (params) => {
  return axios({
    url: '/setting/product/item/edit',
    method: 'post',
    data: params
  })
}
// 删除品名
export const del = (params) => {
  return axios({
    url: '/setting/product/item/delete',
    method: 'post',
    data: params
  })
}
// 品名筛选
export const select = (params) => {
  return axios({
    url: '/setting/product/item/select',
    method: 'post',
    data: params
  })
}
