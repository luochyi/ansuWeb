import { axios } from '../auth/auth'
import * as safe from './waybill/safe'
import * as cargoSpec from './waybill/cargoSpec'
// 设置转单信息
export const transship = params => {
  return axios({
    url: '/order/waybill/transship',
    method: 'post',
    data: params
  })
}
// 设置提单信息
export const extract = params => {
  return axios({
    url: '/order/waybill/extract',
    method: 'post',
    data: params
  })
}
export {
  safe,
  cargoSpec
}
