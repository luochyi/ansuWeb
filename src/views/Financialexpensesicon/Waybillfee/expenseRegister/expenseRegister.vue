<template>
  <div>
    <div class='main'>
      <!--  标签页 -->
      <el-row type='flex' justify='flex-start' class='title' align='middle'>
        <span class='text'>运单费用</span>
      </el-row>
      <!-- 主要内容 -->
      <div class='content'>
        <el-row class='searchbox1'>
          <el-col :span='6' class='colbox'>
            <el-col :span='6'>
              <span class='text'>客户名称</span>
            </el-col>
            <el-col :span='13'>
              <el-input v-model='customerName' placeholder='请输入'></el-input>
            </el-col>
          </el-col>
          <el-col :span='6' class='colbox'>
            <el-col :span='6'>
              <span class='text'>客户编码</span>
            </el-col>
            <el-col :span='13'>
              <el-input v-model='customerCode' placeholder='请输入'></el-input>
            </el-col>
          </el-col>
          <el-col :span='6' class='colbox'>
            <el-col :span='6'>
              <span class='text'>收据单号</span>
            </el-col>
            <el-col :span='13'>
              <el-input v-model='waybillNo' placeholder='请输入'></el-input>
            </el-col>
          </el-col>
          <el-col :span='6' class='colbox'>
            <el-col :span='6'>
              <span class='text'>对账状态</span>
            </el-col>
            <el-col :span='13'>
              <el-select v-model="value" placeholder="请选择">
         <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
         </el-option>
         </el-select>
            </el-col>
          </el-col>
        </el-row>
        <!--  -->
        <el-row class='searchbox1'>
          <el-col :span='6' class='colbox'>
            <el-col :span='6'>
              <span class='text'>结算方式</span>
            </el-col>
            <el-col :span='13'>
            <el-input v-model='destination' placeholder='请输入'></el-input>
            </el-col>
          </el-col>
          <el-col :span='6' class='colbox'>
            <el-col :span='6'>
              <span class='text'>结算周期</span>
            </el-col>
            <el-col :span='13'>
              <el-select v-model="value" placeholder="请选择">
         <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
         </el-option>
         </el-select>
            </el-col>
          </el-col>
          <el-col :span='6' class='colbox'>
            <el-col :span='6'>
              <span class='text'>业务员</span>
            </el-col>
             <el-col :span='13'>
                <el-input v-model='zipcode' placeholder='请输入'></el-input>
            </el-col>
          </el-col>
          <el-col :span='6' class='colbox'>
            <el-button class='orangeBtn long1'>查 询</el-button>
            <el-button class='wuBtn long1'>重 置</el-button>
            <el-button class='wuBtn long1'>展开全部</el-button>
          </el-col>
        </el-row>
        <el-divider></el-divider>
         <el-row class='searchbox1'>
          <el-col :span='10' class="left">
            <el-button class='stopBtn' @click="changes=true">批量登记费用</el-button>          </el-col>
            <el-col :span='12' class='right'>
                <el-button class='whiteBtn '>查询条件设置</el-button>
              <el-button class='whiteBtn '>列表显示设置</el-button>
            </el-col>
          </el-row>
          <br>
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
        width="226"
        :resizable="false"
      >
         <template slot-scoped="scoped">
          <el-button type="text" @click="Viewquote"> 费运登记</el-button>
                <span style="color: #0084FF; margin: 0px 5px">|</span>
                <el-button type="text" @click="adopt= true"> 修改尺寸 </el-button>
                <span style="color: #0084FF; margin: 0px 5px">|</span>
                <el-button type="text" @click="reject= true"> 查看详情 </el-button>
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
      waybillNo: '', // 运单号
      customerName: '', // 客户名称
      customerCode: '', // 客户编码
      predictionChannel: '', // 预报渠道
      destination: '', // 目的地
      zipcode: '', // 目的地邮编

      columns: [
        { prop: 'WaybillNo', label: '运单号', width: '140', align: 'center' },
        { prop: 'OrderNo', label: '预报单号', width: '133', align: 'center' },
        { prop: 'ForecastNo', label: '客户名称', width: '193', align: 'center', formatter: this.formatter },
        { prop: 'customerCode', label: '客户编号', width: '118', align: 'center', formatter: this.formatters },
        { prop: 'Waybillstatus', label: '运单状态', width: '90', align: 'center' },
        { prop: 'Chargeablefreight', label: '应收费运', width: '90', align: 'center' },
        { prop: 'registration', label: '应收登级', width: '84', align: 'center' },
        { prop: 'Collectionconfirmation', label: '收款账单确认', width: '109', align: 'center' },
        { prop: 'Collectionbill', label: '收款账单收款', width: '107', align: 'center' },
        { prop: 'Freightpayable', label: '应付费运', width: '89', align: 'center' },
        { prop: 'registration', label: '应付登记', width: '84', align: 'center' },
        { prop: 'Paymentbillconfirmation', label: '付款账单确认', width: '109', align: 'center' },
        { prop: 'Paymentbillpayment', label: '付款账单付款', width: '107', align: 'center' },
        { prop: 'Singleticketprofit', label: '单票利润', width: '82', align: 'center' },
        { prop: 'Duedate', label: '应收日期', width: '137', align: 'center' },
        { prop: 'duedate', label: '应付日期', width: '137', align: 'center' },
        { prop: 'ReceivingNumber', label: '收货件数', width: '88', align: 'center' },
        { prop: 'Forecastnumber', label: '预报件数', width: '164', align: 'center' },
        { prop: 'Problempiece', label: '问题件', width: '89', align: 'center' },
        { prop: 'Transportationtrack', label: '运输轨迹', width: '133', align: 'center' },
        { prop: 'invoice', label: '发票', width: '188', align: 'center' },
        { prop: 'Forecasttime', label: '预报时间', width: '179', align: 'center' },
        { prop: 'Sendingmethod', label: '寄件方式', width: '81', align: 'center' },
        { prop: 'Squarenumber', label: '方数', width: '70', align: 'center' },
        { prop: 'Realweight', label: '实重', width: '70', align: 'center' },
        { prop: 'Volumeweight', label: '材积重', width: '70', align: 'center' },
        { prop: 'Settlementweight', label: '结算重', width: '111', align: 'center' },
        { prop: 'Predictedweight', label: '预报重量', width: '80', align: 'center' },
        { prop: 'Predictionsquare', label: '预报方数', width: '80', align: 'center' },
        { prop: 'goodschanged', label: '改货方数', width: '95', align: 'center' },
        { prop: 'Modifiedweight', label: '改货重量', width: '95', align: 'center' },
        { prop: 'Modifiedvolumeweight', label: '改货材积重', width: '95', align: 'center' },
        { prop: 'Changesettlementweight', label: '改货结算重', width: '115', align: 'center' },
        { prop: 'Shipmentnumber', label: '货件编号', width: '165', align: 'center' },
        { prop: 'Ordertype', label: '订单类型', width: '89', align: 'center' },
        { prop: 'Destinationcountry', label: '目的国', width: '66', align: 'center' },
        { prop: 'destination', label: '目的地', width: '66', align: 'center' },
        { prop: 'Destinationzipcode', label: '目的地邮编', width: '123', align: 'center' },
        { prop: 'Forecastchannel', label: '预报渠道', width: '179', align: 'center' },
        { prop: 'Warehousingchannel', label: '入仓渠道', width: '179', align: 'center' },
        { prop: 'Exitchannel', label: '出仓渠道', width: '178', align: 'center' },
        { prop: 'Outboundagent', label: '出仓代理', width: '206', align: 'center' },
        { prop: 'Agencysettlement', label: '代理结算重', width: '111', align: 'center' },
        { prop: 'Dispatchtype', label: '派送类型', width: '80', align: 'center' },
        { prop: 'Dispatchstatus', label: '派送状态', width: '80', align: 'center' },
        { prop: 'TransferorderNo', label: '转单号', width: '260', align: 'center' },
        { prop: 'ReceiptNo', label: '接单号', width: '145', align: 'center' },
        { prop: 'declarationtype', label: '报关类型', width: '122', align: 'center' },
        { prop: 'customs clearance', label: '单独清关', width: '115', align: 'center' },
        { prop: 'ProductName', label: '品名', width: '103', align: 'center' },
        { prop: 'Declaredvalue', label: '申报价值', width: '81', align: 'center' },
        { prop: 'Ordertime', label: '下单时间', width: '182', align: 'center' },
        { prop: 'Customercomments', label: '客户备注', width: '110', align: 'center' },
        { prop: 'Internalremarks', label: '内部备注', width: '152', align: 'center' },
        { prop: 'Isthereinsurance', label: '是否有保险', width: '92', align: 'center' },
        { prop: 'salesman', label: '业务员', width: '108', align: 'center' }
      ],
      tableData: [],
      page: {
        pageNo: 1,
        limit: 1,
        sizes: [1, 5, 10],
        total: 0
      }
    }
  },
  mounted () {
    this.tableData = [
      { OrderNo: 'AS123123423412313', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄', button: '<a>11</a>' }
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
/deep/ .tableBtn{
  .batch{
    float: right;
    height: 30px;
    line-height: 32px;
    background: #FEF4E1;
    border-radius: 4px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
  }
}
</style>
