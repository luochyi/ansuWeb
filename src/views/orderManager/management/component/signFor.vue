<template>
    <div>
        <el-row class="box">
              <!-- 签收 -->
                <el-row>
                    <el-col :span="6" class="item">
                        <span class="item-box">运单号&nbsp;&nbsp;</span>
                        <el-input placeholder="请输入" class="input" v-model="code" size="small">
                            <i slot="suffix" class="unit" @click="dialogPL = true" style="cursor:pointer">批量</i>
                            <i slot="suffix" class="expend" @click="dialogPL = true" style="cursor:pointer">&#xe9cc;</i>
                        </el-input>
                    </el-col>
                    <el-col :span="6">
                        <el-button size="small" class="orangeBtn" style="margin-right:10px">查 询</el-button>
                        <el-button size="small" class="wuBtn" style="margin-right:10px">重 置</el-button>
                    </el-col>
                </el-row>
                <el-row class="line"></el-row>
            <el-row class='searchbox1' type='flex' justify='space-between' align='middle'>
            <el-col :span='14' class="left">
                <!-- <el-button class='stopBtn' @click="Export" size="small">批量导出Excel</el-button> -->
            </el-col>
            <el-col :span='10' class="right">
            </el-col>
            </el-row>
            <!-- 表格 -->
            <div class="table">
              <commonTable
                :columns="columns"
                :selection="selection"
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
                  width="126"
                  :resizable="false"
                  >
                  <template slot-scope="scope">
                    <span @click="detail(scope.row)" class="blue">详情</span>
                  </template>
                </el-table-column>
              </commonTable>
            </div>
        </el-row>
    </div>
</template>

<script>
export default {
  data () {
    return {
      selection: false,
      code: '',
      req: {
        waybillIds: [],
        channelServiceId: null
      },
      columns: [
        { prop: 'type', label: '运单类型', align: 'center', formatter: this.formatter },
        { prop: 'customer_name', label: '客户名称', width: '200', align: 'center' },
        { prop: 'customer_code', label: '客户编码', width: '200', align: 'center' },
        { prop: 'waybill_no', label: '运单号', width: '200', align: 'center' },
        { prop: 'forecast_no', label: '预报单号', width: '200', align: 'center' },
        { prop: 'channel_name', label: '渠道名称', width: '200', align: 'center' },
        { prop: 'has_invoice', label: '是否制作发票', width: '200', align: 'center', formatter: this.formatter },
        { prop: 'irikura_time', label: '入库时间', width: '200', align: 'center', formatter: this.formatter },
        { prop: 'created_at', label: '下单时间', width: '200', align: 'center', formatter: this.formatter },
        { prop: 'remark', label: '客户备注', width: '200', align: 'center' },
        { prop: 'interior_remark', label: '内部备注', width: '200', align: 'center' }
      ],
      tableData: [],
      page: {
        limit: 10,
        total: 0,
        sizes: [1, 5, 10],
        pageNo: 1
      }
    }
  },
  mounted () {
    // 在页面加载前调用获取列表数据函数
    this.getData()
  },
  methods: {
    // 获取列表数据
    getData () {
      // shipmentLists
      // signLists
      // checkoutLists
      // Ejectlists
      this.$api.Ordermanagement.signLists({ limit: this.page.limit, page: this.page.pageNo }).then(res => {
        this.page.total = res.data.total // 数据总量
        this.tableData = res.data.list
      })
    },
    detail (data) {
      this.$router.push({ name: 'waybillDetail', params: { id: data.id } })
    },
    // 页码切换
    handleCurrentChange (val) {
      this.page.pageNo = val
      this.getData()
    },
    // 页容量切换
    handleSizeChange (val) {
      this.page.limit = val
      this.getData()
    },
    // 表格格式化
    formatter (row, column, cellValue) {
      switch (column.property) {
        case 'type':
          return row.type === 1 ? 'FBA运单' : '非FBA运单'
        case 'has_invoice':
          return row.has_invoice === 1 ? '是' : '否'
        case 'irikura_time':
          return this.formatDate(row.irikura_time, 'yyyy-MM-dd hh:mm:ss')
        case 'created_at':
          return this.formatDate(row.created_at, 'yyyy-MM-dd hh:mm:ss')
      }
    },
    handleClose () {}
  }
}
</script>
<style lang="scss" scoped>
.line{
    height: 1px;
    background: #E9E9E9;
    margin: 18px 0;
}
.input{
    width: 70%;
    display: flex;
    align-items: center;
}
.box{
    background: #fff;
    padding: 14px 32px;
    text-align: left;
}
.item{
    display: flex;
    align-items: center;
}
.item-box{
    text-align: right;
    width: 80px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.65);
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
  line-height: 32px;
  font-size: 14px;
  font-style: normal;
  color: #FE822F;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
