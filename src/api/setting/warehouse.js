import { axios } from '../auth/auth'
import * as device from './warehouse/device'
// 仓库列表
export const lists = (params) => {
  return axios({
    url: '/setting/warehouse/lists',
    method: 'post',
    data: params
  })
}
// 添加仓库
export const add = (params) => {
  return axios({
    url: '/setting/warehouse/add',
    method: 'post',
    data: params
  })
}
// 仓库详情
export const warehouseInfo = (params) => {
  return axios({
    url: '/setting/warehouse/info',
    method: 'post',
    data: params
  })
}
// 启用仓库
export const setDefault = (warehouseId) => {
  return axios({
    url: '/setting/warehouse/default',
    method: 'post',
    data: {
      warehouseId: Number(warehouseId)
    }
  })
}
// 启用仓库
export const enabled = (warehouseIds) => {
  return axios({
    url: '/setting/warehouse/enabled',
    method: 'post',
    data: {
      warehouseIds: warehouseIds
    }
  })
}
// 停用仓库
export const disabled = (warehouseIds) => {
  return axios({
    url: '/setting/warehouse/disabled',
    method: 'post',
    data: {
      warehouseIds: warehouseIds
    }
  })
}
// 仓库筛选
export const select = () => {
  return axios({
    url: '/setting/warehouse/select',
    method: 'post',
    data: {}
  })
}

export {
  device
}
