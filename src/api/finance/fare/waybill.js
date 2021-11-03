import { axios } from '../../auth/auth'
// 费用登记列表
export const lists = (params) => {
  return axios({
    url: '/finance/fare/waybill/lists',
    method: 'post',
    data: params
  })
}

// 运单运费信息
export const amount = waybillId => {
  return axios({
    url: '/finance/fare/waybill/amount',
    method: 'post',
    data: {
      waybillId: waybillId
    }
  })
}
