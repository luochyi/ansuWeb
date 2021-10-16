<template>
  <div>
    <div class='main'>
      <!--  标签页 -->
      <el-row type='flex' justify='flex-start' class='title' align='middle'>
        <span class='text'>账单核销</span>
      </el-row>
      <!-- 主要内容 -->
      <div class='content'>
        <el-row class="infobox">
          <el-col :span="6">应付金额：<span>{{amountPayable}}元</span></el-col>
          <el-col :span="6">账户余额：<span>{{balance}}元</span></el-col>
          <el-col :span="6">
            <el-button class="orangeBtn">核 销</el-button>
          </el-col>
        </el-row>
        <el-row class='searchbox1'>
          <el-col :span='4' class='colbox'>
            <el-col :span='6'>
              <span class='text'>账单号</span>
            </el-col>
            <el-col :span='12'>
              <el-select v-model="value" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-col>
          </el-col>
          <el-col :span='4' class='colbox'>
            <el-col :span='6'>
              <span class='text'>核销状态</span>
            </el-col>
            <el-col :span='12'>
              <el-select v-model="value" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-col>
          </el-col>
          <el-col :span='4' class='colbox'>
            <el-col :span='6'>
              <span class='text'>外账单日</span>
            </el-col>
            <el-col :span='12'>
              <el-input v-model='destination' placeholder='请输入'></el-input>
            </el-col>
          </el-col>
          <el-col :span='4' class='colbox'>
            <el-col :span='6'>
              <span class='text'>结算方式</span>
            </el-col>
            <el-col :span='12'>
              <el-select v-model="value" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-col>
          </el-col>
          <el-col :span='4' class='colbox' style="float: right;">
            <el-button class='orangeBtn long1'>查 询</el-button>
            <el-button class='wuBtn long1'>重 置</el-button>
          </el-col>
        </el-row>
        <!-- 组件 -->
        <commonTable
            :columns="columns"
            :data="tableData"
            :pager="page"
            :paginationShow='false'
            @handleSizeChange="handleSizeChange"
            @handleCurrentChange="handleCurrentChange"
        >
        </commonTable>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: '',
      amountPayable: '',
      balance: '',
      options: [],
      destination: '',
      columns: [
        { prop: 'bill_no', label: '运单号', width: '200', align: 'center' },
        { prop: 'feeName', label: '费用名称', width: '200', align: 'center' },
        { prop: 'type', label: '费用类型', width: '200', align: 'center', formatter: this.formatter },
        { prop: 'amount', label: '应付金额', width: '220', align: 'center' },
        { prop: 'affiliatedBill', label: '所属账单', width: '200', align: 'center' },
        { prop: 'status', label: '核销状态', align: 'center', formatter: this.formatter }
      ],
      tableData: [],
      page: {
        pageNo: 1,
        limit: 10,
        sizes: [1, 5, 10],
        total: 0
      },
      customerId: 0,
      billIds: []
    }
  },
  mounted () {
    this.customerId = this.$route.params.id
    console.log(this.customerId)
    this.getData()
  },
  methods: {
    getData () {
      this.$api.finance.fare.writeOff.customer.bill({
        customerId: this.customerId,
        page: this.page.pageNo,
        limit: this.page.limit
      }).then(res => {
        this.tableData = res.data.list
        this.page.total = res.data.total
      })
    },
    bill () {
      this.$router.push({ name: 'bill' })
    },
    handleClick (val) {
      console.log(val)
    },
    test () {},
    // 重新渲染name列
    formatter (row, column, cellValue) {
      switch (column.property) {
        case 'write_off_status':
          return row.write_off_status === 1 ? '未核销' : row.write_off_status === 2 ? '部分核销' : '核销完成'
      }
    },
    // 改变页面大小处理
    handleSizeChange (val) {
      this.page.limit = val // 设置当前页容量为val
      this.getData() // 重新渲染表格
    },
    // 翻页处理
    handleCurrentChange (val) {
      this.page.pageNo = val // 设置当前页码为val
      this.getData() // 重新渲染表格
    },
    // 复选
    handleSelectionChange (val) {
      this.billIds = []
      val && val.forEach((item) => {
        this.billIds.push(item.id)
      })
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
.infobox{
  text-align: left;
  border-bottom: 1px solid #D8D8D8;
  padding-bottom: 20px;
  margin-bottom:20px ;
  font-size: 14px;
  span{
    color: #FB4702;
  }
}
/deep/ .title {
  height: 56px;
  font-size: 16px;
}
/deep/.el-table{
  width: 80%;
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
