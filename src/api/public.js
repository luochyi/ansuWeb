import { GetAxios } from '@/utils/request'
const axios = GetAxios((config) => {
  // 在发送请求之前做些什么
  return config
}, () => {
  location.href = '/'
}, process.env.VUE_APP_URL)

// 公共接口

// 省市区 三级联动数据
export const settingRegionAll = () => {
  return axios({
    url: '/setting/region/all',
    method: 'post'
  })
}
