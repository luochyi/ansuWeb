import { GetAxios } from '@/utils/request'
const axios = GetAxios((config) => {
  // 在发送请求之前做些什么
  config.headers['Ansuex-Manage-Token'] = sessionStorage.getItem('token')
  return config
}, () => {
  location.href = '/'
}, process.env.VUE_APP_URL)

// 代理管理 列表
export const settingAgentLists = (params) => {
  return axios({
    url: '/setting/agent/lists',
    method: 'post',
    data: params
  })
}
