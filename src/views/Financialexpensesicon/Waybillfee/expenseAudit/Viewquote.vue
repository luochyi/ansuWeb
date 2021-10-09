<template>
  <div>
  <div class="left" >
        <el-row type='flex' justify='flex-start' class='title' align='middle'>
       <span class='text'>报价确认单</span>
    </el-row>
        <div class="first">
       <span class='text'>业务员：张三</span><br>
        <el-button type="text" @click="Deletedestination= true"> 删除 </el-button>
       </div>
     </div>
  <div class="right">
      <div class="one">
      <el-button @click="Approvaldetails= true" class='whiteBtn' style="margin:15px; float: left; ">审批详情 </el-button>
      </div>
      <br>
      <div class="two">
      <el-button type="text" style="margin:15px; float: left;  " icon="el-icon-success">审核通过 </el-button>
      </div>
      <br>
            <div class="three">
          <el-row type='flex' justify='flex-start' class='title' align='middle'>
       <span class='text'>基础运价确认</span>
     </el-row>
 <el-descriptions class="margin-top" column="4" :size="size">
<el-descriptions-item label="运费单价">18/公斤</el-descriptions-item>
    <el-descriptions-item label="单价调整">+1/公斤</el-descriptions-item>
    <el-descriptions-item label="报价单价">19/公斤</el-descriptions-item>
  </el-descriptions>
  <el-divider></el-divider>
  <el-descriptions >
         <el-descriptions-item label="调价理由">老客户了，希望能便宜点，长久合作</el-descriptions-item>
</el-descriptions>
    </div>
      <br>
      <div class="four">
          <el-row type='flex' justify='flex-start' class='title' align='middle'>
       <span class='text'>附加费用明细</span>
     </el-row>
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
        width="105"
        :resizable="false"
      >
         <template slot-scoped="scoped">
          <el-button type="text" @click="detailspage"> 修改</el-button>
                <span style="color: #0084FF; margin: 0px 5px">|</span>
                <el-button type="text" @click="password= true"> 删除 </el-button>
        </template>
      </el-table-column>
     </commonTable>
    </div>
    <br>
      <div class="five">
          <el-row type='flex' justify='flex-start' class='title' align='middle'>
       <span class='text'>运单信息</span>
     </el-row>
      <el-descriptions class="margin-top" title="AS202012120001"  :column="4" :size="size">
    <el-descriptions-item label="客户名称">深圳沙马家具贸易有限公司</el-descriptions-item>
      </el-descriptions>
     <el-descriptions class="margin-top" column="4" :size="size">
<el-descriptions-item label="客户编码">沙马家具SMJJFBAONTB</el-descriptions-item>
    <el-descriptions-item label="订单类型">FBA订单</el-descriptions-item>
    <el-descriptions-item label="目的仓">ONTB</el-descriptions-item>
  </el-descriptions>
     <el-descriptions class="margin-top" column="4" :size="size">
    <el-descriptions-item label="目的国">美国</el-descriptions-item>
    <el-descriptions-item label="目的国邮编">19999</el-descriptions-item>
    <el-descriptions-item label="申报价值">1000美元</el-descriptions-item>
    <el-descriptions-item label="业务员">张三</el-descriptions-item>
    <el-descriptions-item label="报关类型">一般贸易</el-descriptions-item>
    <el-descriptions-item label="清关类型">单独清关</el-descriptions-item>
    <el-descriptions-item label="是否有保险">有保险</el-descriptions-item>
    <el-descriptions-item label="品名">玩具</el-descriptions-item>
    <el-descriptions-item label="预报渠道">以星特快UPS派送</el-descriptions-item>
    <el-descriptions-item label="入仓渠道">以星特快UPS派送</el-descriptions-item>
    <el-descriptions-item label="货物数量">12件</el-descriptions-item>
    <el-descriptions-item label="货物">带电</el-descriptions-item>
    <el-descriptions-item label="方数">30立方</el-descriptions-item>
    <el-descriptions-item label="实重">100公斤</el-descriptions-item>
    <el-descriptions-item label="材积重">90公斤</el-descriptions-item>
    <el-descriptions-item label="结算重">80公斤</el-descriptions-item>
  </el-descriptions>
         <el-descriptions >
         <el-descriptions-item label="备注">走以星</el-descriptions-item></el-descriptions>
         <el-descriptions >
         <el-descriptions-item label="内部备注">走以星报美森</el-descriptions-item>
