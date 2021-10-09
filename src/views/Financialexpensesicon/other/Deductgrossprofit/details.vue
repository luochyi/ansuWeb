<template>
  <div>
  <div class="right">
        <div class="one">
          <el-row type='flex' justify='flex-start' class='title' align='middle'>
       <span class='text'>单票利润</span>
     </el-row>
      <el-descriptions class="margin-top" title="AS202012120001"  :column="3" :size="size">
          <el-descriptions-item >AS202012120001</el-descriptions-item>
            <el-descriptions-item label="客户名称">深圳沙马家具贸易有限公司</el-descriptions-item>
            <el-descriptions-item label="业务员">张三</el-descriptions-item>
        </el-descriptions>
     <el-descriptions class="margin-top" column="4" :size="size">
             <el-descriptions-item label="目的地">美国</el-descriptions-item>
             <el-descriptions-item label="目的国邮编">19999</el-descriptions-item>
             <el-descriptions-item label="申报价值">1000美元</el-descriptions-item>
             <el-descriptions-item label="品名">玩具</el-descriptions-item>
             <el-descriptions-item label="报关类型">一般贸易</el-descriptions-item>
             <el-descriptions-item label="清关类型">单独清关</el-descriptions-item>
             <el-descriptions-item label="是否有保险">有保险</el-descriptions-item>
             <el-descriptions-item label="货物">带电</el-descriptions-item>
             <el-descriptions-item label="入仓渠道">以星特快UPS派送</el-descriptions-item>
            <el-descriptions-item label="出仓渠道">以星特快UPS派送</el-descriptions-item>
            <el-descriptions-item label="代理结算重">80公斤</el-descriptions-item>
            <el-descriptions-item label="结算重">80公斤</el-descriptions-item>
             <el-descriptions-item label="货物数量">12件</el-descriptions-item>
     </el-descriptions>
     <el-divider></el-divider>
        <commonTable
      :column="column"
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
      <div class="two">
          <el-row type='flex' justify='flex-start' class='title' align='middle'>
       <span class='text'>扣毛利详情</span>
     </el-row>
    </div>
    <br>
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
      size: '',
      Deletedestination: false, // 删除目的国
      activeName: '1', // 标签绑定
      Approvaldetails: false, // 审批详情

      column: [
        { prop: 'OrderNo', label: '费用名称', width: '176', align: 'center' },
        { prop: 'name', label: '费运类型', width: '193', align: 'center', formatter: this.formatter },
        { prop: 'customerCode', label: '结算对象', width: '80', align: 'center', formatter: this.formatters },
        { prop: 'status', label: '币种', width: '94', align: 'center' },
        { prop: 'salesman', label: '单价', width: '106', align: 'center', type: 'slot', slotName: 'chakan' },
        { prop: 'Reviewer', label: '单位', width: '81', align: 'center' },
        { prop: 'Ordertype', label: '数量', width: '101', align: 'center' },
        { prop: 'number', label: '费用', width: '123', align: 'center', type: 'slot', slotName: 'jianshu' },
        { prop: 'Chargedmagnetic', label: '税金', width: '94', align: 'center' },
        { prop: 'channel', label: '结算费用', width: '108', align: 'center' },
        { prop: 'shipping', label: '录入人', width: '80', align: 'center' }
      ],
      tableData: []
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
.right{
float: left;
width: 1190px;
height: 1601px;
background: #E8EBF2;
border-radius: 4px;
border: 1px solid #E8E8E8;
margin: auto 20px;
}
.one{
    height:735px ;
    background: #FFFFFF ;
    width:1191px;
}
.two{
    background: #FFFFFF ;
    width: 1191px;
    height:738px ;
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
