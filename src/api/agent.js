import { GetAxios } from '@/utils/request'
const axios = GetAxios((config) => {
  // 在发送请求之前做些什么
  return config
}, () => {
  location.href = '/'
}, process.env.VUE_APP_URL)

// 代理管理 列表
export const settingAgentLists = (data) => {
  return axios({
    url: '/setting/agent/lists',
    method: 'post',
    data: data
  })
}
