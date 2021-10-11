<template>
  <el-container
    style='background: #f0f2f5'
    :class="[isSider ? 'openside' : 'hideside', isMobile ? 'mobile' : '']"
    class='beijing'
  >
    <el-header class='head'>
      <el-row class='tilte' align='middle' type='flex'>
        <el-col :span='3'>
          <!-- <img alt class='logoimg' src='@/assets/logo.png' /> -->
          <span class='tit-text'>安速货运</span>
        </el-col>
        <el-col :span='18' class='firstMenu'>
          <el-menu
            :default-active='activeIndex'
            class='el-menu-demo'
            :router='true'
            mode='horizontal'
            @select='select'
          >
            <el-menu-item
              :index='item.menuId'
              v-for='(item, indexs) in menu'
              :key='indexs'
              :route='{ name: item.path }'
            >
              {{ item.meta.title }}
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span='3'>
          <span class='user'>你好，{{ uname }}</span>
          <el-button type='text' class='red' style='' @click="logout()">退出</el-button>
        </el-col>
      </el-row>
    </el-header>

    <el-container>
      <!-- 侧边 -->
      <el-aside class='aside main-left' width='200px'>
        <el-scrollbar style='height: calc(100vh - 60px)'>
          <!-- 导航栏 -->
          <asides :num='Number(activeIndex)'></asides>
        </el-scrollbar>
      </el-aside>

      <!-- 主体 -->
      <el-main>
        <history></history>
        <!-- 主体内容 -->
        <div style='padding: 0px 24px'>
          <transition mode='out-in' name='el-fade-in-linear'>
            <!-- <keep-alive> -->
            <router-view
              v-loading='loadingFlag'
              element-loading-text='正在加载中'
              class='admin-box'
            ></router-view>
            <!-- </keep-alive> -->
          </transition>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import history from '@/views/layout/aside/historyComponent/history'
