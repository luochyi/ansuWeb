import { axios } from '../../../auth/auth'

// 生成费用
export const gen = waybillId => {
  return axios({
    url: '/finance/fare/confirm/customer/gen',
    method: 'post',
    data: {
      waybillId: Number(waybillId)
    }
  })
}

// 费用确认单列表
export const lists = params => {
  return axios({
    url: '/finance/fare/confirm/customer/lists',
    method: 'post',
    data: params
  })
}

// 费用确认单确认
export const confirm = params => {
  return axios({
    url: '/finance/fare/confirm/customer/confirm',
    method: 'post',
    data: params
  })
}
