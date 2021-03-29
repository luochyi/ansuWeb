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
  created() {
    console.log(this.asyncRouters);
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
  },
  watch: {
    $route() {
      this.active = this.$route.name;
    }
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