import asides from '@/views/layout/aside/index.vue'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      menu: [
        {
          name: 'summary',
          meta: {
            title: '概述',
            icon: 'gaishuIcon',
            hidden: false
          },
          ID: 0,
          menuId: '0',
          path: 'summary',
          parentId: '0',
          children: []
        },
        {
          name: 'orderManager',
          meta: {
            title: '订单管理',
            icon: 'orderIcon',
            hidden: false
          },
          ID: 1,
          menuId: '1',
          path: 'orderManager',
          parentId: '0',
          children: [
            {
              name: 'prediction',
              meta: {
                title: '预报管理',
                icon: 'predictionIcon',
                hidden: false
              },
              ID: 10,
              menuId: '10',
              path: 'prediction',
              parentId: '1'
            },
            {
              name: 'waybill',
              meta: {
                title: '预报运单',
                icon: 'waybillIcon',
                hidden: false
              },
              ID: 11,
              menuId: '11',
              path: 'waybill',
              parentId: '1'
            },
            {
              name: 'management',
              meta: {
                title: '运单管理',
                icon: 'managementIcon',
                hidden: false
              },
              ID: 12,
              menuId: '12',
              path: 'historyOrder',
              parentId: '1'
            },
            {
              name: 'portissues',
              meta: {
                title: '港前问题件',
                icon: 'portissuesIcon',
                hidden: false
              },
              ID: 13,
              menuId: '13',
              path: 'portissues',
              parentId: '1'
            },
            {
              name: 'Postportissues',
              meta: {
                title: '港后问题件',
                icon: 'PostportissuesIcon',
                hidden: false
              },
              ID: 14,
              menuId: '14',
              path: 'Postportissues',
              parentId: '1'
            },
            {
              name: 'sjmssq',
              meta: {
                title: '收件免扫申请',
                icon: 'sjmssq',
                hidden: false
              },
              ID: 15,
              menuId: '15',
              path: 'sjmssq',
              parentId: '1'
            },
            {
              name: 'gmbxyd',
              meta: {
                title: '购买保险运单',
                icon: 'gmbxyd',
                hidden: false
              },
              ID: 16,
              menuId: '16',
              path: 'gmbxyd',
              parentId: '1'
            }, {
              name: 'ccd',
              meta: {
                title: '出仓单',
                icon: 'ccd',
                hidden: false
              },
              ID: 17,
              menuId: '17',
              path: 'ccd',
              parentId: '1'
            }
          ]
        },
        {
          name: 'Financialexpenses',
          meta: {
            title: '财务费用',
            icon: 'FinanceIcon',
            hidden: false
          },
          ID: 2,
          menuId: '2',
          path: 'Financialexpenses',
          parentId: '0',
          children: [
            {
              name: 'Waybillfee',
              meta: {
                title: '运单费用',
                icon: 'finance',
                hidden: false
              },
              ID: 20,
              menuId: '20',
              path: 'Waybillfee',
              parentId: '2',
              children: [
                {
                  name: 'expenseConfirmation',
                  meta: {
                    title: '费用确认',
                    icon: 'expenseConfirmation',
                    hidden: false
                  },
                  ID: 201,
                  menuId: '201',
                  path: 'expenseConfirmation',
                  parentId: '20'
                },
                {
                  name: 'expenseAudit',
                  meta: {
                    title: '费用审核',
                    icon: 'expenseAudit',
                    hidden: false
                  },
                  ID: 202,
                  menuId: '202',
                  path: 'expenseAudit',
                  parentId: '20'
                },
                {
                  name: 'expenseConfirmationForm',
                  meta: {
                    title: '费用确认单',
                    icon: 'expenseConfirmationForm',
                    hidden: false
                  },
                  ID: 203,
                  menuId: '203',
                  path: 'expenseConfirmationForm',
                  parentId: '20'
                },
                {
                  name: 'expenseRegister',
                  meta: {
                    title: '费用登记',
                    icon: 'expenseRegister',
                    hidden: false
                  },
                  ID: 204,
                  menuId: '204',
                  path: 'expenseRegister',
                  parentId: '20'
                }
              ]
            },
            {
              name: 'Rmanagement',
              meta: {
                title: '应收管理',
                icon: 'Rmanagement',
                hidden: false
              },
              ID: 21,
              menuId: '21',
              path: 'Rmanagement',
              parentId: '2',
              children: [
                {
                  name: 'receivablestatement',
                  meta: {
                    title: '应收对账单',
                    icon: 'receivablestatement',
                    hidden: false
                  },
                  ID: 211,
                  menuId: '211',
                  path: 'receivablestatement',
                  parentId: '21'
                },
                {
                  name: 'paymentrecord',
                  meta: {
                    title: '来款记录',
                    icon: 'paymentrecord',
                    hidden: false
                  },
                  ID: 212,
                  menuId: '212',
                  path: 'paymentrecord',
                  parentId: '21'
                },
                {
                  name: 'Billwriteoff',
                  meta: {
                    title: '账单核销',
                    icon: 'Billwriteoff',
                    hidden: false
                  },
                  ID: 213,
                  menuId: '213',
                  path: 'Billwriteoff',
                  parentId: '21'
                },
                {
                  name: 'Writeoffrecord',
                  meta: {
                    title: '核销记录',
                    icon: 'Writeoffrecord',
                    hidden: false
                  },
                  ID: 214,
                  menuId: '214',
                  path: 'Writeoffrecord',
                  parentId: '21'
                }
              ]
            },
            {
              name: 'Payablemanagement',
              meta: {
                title: '应付管理',
                icon: 'Payablemanagement',
                hidden: false
              },
              ID: 22,
              menuId: '22',
              path: 'Payablemanagement',
              parentId: '2',
              children: [
                {
                  name: 'Payablemanagement',
                  meta: {
                    title: '应付管理',
                    icon: 'Payablemanagement',
                    hidden: false
                  },
                  ID: 221,
                  menuId: '221',
                  path: 'Payablemanagement',
                  parentId: '22'
                },
                {
                  name: 'Paymentapplication',
                  meta: {
                    title: '付款申请',
                    icon: 'Paymentapplication',
                    hidden: false
                  },
                  ID: 222,
                  menuId: '222',
                  path: 'Paymentapplication',
                  parentId: '22'
                },
                {
                  name: 'Paymentapproval',
                  meta: {
                    title: '付款审核',
                    icon: 'Paymentapproval',
                    hidden: false
                  },
                  ID: 223,
                  menuId: '223',
                  path: 'Paymentapproval',
                  parentId: '22'
                }
              ]
            },
            {
              name: 'other',
              meta: {
                title: '其他',
                icon: 'other',
                hidden: false
              },
              ID: 23,
              menuId: '23',
              path: 'other',
              parentId: '2',
              children: [
                {
                  name: 'Losssheet',
                  meta: {
                    title: '亏损单',
                    icon: 'Losssheet',
                    hidden: false
                  },
                  ID: 231,
                  menuId: '231',
                  path: 'Losssheet',
                  parentId: '231'
                },
                {
                  name: 'Deductgrossprofit',
                  meta: {
                    title: '扣毛利',
                    icon: 'Deductgrossprofit',
                    hidden: false
                  },
                  ID: 232,
                  menuId: '232',
                  path: 'Deductgrossprofit',
                  parentId: '23'
                }
              ]
            }
          ]
        },
        {
          name: 'channel',
          meta: {
            title: '渠道代理',
            icon: 'channelIcon',
            hidden: false
          },
          ID: 3,
          menuId: '3',
          path: 'channel',
          parentId: '0',
          children: [
            {
              name: 'agentManage',
              meta: {
                title: '代理管理',
                icon: 'agentManage',
                hidden: false
              },
              ID: 30,
              menuId: '30',
              path: 'agentManage',
              parentId: '3'
            },
            {
              name: 'channelAllocation',
              meta: {
                title: '渠道管理',
                icon: 'channelAllocation',
                hidden: false
              },
              ID: 31,
              menuId: '31',
              path: 'channelAllocation',
              parentId: '3',
              children: [
                {
                  name: 'channelSetting',
                  meta: {
                    title: '渠道设置',
                    icon: 'channelSetting',
                    hidden: false
                  },
                  ID: 310,
                  menuId: '310',
                  path: 'channelSetting',
                  parentId: '31'
                },
                {
                  name: 'channelBrandAgent',
                  meta: {
                    title: '渠道下属代理',
                    icon: 'channelBrandAgent',
                    hidden: false
                  },
                  ID: 311,
                  menuId: '311',
                  path: 'channelBrandAgent',
                  parentId: '31'
                }
              ]
            },
            {
              name: 'subsidiaryChannel',
              meta: {
                title: '子公司渠道',
                icon: 'subsidiaryChannel',
                hidden: false
              },
              ID: 32,
              menuId: '32',
              path: 'subsidiaryChannel',
              parentId: '3'
            },
            {
              name: 'invoiceTemplate',
              meta: {
                title: '发票模板',
                icon: 'invoiceTemplate',
                hidden: false
              },
              ID: 33,
              menuId: '33',
              path: 'invoiceTemplate',
              parentId: '3'
            }
          ]
        },
        {
          name: 'customerManage',
          meta: {
            title: '客户管理',
            icon: 'channelIcon',
            hidden: false
          },
          ID: 4,
          menuId: '4',
          path: 'customerManage',
          parentId: '4',
          children: [
            {
              name: 'highSeaCustomers',
              meta: {
                title: '公海客户',
                icon: 'predictionIcon',
                hidden: false
              },
              ID: 40,
              menuId: '40',
              path: 'highSeaCustomers',
              parentId: '4'
            },
            {
              name: 'privateSea',
              meta: {
                title: '私海客户',
                icon: 'predictionIcon',
                hidden: false
              },
              ID: 41,
              menuId: '41',
              path: 'privateSea',
              parentId: '4'
            },
            {
              name: 'myCustomer',
              meta: {
                title: '我的客户',
                icon: 'predictionIcon',
                hidden: false
              },
              ID: 42,
              menuId: '42',
              path: 'myCustomer',
              parentId: '4'
            }
          ]
        },
        {
          name: 'configureCenter',
          meta: {
            title: '配置中心',
            icon: 'configIcon',
            hidden: false
          },
          ID: 5,
          menuId: '5',
          path: 'configureCenter',
          parentId: '0',
          children: [
            {
              name: 'Subsidiarymanagement',
              meta: {
                title: '子公司管理',
                icon: 'predictionIcon',
                hidden: false
              },
              ID: 50,
              menuId: '50',
              path: 'Subsidiarymanagement',
              parentId: '5'
            },
            {
              name: 'organizationalStructure',
              meta: {
                title: '组织架构',
                icon: 'predictionIcon',
                hidden: false
              },
              ID: 51,
              menuId: '51',
              path: 'organizationalStructure',
              parentId: '5'
            },
            {
              name: 'Employeeaccount',
              meta: {
                title: '员工账号',
                icon: 'Employeeaccount',
                hidden: false
              },
              ID: 52,
              menuId: '52',
              path: 'Employeeaccount',
              parentId: '5'
            },
            {
              name: 'menuManagement',
              meta: {
                title: '菜单管理',
                icon: 'menuManagement',
                hidden: false
              },
              ID: 53,
              menuId: '53',
              path: 'menuManagement',
              parentId: '5'
            },
            // driverManagementIcon
            {
              name: 'driverManagement',
              meta: {
                title: '司机管理',
                icon: 'driverManagement',
                hidden: false
              },
              ID: 53,
              menuId: '53',
              path: 'distributionDriver',
              parentId: '5'
            },
            {
              name: 'truckManagement',
              meta: {
                title: '车辆管理',
                icon: 'truckManagement',
                hidden: false
              },
              ID: 54,
              menuId: '54',
              path: 'truckManagement',
              parentId: '5'
            },
            {
              name: 'customerAccount',
              meta: {
                title: '客户账号',
                icon: 'customerAccount',
                hidden: false
              },
              ID: 55,
              menuId: '55',
              path: 'customerAccount',
              parentId: '5'
            },
            {
              name: 'Customerlevel',
              meta: {
                title: '客户等级',
                icon: 'Customerlevel',
                hidden: false
              },
              ID: 56,
              menuId: '56',
              path: 'Customerlevel',
              parentId: '5'
            },
            {
              name: 'receivingWarehouseManage',
              meta: {
                title: '收货仓管理',
                icon: 'receivingWarehouseManage',
                hidden: false
              },
              ID: 57,
              menuId: '57',
              path: 'receivingWarehouseManage',
              parentId: '5'
            },
            {
              name: 'warehouseOperation',
              meta: {
                title: '仓库操作管理',
                icon: 'warehouseOperation',
                hidden: false
              },
              ID: 58,
              menuId: '58',
              path: 'warehouseOperation',
              parentId: '5'
            },
            {
              name: 'currencyExchangerate',
              meta: {
                title: '货币汇率',
                icon: 'currencyExchangerate',
                hidden: false
              },
              ID: 59,
              menuId: '59',
              path: 'currencyExchangerate',
              parentId: '5'
            },
            {
              name: 'countryManagement',
              meta: {
                title: '目的国管理',
                icon: 'countryManagement',
                hidden: false
              },
              ID: 591,
              menuId: '591',
              path: 'countryManagement',
              parentId: '5'
            },
            {
              name: 'milestoneConfiguration',
              meta: {
                title: '里程碑配置',
                icon: 'milestoneConfiguration',
                hidden: false
              },
              ID: 592,
              menuId: '592',
              path: 'milestoneConfiguration',
              parentId: '5'
            },
            {
              name: 'FBAmanage',
              meta: {
                title: 'FBA仓管理',
                icon: 'FBAmanage',
                hidden: false
              },
              ID: 593,
              menuId: '593',
              path: 'FBAmanage',
              parentId: '5'
            }
          ]
        }
      ],

      uname: '',
      activeIndex: '',

      active: '',
      show: false,
      isCollapse: false,
      isSider: true,
      isMobile: false,
      isShadowBg: false,
      loadingFlag: false
    }
  },
  mounted () {
    this.uid = sessionStorage.getItem('id')
    this.uname = sessionStorage.getItem('name')
    let arr = this.$route.path.split('/')[1]
    console.log(this.$route.name)
    console.log(this.menu)
    this.menu.forEach((item, index) => {
      item.children.forEach(items => {
        console.log(items.name)
        if (items.name === arr) {
          this.activeIndex = String(index)
        }
        if (items.children) {
          items.children.forEach(itms => {
            if (itms.name === this.$route.name || itms.name === arr) {
              this.activeIndex = String(index)
            }
          })
        }
      })
    })
    console.log(this)
    this.setRouter()
  },
  watch: {
    $route (to) {
      let arr = to.path.split('/')[1]
      console.log(this.$route.name)
      this.menu.forEach((item, index) => {
        item.children.forEach(items => {
          if (items.name === arr) {
            this.activeIndex = String(index)
          }
        })
      })
    }
  },
  components: {
    history,
    asides
  },
  methods: {
    ...mapActions('router', ['setAsyncRouter']),
    select (val) {
      this.activeIndex = val
      console.log(this.activeIndex)
    },
    setRouter () {
      this.setAsyncRouter(this.menu)
    },
    logout () {
      this.$api.common.logout().then(res => {
        console.log(res)
        if (res.msg === '退出成功') {
          this.$message.success('退出成功')
          this.$router.push('/login')
        }
      })
    }
  }
}
</script>
