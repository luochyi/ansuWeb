
// 车辆列表
import { axios } from '../auth/auth'

export const carLists = (params) => {
  return axios({
    url: '/company/car/lists',
    method: 'post',
    data: params
  })
}

// 添加车辆
export const carAdd = (params) => {
  return axios({
    url: '/company/car/add',
    method: 'post',
    data: params
  })
}

// 修改车辆
export const carEdit = (params) => {
  return axios({
    url: '/company/car/edit',
    method: 'post',
    data: params
  })
}

// 修改车辆
export const carEnabled = (carIds) => {
  return axios({
    url: '/company/car/enabled',
    method: 'post',
    data: {
      carIds: carIds
    }
  })
}

// 修改车辆
export const carDisabled = (carIds) => {
  return axios({
    url: '/company/car/disabled',
    method: 'post',
    data: {
      carIds: carIds
    }
  })
}
