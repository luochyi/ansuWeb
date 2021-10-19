<template>
  <div>
    <div class='main'>
      <!--  标签页 -->
      <el-row type='flex' justify='flex-start' class='title' align='middle'>
        <span class='text'>账单核销</span>
      </el-row>
      <!-- 主要内容 -->
      <div class='content'>
        <!-- 组件 -->
        <commonTable
            :columns="columns"
            :data="tableData"
            :pager="page"
            @handleSizeChange="handleSizeChange"
            @handleCurrentChange="handleCurrentChange"
            @handleSelectionChange="handleSelectionChange"
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
      columns: [
        { prop: 'waybill_no', label: '运单号', width: '200', align: 'center' },
        { prop: 'name', label: '费用名称', width: '200', align: 'center' },
        { prop: 'type', label: '费用类型', width: '200', align: 'center', formatter: this.formatter },
        { prop: 'amount', label: '应付金额', width: '220', align: 'center' },
        { prop: 'bill_no', label: '所属账单', width: '200', align: 'center' },
        { prop: 'is_write_off', label: '核销状态', align: 'center', formatter: this.formatter }
      ],
      tableData: [],
      page: {
        pageNo: 1,
        limit: 10,
        sizes: [1, 5, 10],
        total: 0
      },
      customerId: 0,
      billIds: [],
      cosIds: []
    }
  },
  mounted () {
    this.billIds = this.$route.params.billIds
    this.getData()
  },
  methods: {
    getData () {
      this.$api.finance.fare.writeOff.customer.cost({
        billIds: this.billIds,
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
        case 'type':
          return row.type === 1 ? '基础运费' : row.type === 2 ? '附加费' : '其他'
        case 'is_write_off':
          return row.is_write_off === 1 ? '已核销' : '未核销'
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
      this.cosIds = []
      val && val.forEach((item) => {
        this.cosIds.push(item.id)
      })
    }
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
