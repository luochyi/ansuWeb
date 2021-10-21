<template>
  <div>
    <div class='main'>
      <!--  标签页 -->
      <el-row type='flex' justify='flex-start' class='title' align='middle'>
        <span class='text'>付款申请</span>
      </el-row>
      <!-- 主要内容 -->
      <div class='content'>
        <el-row class='searchbox1'>
          <el-col :span='6' class='colbox'>
            <el-col :span='6'>
              <span class='text'>付款单号</span>
            </el-col>
            <el-col :span='13'>
              <el-input v-model='PaymentNo' placeholder='请输入'></el-input>
            </el-col>
          </el-col>
          <el-col :span='6' class='colbox'>
            <el-col :span='6'>
              <span class='text'>付款金额</span>
            </el-col>
            <el-col :span='13'>
              <el-input v-model='amount' placeholder='请输入'></el-input>
            </el-col>
          </el-col>
          <el-col :span='6' class='colbox'>
            <el-col :span='6'>
              <span class='text'>代理编码</span>
            </el-col>
            <el-col :span='13'>
              <el-input v-model='code' placeholder='请输入'></el-input>
            </el-col>
          </el-col>
          <el-col :span='6' class='colbox'>
            <el-col :span='6'>
              <span class='text'>审核状态</span>
            </el-col>
            <el-col :span='13'>
                <el-input v-model='status' placeholder='请输入'></el-input>
            </el-col>
          </el-col>
        </el-row>
        <!--  -->
        <el-row class='searchbox1'>
          <el-col :span='6' class='colbox'>
            <el-col :span='6'>
              <span class='text'>申请状态</span>
            </el-col>
            <el-col :span='13'>
           <el-select v-model="value" placeholder="请选择">
         <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
         </el-option>
         </el-select>
            </el-col>
          </el-col>
          <el-col :span='17' class='right'>
            <el-button class='orangeBtn long1'>查 询</el-button>
            <el-button class='wuBtn long1'>重 置</el-button>
          </el-col>
        </el-row>
        <el-divider></el-divider>
          <!-- 组件 -->
    <commonTable
      :columns="columns"
      :data="tableData"
      :pager="page"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    >
      <el-table-column
        slot="table_oper"
        align="center"
        fixed="right"
        label="操作"
        width="156"
        :resizable="false"
      >
         <template slot-scoped="scoped">
            <el-button type="text" @click="password= true"> 查看 </el-button>
            <span style="color: #0084FF; margin: 0px 5px">|</span>
          <el-button type="text" @click="detailspage"> 重新申请</el-button>
        </template>
      </el-table-column>
    </commonTable>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      total: 50, // 数据数量
      pageSize: 10, // 默认当前条数
      currentPage: 1, // 当前页码

      activeName: '1',
      PaymentNo: '', // 付款单号
      amount: '', // 付款金额
      code: '', // 代理编码
      status: '', // 审核状态
      value: '',

      columns: [
        { prop: 'PaymentNo', label: '付款单号', width: '212', align: 'center' },
        { prop: 'apply', label: '申请金额', width: '82', align: 'center' },
        { prop: 'agent', label: '代款代理', width: '255', align: 'center' },
        { prop: 'code', label: '代理编码', width: '300', align: 'center' },
        { prop: 'status', label: '审核状态', width: '95', align: 'center' },
        { prop: 'date', label: '申请日期', width: '229', align: 'center' },
        { prop: 'applicant', label: '申请人', align: 'center' }
      ],
      tableData: [],
      page: {
        pageNo: 1,
        limit: 10,
        sizes: [1, 5, 10],
        total: 0
      }
    }
  },
  mounted () {
    this.tableData = [
      { PaymentNo: 'AS123123423412313', apply: '王小虎', code: '上海市普陀区金沙江路 1518 弄' }
    ]
    this.page.total = 2
  },
  methods: {
    detailspage () {
      this.$router.push({ name: 'detailspage' })
    },
    handleClick (val) {
      console.log(val)
    },
    // 重新渲染name列
    formatter (row, column, cellValue) {
      return row.name + '测试'
    },
    formatters (row, column, cellValue) {
      return row.address + '测试'
    },
    // 改变页面大小处理
    handleSizeChange (val) {

    },
    // 翻页处理
    handleCurrentChange (val) {
      this.tableData = [
        { date: '2016-05-03', name: '王小虎111', address: '上海市普陀区金沙江路 1518 弄' }
      ]
    },
    // 操作按钮列表
    editTableData (row) {}
  }
}
</script>

<style lang='scss' scoped>
.sub_title{
  margin:20px
}
/deep/ .title {
  height: 56px;
  font-size: 16px;
}
/deep/ .tableBtn{
  .stopBtn{
    height: 32px;
    line-height: 32px;
    padding: 0px 15px;
    background: #FEF4E1;
    border-radius: 4px;

    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.65);
  }
}
</style>
