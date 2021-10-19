import { GetAxios } from '@/utils/request'
const axios = GetAxios((config) => {
  // 在发送请求之前做些什么
  config.headers['Ansuex-Manage-Token'] = sessionStorage.getItem('token')
  return config
}, () => {
  location.href = '/'
}, process.env.VUE_APP_URL)

// 代理管理 列表
export const settingAgentLists = (params) => {
  return axios({
    url: '/setting/agent/lists',
    method: 'post',
    data: params
  })
}
export const agentAdd = (params) => {
  return axios({
    url: '/setting/agent/add',
    method: 'post',
    data: params
  })
}
// /setting/period/select
export const periodSelect = (params) => {
  return axios({
    url: '/setting/period/select',
    method: 'post',
    data: params
  })
}
export const enabled = (params) => {
  return axios({
    url: '/setting/agent/enabled',
    method: 'post',
    data: params
  })
}
export const disabled = (params) => {
  return axios({
    url: '/setting/agent/disabled',
    method: 'post',
    data: params
  })
}
export const select = () => {
  return axios({
    url: '/setting/agent/select',
    method: 'post',
    data: { }
  })
}
// /setting/agent/service/lists代理服务
export const agentServiceLists = (params) => {
  return axios({
    url: '/setting/agent/service/lists',
    method: 'post',
    data: params
  })
}
// /setting/agent/service/disabled
export const serviceDisabled = (params) => {
  return axios({
    url: '/setting/agent/service/disabled',
    method: 'post',
    data: params
  })
}
// /setting/agent/service/disabled
export const serviceEnabled = (params) => {
  return axios({
    url: '/setting/agent/service/enabled',
    method: 'post',
    data: params
  })
}
export const agentServiceAdd = (params) => {
  return axios({
    url: '/setting/agent/service/add',
    method: 'post',
    data: params
  })
}

// setting/agent/service/price/add
export const priceAdd = (params) => {
  return axios({
    url: '/setting/agent/service/price/add',
    method: 'post',
    data: params
  })
}
// /setting/storehouse/fba/select/country
export const selectFba = (params) => {
  return axios({
    url: '/setting/storehouse/fba/select/country',
    method: 'post',
    data: params
  })
}
// /setting/country/select
export const selectCountry = (params) => {
  return axios({
    url: '/setting/country/select',
    method: 'post',
    data: params
  })
}
