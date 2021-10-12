
// 里程碑
import { axios } from '../auth/auth'

export const lists = (params) => {
  return axios({
    url: '/setting/milestone/lists',
    method: 'post',
    data: params
  })
}

// 添加车辆
export const add = (params) => {
  return axios({
    url: '/setting/milestone/add',
    method: 'post',
    data: params
  })
}

// 编辑车辆
export const edit = (params) => {
  return axios({
    url: '/setting/milestone/edit',
    method: 'post',
    data: params
  })
}

// 编辑车辆
export const del = (params) => {
  return axios({
    url: '/setting/milestone/del',
    method: 'post',
    data: params
  })
}
