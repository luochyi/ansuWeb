import { axios } from '../auth/auth'

// 全部接口
export const all = () => {
  return axios({
    url: '/setting/api/all',
    method: 'post',
    data: {}
  })
}
// 添加接口
export const add = (params) => {
  return axios({
    url: '/setting/api/add',
    method: 'post',
    data: params
  })
}
// 修改接口
export const edit = (params) => {
  return axios({
    url: '/setting/api/edit',
    method: 'post',
    data: params
  })
}
// 删除接口
export const del = (apiId) => {
  return axios({
    url: '/setting/api/del',
    method: 'post',
    data: {
      apiId: apiId
    }
  })
}
// api接口筛选
export const select = () => {
  return axios({
    url: '/setting/api/select',
    method: 'post',
    data: {}
  })
}
