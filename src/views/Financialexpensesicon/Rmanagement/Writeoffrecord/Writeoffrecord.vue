<template>
  <div>
    <div class='main'>
      <!--  标签页 -->
      <el-row type='flex' justify='flex-start' class='title' align='middle'>
        <span class='text'>账单核销记录</span>
      </el-row>
      <!-- 主要内容 -->
      <div class='content'>
        <el-row class='searchbox1'>
          <el-col :span='6' class='colbox'>
            <el-col :span='6'>
              <span class='text'>核销单号</span>
            </el-col>
            <el-col :span='13'>
              <el-input></el-input>
            </el-col>
          </el-col>

          <el-col :span='6' class='colbox'>
            <el-button class='orangeBtn long1'>查 询</el-button>
            <el-button class='wuBtn long1'>重 置</el-button>
            <!-- <el-button class='wuBtn long1'>展 开</el-button> -->
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <!-- 组件 -->
        <commonTable
            :columns="columns"
            :selection='selection'
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
            <template slot-scope="scoped">
              <el-button type="text" @click="detailspage(scoped.row.id)"> 查看核销费用列表 </el-button>
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
      selection: false,
      columns: [
        { prop: 'write_off_no', label: '核销单号', width: '200', align: 'center' },
        { prop: 'customer_name', label: '客户名称', width: '200', align: 'center' },
        { prop: 'customer_code', label: '客户简称', width: '200', align: 'center' },
        { prop: 'cost_count', label: '核销费用', width: '165', align: 'center', formatter: this.formatter },
        { prop: 'amount', label: '核销金额', width: '189', align: 'center', formatter: this.formatter },
        { prop: 'created_at', label: '核销日期', align: 'center', width: '200', formatter: this.formatter }
      ],
      tableData: [],
      page: {
        pageNo: 1,
        limit: 10,
        sizes: [15, 50, 100],
        total: 0
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.$api.finance.fare.writeOff.customer.history({
        page: this.page.pageNo,
        limit: this.page.limit
      }).then(res => {
        this.tableData = res.data.list
        this.page.total = res.data.total
      })
    },
    // 重新渲染name列
    formatter (row, column, cellValue) {
      switch (column.property) {
        case 'cost_count':
          return row.cost_count + '笔'
        case 'amount':
          return row.amount + '元'
        case 'created_at':
          return this.formatDate(row.created_at, 'yyyy-MM-dd')
      }
    },
    detailspage (id) {
      this.$router.push({ name: 'WriteoffDetail', params: { id: id } })
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
