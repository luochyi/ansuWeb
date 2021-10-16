<template>
  <div>
    <el-row type="flex" justify="flex-start" class="title" align="middle">
      <span class="text">生成应收账单</span>
    </el-row>
    <div class="main">
      <el-table :data="tableData" style="width: 100%">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="代理结算数据">
              <el-table-column label="代理单号" width="200"></el-table-column>
              <el-table-column label="费用类型"></el-table-column>
              <el-table-column label="代理结算重"></el-table-column>
              <el-table-column label="单价"></el-table-column>
              <el-table-column label="金额"></el-table-column>
          </el-table-column>
          <el-table-column label="安速登记数据">
              <el-table-column label="运单号" width="200"></el-table-column>
              <el-table-column label="代理结算重"></el-table-column>
              <el-table-column label="单价"></el-table-column>
              <el-table-column label="单位"></el-table-column>
              <el-table-column label="金额"></el-table-column>
          </el-table-column>
          <el-table-column>
              <el-table-column label="日期"></el-table-column>
              <el-table-column label="渠道"></el-table-column>
              <el-table-column label="目的地"></el-table-column>
              <el-table-column label="邮编"></el-table-column>
              <el-table-column label="货物件数"></el-table-column>
          </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      Id: null,
      tableData: []
    }
  },
  mounted () {
    this.Id = this.$route.params.id
    this.getData()
  },
  methods: {
    getData () {}
  }
}
</script>

<style lang='scss' scoped>
/deep/ .title {
  height: 56px;
  font-size: 16px;
}
</style>
