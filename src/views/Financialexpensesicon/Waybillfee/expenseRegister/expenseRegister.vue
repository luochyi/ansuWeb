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
            <el-button class='stopBtn' @click="Batchregistration">批量登记费用</el-button></el-col>
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
    <!-- slot -->
      <template v-slot:jianshu='slotData'>
         {{slotData.data.info}}<span style="color: #0084FF;cursor:pointer" @click="list(slotData)">装箱清单</span>
      </template>
      <template v-slot:guiji='slotData'>
         {{slotData.data.info}}<span style="color: #0084FF;cursor:pointer" @click="track(slotData)">更新轨迹</span>
      </template>
      <template v-slot:fapiao='slotData'>
         {{slotData.data.info}}<span style="color: #0084FF;cursor:pointer" @click="Print(slotData)">打印|修改</span>
      </template>
      <template v-slot:jiesuan='slotData'>
         {{slotData.data.info}}<span style="color: #0084FF;cursor:pointer" @click="details(slotData)">详情</span>
      </template>
       <template v-slot:gaihuo='slotData'>
         {{slotData.data.info}}<span style="color: #0084FF;cursor:pointer" @click="modify(slotData)">修改</span>
      </template>
      <template v-slot:bianhao='slotData'>
         {{slotData.data.info}}<span style="color: #0084FF;cursor:pointer" @click="whole(slotData)">全部</span>
      </template>
      <template v-slot:rucang='slotData'>
         {{slotData.data.info}}<span style="color: #0084FF;cursor:pointer" @click="Warehousing(slotData)">修改</span>
      </template>
      <template v-slot:chucang='slotData'>
         {{slotData.data.info}}<span style="color: #0084FF;cursor:pointer" @click="Outwarehouse(slotData)">修改</span>
      </template>
      <template v-slot:daili='slotData'>
         {{slotData.data.info}}<span style="color: #0084FF;cursor:pointer" @click="agent(slotData)">修改</span>
      </template>
      <template v-slot:dailijiesuan='slotData'>
         {{slotData.data.info}}<span style="color: #0084FF;cursor:pointer" @click="settlement(slotData)">详情</span>
      </template>
      <template v-slot:zhuandanhao='slotData'>
         {{slotData.data.info}}<span style="color: #0084FF;cursor:pointer" @click="website(slotData)">查看官网|修改</span>
      </template>
       <template v-slot:jiedanhao='slotData'>
         {{slotData.data.info}}<span style="color: #0084FF;cursor:pointer" @click="Receipt(slotData)">修改</span>
      </template>
      <template v-slot:pinming='slotData'>
         {{slotData.data.info}}<span style="color: #0084FF;cursor:pointer" @click="Name(slotData)">查看</span>
      </template>
      <template v-slot:neibu='slotData'>
         {{slotData.data.info}}<span style="color: #0084FF;cursor:pointer" @click="inside(slotData)">查看</span>
      </template>
      <template v-slot:yewuyuan='slotData'>
         {{slotData.data.info}}<span style="color: #0084FF;cursor:pointer" @click="salesman(slotData)">查看</span>
      </template>
      <el-table-column
        slot="table_oper"
        align="center"
        fixed="right"
        label="操作"
        width="226"
        :resizable="false"
      >
         <template slot-scoped="scoped">
          <el-button type="text" @click="registration"> 费运登记</el-button>
                <span style="color: #0084FF; margin: 0px 5px">|</span>
                <el-button type="text" @click="adopt= true"> 修改尺寸 </el-button>
                <span style="color: #0084FF; margin: 0px 5px">|</span>
                <el-button type="text" @click="reject= true"> 查看详情 </el-button>
        </template>
      </el-table-column>
    </commonTable>
      </div>
    </div>
     <!-- 修改尺寸抽屉组件 -->
    <commonDrawer :drawerVrisible="drawerVrisible" :drawerTitle="drawerTitle">
       <!-- 内容区域 -->
      <div class="dra-content">
        <div class="adopt">
              <span class='texta'>箱子：FBA1342342525001</span>
              <br>
              <span class='text'>产品：</span>
              <br>
              <span class='text'>保温杯2020款
                <el-button class='whiteBtn '>12件</el-button>
                 <el-button type="text" size="mini" @click="() => change(data)">
                  隐藏详情
                </el-button>
              </span>
        </div>
        <div class="biaodan">
      <el-descriptions class="margin-top"  :column="2" :size="size">
