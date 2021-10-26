import { axios } from '../auth/auth'
// 获取模版
export const lists = type => {
  return axios({
    url: '/setting/template/get',
    method: 'post',
    data: {
      type: type
    }
  })
}
