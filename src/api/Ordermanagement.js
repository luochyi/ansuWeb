import { GetAxios } from '@/utils/request'
const axios = GetAxios((config) => {
  // 在发送请求之前做些什么
  config.headers['Ansuex-Manage-Token'] = sessionStorage.getItem('token')
  return config
}, () => {
  location.href = '/'
}, process.env.VUE_APP_URL)

// 订单管理接口
// 预报单列表
export const forecastLists = (params) => {
  return axios({
    url: '/order/forecast/lists',
    method: 'post',
    data: params
  })
}
// 预报单详情
export const forecastInfo = (params) => {
  return axios({
    url: '/order/forecast/info',
    method: 'post',
    data: params
  })
}
// 运单列表
export const waybillLists = (params) => {
  return axios({
    url: '/order/waybill/lists',
    method: 'post',
    data: params
  })
}
// 运单详情
export const waybillInfo = waybillId => {
  return axios({
    url: '/order/waybill/info',
    method: 'post',
    data: {
      waybillId: waybillId
    }
  })
}
// 运单列表
export const ejectLists = (params) => {
  return axios({
    url: '/order/eject/lists',
    method: 'post',
    data: params
  })
}