</el-descriptions>
    </div>
    <br>
      <div class="six">
          <el-row type='flex' justify='flex-start' class='title' align='middle'>
       <span class='text'>发货产品</span>
     </el-row>
      <el-descriptions class="margin-top" title="保温杯2020款"  :column="4" :size="size">
<el-descriptions-item label="产品中文名">保温杯</el-descriptions-item>
    <el-descriptions-item label="产品英文名">vacuum cup</el-descriptions-item>
    <el-descriptions-item label="材质中文名">不锈钢、塑料</el-descriptions-item>
     <el-descriptions-item label="材质英文名">Stainless steel、 plastic</el-descriptions-item>
    <el-descriptions-item label="用途中文名">容器、杯子</el-descriptions-item>
    <el-descriptions-item label="用途英文名">Container、 cup</el-descriptions-item>
    <el-descriptions-item label="海关编码">14234231</el-descriptions-item>
    <el-descriptions-item label="申报价格">30$</el-descriptions-item>
  </el-descriptions>
  <el-descriptions class="margin-top" column="4" :size="size">
    <el-descriptions-item label="产品品牌">TIGER</el-descriptions-item>
    <el-descriptions-item label="产品型号">ATX660-2020</el-descriptions-item>
    <el-descriptions-item label="产品重量">70KG</el-descriptions-item>
  </el-descriptions>
         <el-descriptions >
         <el-descriptions-item label="亚马逊ASIN">2345353453553453453</el-descriptions-item></el-descriptions>
         <el-descriptions >
         <el-descriptions-item label="亚马逊店铺商店">http://www.amazon.cn/dp/B072MKVS7F/ref=Ip-1488436071-1-1？s=shoes&ie=UTF&&qid=1605232976&sr</el-descriptions-item>
</el-descriptions>
<el-divider></el-divider>
      <el-descriptions class="margin-top" title="保温杯2019款"  :column="4" :size="size">
<el-descriptions-item label="产品中文名">保温杯</el-descriptions-item>
    <el-descriptions-item label="产品英文名">vacuum cup</el-descriptions-item>
    <el-descriptions-item label="材质中文名">不锈钢、塑料</el-descriptions-item>
     <el-descriptions-item label="材质英文名">Stainless steel、 plastic</el-descriptions-item>
    <el-descriptions-item label="用途中文名">容器、杯子</el-descriptions-item>
    <el-descriptions-item label="用途英文名">Container、 cup</el-descriptions-item>
    <el-descriptions-item label="海关编码">14234231</el-descriptions-item>
    <el-descriptions-item label="申报价格">30$</el-descriptions-item>
  </el-descriptions>
  <el-descriptions class="margin-top" column="4" :size="size">
    <el-descriptions-item label="产品品牌">TIGER</el-descriptions-item>
    <el-descriptions-item label="产品型号">ATX660-2020</el-descriptions-item>
    <el-descriptions-item label="产品重量">70KG</el-descriptions-item>
  </el-descriptions>
         <el-descriptions >
         <el-descriptions-item label="亚马逊ASIN">2345353453553453453</el-descriptions-item></el-descriptions>
         <el-descriptions >
         <el-descriptions-item label="亚马逊店铺商店">http://www.amazon.cn/dp/B072MKVS7F/ref=Ip-1488436071-1-1？s=shoes&ie=UTF&&qid=1605232976&sr</el-descriptions-item>
