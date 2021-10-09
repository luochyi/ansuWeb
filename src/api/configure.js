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
