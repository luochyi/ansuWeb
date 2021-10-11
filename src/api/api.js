/*
 * 接口统一集成模块
 */
import * as agent from './agent'
import * as common from './public'
import * as configure from './configure'
import * as customer from './customer'
// 默认全部导出

export default {
  agent,
  common,
  configure,
  customer
}
