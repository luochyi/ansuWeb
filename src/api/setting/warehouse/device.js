import { axios } from '../../auth/auth'

// 设备列表
export const lists = (params) => {
  return axios({
    url: '/setting/warehouse/device/lists',
    method: 'post',
    data: params
  })
}
// 启用设备
export const add = (params) => {
  return axios({
    url: '/setting/warehouse/device/add',
    method: 'post',
    data: params
  })
}
// 启用设备
export const edit = (params) => {
  return axios({
    url: '/setting/warehouse/device/edit',
    method: 'post',
    data: params
  })
}
// 启用设备
export const enabled = (params) => {
  return axios({
    url: '/setting/warehouse/device/enabled',
    method: 'post',
    data: params
  })
}
// 停用设备
export const disabled = (params) => {
  return axios({
    url: '/setting/warehouse/device/disabled',
    method: 'post',
    data: params
  })
}
// waybillId
export const select = (params) => {
  return axios({
    url: '/setting/warehouse/device/select/waybill',
    method: 'post',
    data: params
  })
}
export const scanUrl = process.env.VUE_APP_WS + '/order/waybill/scan'
