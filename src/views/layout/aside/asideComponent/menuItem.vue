<template>
  <el-menu-item
    :id="routerInfo.name"
    :index="routerInfo.name"
    :route="{ name: routerInfo.name }"
  >
    <i :class="'el-icon-' + routerInfo.meta.icon"></i>
    <span slot="title" class="menufont">{{ routerInfo.meta.title }}</span>
  </el-menu-item>
</template>

<script>
export default {
  name: "MenuItem",
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
