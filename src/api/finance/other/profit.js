import { axios } from '../../auth/auth'

// 亏损列表
export const lists = (params) => {
  return axios({
    url: '/finance/other/profit/lists',
    method: 'post',
    data: params
  })
}
