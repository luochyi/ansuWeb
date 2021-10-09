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

// echarts
import echarts from 'echarts'
//
import util from '@/utils/util.js'

Vue.prototype.echarts = echarts // echarts
Vue.use(QuillEditor)

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(util)
// 注册组件
Vue.component('commonTable', commonTable)
Vue.component('commonDrawer', commonDrawer)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
// 路由判断登录 根据路由配置文件的参数
router.beforeEach((to, from, next) => {
  const isLogin = sessionStorage.getItem('token')
  if (isLogin) {
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