</el-descriptions>
    </div>
    <br>
      <div class="seven">
           <span class='text' >报价合计：¥1200.00</span>
          <el-row style="margin: 20px; float: right;">
          <el-button class="orangeBtn" icon="el-icon-circle-check">通过审核</el-button>
          <el-button class="wthBtn">取消</el-button>
        </el-row>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      textarea: '',
      confirm: false,
      Tips: false,
      active: 0, // 步骤条
      value1: 1,
      options1: [
        {
          value: 1,
          label: '增加'
        },
        {
          value: 2,
          label: '减少'
        },
        {
          value: 3,
          label: '乘以'
        }
      ],
      size: '',
      Deletedestination: false, // 删除目的国
      activeName: '1', // 标签绑定
      Approvaldetails: false, // 审批详情

      columns: [
        { prop: 'OrderNo', label: '费用名称', width: '122', align: 'center' },
        { prop: 'name', label: '费运类型', width: '85', align: 'center', formatter: this.formatter },
        { prop: 'customerCode', label: '结算对象', width: '110', align: 'center', formatter: this.formatters },
        { prop: 'status', label: '币种', width: '66', align: 'center' },
        { prop: 'salesman', label: '单价', width: '66', align: 'center', type: 'slot', slotName: 'chakan' },
        { prop: 'Reviewer', label: '单位', width: '54', align: 'center' },
        { prop: 'Ordertype', label: '数量', width: '54', align: 'center' },
        { prop: 'number', label: '费用', width: '81', align: 'center', type: 'slot', slotName: 'jianshu' },
        { prop: 'Chargedmagnetic', label: '税金', width: '54', align: 'center' },
        { prop: 'channel', label: '结算费用', width: '81', align: 'center' },
        { prop: 'shipping', label: '录入人', width: '66', align: 'center' }
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
    next () {
      if (this.active++ > 2) this.active = 0
    }
  }

}

</script>
<style lang="scss" scoped>
.title{
 height: 56px;
 font-size: 16px;
}
.left{
  float: left;
  width: 212px;
  height: 1701px;
  background: #FFFFFF;
border-radius: 4px;
border: 1px solid #E8E8E8;
text-align:left;
}
.first{
  width: 159px;
  height: 67px;
  border: 1px solid #D9D9D9;
  margin: 20px;
}
.right{
float: left;
width: 1028px;
height: 1601px;
background: #E8EBF2;
border-radius: 4px;
border: 1px solid #E8E8E8;
margin: auto 20px;
}
.one{
    background: #FFFFFF ;
    width: 988px;
    height:63px ;
}
.two{
    background: #FFFFFF ;
    width: 988px;
    height:63px ;
}
.three{
  background: #FFFFFF ;
    width: 988px;
    height:161px ;
}
.el-descriptions{
    margin: auto  30px;
}
.title .text {
    width: 100px;
}
.infoBox{
  margin-bottom: 20px;
  /deep/ .el-input{
    .el-input__inner{
      height: 32px;
      line-height: 32px;
    }
    .el-input__icon{
      line-height: 24px;
    }
  }
  .box_title{
    margin-bottom: 20px;
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.65)
  }
  .info{
    display: flex;
    margin-bottom: 10px;
    margin: 20px;
    .name{
      margin-right: 10px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.65);
    }
  }
}
.el-divider--horizontal {
    display: block;
    height: 1px;
    width: 100%;
    margin: 14px 0;
}
.four{
    height:325px ;
    background: #FFFFFF ;
    width: 988px;
}
.five{
    height:367px ;
    background: #FFFFFF ;
    width: 988px;
}
.six{
    height:514px ;
    background: #FFFFFF ;
    width: 988px;
}
.seven{
    height:63px ;
    background: #FFFFFF ;
    width: 1028px;
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

}
/deep/ .el-dialog{
  text-align: left;
  width: 988px;
}
//biankuang
/deep/ .el-dialog__body {
    padding: 10px 15px;
    border-top:1px solid rgba(0, 0, 0, 0.06);
    border-bottom:1px solid rgba(0, 0, 0, 0.06);
}
/deep/ .el-dialog__header {
    padding: 10px 10px ;
}
/deep/ .el-dialog__footer{
  padding: 5px 10px ;
}
.el-col-24{
  width: 130px;
}
</style>
