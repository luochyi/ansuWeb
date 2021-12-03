<template>
  <div>
      <div class="box">
      <el-row type="flex" justify="flex-start" class="title" align="middle">
        <span class="text">合计费用</span>
      </el-row>
      <el-row style="line-height: 50px; font-size: 14px">
        <el-col :span="4"><span style="color:#FB4702">合计费用：</span>2000元</el-col>
        <el-col :span="4"><span style="color:#FB4702">结算重：</span>800元</el-col>
        <el-col :span="4"><span style="color:#FB4702">基础运费：</span>1200元</el-col>
        <el-col :span="4"><span style="color:#FB4702">附加费：</span>800元</el-col>
        <el-col :span="4"><span style="color:#FB4702">其他费用：</span>1200元</el-col>
      </el-row>
    </div>
    <div class="box">
      <el-row type="flex" justify="flex-start" class="title" align="middle">
        <span class="text">运单信息</span>
      </el-row>
      <el-descriptions :column="4">
        <el-descriptions-item label="客户编码">SMJJ</el-descriptions-item>
        <el-descriptions-item label="客户名称">沙马</el-descriptions-item>
        <el-descriptions-item label="目的国">美国</el-descriptions-item>
        <el-descriptions-item label="目的国邮编">1111</el-descriptions-item>
        <el-descriptions-item label="报关类型">一般贸易</el-descriptions-item>
        <el-descriptions-item label="清关类型">单独清关</el-descriptions-item>
        <el-descriptions-item label="是否有保险">是</el-descriptions-item>
        <el-descriptions-item label="品名">玩具</el-descriptions-item>
        <el-descriptions-item label="材质">带电</el-descriptions-item>
        <el-descriptions-item label="方数">30立方</el-descriptions-item>
        <el-descriptions-item label="实重">100公斤</el-descriptions-item>
        <el-descriptions-item label="材积重">90公斤</el-descriptions-item>
        <el-descriptions-item label="结算重">80公斤</el-descriptions-item>
        <el-descriptions-item label="预报渠道">1111</el-descriptions-item>
        <el-descriptions-item label="备注">1111</el-descriptions-item>
        <el-descriptions-item label="内部备注">1111</el-descriptions-item>
      </el-descriptions>
    </div>
    <div class="box">
      <el-row type="flex" justify="flex-start" class="title" align="middle">
        <span class="text">结算重</span>
      </el-row>
      <el-row style="line-height: 50px; font-size: 14px">
        <el-table :data="tableData"  border :header-cell-style="{background: '#F5F5F6'}">
            <el-table-column label="货件编号"></el-table-column>
            <el-table-column label="长"></el-table-column>
            <el-table-column label="宽"></el-table-column>
            <el-table-column label="高"></el-table-column>
            <el-table-column label="体积"></el-table-column>
            <el-table-column label="实重"></el-table-column>
            <el-table-column label="材积重"></el-table-column>
            <el-table-column label="结算重"></el-table-column>
        </el-table>
        <el-divider></el-divider>
      </el-row>
    </div>
    <div class="box">
      <el-row type="flex" justify="flex-start" class="title" align="middle">
        <span class="text">附加费明细</span>
      </el-row>
      <el-row style="line-height: 50px; font-size: 14px">
        <el-table :data="tableData"  border :header-cell-style="{background: '#F5F5F6'}">
            <el-table-column label="费用名称"></el-table-column>
            <el-table-column label="费用类型"></el-table-column>
            <el-table-column label="单价"></el-table-column>
            <el-table-column label="单位"></el-table-column>
            <el-table-column label="数量"></el-table-column>
            <el-table-column label="费用"></el-table-column>
            <el-table-column label="税金"></el-table-column>
            <el-table-column label="结算费用"></el-table-column>
        </el-table>
        <el-divider></el-divider>
      </el-row>
    </div>
    <!-- <div class="footer">
      <el-button class="orangeBtn">确认核单</el-button>
      <el-button class="whiteBtn">取消</el-button>
    </div> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      select: '',
      input: '',
      tableData: [
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.footer {
  background: #ffffff;
  position: fixed;
  bottom: 0;
  height: 63px;
  width: 100%;
  line-height: 63px;
  box-shadow: 0px -2px 4px 0px rgba(0, 0, 0, 0.35);
  border-radius: 4px 4px 0px 0px;
  border: 1px solid #E8E8E8;
  z-index: 999;
  // text-align: right;
}
.box {
  margin-bottom: 10px;
  padding-left: 20px;
  background: #ffffff;
  text-align: left;
}
.title {
  line-height: 40px;
  margin-bottom: 10px;
}
.input-with-select {
  width: 300px;
}
.input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
/deep/.el-input-group__append .el-button, .el-input-group__append .el-select, .el-input-group__prepend .el-button, .el-input-group__prepend .el-select{
    width:80px;
}
</style>
