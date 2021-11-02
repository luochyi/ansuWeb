import { axios } from '../auth/auth'
// 筛选转运快递公司
export const select = () => {
  return axios({
    url: '/setting/transship/select',
    method: 'post',
    data: {}
  })
}
