<template>
  <div>
    <el-row type='flex' justify='flex-start' class='title' align='middle'>
         <span class='text'>收货管理</span>
         <el-tabs v-model='activeName' type='card' @tab-click='handleClick'>
          <el-tab-pane label='预报' name='1'></el-tab-pane>
          <el-tab-pane label='发票' name='2'></el-tab-pane>
          <el-tab-pane label='入仓' name='3'></el-tab-pane>
          <el-tab-pane label='运输中' name='4'></el-tab-pane>
          <el-tab-pane label='签收' name='5'></el-tab-pane>
          <el-tab-pane label='取消' name='6'></el-tab-pane>
          <el-tab-pane label='全部订单' name='7'></el-tab-pane>

        </el-tabs>
      </el-row>
      <component :is="componentsName"></component>
  </div>
</template>
<script>
// prediction预报，invoice发票，warehousing入仓，transport运输，signFor签收，cancel取消，allOrder全部订单
import prediction from './component/prediction'
import invoice from './component/invoice'
import warehousing from './component/warehousing'
// import delivery from './component/delivery'
import transport from './component/transport'
import signFor from './component/signFor'
import cancel from './component/cancel'
import allOrder from './component/allOrder'
export default {
  components: {
    prediction, // 预报
    invoice, // 发票
    warehousing, // 入仓
    transport, // 运输
    signFor, // 签收
    cancel, // 取消
    allOrder // 全部订单
  },
  data () {
    return {
      componentsName: 'prediction',
      activeName: '1'
    }
  },
  methods: {
    handleClick (val) {
      console.log(val)
      switch (val.name) {
        case '2':
          this.componentsName = invoice
          break
        case '3':
          this.componentsName = warehousing
          break
        case '4':
          this.componentsName = transport
          break
        case '5':
          this.componentsName = signFor
          break
        case '6':
          this.componentsName = cancel
          break
        case '7':
          this.componentsName = allOrder
          break
      }
    }
  }
}
</script>
