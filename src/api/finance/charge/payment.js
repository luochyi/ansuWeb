import { axios } from '../../auth/auth'

// 来款记录列表
export const lists = (params) => {
  return axios({
    url: '/finance/charge/payment/lists',
    method: 'post',
    data: params
  })
}

// 添加来款
export const add = (params) => {
  return axios({
    url: '/finance/charge/payment/add',
    method: 'post',
    data: params
  })
}

// 来款确认
export const confirm = incomingIds => {
  return axios({
    url: '/finance/charge/payment/confirm',
    method: 'post',
    data: {
      incomingIds: incomingIds
    }
  })
}

// 来款删除
export const deleted = incomingId => {
  return axios({
    url: '/finance/charge/payment/delete',
    method: 'post',
    data: {
      incomingId: Number(incomingId)
    }
  })
}
