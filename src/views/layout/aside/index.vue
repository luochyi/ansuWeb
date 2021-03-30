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
          :router="true"
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
import { mapGetters } from "vuex";
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
  watch: {
    $route(to) {
      console.log(to);
      this.active = to.name;
      console.log(this.active);
    },
    num(val) {
      console.log(val);
    }
  },
  mounted() {
    this.active = this.$route.name;
  },
  methods: {
    // ...mapMutations("router", ["addHistory"]),
    select(key, keypath) {
      console.log(key);
      console.log(keypath);
    }
  },
  computed: {
    ...mapGetters("router", ["asyncRouters"])
  },
  components: {
    AsideComponent
  }
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
