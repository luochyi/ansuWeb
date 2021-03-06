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
export const agentInfo = (params) => {
  return axios({
    url: '/setting/agent/info',
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
export const agentServiceEdit = (params) => {
  return axios({
    url: '/setting/agent/service/edit',
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
// /setting/storehouse/fba/select
export const fbaSelect = () => {
  return axios({
    url: '/setting/storehouse/fba/select',
    method: 'post',
    data: {}
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
// /setting/channel/lists  渠道列表
export const channelLists = (params) => {
  return axios({
    url: '/setting/channel/lists',
    method: 'post',
    data: params
  })
}

// /setting/channel/disabled      channelId /setting/channel/enabled
export const channelDisabled = (params) => {
  return axios({
    url: '/setting/channel/disabled',
    method: 'post',
    data: params
  })
}
export const channelEnabled = (params) => {
  return axios({
    url: '/setting/channel/enabled',
    method: 'post',
    data: params
  })
}
// channelPriceAdd 添加价格计划
export const channelPriceAdd = (params) => {
  return axios({
    url: '/setting/channel/price/add',
    method: 'post',
    data: params
  })
}

export const channelAdd = (params) => {
  return axios({
    url: '/setting/channel/add',
    method: 'post',
    data: params
  })
}
// /setting/channel/service/lists渠道服务列表
export const channelServiceLists = (params) => {
  return axios({
    url: '/setting/channel/service/lists',
    method: 'post',
    data: params
  })
}
export const channelPrice = channelId => {
  return axios({
    url: '/setting/channel/price',
    method: 'post',
    data: {
      channelId: channelId
    }
  })
}
export const channelPlanLists = params => {
  return axios({
    url: '/setting/channel/plan/lists',
    method: 'post',
    data: params
  })
}
// /setting/channel/service/del
export const channelServiceDel = (params) => {
  return axios({
    url: '/setting/channel/service/del',
    method: 'post',
    data: params
  })
}
export const channelServiceMaster = (params) => {
  return axios({
    url: '/setting/channel/service/master',
    method: 'post',
    data: params
  })
}

export const agentServiceAll = (params) => {
  return axios({
    url: '/setting/agent/service/all',
    method: 'post',
    data: params
  })
}
// /setting/channel/service/add
export const channelServiceAdd = (params) => {
  return axios({
    url: '/setting/channel/service/add',
    method: 'post',
    data: params
  })
}
// /setting/channel/service/add
export const channelprice = (params) => {
  return axios({
    url: '/setting/channel/price',
    method: 'post',
    data: params
  })
}
export const channelPlanPrice = planId => {
  return axios({
    url: '/setting/channel/plan/price',
    method: 'post',
    data: {
      planId: planId
    }
  })
}
export const channelSelect = (params) => {
  return axios({
    url: '/setting/channel/select',
    method: 'post',
    data: params
  })
}
// channelId 渠道服务筛选
export const channelserviceSelect = (params) => {
  return axios({
    url: '/setting/channel/service/select',
    method: 'post',
    data: params
  })
}
export const agentServicePrice = agentServiceId => {
  return axios({
    url: '/setting/agent/service/price',
    method: 'post',
    data: {
      agentServiceId: agentServiceId
    }
  })
}
export const agentServicePlanLists = params => {
  return axios({
    url: '/setting/agent/service/plan/lists',
    method: 'post',
    data: params
  })
}
export const agentServicePlanPrice = planId => {
  return axios({
    url: '/setting/agent/service/plan/price',
    method: 'post',
    data: {
      planId: planId
    }
  })
}
export const agentSelectAddress = (params) => {
  return axios({
    url: '/setting/agent/select/address',
    method: 'post',
    data: params
  })
}
// 渠道详情
export const channelInfo = (params) => {
  return axios({
    url: '/setting/channel/info',
    method: 'post',
    data: params
  })
}
// setting/channel/edit/describe
export const channelEditDescribe = (params) => {
  return axios({
    url: '/setting/channel/edit/describe',
    method: 'post',
    data: params
  })
}
// setting/channel/edit/other
export const channelEditOther = (params) => {
  return axios({
    url: '/setting/channel/edit/other',
    method: 'post',
    data: params
  })
}

export const channelAdditiveAll = (params) => {
  return axios({
    url: '/setting/channel/additive/all',
    method: 'post',
    data: params
  })
}

export const channelAdditiveAdd = (params) => {
  return axios({
    url: '/setting/channel/additive/add',
    method: 'post',
    data: params
  })
}

export const channelAdditiveEdit = (params) => {
  return axios({
    url: '/setting/channel/additive/edit',
    method: 'post',
    data: params
  })
}

export const channelAdditiveDelete = (params) => {
  return axios({
    url: '/setting/channel/additive/delete',
    method: 'post',
    data: params
  })
}

export const agentServiceAdditiveAll = (params) => {
  return axios({
    url: '/setting/agent/service/additive/all',
    method: 'post',
    data: params
  })
}

export const agentServiceAdditiveAdd = (params) => {
  return axios({
    url: '/setting/agent/service/additive/add',
    method: 'post',
    data: params
  })
}

export const agentServiceAdditiveEdit = (params) => {
  return axios({
    url: '/setting/agent/service/additive/edit',
    method: 'post',
    data: params
  })
}

export const agentServiceAdditiveDelete = (params) => {
  return axios({
    url: '/setting/agent/service/additive/delete',
    method: 'post',
    data: params
  })
}

export const agentAddressLists = (params) => {
  return axios({
    url: '/setting/agent/address/lists',
    method: 'post',
    data: params
  })
}

export const agentAddressAdd = (params) => {
  return axios({
    url: '/setting/agent/address/add',
    method: 'post',
    data: params
  })
}

export const agentAddressEdit = (params) => {
  return axios({
    url: '/setting/agent/address/edit',
    method: 'post',
    data: params
  })
}

export const agentAddressDelete = (params) => {
  return axios({
    url: '/setting/agent/address/delete',
    method: 'post',
    data: params
  })
}
