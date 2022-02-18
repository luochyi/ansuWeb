import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { store } from '@/store/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 简易富文本
import QuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.bubble.css'
import 'quill/dist/quill.snow.css'
import commonTable from './components/table/table'
import commonDrawer from './components/drawer/drawer'
import commonDetail from './components/detail/detail'
// import commonForm from './components/form/index'

// echarts
import echarts from 'echarts'
//
import util from '@/utils/util.js'
import api from './api/api'

Vue.prototype.echarts = echarts // echarts
Vue.prototype.$baseUrl = process.env.VUE_APP_URL
Vue.use(QuillEditor)

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(util)
// 注册组件
Vue.component('commonTable', commonTable)
Vue.component('commonDrawer', commonDrawer)
Vue.component('commonDetail', commonDetail)
// Vue.component('commonForm', commonForm)
let hasRegion = false
// 路由判断登录 根据路由配置文件的参数
router.beforeEach((to, from, next) => {
  const isLogin = sessionStorage.getItem('token')
  if (isLogin) {
    if (!hasRegion) {
      hasRegion = true
      let provinceOptions = []
      api.common.settingRegionAll().then(res => {
        res.data && res.data.forEach(ele => {
          let province = {
            value: ele.id,
            label: ele.name,
            children: []
          }
          if (province.value === ele.id) {
            ele.children && ele.children.forEach(eles => {
              let city = {
                value: eles.id,
                label: eles.name,
                children: []
              }
              if (city.value === eles.id) {
                eles.children && eles.children.forEach(item => {
                  let county = {
                    value: item.id,
                    label: item.name
                  }
                  city.children.push(county)
                })
              }
              province.children.push(city)
            })
            province.children.push()
          }
          province.children.push()
          provinceOptions.push(province)
        })
      })
      store.commit('common/setPrint', provinceOptions)
    }
    next()
  } else {
    if (to.path === '/Login') {
      // 这就是跳出循环的关键
      next()
    } else {
      // router.replace({
      //     path: '/'
      // })
      next('/Login')
      // next()
    }
  }
  // next('/Login')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
