<template>
  <div>
    <el-row type='flex' justify='flex-start' class='title' align='middle'>
         <span class='text'>收货管理</span>
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
import warehousing from './component/warehousing'
import delivery from './component/delivery'
import outWarehouse from './component/outWarehouse'
import transport from './component/transport'
import signFor from './component/signFor'
export default {
  components: {
    warehousing,
    delivery,
    outWarehouse,
    transport,
    signFor
  },
  data () {
    return {
      componentsName: 'warehousing',
      activeName: '1'
    }
  },
  methods: {
    handleClick (val) {
      console.log(val)
      switch (val.name) {
        case '1':
          this.componentsName = warehousing
          break
        case '2':
          this.componentsName = delivery
          break
        case '3':
          this.componentsName = outWarehouse
          break
        case '4':
          this.componentsName = transport
          break
        case '5':
          this.componentsName = signFor
          break
      }
    }
  }
}
</script>
