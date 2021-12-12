import { axios } from '../../auth/auth'

// 改货
export const lists = (params) => {
  return axios({
    url: '/cost/cargo/lists',
    method: 'post',
    data: params
  })
}
export const info = (params) => {
  return axios({
    url: '/cost/cargo/info',
    method: 'post',
    data: params
  })
}
export const history = (params) => {
  return axios({
    url: '/cost/cargo/history',
    method: 'post',
    data: params
  })
}
// 通过
export const adopt = (params) => {
  return axios({
    url: '/cost/cargo/adopt',
    method: 'post',
    data: params
  })
}
// 驳回
export const reject = (params) => {
  return axios({
    url: '/cost/cargo/reject',
    method: 'post',
    data: params
  })
}
// 计算
export const calc = (params) => {
  return axios({
    url: '/cost/cargo/calc',
    method: 'post',
    data: params
  })
}
