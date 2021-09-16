<template>
  <div>
    <el-row type='flex' justify='flex-start' class='title' align='middle'>
         <span class='text'>运单管理</span>
         <el-tabs v-model='activeName' type='card' @tab-click='handleClick'>
          <el-tab-pane label='入仓' name='1'></el-tab-pane>
          <el-tab-pane label='出库' name='2'></el-tab-pane>
          <el-tab-pane label='出仓' name='3'></el-tab-pane>
          <el-tab-pane label='运输' name='4'></el-tab-pane>
          <el-tab-pane label='签收' name='5'></el-tab-pane>

        </el-tabs>
      </el-row>
      <component :is="componentsName"></component>
  </div>
</template>
<script>

export default {
  components: {
  },
  data () {
    return {
      componentsName: 'warehousing',
      activeName: '1'
    }
  },
  methods: {

  }
}
</script>
