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
Vue.use(QuillEditor)

import util from '@/utils/util.js'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(util)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
