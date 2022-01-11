import { axios } from '../../auth/auth'

// 品名列表
export const lists = (params) => {
  return axios({
    url: '/setting/problem/lists',
    method: 'post',
    data: params
  })
}
// 添加品名
export const add = (params) => {
  return axios({
    url: '/setting/problem/add',
    method: 'post',
    data: params
  })
}
// 编辑品名
export const edit = (params) => {
  return axios({
    url: '/setting/problem/edit',
    method: 'post',
    data: params
  })
}
// 删除品名
export const del = (params) => {
  return axios({
    url: '/setting/problem/del',
    method: 'post',
    data: params
  })
}
// 品名筛选
export const select = (params) => {
  return axios({
    url: '/setting/problem/select',
    method: 'post',
    data: params
  })
}
