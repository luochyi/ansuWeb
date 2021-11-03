// const routerList = [];

export const common = {
  namespaced: true,
  state: {
    regiondata: null
  },
  mutations: {
    setPrint (state, regiondata) { // 设置参数
      state.regiondata = regiondata
    }
  },
  getters: {
  }
}
