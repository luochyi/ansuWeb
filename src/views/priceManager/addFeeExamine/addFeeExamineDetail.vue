<template>
  <div>
    <div class="box" style="height:50px;line-height:50px">未审核</div>
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
        <span class="text">申请追加费用</span>
      </el-row>
      <!-- <el-button class="orangeBtn">添加追加费用</el-button> -->
      <el-table :data="tableData" style="width:1000px" border :header-cell-style="{background: '#F5F5F6'}">
          <el-table-column fixed prop="type" label="类型" width="200">
          </el-table-column>
          <el-table-column  prop="name" label="费用名称" width="200">
          </el-table-column>
          <el-table-column prop="type" label="费用类型" width="120">
          </el-table-column>
          <el-table-column prop="unitprice" label="结算对象" width="100">
          </el-table-column>
          <el-table-column prop="unitprice" label="单价" width="100">
          </el-table-column>
          <el-table-column prop="unit" label="单位" width="100">
          </el-table-column>
          <el-table-column prop="num" label="数量" width="100">
          </el-table-column>
          <el-table-column prop="price" label="费用" width="100">
          </el-table-column>
          <el-table-column prop="man" label="录价人" width="120">
          </el-table-column>
        </el-table>
        <el-divider></el-divider>
        <div style="padding-bottom:20px">追加费用说明：时间间隔太长了，客户不认，老客户卖个面子</div>
    </div>
    <div class="box">
      <el-row type="flex" justify="flex-start" class="title" align="middle">
        <span class="text">费用明细</span>
      </el-row>
      <el-row style="line-height: 50px; font-size: 14px">
        <el-table :data="tableData" style="width:1000px" border :header-cell-style="{background: '#F5F5F6'}">
          <el-table-column fixed prop="type" label="类型" width="200">
          </el-table-column>
          <el-table-column prop="name" label="费用名称" width="200">
          </el-table-column>
          <el-table-column prop="type" label="费用类型" width="120">
          </el-table-column>
          <el-table-column prop="unitprice" label="结算对象" width="100">
          </el-table-column>
          <el-table-column prop="unitprice" label="单价" width="100">
          </el-table-column>
          <el-table-column prop="unit" label="单位" width="100">
          </el-table-column>
          <el-table-column prop="num" label="数量" width="100">
          </el-table-column>
          <el-table-column prop="price" label="费用" width="100">
          </el-table-column>
          <el-table-column prop="man" label="录价人" width="120">
          </el-table-column>
        </el-table>
        <el-divider></el-divider>
        <el-row style="line-height: 10px;height:30px; font-size: 14px">
            <el-col :span="4"><span style="color:#FB4702">合计应收：</span>2000元</el-col>
            <el-col :span="4"><span style="color:#FB4702">合计应付：</span>800元</el-col>
            <el-col :span="4"><span style="color:#FB4702">合计利润：</span>1200元</el-col>
        </el-row>
      </el-row>
    </div>

    <div class="box" style="height:200px">
      <el-row type="flex" justify="flex-start" class="title" align="middle">
        <span class="text">追加费用说明</span>
      </el-row>
      <el-input
        type="textarea"
        :autosize="{ minRows: 4, maxRows: 7}"
        placeholder="请输入内容"
        v-model="textarea2">
        </el-input>
    </div>
    <div class="footer">
      <span  style="color:#FB4702">追加后利润：</span>
      ￥800
      <el-button class="orangeBtn">通过审核</el-button>
      <el-button class="whiteBtn">驳回审核</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      select: '',
      input: '',
      tableData: [
        {
          code: 'AS1212121',
          long: '10',
          width: '2',
          high: '5',
          vol: '4',
          weight: '20',
          zhouchang: '30'
        }
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
  border: 1px solid #e8e8e8;
  z-index: 999;
  left:201px;
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
/deep/.el-input-group__append .el-button,
.el-input-group__append .el-select,
.el-input-group__prepend .el-button,
.el-input-group__prepend .el-select {
  width: 80px;
}
</style>
