import { axios } from '../../auth/auth'

// 代理货件数据获取
export const agentGet = waybillId => {
  return axios({
    url: '/order/waybill/cargo_spec/agent/get',
    method: 'post',
    data: {
      waybillId: waybillId
    }
  })
}
