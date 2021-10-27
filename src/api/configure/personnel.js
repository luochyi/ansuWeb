import { axios } from '../auth/auth'

// 员工列表
export const lists = (params) => {
  return axios({
    url: '/company/personnel/lists',
    method: 'post',
    data: params
  })
}
// 添加员工
export const add = (params) => {
  return axios({
    url: '/company/personnel/add',
    method: 'post',
    data: params
  })
}
// 员工详情
export const info = (personnelId) => {
  return axios({
    url: '/company/personnel/info',
    method: 'post',
    data: {
      personnelId: personnelId
    }
  })
}
// 修改员工
export const edit = (params) => {
  return axios({
    url: '/company/personnel/edit',
    method: 'post',
    data: params
  })
}
// 重置密码
export const resetPassword = (params) => {
  return axios({
    url: '/company/personnel/reset_password',
    method: 'post',
    data: params
  })
}
// 启用
export const enabled = (personnelIds) => {
  return axios({
    url: '/company/personnel/enabled',
    method: 'post',
    data: {
      personnelIds: personnelIds
    }
  })
}
// 停用
export const disabled = (personnelIds) => {
  return axios({
    url: '/company/personnel/disabled',
    method: 'post',
    data: {
      personnelIds: personnelIds
    }
  })
}
