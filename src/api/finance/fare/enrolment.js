import { axios } from '../../auth/auth'

// 添加费用
export const all = (params) => {
  return axios({
    url: '/finance/fare/enrolment/all',
    method: 'post',
    data: params
  })
}

// 添加费用
export const add = (params) => {
  return axios({
    url: '/finance/fare/enrolment/add',
    method: 'post',
    data: params
  })
}

// 修改费用
export const edit = (params) => {
  return axios({
    url: '/finance/fare/enrolment/edit',
    method: 'post',
    data: params
  })
}

// 删除费用
export const deleted = (params) => {
  return axios({
    url: '/finance/fare/enrolment/delete',
    method: 'post',
    data: params
  })
}
