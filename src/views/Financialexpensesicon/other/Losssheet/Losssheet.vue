<template>
  <div>
    <div class='main'>
      <!--  标签页 -->
      <el-row type='flex' justify='flex-start' class='title' align='middle'>
        <span class='text'>亏损票</span>
      </el-row>
      <!-- 主要内容 -->
      <div class='content'>
        <el-row class='searchbox1'>
          <el-col :span='6' class='colbox'>
            <el-col :span='6'>
              <span class='text'>运单号</span>
            </el-col>
            <el-col :span='13'>
              <el-input placeholder='请输入' v-model="search.waybillNo"></el-input>
            </el-col>
          </el-col>
          <el-col :span='6' class='colbox'>
            <el-col :span='6'>
              <span class='text'>客户名称</span>
            </el-col>
            <el-col :span='13'>
              <el-input placeholder='请输入' v-model="search.customerName"></el-input>
            </el-col>
          </el-col>
          <el-col :span='6' class='colbox'>
            <el-col :span='6'>
              <span class='text'>客户编码</span>
            </el-col>
            <el-col :span='13'>
              <el-input placeholder='请输入' v-model="search.customerCode"></el-input>
            </el-col>
          </el-col>
          <el-col :span='6' class='colbox'>
            <el-button class='orangeBtn long1' @click="getData">查 询</el-button>
            <el-button class='wuBtn long1' @click="searchReset">重 置</el-button>
          </el-col>
        </el-row>
        <el-divider></el-divider>
          <!-- 组件 -->
    <commonTable
      :columns="columns"
      :data="tableData"
      :pager="page"
      :selection="selection"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    >
      <el-table-column
        slot="table_oper"
        align="left"
        fixed="right"
        label="操作"
        width="200"
        :resizable="false"
      >
         <template slot-scope="scoped">
            <el-button type="text" @click="waybillInfo(scoped.row)"> 查看详情 </el-button>
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
        { prop: 'waybill_no', label: '运单号', width: '212', align: 'center' },
        { prop: 'customer_name', label: '客户名称', width: '182', align: 'center' },
        { prop: 'customer_code', label: '客户编码', width: '135', align: 'center' },
        { prop: 'channel_name', label: '渠道', width: '142', align: 'center' },
        { prop: 'cargoes_num', label: '件数', width: '95', align: 'center' },
        { prop: 'customer_bill_weight', label: '客户结算重', width: '129', align: 'center' },
        { prop: 'agent_bill_weight', label: '代理结算重', width: '73', align: 'center' },
        { prop: 'salesman_name', label: '业务员', width: '120', align: 'center' },
        { prop: 'created_at', label: '下单日', width: '255', align: 'center', formatter: this.formatter }
      ],
      tableData: [],
      page: {
        pageNo: 1,
        limit: 10,
        sizes: [10, 50, 100],
        total: 0
      },
      search: {
        waybillNo: null,
        customerName: null,
        customerCode: null
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.$api.finance.other.profit.lists({
        waybillNo: this.search.waybillNo,
        customerName: this.search.customerName,
        customerCode: this.search.customerCode,
        page: this.page.pageNo,
        limit: this.page.limit
      }).then(res => {
        this.tableData = res.data.list
        this.page.total = res.data.total
      })
    },
    searchReset () {
      this.search = {
        waybillNo: null,
        customerName: null,
        customerCode: null
      }
    },
    // 重新渲染name列
    formatter (row, column, cellValue) {
      switch (column.property) {
        case 'created_at':
          return this.formatDate(row.created_at, 'yyyy-MM-dd')
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
    waybillInfo (row) {
      this.$router.push({ name: 'waybillDetail', params: { id: row.id } })
    }
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
