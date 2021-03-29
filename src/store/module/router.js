// const routerList = [];

export const router = {
  namespaced: true,
  state: {
    asyncRouters: [
      {
        name: "summary",
        meta: {
          title: "概述",
          icon: "gaishuIcon",
          hidden: false
        },
        ID: 0,
        menuId: "0",
        path: "summary",
        sort: 0,
        parentId: "0",
        children: []
      },
      {
        name: "order",
        meta: {
          title: "订单管理",
          icon: "orderIcon",
          hidden: false
        },
        ID: 1,
        menuId: "1",
        path: "order",
        sort: 1,
        parentId: "0",
        children: [
          {
            name: "prediction",
            meta: {
              title: "预报管理",
              icon: "predictionIcon",
              hidden: false
            },
            ID: 30,
            menuId: "30",
            path: "prediction",
            sort: 30,
            parentId: "1"
          },
          {
            name: "waybill",
            meta: {
              title: "运单管理",
              icon: "waybillIcon",
              hidden: false
            },
            ID: 31,
            menuId: "31",
            path: "waybill",
            sort: 31,
            parentId: "1"
          },
          {
            name: "historyOrder",
            meta: {
              title: "历史订单",
              icon: "historyOrder",
              hidden: false
            },
            ID: 32,
            menuId: "32",
            path: "historyOrder",
            sort: 32,
            parentId: "1"
          },
          {
            name: "collection",
            meta: {
              title: "收款管理",
              icon: "collection",
              hidden: false
            },
            children: [
              {
                name: "receivable",
                meta: {
                  title: "应收对账",
                  icon: "receivable",
                  hidden: false
                },
                ID: 40,
                menuId: "40",
                path: "receivable",
                sort: 40,
                parentId: "33"
              }
            ],
            ID: 33,
            menuId: "33",
            path: "collection",
            sort: 33,
            parentId: "1"
          }
        ]
      }
    ],
    routerList: []
  },
  mutations: {
    setRouterList(state, routerList) {
      state.routerList = routerList;
    },
    // 设置动态路由
    setAsyncRouter(state, asyncRouters) {
      state.asyncRouters = asyncRouters;
    }
  },
  getters: {
    // 获取动态路由
    asyncRouters(state) {
      return state.asyncRouters;
    },
    routerList(state) {
      return state.routerList;
    }
  }
};
