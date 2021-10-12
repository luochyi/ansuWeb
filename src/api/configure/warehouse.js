import { axios } from '../auth/auth'

// 操作列表
export const lists = (params) => {
  return axios({
    url: '/company/warehouse/lists',
    method: 'post',
    data: params
  })
}
// 设为负责人
export const setPrincipal = (params) => {
  return axios({
    url: '/company/warehouse/set_principal',
    method: 'post',
    data: params
  })
}
// 配置所属仓库
export const set = (params) => {
  return axios({
    url: '/company/warehouse/set',
    method: 'post',
    data: params
  })
}
