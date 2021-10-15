import { axios } from '../../auth/auth'
// 费用登记列表
export const lists = (params) => {
  return axios({
    url: '/finance/fare/waybill/lists',
    method: 'post',
    data: params
  })
}
