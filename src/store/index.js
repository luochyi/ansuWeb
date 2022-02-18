import Vue from 'vue'
import Vuex from 'vuex'

import { router } from './module/router'
import { common } from './module/common'
import persistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export const store = new Vuex.Store({
  plugins: [persistedState()],
  modules: {
    router,
    common
    // user,
    // dictionary
  }
})
