import { axios } from '../../auth/auth'
export const select = (params) => {
  return axios({
    url: '/setting/material_cate/select',
    method: 'post',
    data: params
  })
}
