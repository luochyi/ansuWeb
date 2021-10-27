import { axios } from '../auth/auth'

// 全部菜单
export const all = () => {
  return axios({
    url: '/setting/menu/all',
    method: 'post',
    data: { }
  })
}
// 添加菜单
export const add = (params) => {
  return axios({
    url: '/setting/menu/add',
    method: 'post',
    data: params
  })
}
// 菜单详情
export const info = (menuId) => {
  return axios({
    url: '/setting/menu/info',
    method: 'post',
    data: { menuId: menuId }
  })
}
// 修改菜单
export const edit = (params) => {
  return axios({
    url: '/setting/menu/edit',
    method: 'post',
    data: params
  })
}
