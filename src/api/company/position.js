import { axios } from '../auth/auth'

// 获取权限配置
export const getSuth = (positionId) => {
  return axios({
    url: '/company/position/get_auth',
    method: 'post',
    data: {
      positionId: positionId
    }
  })
}

// 权限配置
export const auth = (params) => {
  return axios({
    url: '/company/position/auth',
    method: 'post',
    data: params
  })
}
// /company/sales/select
export const salesSelect = (params) => {
  return axios({
    url: '/company/sales/select',
    method: 'post',
    data: params
  })
}
