<template>
  <div>
        <div class="right">
        <el-row type='flex' justify='flex-start' class='title' align='middle'>
       <span class='text'>费用确认单</span>
       <span class='texts'>合计费用：1，000元</span>
        <el-button class='whiteBtn '>下载费用Excle</el-button>
    </el-row>
    <br>
      <div class="one">
            <el-row type='flex' justify='flex-start' class='title' align='middle'>
       <span class='text'>合计费用</span>
    </el-row>
       <el-descriptions class="margin-top" column="6" :size="size">
<el-descriptions-item label="合计费用">2，000元</el-descriptions-item>
    <el-descriptions-item label="单价运费">18元</el-descriptions-item>
    <el-descriptions-item label="结算重">80公斤</el-descriptions-item>
     <el-descriptions-item label="基础费用">1，000元</el-descriptions-item>
      <el-descriptions-item label="附加费">1，000元</el-descriptions-item>
  </el-descriptions>
      </div>
      <br>
      <div class="two">
     <el-row type='flex'  justify='flex-start' class='title' align='middle'>
       <span class='text'>运单信息</span>
    </el-row>
       <el-descriptions class="margin-top" title="AS202012120001" column="5" :size="size">
<el-descriptions-item label="订单类型">FBA订单</el-descriptions-item>
    <el-descriptions-item label="目的仓">ONT8</el-descriptions-item>
    <el-descriptions-item label="目的国">美国</el-descriptions-item>
     <el-descriptions-item label="目的地邮编">19999</el-descriptions-item>
      <el-descriptions-item label="申报价值">1，000美元</el-descriptions-item>
<el-descriptions-item label="报关类型">一般贸易报关</el-descriptions-item>
    <el-descriptions-item label="清关类型">单独清关</el-descriptions-item>
    <el-descriptions-item label="是否有保险">有保险</el-descriptions-item>
     <el-descriptions-item label="品名">玩具</el-descriptions-item>
      <el-descriptions-item label="货物">带电</el-descriptions-item>
       <el-descriptions-item label="渠道">以星特快UPS派送</el-descriptions-item>
      <el-descriptions-item label="货物数量">12件</el-descriptions-item>
  </el-descriptions>
      </div>
      <br>
      <div class="three">
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
     </commonTable>
    </div>
    <br>
          <div class="four">
          <el-row type='flex' justify='flex-start' class='title' align='middle'>
       <span class='text'>结算重</span>
     </el-row>
          <commonTable
      :column="column"
      :data="tableData"
      :pager="page"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
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
      textarea: '',
      confirm: false,
      Tips: false,
      active: 0, // 步骤条
      value1: 1,

      size: '',
      Deletedestination: false, // 删除目的国
      activeName: '1', // 标签绑定
      Approvaldetails: false, // 审批详情

      columns: [
        { prop: 'OrderNo', label: '费用名称', width: '176', align: 'center' },
        { prop: 'name', label: '费运类型', width: '193', align: 'center', formatter: this.formatter },
        { prop: 'customerCode', label: '单价', width: '80', align: 'center', formatter: this.formatters },
        { prop: 'status', label: '单位', width: '94', align: 'center' },
        { prop: 'salesman', label: '数量', width: '106', align: 'center' },
        { prop: 'Reviewer', label: '费用', width: '81', align: 'center' },
        { prop: 'Ordertype', label: '税金', width: '101', align: 'center' },
        { prop: 'number', label: '结算费用', width: '123', align: 'center' }
      ],
      column: [
        { prop: 'OrderNo', label: '货件编号', width: '176', align: 'center' },
        { prop: 'name', label: '长', width: '193', align: 'center', formatter: this.formatter },
        { prop: 'customerCode', label: '宽', width: '80', align: 'center', formatter: this.formatters },
        { prop: 'status', label: '高', width: '94', align: 'center' },
        { prop: 'salesman', label: '体积', width: '106', align: 'center' },
        { prop: 'Reviewer', label: '实重', width: '81', align: 'center' },
        { prop: 'Ordertype', label: '材积重', width: '101', align: 'center' },
        { prop: 'number', label: '结算重', width: '123', align: 'center' }
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
.first{
  width: 159px;
  height: 67px;
  border: 1px solid #D9D9D9;
  margin: 20px;
}
.right{
float: left;
width: 1028px;
height: 1301px;
background: #E8EBF2;
border-radius: 4px;
border: 1px solid #E8E8E8;
margin: auto 20px;
}
.one{
    background: #FFFFFF ;
    width: 988px;
    height:135px ;
}
.two{
    background: #FFFFFF ;
    width: 988px;
    height:238px ;
}
.three{
  background: #FFFFFF ;
    width: 988px;
    height:325px ;
}
.el-descriptions{
    margin: auto  30px;
}
.title .text {
    width: 100px;
}
.title .texts {
    width: 800px;
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
