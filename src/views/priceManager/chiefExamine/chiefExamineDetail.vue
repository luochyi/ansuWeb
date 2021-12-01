<template>
  <div>
    <div class="box">
      <el-row style="line-height: 50px; font-size: 14px">
        <el-col :span="4">未审核</el-col>
        <el-button class="orangeBtn">审核历史</el-button>
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
        <span class="text">基础运价确认</span>
      </el-row>
      <el-row style="line-height: 50px; font-size: 14px">
        <el-col :span="4">运费单价：18元/公斤</el-col>
        <el-col :span="4"
          >单价调整：+1元/公斤
        </el-col>
        <el-col :span="4">报价价格19元/公斤</el-col>
        <el-col :span="4"><span style="color:#FB4702">基础运费：</span>2000元</el-col>
      </el-row>
    </div>
    <div class="box">
      <el-row type="flex" justify="flex-start" class="title" align="middle">
        <span class="text">附加费明细</span>
      </el-row>
      <el-row style="line-height: 50px; font-size: 14px">
        <!-- <el-button class="orangeBtn"> 添加附加费 </el-button> -->
        <el-table :data="tableData" style="width: 1000px" border :header-cell-style="{background: '#F5F5F6'}">
          <el-table-column fixed prop="name" label="费用名称" width="200">
          </el-table-column>
          <el-table-column prop="type" label="费用类型" width="120">
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
          <el-table-column fixed="right" label="操作"  width="100">
            <template slot-scope="scope">
              <el-button
                @click="edit(scope.row)"
                type="text"
                size="small"
                >修改</el-button
              >
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-col><span style="color:#FB4702">附加费：</span>
            2000元</el-col>
      </el-row>
    </div>
    <div class="footer">
      <span>报价合计：</span>
      ￥
      <el-button class="orangeBtn">确认报价</el-button>
      <el-button class="whiteBtn">取消</el-button>
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
          name: '偏远地区附加费',
          type: '附加费',
          unitprice: '80元',
          unit: '公斤',
          num: '10',
          price: '800元',
          man: '张三'
        }, {
          name: '偏远地区附加费',
          type: '附加费',
          unitprice: '80元',
          unit: '公斤',
          num: '10',
          price: '800元',
          man: '张三'
        }, {
          name: '偏远地区附加费',
          type: '附加费',
          unitprice: '80元',
          unit: '公斤',
          num: '10',
          price: '800元',
          man: '张三'
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
