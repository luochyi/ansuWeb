<template>
  <div>
    <!--  标签页 -->
    <el-row type='flex' justify='flex-start' class='title' align='middle'>
      <span class='text' style="height:43px;lineHeight:43px">购买保险运单</span>
      <el-tabs v-model="activeName" type="card" @tab-click="getData">
        <el-tab-pane label="可投保" name="1"></el-tab-pane>
        <el-tab-pane label="不可投保" name="2"></el-tab-pane>
        <el-tab-pane label="全部" name="0"></el-tab-pane>
      </el-tabs>
    </el-row>
    <!-- 主要内容 -->
    <div class='content'>
      <!-- 表格 -->
      <div>
        <commonTable
          :columns="columns"
          :data="tableData"
          :pager="page"
          @handleSizeChange="handleSizeChange"
          @handleCurrentChange="handleCurrentChange"
          @handleSelectionChange="handleSelectionChange"
        >
          <!-- 操作 -->
          <el-table-column
            slot="table_oper"
            align="center"
            fixed="right"
            label="操作"
            width="210"
            :resizable="false"
          >
            <template slot-scope="scope">
              <span @click="detail(scope.row)" class="blue">查看保单</span>
              <span @click="detail(scope.row)" class="blue">&nbsp;|&nbsp;查看运单</span>
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
      columns: [
        { prop: 'safe_no', label: '保单号', width: '100', align: 'center' },
        { prop: 'waybill_no', label: '运单号', width: '100', align: 'center' },
        { prop: 'type', label: '运单类型', width: '100', align: 'center', formatter: this.formatter },
        { prop: 'safe_status', label: '保险', width: '100', align: 'center', formatter: this.formatter },
        { prop: 'customer_name', label: '客户名称', width: '100', align: 'center' },
        { prop: 'customer_code', label: '客户编码', width: '100', align: 'center' },
        { prop: 'channel_name', label: '渠道名称', width: '100', align: 'center' },
        { prop: 'channel_cate', label: '渠道类型', width: '100', align: 'center' },
        { prop: 'country_name', label: '目的国', width: '100', align: 'center' },
        { prop: 'cargoes_num', label: '货件数', width: '100', align: 'center' },
        { prop: 'bill_weight', label: '入仓结算重', width: '100', align: 'center' },
        { prop: 'declared_value', label: '申报价值', width: '100', align: 'center' },
        { prop: 'currency_name', label: '申报币种', width: '100', align: 'center' },
        { prop: 'safe_declared_value', label: '投保货值', width: '100', align: 'center' },
        { prop: 'unit_safe_declared_value', label: '每公斤货值', width: '100', align: 'center' },
        { prop: 'created_at', label: '下单时间', width: '100', align: 'center', formatter: this.formatter }
      ],
      tableData: [],
      page: {
        pageNo: 1,
        limit: 10,
        sizes: [1, 5, 10],
        total: 0
      },
      waybillIds: [],
      activeName: '1'
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$api.order.waybill.safe.lists({
        page: this.page.pageNo,
        limit: this.page.limit,
        status: Number(this.activeName)
      }).then(res => {
        this.tableData = res.data.list
        this.page.total = res.data.total
      })
    },
    // 重新渲染name列
    formatter (row, column, cellValue) {
      switch (column.property) {
        case 'type':
          return row.waybill_type === 1 ? 'FBA运单' : '非FBA运单'
        case 'safe_status':
          return row.safe_status === 1 ? '允许投保' : '货值错误'
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
    // 复选
    handleSelectionChange (val) {
      this.cosIds = []
      val && val.forEach((item) => {
        this.waybillIds.push(item.id)
      })
    },
    // 查看
    detail (val) {
      console.log(val.data)
      this.$router.push('name:sjmssqDetail')
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .searchbox1{
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
.unit{
    line-height: 32px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #FE822F;
    margin-right: 10px;
}
.expend {
  font-family: "iconfont" !important;
  font-size: 14px;
  font-style: normal;
  color: #FE822F;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
/deep/ .el-dialog{
  position: absolute;
  margin: 0px !important;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .el-dialog__header{
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
  }
  .el-dialog__body{
    border-top: 1px solid rgba(0,0,0,0.06);
    border-bottom: 1px solid rgba(0,0,0,0.06);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.65);
  }
}
</style>
