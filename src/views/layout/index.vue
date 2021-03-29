<template>
  <el-container
    style="background: #f0f2f5"
    :class="[isSider ? 'openside' : 'hideside', isMobile ? 'mobile' : '']"
    class="beijing"
  >
    <el-header class="head">
      <el-row class="tilte" align="middle" type="flex">
        <el-col :span="3">
          <!-- <img alt class="logoimg" src="@/assets/logo.png" /> -->
          <span class="tit-text">安速货运</span>
        </el-col>
        <el-col :span="18">
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
          >
            <el-menu-item
              :index="item.menuId"
              v-for="(item, indexs) in menu"
              :key="indexs"
            >
              {{ item.meta.title }}
            </el-menu-item>
            <!-- <el-menu-item index="1">概览</el-menu-item>
            <el-menu-item index="2">订单管理</el-menu-item>
            <el-menu-item index="3">财务费用</el-menu-item>
            <el-menu-item index="4">渠道配置</el-menu-item>
            <el-menu-item index="5">客户管理</el-menu-item>
            <el-menu-item index="6">账号管理</el-menu-item>
            <el-menu-item index="7">配置中心</el-menu-item>
            <el-menu-item index="8">系统配置</el-menu-item> -->
          </el-menu>
        </el-col>
        <el-col :span="3">
          <span class="user">你好，{{ user }}</span>
          <el-button type="text" class="red" style="">退出</el-button>
        </el-col>
      </el-row>
    </el-header>

    <el-container>
      <!-- 侧边 -->
      <el-aside class="aside main-left" width="200px">
        <el-scrollbar style="height: calc(100vh - 60px)">
          <!-- 导航栏 -->
          <asides :num="Number(activeIndex)"></asides>
          <!-- <el-menu
            background-color="#fff"
            class="el-menu-vertical"
            :collapse-transition="false"
            :collapse="isCollapse"
            text-color="white"
            style="height: 100%"
          >
            <el-menu-item
              :index="item.name"
              v-for="(item, index) in menu[activeIndex].children"
              :key="index"
            >
              <i class="el-icon-menu"></i>
              <span slot="title" class="font">{{ item.meta.title }}</span>
            </el-menu-item>
          </el-menu> -->
        </el-scrollbar>
      </el-aside>

      <!-- 主体 -->
      <el-main>
        <history></history>
        <!-- 主体内容 -->
        <transition mode="out-in" name="el-fade-in-linear">
          <!-- <keep-alive> -->
          <router-view
            v-loading="loadingFlag"
            element-loading-text="正在加载中"
            class="admin-box"
          ></router-view>
          <!-- </keep-alive> -->
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import history from "@/views/layout/aside/historyComponent/history";
import asides from "@/views/layout/aside/index.vue";
export default {
  data() {
    return {
      menu: [
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
            }
          ]
        }
      ],
      user: "张三",
      activeIndex: "1",

      active: "",
      show: false,
      isCollapse: false,
      isSider: true,
      isMobile: false,
      isShadowBg: false,
      loadingFlag: false
    };
  },
  // created() {
  //   this.$bus.on("collapse", item => {
  //     this.isCollapse = item;
  //   });
  // },
  // beforeDestroy() {
  //   this.$bus.off("collapse");
  // },
  components: {
    history,
    asides
  },
  methods: {
    totalCollapse() {
      this.isCollapse = !this.isCollapse;
      this.isSider = !this.isCollapse;
      this.isShadowBg = !this.isCollapse;
      this.$bus.emit("collapse", this.isCollapse);
    }
  }
};
</script>

<style lang="scss" scoped>
.main {
  background: #f0f0f0;
  width: 100%;
  padding: 40px;
}
</style>
