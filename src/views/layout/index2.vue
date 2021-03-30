<template>
  <el-container
    style="background: #f0f2f5"
    :class="[isSider ? 'openside' : 'hideside', isMobile ? 'mobile' : '']"
    class="beijing"
  >
    <el-header></el-header>
    <el-container>
      <!-- 侧边 -->
      <el-aside class="aside main-left">
        <!-- <el-row type="flex" justify="center"  align="middle"> -->
        <!-- <el-col :span="4"></el-col> -->
        <div class="tilte">
          <!-- <img alt class="logoimg" src="@/assets/logo.png" /> -->
          <h2 class="tit-text" v-if="isSider">Ant Design Pro</h2>
        </div>

        <!-- <el-col :span="16" class="font1">Ant Design Pro</el-col> -->
        <!-- </el-row> -->
        <el-scrollbar style="height: calc(100vh - 64px)">
          <!-- 导航栏 -->
          <el-menu
            background-color="#000D17"
            class="el-menu-vertical"
            :collapse-transition="false"
            :collapse="isCollapse"
            text-color="white"
            style="height: 100%"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-s-tools"></i>
                <span class="font2">商品管理</span>
              </template>
              <el-menu-item index="1-1">
                <i class="el-icon-s-tools"></i>
                <span class="font3">商品列表</span>
              </el-menu-item>
              <el-menu-item index="1-2">
                <p class="font3">新增商品</p>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-s-tools"></i>
                <span class="font2">商品管理</span>
              </template>
              <el-menu-item index="1-1">
                <p class="font3">商品列表</p>
              </el-menu-item>
              <el-menu-item index="1-2">
                <p class="font3">新增商品</p>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-s-tools"></i>
                <span class="font2">商品管理</span>
              </template>
              <el-menu-item index="1-1">
                <p class="font3">商品列表</p>
              </el-menu-item>
              <el-menu-item index="1-2">
                <p class="font3">新增商品</p>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-s-tools"></i>
                <span class="font2">商品管理</span>
              </template>
              <el-menu-item index="1-1">
                <p class="font3">商品列表</p>
              </el-menu-item>
              <el-menu-item index="1-2">
                <p class="font3">新增商品</p>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-s-tools"></i>
                <span class="font2">商品管理</span>
              </template>
              <el-menu-item index="1-1">
                <p class="font3">商品列表</p>
              </el-menu-item>
              <el-menu-item index="1-2">
                <p class="font3">新增商品</p>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-s-tools"></i>
                <span class="font2">商品管理</span>
              </template>
              <el-menu-item index="1-1">
                <p class="font3">商品列表</p>
              </el-menu-item>
              <el-menu-item index="1-2">
                <p class="font3">新增商品</p>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-scrollbar>
      </el-aside>

      <!-- 主体 -->
      <el-main>
        <!-- 头部 -->
        <el-header
          class="header-cont"
          :style="{
            width: `calc(100% - ${
              isMobile ? '0px' : isCollapse ? '54px' : '220px'
            })`
          }"
        >
          <el-col
            :xs="2"
            :lg="1"
            :md="1"
            :sm="1"
            :xl="1"
            class="header-box right-box"
          >
            <div class="menu-total" @click="totalCollapse">
              <i class="el-icon-s-unfold big-icon" v-if="isCollapse"></i>
              <i class="el-icon-s-fold big-icon" v-else></i>
            </div>
          </el-col>
          <el-col
            :xs="10"
            :lg="14"
            :md="14"
            :sm="9"
            :xl="14"
            class="header-box"
          >
            123
            <!-- <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
              <el-breadcrumb-item
              :key="item.path"
              v-for="item in matched.slice(1,matched.length)"
              >{{item.meta.title}}</el-breadcrumb-item>
            </el-breadcrumb> -->
          </el-col>
          <el-col :xs="12" :lg="9" :md="9" :sm="14" :xl="9" class="header-box">
            <div class="right-box">
              <search></search>
              <el-dropdown>
                <span class="header-avatar">
                  <!-- <span style="margin-left: 5px">{{userInfo.nickName}}</span> -->
                  <i class="el-icon-arrow-down"></i>
                </span>
                <el-dropdown-menu class="dropdown-group" slot="dropdown">
                  <el-dropdown-item>
                    <span>
                      更多信息
                      <el-badge is-dot />
                    </span>
                  </el-dropdown-item>
                  <el-dropdown-item icon="el-icon-s-custom"
                    >个人信息</el-dropdown-item
                  >
                  <el-dropdown-item icon="el-icon-table-lamp"
                    >登 出</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </el-col>
          <!-- <el-col>
              <span class="list">
                <i class="el-icon-s-fold"></i>
              </span>
              <span class="user">
                <el-button type="primary" icon="el-icon-user" size="mini" circle></el-button>用户名
              </span>
            </el-col> -->
        </el-header>
        <history></history>

        <!-- 主体内容 -->
        <transition mode="out-in" name="el-fade-in-linear">
          <!-- <keep-alive>
            <router-view
              v-loading="loadingFlag"
              element-loading-text="正在加载中"
              class="admin-box"
              v-if="$route.meta.keepAlive"
            ></router-view>
          </keep-alive> -->
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import search from "@/views/layout/search";
import history from "@/views/layout/aside/historyComponent/history";
export default {
  data() {
    return {
      active: "",
      show: false,
      isCollapse: false,
      isSider: true,
      isMobile: false,
      isShadowBg: false,
      loadingFlag: false
    };
  },
  created() {
    this.$bus.on("collapse", item => {
      this.isCollapse = item;
    });
  },
  // beforeDestroy() {
  //   this.$bus.off("collapse");
  // },
  components: {
    search,
    history
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
