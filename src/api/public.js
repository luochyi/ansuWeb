import { GetAxios } from '@/utils/request'
const axios = GetAxios((config) => {
  // 在发送请求之前做些什么
  config.headers['Ansuex-Manage-Token'] = sessionStorage.getItem('token')
  return config
}, () => {
  location.href = '/'
}, process.env.VUE_APP_URL)

// 公共接口
// 登录 登出
export const login = (data) => {
  return axios({
    url: '/login',
    method: 'post',
    data: data
  })
}
export const logout = (data) => {
  return axios({
    url: '/login/logout',
    method: 'post',
    data: data
  })
}
// 省市区 三级联动数据
export const settingRegionAll = () => {
  return axios({
    url: '/setting/region/all',
    method: 'post'
  })
}
