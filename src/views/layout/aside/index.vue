<template>
  <div>
    <el-scrollbar style="height: calc(100vh - 60px)">
      <transition
        :duration="{ enter: 800, leave: 100 }"
        mode="out-in"
        name="el-fade-in-linear"
      >
        <el-menu
          :collapse="isCollapse"
          :collapse-transition="true"
          :default-active="active"
          @select="select"
          active-text-color="#FE822F"
          class="el-menu-vertical"
          text-color="rgba(0,0,0,0.65)"
          unique-opened
        >
          <template v-for="item in asyncRouters[num].children">
            <AsideComponent
              :key="item.name"
              :routerInfo="item"
              v-if="!item.hidden"
            />
          </template>
        </el-menu>
      </transition>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import AsideComponent from "@/views/layout/aside/asideComponent/index.vue";
export default {
  name: "Aside",
  data() {
    return {
      active: "",
      isCollapse: false
    };
  },
  props: {
    num: Number
  },
  methods: {
    ...mapMutations("history", ["addHistory"]),
    select(key, keypath) {
      console.log(key);
      console.log(keypath);
    }
    // selectMenuItem(index, _, ele) {
    //   const query = {};
    //   const params = {};
    //   ele.route.parameters &&
    //     ele.route.parameters.map(item => {
    //       if (item.type == "query") {
    //         query[item.key] = item.value;
    //       } else {
    //         params[item.key] = item.value;
    //       }
    //     });
    //   if (index === this.$route.name) return;
    //   if (index.indexOf("http://") > -1 || index.indexOf("https://") > -1) {
    //     window.open(index);
    //   } else {
    //     this.$router.push({ name: index, query, params });
    //   }
    // }
  },
  computed: {
    ...mapGetters("router", ["asyncRouters"])
  },
  components: {
    AsideComponent
  },
  // created() {
  //   this.active = this.$route.name;
  //   let screenWidth = document.body.clientWidth;
  //   if (screenWidth < 1000) {
  //     this.isCollapse = !this.isCollapse;
  //   }

  //   this.$bus.on("collapse", item => {
  //     this.isCollapse = item;
  //   });
  // },
  watch: {
    $route() {
      this.active = this.$route.name;
    }
  }
  // beforeDestroy() {
  //   this.$bus.off("collapse");
  // }
};
</script>

<style lang="scss">
.el-scrollbar {
  .el-scrollbar__view {
    height: 100%;
  }
}
.menu-info {
  .menu-contorl {
    line-height: 52px;
    font-size: 20px;
    display: table-cell;
    vertical-align: middle;
  }
}
</style>
