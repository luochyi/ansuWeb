/*
 * 接口统一集成模块
 */
import * as agent from './agent'
import * as common from './public'
import * as configure from './configure'
import * as setting from './setting'
import * as company from './company'
import * as customer from './customer'
import * as Ordermanagement from './Ordermanagement'
import * as finance from './finance'
// 默认全部导出

export default {
  agent,
  common,
  configure,
  setting,
  company,
  customer,
  finance,
  Ordermanagement
}
