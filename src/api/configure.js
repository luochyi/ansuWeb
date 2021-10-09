import { GetAxios } from '@/utils/request'
const axios = GetAxios((config) => {
  // 在发送请求之前做些什么
  config.headers['Ansuex-Manage-Token'] = sessionStorage.getItem('token')
  return config
}, () => {
  location.href = '/'
}, process.env.VUE_APP_URL)

// 配置中心接口
// 子公司列表
export const companyLists = (params) => {
  return axios({
    url: '/company/lists',
    method: 'post',
    data: params
  })
}
// 新增子公司
export const companyAdd = (params) => {
  return axios({
    url: '/company/add',
    method: 'post',
    data: params
  })
}
// 子公司详情
export const companyInfo = (params) => {
  return axios({
    url: '/company/info',
    method: 'post',
    data: params
  })
}
// department/all获取全部部门
export const departmentAll = (params) => {
  return axios({
    url: '/company/department/all',
    method: 'post',
    data: params
  })
}
// 新增部门
export const departmentAdd = (params) => {
  return axios({
    url: '/company/department/add',
    method: 'post',
    data: params
  })
}
export const departmentEdit = (params) => {
  return axios({
    url: '/company/department/edit',
    method: 'post',
    data: params
  })
}
// 角色list

export const positionAll = (params) => {
  return axios({
    url: '/company/position/all',
    method: 'post',
    data: params
  })
}
// /company/position/add
export const positionAdd = (params) => {
  return axios({
    url: '/company/position/add',
    method: 'post',
    data: params
  })
}
export const positionEdit = (params) => {
  return axios({
    url: '/company/position/edit',
    method: 'post',
    data: params
  })
}
