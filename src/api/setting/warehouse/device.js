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
