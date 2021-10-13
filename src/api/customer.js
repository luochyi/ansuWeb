import { GetAxios } from '@/utils/request'
const axios = GetAxios((config) => {
  // 在发送请求之前做些什么
  config.headers['Ansuex-Manage-Token'] = sessionStorage.getItem('token')
  return config
}, () => {
  location.href = '/'
}, process.env.VUE_APP_URL)

// 客户管理接口
// 公海客户
export const publicLists = (params) => {
  return axios({
    url: '/company/customer/public/lists',
    method: 'post',
    data: params
  })
}
// 添加公海客户
export const publicAdd = (params) => {
  return axios({
    url: '/company/customer/public/add',
    method: 'post',
    data: params
  })
}
// 私海客户
export const privateLists = (params) => {
  return axios({
    url: '/company/customer/private/lists',
    method: 'post',
    data: params
  })
}
// 添加私海海客户
export const privateAdd = (params) => {
  return axios({
    url: '/company/customer/private/add',
    method: 'post',
    data: params
  })
}
// 转回公海
export const privatePublic = (params) => {
  return axios({
    url: '/company/customer/private/public',
    method: 'post',
    data: params
  })
}
// 拜访公司列表
export const recordLists = (params) => {
  return axios({
    url: '/company/customer/private/record/lists',
    method: 'post',
    data: params
  })
}
// 添加拜访记录
export const recordAdd = (params) => {
  return axios({
    url: '/company/customer/private/record/add',
    method: 'post',
    data: params
  })
}
