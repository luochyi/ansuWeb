<template>
  <div>
    <div class='main'>
      <!--  标签页 -->
      <el-row type='flex' justify='flex-start' class='title' align='middle'>
        <span class='text'>账单核销</span>
      </el-row>
      <!-- 主要内容 -->
      <div class='content'>
        <el-col>
          <span class='text' style="float: left;">深圳莱茵宝宝贸易有限公司</span>
        </el-col>
        <el-row class='searchbox1'>
          <el-col :span='6' class='colbox'>
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
          <el-col :span='6' class='colbox'>
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
          <el-col :span='6' class='colbox'>
            <el-col :span='6'>
              <span class='text'>外账单日</span>
            </el-col>
            <el-col :span='12'>
              <el-input v-model='destination' placeholder='请输入'></el-input>
            </el-col>
          </el-col>
          <el-col :span='6' class='colbox'>
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
          <el-col :span='6' class='colbox' style="float: right;">
            <el-button class='orangeBtn long1'>查 询</el-button>
            <el-button class='wuBtn long1'>重 置</el-button>
          </el-col>
        </el-row>
        <el-row class='searchbox1' type='flex' justify='space-between' align='middle'>
          <el-col :span='12' class="left">
            <el-button class='orangeBtn' @click="test">批量核销</el-button>
          </el-col>
        </el-row>
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
              width="86"
              :resizable="false"
          >
            <template slot-scope="scope">
              <el-button type="text" @click="bill(scope.row)"> 核销账单</el-button>
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
      value: '',
      options: [],
      destination: '',
      columns: [
        { prop: 'bill_no', label: '账单号', width: '193', align: 'center' },
        { prop: 'write_off_status', label: '核销状态', width: '118', align: 'center', formatter: this.formatter },
        { prop: 'wayill_count', label: '包含运单', width: '82', align: 'center' },
        { prop: 'amount', label: '应核销金额', width: '220', align: 'center' },
        { prop: 'write_off_amount', label: '已核销金额', width: '126', align: 'center' }
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
    bill (row) {
      console.log(row)
      this.$router.push({ name: 'childrenBill', params: row })
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
