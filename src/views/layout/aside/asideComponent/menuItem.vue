<template>
  <el-menu-item
    :id='routerInfo.name'
    :index='routerInfo.name'
    :route='{ name: routerInfo.name }'
  >
    <i :class="'iconfont' + ' ' + routerInfo.icon"></i>
    <span slot='title' class='menufont'>{{ routerInfo.title }}</span>
  </el-menu-item>
</template>

<script>
export default {
  name: 'MenuItem',
  props: {
    routerInfo: {
      default: function () {
        return null
      },
      type: Object
    }
  }
}
</script>

<style lang='scss'>
</style>
