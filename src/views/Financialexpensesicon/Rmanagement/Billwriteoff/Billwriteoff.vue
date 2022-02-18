<template>
  <div>
    <div class='main'>
      <!--  标签页 -->
      <el-row type='flex' justify='flex-start' class='title' align='middle'>
        <span class='text'>账单核销</span>
      </el-row>
      <!-- 主要内容 -->
      <div class='content'>
        <el-row class='searchbox1'>
          <el-col :span='6' class='colbox'>
            <el-col :span='6'>
              <span class='text'>客户名称</span>
            </el-col>
            <el-col :span='13'>
              <el-input v-model="search.customerName"></el-input>
            </el-col>
          </el-col>
          <el-col :span='6' class='colbox'>
            <el-button class='orangeBtn long1' @click="getData">查 询</el-button>
            <el-button class='wuBtn long1' @click="searchReset">重 置</el-button>
          </el-col>
        </el-row>
        <!-- 组件 -->
        <commonTable
            :columns="columns"
            :data="tableData"
            :selection='selection'
            :pager="page"
            @handleSizeChange="handleSizeChange"
            @handleCurrentChange="handleCurrentChange"
        >
          <el-table-column
              slot="table_oper"
              align="center"
              fixed="right"
              label="操作"
              width="165"
              :resizable="false"
          >
            <template slot-scope="scoped">
              <el-button type="text" @click="bill(scoped.row)"> 核销账单</el-button>
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
        { prop: 'code', label: '客户简称', align: 'center' },
        { prop: 'name', label: '客户名称', align: 'center' },
        { prop: 'bill_amount', label: '未核销账单', align: 'center' },
        { prop: 'amount', label: '账户余额', align: 'center' }
      ],
      tableData: [],
      page: {
        pageNo: 1,
        limit: 10,
        sizes: [15, 50, 100],
        total: 0
      },
      search: {
        customerName: null
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.$api.finance.fare.writeOff.customer.lists({
        customerName: this.search.customerName,
        page: this.page.pageNo,
        limit: this.page.limit
      }).then(res => {
        this.tableData = res.data.list
        this.page.total = res.data.total
      })
    },
    searchReset () {
      this.search.customerName = null
    },
    bill (data) {
      console.log(data)
      this.$router.push({ name: 'bill', params: { customerId: data.id, customerName: data.name } })
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
