<template>
  <div>
    <div class="box">
      <el-row type="flex" justify="flex-start" class="title" align="middle">
        <span class="text">改货说明</span>
      </el-row>
      <el-row style="line-height: 50px; font-size: 14px">
        <el-col
          >老客户了，对重量有异议</el-col
        >
      </el-row>
    </div>
    <div class="box">
      <el-row type="flex" justify="flex-start" class="title" align="middle">
        <span class="text">修改重量</span>
      </el-row>
      <el-row style="line-height: 50px; font-size: 14px">
          <el-col><span style="color:#FB4E0C;font-size:22px">AS202012120001</span><span> &nbsp;客户名称：深圳大成亚马逊贸易科技有限公司</span></el-col>
          <el-col>
              运单号：<el-input style="width:200px;margin-right:10px" size="mini"></el-input><el-button class="orangeBtn">查询</el-button>
          </el-col>
        <el-button class="orangeBtn"> 批量修改尺寸 </el-button>
        <el-button class="whiteBtn"> 改重记录 </el-button>
        <el-table
          :data="tableData"
          border
          style="width:1100px;margin-bottom:10px"
          :header-cell-style="{ background: '#F5F5F6' }"
        >
          <el-table-column fixed prop="code" label="单号" width="200">
          </el-table-column>
          <el-table-column prop="long" label="长" width="120">
          </el-table-column>
          <el-table-column prop="width" label="宽" width="120">
          </el-table-column>
          <el-table-column prop="high" label="高" width="100">
          </el-table-column>
          <el-table-column prop="vol" label="方数" width="100">
          </el-table-column>
          <el-table-column prop="weight" label="实重" width="100">
          </el-table-column>
          <el-table-column prop="weight" label="材积重" width="100">
          </el-table-column>
          <el-table-column prop="zhouchang" label="周长" width="120">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="edit(scope.row)" type="text" size="small"
                >修改重量</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </div>
    <div class="footer">
      <span>报价合计：</span>
      ￥
      <el-button class="orangeBtn">确认改货</el-button>
      <el-button class="whiteBtn">驳回改货</el-button>
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