<el-descriptions-item label="产品中文名">保温杯</el-descriptions-item>
    <el-descriptions-item label="产品英文名">vacuum cup</el-descriptions-item>
    <el-descriptions-item label="材质中文名">不锈钢、塑料</el-descriptions-item>
     <el-descriptions-item label="材质英文名">Stainless steel、 plastic</el-descriptions-item>
    <el-descriptions-item label="用途中文名">容器、杯子</el-descriptions-item>
    <el-descriptions-item label="用途英文名">Container、 cup</el-descriptions-item>
    <el-descriptions-item label="海关编码">14234231</el-descriptions-item>
    <el-descriptions-item label="申报价格">30$</el-descriptions-item>
    <el-descriptions-item label="产品品牌">TIGER</el-descriptions-item>
    <el-descriptions-item label="产品型号">ATX660-2020</el-descriptions-item>
    <el-descriptions-item label="产品重量">70KG</el-descriptions-item>
  </el-descriptions>
   <el-descriptions >
    <el-descriptions-item label="亚马逊店铺商店">http://www.amazon.cn/dp/B072MKVS7F/ref=Ip-1488436071-1-1？s=shoes&ie=UTF&&qid=1605232976&sr</el-descriptions-item>
</el-descriptions>
        </div>
         <div class="foot">
           <span class='text'>保温杯2019款
                <el-button class='whiteBtn'>10件</el-button>
                 <el-button type="text" size="mini" @click="() => change(data)">
                  查看详情
                </el-button>
              </span>
              <br>
              <span class='text'>保温杯漫威联名版
                <el-button class='whiteBtn '>10件</el-button>
                 <el-button type="text" size="mini" @click="() => change(data)">
                  查看详情
                </el-button>
              </span>
        </div>
      </div>
      <!-- 抽屉底部按钮 -->
      <div slot="footer">
        <button class="btn-orange" @click="submit()">
          <span> <i class="el-icon-circle-check"></i>提交</span>
        </button>
        <button class="btn-gray" @click="addClose">
          <span>取消</span>
        </button>
      </div>
    </commonDrawer>
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

      drawerVrisible: false, // 控制抽屉显示隐藏
      drawerTitle: '装箱清单', // 抽屉标题

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
        { prop: 'Forecastnumber', label: '预报件数', width: '164', align: 'center', type: 'slot', slotName: 'jianshu' },
        { prop: 'Problempiece', label: '问题件', width: '89', align: 'center' },
        { prop: 'Transportationtrack', label: '运输轨迹', width: '133', align: 'center', type: 'slot', slotName: 'guiji' },
        { prop: 'invoice', label: '发票', width: '188', align: 'center', type: 'slot', slotName: 'fapiao' },
        { prop: 'Forecasttime', label: '预报时间', width: '179', align: 'center' },
        { prop: 'Sendingmethod', label: '寄件方式', width: '81', align: 'center' },
        { prop: 'Squarenumber', label: '方数', width: '70', align: 'center' },
        { prop: 'Realweight', label: '实重', width: '70', align: 'center' },
        { prop: 'Volumeweight', label: '材积重', width: '70', align: 'center' },
        { prop: 'Settlementweight', label: '结算重', width: '111', align: 'center', type: 'slot', slotName: 'jiesuan' },
        { prop: 'Predictedweight', label: '预报重量', width: '80', align: 'center' },
        { prop: 'Predictionsquare', label: '预报方数', width: '80', align: 'center' },
        { prop: 'goodschanged', label: '改货方数', width: '95', align: 'center' },
        { prop: 'Modifiedweight', label: '改货重量', width: '95', align: 'center' },
        { prop: 'Modifiedvolumeweight', label: '改货材积重', width: '95', align: 'center' },
        { prop: 'Changesettlementweight', label: '改货结算重', width: '115', align: 'center', type: 'slot', slotName: 'gaihuo' },
        { prop: 'Shipmentnumber', label: '货件编号', width: '165', align: 'center', type: 'slot', slotName: 'bianhao' },
        { prop: 'Ordertype', label: '订单类型', width: '89', align: 'center' },
        { prop: 'Destinationcountry', label: '目的国', width: '66', align: 'center' },
        { prop: 'destination', label: '目的地', width: '66', align: 'center' },
        { prop: 'Destinationzipcode', label: '目的地邮编', width: '123', align: 'center' },
        { prop: 'Forecastchannel', label: '预报渠道', width: '179', align: 'center' },
        { prop: 'Warehousingchannel', label: '入仓渠道', width: '179', align: 'center', type: 'slot', slotName: 'rucang' },
        { prop: 'Exitchannel', label: '出仓渠道', width: '178', align: 'center', type: 'slot', slotName: 'chucang' },
        { prop: 'Outboundagent', label: '出仓代理', width: '206', align: 'center', type: 'slot', slotName: 'daili' },
        { prop: 'Agencysettlement', label: '代理结算重', width: '111', align: 'center', type: 'slot', slotName: 'dailijiesuan' },
        { prop: 'Dispatchtype', label: '派送类型', width: '80', align: 'center' },
        { prop: 'Dispatchstatus', label: '派送状态', width: '80', align: 'center' },
        { prop: 'TransferorderNo', label: '转单号', width: '260', align: 'center', type: 'slot', slotName: 'zhuandanhao' },
        { prop: 'ReceiptNo', label: '接单号', width: '145', align: 'center', type: 'slot', slotName: 'jiedanhao' },
        { prop: 'declarationtype', label: '报关类型', width: '122', align: 'center' },
        { prop: 'customs clearance', label: '单独清关', width: '115', align: 'center' },
        { prop: 'ProductName', label: '品名', width: '103', align: 'center', type: 'slot', slotName: 'pinming' },
        { prop: 'Declaredvalue', label: '申报价值', width: '81', align: 'center' },
        { prop: 'Ordertime', label: '下单时间', width: '182', align: 'center' },
        { prop: 'Customercomments', label: '客户备注', width: '110', align: 'center' },
        { prop: 'Internalremarks', label: '内部备注', width: '152', align: 'center', type: 'slot', slotName: 'neibu' },
        { prop: 'Isthereinsurance', label: '是否有保险', width: '92', align: 'center' },
        { prop: 'salesman', label: '业务员', width: '108', align: 'center', type: 'slot', slotName: 'yewuyuan' }
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
      { OrderNo: 'AS123123423412313', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄', button: '<a>11</a>' }
    ]
    this.page.total = 2
  },
  methods: {
    registration () {
      this.$router.push({ name: 'registration' })
    },
    Batchregistration () {
      this.$router.push({ name: 'Batchregistration' })
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
    editTableData (row) {},
    // 查看
    check (val) {
      console.log(val.data)
      this.drawerVrisible = true
    },
    // 装箱清单
    list (val) {
      console.log(val.data)
      this.drawerVrisible = true
    },
    // 关闭抽屉
    addClose () {
      this.drawerVrisible = false
    },
    // 返回抽屉
    raturn () {
      this.drawerVrisibla = false
    },
    // 内部备注
    remarks (val) {
      console.log(val.data)
      this.drawerVrisibla = true
    },
    // 结算备注
    details (val) {
      console.log(val.data)
      this.drawerVrisiblb = true
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
