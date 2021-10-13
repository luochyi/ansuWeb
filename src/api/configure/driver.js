import { axios } from '../auth/auth'

// 司机列表
export const lists = (params) => {
  return axios({
    url: '/company/driver/lists',
    method: 'post',
    data: params
  })
}
// 配置区域
export const region = (params) => {
  return axios({
    url: '/company/driver/region',
    method: 'post',
    data: params
  })
}
