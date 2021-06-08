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
          <span class='user'>你好，{{ user }}</span>
          <el-button type='text' class='red' style=''>退出</el-button>
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
          name: 'order',
          meta: {
            title: '订单管理',
            icon: 'orderIcon',
            hidden: false
          },
          ID: 1,
          menuId: '1',
          path: 'order',
          parentId: '0',
          children: [
            {
              name: 'prediction',
              meta: {
                title: '预报管理',
                icon: 'predictionIcon',
                hidden: false
              },
              ID: 30,
              menuId: '30',
              path: 'prediction',
              parentId: '1'
            },
            {
              name: 'waybill',
              meta: {
                title: '运单管理',
                icon: 'waybillIcon',
                hidden: false
              },
              ID: 31,
              menuId: '31',
              path: 'waybill',
              parentId: '1'
            },
            {
              name: 'historyOrder',
              meta: {
                title: '历史订单',
                icon: 'historyOrder',
                hidden: false
              },
              ID: 32,
              menuId: '32',
              path: 'historyOrder',
              parentId: '1'
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
          ID: 2,
          menuId: '2',
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
              parentId: '1'
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
              parentId: '1',
              children: [
                {
                  name: 'channelSetting',
                  meta: {
                    title: '渠道设置',
                    icon: 'channelSetting',
                    hidden: false
                  },
                  ID: 120,
                  menuId: '120',
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
                  ID: 121,
                  menuId: '121',
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
              parentId: '1'
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
              parentId: '1'
            }
          ]
        }
      ],

      user: '张三',
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
    let arr = this.$route.path.split('/')[1]
    console.log(this.$route.name)
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
    }
  }
}
</script>
