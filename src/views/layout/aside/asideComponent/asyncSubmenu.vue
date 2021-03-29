<template>
  <el-submenu
    :id="routerInfo.name"
    :popper-append-to-body="false"
    ref="subMenu"
    :index="routerInfo.name"
  >
    <template slot="title">
      <i :class="'el-icon-' + routerInfo.meta.icon"></i>
      <span slot="title" class="menufont">{{ routerInfo.meta.title }}</span>
    </template>
    <slot></slot>
  </el-submenu>
</template>

<script>
export default {
  name: "AsyncSubmenu",
  props: {
    routerInfo: {
      default: function() {
        return null;
      },
      type: Object
    }
  }
};
</script>
<style lang="scss"></style>
