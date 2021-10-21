import { GetAxios } from '@/utils/request'
import * as car from './configure/car'
import * as menu from './configure/menu'
import * as api from './configure/api'
import * as personnel from './configure/personnel'
import * as driver from './configure/driver'
import * as warehouse from './configure/warehouse'
import * as milestone from './configure/milestone'
import * as FBA from './configure/FBA'

const axios = GetAxios((config) => {
  // 在发送请求之前做些什么
  config.headers['Ansuex-Manage-Token'] = sessionStorage.getItem('token')
  return config
}, () => {
  location.href = '/'
}, process.env.VUE_APP_URL)

// 配置中心接口
// 子公司列表
export const companyLists = (params) => {
  return axios({
    url: '/company/lists',
    method: 'post',
    data: params
  })
}
// 新增子公司
export const companyAdd = (params) => {
  return axios({
    url: '/company/add',
    method: 'post',
    data: params
  })
}
// 子公司详情
export const companyInfo = (params) => {
  return axios({
    url: '/company/info',
    method: 'post',
    data: params
  })
}
// department/all获取全部部门
export const departmentAll = (params) => {
  return axios({
    url: '/company/department/all',
    method: 'post',
    data: params
  })
}
// 新增部门
export const departmentAdd = (params) => {
  return axios({
    url: '/company/department/add',
    method: 'post',
    data: params
  })
}
export const departmentEdit = (params) => {
  return axios({
    url: '/company/department/edit',
    method: 'post',
    data: params
  })
}
// 角色list

export const positionAll = (params) => {
  return axios({
    url: '/company/position/all',
    method: 'post',
    data: params
  })
}
// /company/position/add
export const positionAdd = (params) => {
  return axios({
    url: '/company/position/add',
    method: 'post',
    data: params
  })
}
export const positionEdit = (params) => {
  return axios({
    url: '/company/position/edit',
    method: 'post',
    data: params
  })
}
export const customerLevelLists = (params) => {
  return axios({
    url: '/setting/customerLevel/lists',
    method: 'post',
    data: params
  })
}
export const customerLevelAdd = (params) => {
  return axios({
    url: '/setting/customerLevel/add',
    method: 'post',
    data: params
  })
}
export const customerLevelEdit = (params) => {
  return axios({
    url: '/setting/customerLevel/edit',
    method: 'post',
    data: params
  })
}
export const customerLevelDel = (params) => {
  return axios({
    url: '/setting/customerLevel/del',
    method: 'post',
    data: params
  })
}
export const customerLevelSelect = (params) => {
  return axios({
    url: '/setting/customerLevel/select',
    method: 'post',
    data: params
  })
}
export const countryLists = (params) => {
  return axios({
    url: '/setting/country/lists',
    method: 'post',
    data: params
  })
}
export const countryAdd = (params) => {
  return axios({
    url: '/setting/country/add',
    method: 'post',
    data: params
  })
}
// 司机列表
// driver/lists

// 结算账期列表
export const periodLists = (params) => {
  return axios({
    url: '/setting/period/lists',
    method: 'post',
    data: params
  })
}
// 添加结算账期
export const periodAdd = (params) => {
  return axios({
    url: '/setting/period/add',
    method: 'post',
    data: params
  })
}
// 删除结算账期
export const periodDel = (params) => {
  return axios({
    url: '/setting/period/del',
    method: 'post',
    data: params
  })
}
// 修改结算账期
export const periodEdit = (params) => {
  return axios({
    url: '/setting/period/edit',
    method: 'post',
    data: params
  })
}
export {
  car, // 车辆
  menu, // 菜单
  api, // api
  personnel, // 员工管理
  driver, // 司机
  warehouse, // 操作
  milestone,
  FBA
}
