<template>
  <div class="routerHistory">
    <el-tabs
      :closable="!(historys.length == 1 && this.$route.name == 'dashboard')"
      @contextmenu.prevent.native="openContextMenu($event)"
      @tab-click="changeTab"
      @tab-remove="removeTab"
      type="card"
      v-model="activeValue"
    >
      <el-tab-pane
        :key="item.name"
        :label="item.meta.title"
        :name="item.name"
        :tab="item"
        v-for="item in historys"
      ></el-tab-pane>
    </el-tabs>

    <!--自定义右键菜单html代码-->
    <ul
      :style="{ left: left + 'px', top: top + 'px' }"
      class="contextmenu"
      v-show="contextMenuVisible"
    >
      <li @click="closeAll">关闭所有</li>
      <li @click="closeLeft">关闭左侧</li>
      <li @click="closeRight">关闭右侧</li>
      <li @click="closeOther">关闭其他</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "HistoryComponent",
  data() {
    return {
      historys: [],
      activeValue: "dashboard",
      contextMenuVisible: false,
      left: 0,
      top: 0,
      rightActive: ""
    };
  },
  created() {
    const initHistorys = [
      {
        name: "prediction",
        meta: {
          title: "预报管理",
          icon: "predictionIcon",
          hidden: false
        }
      }
    ];
    this.historys =
      JSON.parse(sessionStorage.getItem("historys")) || initHistorys;
    this.historys.forEach(item => {
      if (item.name === this.$route.name) {
        this.activeValue = item.name;
      }
    });
  },
  methods: {
    openContextMenu(e) {
      if (this.historys.length == 1 && this.$route.name == "dashboard") {
        return false;
      }
      if (e.srcElement.id) {
        this.contextMenuVisible = true;
        // let width
        // if (this.isCollapse) {
        //   width = 54
        // } else {
        //   width = 22
        // }
        // if (this.isMobile) {
        //   width = 0
        // }
        this.left = e.clientX;
        this.top = e.clientY + 10;
        this.rightActive = e.srcElement.id.split("-")[1];
      }
    },
    closeAll() {
      this.historys = [
        {
          name: "prediction",
          meta: {
            title: "预报管理",
            icon: "predictionIcon",
            hidden: false
          }
        }
      ];
      this.$router.push({ name: "prediction" });
      this.contextMenuVisible = false;
      sessionStorage.setItem("historys", JSON.stringify(this.historys));
    },
    closeLeft() {
      let right;
      const rightIndex = this.historys.findIndex(item => {
        if (item.name == this.rightActive) {
          right = item;
        }
        return item.name == this.rightActive;
      });
      const activeIndex = this.historys.findIndex(
        item => item.name == this.activeValue
      );
      this.historys.splice(0, rightIndex);
      if (rightIndex > activeIndex) {
        this.$router.push(right);
      }
      sessionStorage.setItem("historys", JSON.stringify(this.historys));
    },
    closeRight() {
      let right;
      const leftIndex = this.historys.findIndex(item => {
        if (item.name == this.rightActive) {
          right = item;
        }
        return item.name == this.rightActive;
      });
      const activeIndex = this.historys.findIndex(
        item => item.name == this.activeValue
      );
      this.historys.splice(leftIndex + 1, this.historys.length);
      if (leftIndex < activeIndex) {
        this.$router.push(right);
      }
      sessionStorage.setItem("historys", JSON.stringify(this.historys));
    },
    closeOther() {
      let right;
      this.historys = this.historys.filter(item => {
        if (item.name == this.rightActive) {
          right = item;
        }
        return item.name == this.rightActive;
      });
      this.$router.push(right);
      sessionStorage.setItem("historys", JSON.stringify(this.historys));
    },
    setTab(route) {
      if (!this.historys.some(item => item.name == route.name)) {
        const obj = {};
        obj.name = route.name;
        obj.meta = route.meta;
        obj.query = route.query;
        obj.params = route.params;
        this.historys.push(obj);
      }
      this.activeValue = this.$route.name;
    },
    changeTab(component) {
      const tab = component.$attrs.tab;
      console.log(tab);
      this.$router.push({
        name: tab.name,
        query: tab.query,
        params: tab.params
      });
    },
    removeTab(tab) {
      const index = this.historys.findIndex(item => item.name == tab);
      if (this.$route.name == tab) {
        if (this.historys.length == 1) {
          console.log(123);
          this.historys = [
            {
              name: "prediction",
              meta: {
                title: "预报管理",
                icon: "predictionIcon",
                hidden: false
              }
            }
          ];
          this.contextMenuVisible = false;
          if (this.$route.name === "prediction") {
            location.reload();
          } else {
            this.$router.push({ name: "prediction" });
          }
          sessionStorage.setItem("historys", JSON.stringify(this.historys));
        } else {
          if (index < this.historys.length - 1) {
            this.$router.push({
              name: this.historys[index + 1].name,
              query: this.historys[index + 1].query,
              params: this.historys[index + 1].params
            });
          } else {
            this.$router.push({
              name: this.historys[index - 1].name,
              query: this.historys[index - 1].query,
              params: this.historys[index - 1].params
            });
          }
        }
      }
      this.historys.splice(index, 1);
    }
  },
  watch: {
    contextMenuVisible() {
      if (this.contextMenuVisible) {
        document.body.addEventListener("click", () => {
          this.contextMenuVisible = false;
        });
      } else {
        document.body.removeEventListener("click", () => {
          this.contextMenuVisible = false;
        });
      }
    },
    $route(to) {
      this.historys = this.historys.filter(item => !item.meta.hidden);
      this.setTab(to);
      sessionStorage.setItem("historys", JSON.stringify(this.historys));
    }
  }
};
</script>

<style lang="scss" scoped>
.routerHistory {
  background: #fff;
  /deep/ .el-tabs {
    border-top: 1px solid #f2f2f2;
    height: 40px;
    margin-bottom: 20px;
    .el-tabs__item::before {
      content: "";
      width: 9px;
      height: 9px;
      margin-right: 8px;
      display: inline-block;
      background-color: #ddd;
      border-radius: 50%;
      transition: background-color 0.2s;
    }
    .el-tabs__item.is-active::before {
      background-color: #409eff;
    }
  }
}
.contextmenu {
  width: 100px;
  margin: 0;
  border: 1px solid #ccc;
  background: #fff;
  z-index: 3000;
  position: absolute;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.2);
}
.contextmenu li {
  margin: 0;
  padding: 7px 16px;
}
.contextmenu li:hover {
  background: #f2f2f2;
  cursor: pointer;
}
</style>
