<template>
  <div>
    <div class='main'>
      <!--  标签页 -->
      <el-row type='flex' justify='flex-start' class='title' align='middle'>
        <span class='text'>运费确认</span>
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
            <el-col :span='7'>
              <span class='text'>客户编码</span>
            </el-col>
            <el-col :span='13'>
              <el-input v-model='customerCode' placeholder='请输入'></el-input>
            </el-col>
          </el-col>
            <el-col :span='6' class='colbox'>
            <el-col :span='6'>
              <span class='text'>运单号</span>
            </el-col>
            <el-col :span='13'>
              <el-input v-model='waybillNo' placeholder='请输入'></el-input>
            </el-col>
          </el-col>
          <el-col :span='6' class='colbox'>
            <el-col :span='6'>
              <span class='text'>确认状态</span>
            </el-col>
            <el-col :span='13'>
               <el-select v-model="valuea" placeholder="请选择">
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
              <span class='text'>费用确认员</span>
            </el-col>
            <el-col :span='13'>
           <el-select v-model="value" placeholder="请选择">
         <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
         </el-option>
         </el-select>
            </el-col>
          </el-col>
          <el-col :span='6' class='colbox'>
            <el-col :span='7'>
              <span class='text'>渠道</span>
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
              <span class='text'>运单状态</span>
            </el-col>
             <el-col :span='13'>
                <el-select v-model="value" placeholder="请选择">
         <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
         </el-option>
         </el-select>
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
            <el-button class='stopBtn' @click="Generatebill = true">生成账单</el-button>
            <el-button class='stopBtn' @click="Batchexport=true">批量导出Excle</el-button>
            <el-button class='stopBtn' @click="Bulksendmail=true">批量发送邮件</el-button>
            <el-button class='stopBtn' @click="confirmation=true">批量确认费用</el-button>
          </el-col>
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
      <template v-slot:bianhao='slotData'>
         {{slotData.data.info}}<span style="color: #0084FF;cursor:pointer" @click="check(slotData)">查看</span>
      </template>
      <template v-slot:feiyong='slotData'>
         {{slotData.data.info}}<span style="color: #0084FF;cursor:pointer" @click="see(slotData)">查看</span>
      </template>
      <template v-slot:youxiang='slotData'>
         {{slotData.data.info}}<span style="color: #0084FF;cursor:pointer" @click="modify(slotData)">修改</span>
      </template>
      <template v-slot:jiesuan='slotData'>
         {{slotData.data.info}}<span style="color: #0084FF;cursor:pointer" @click="settlement(slotData)">查看</span>
      </template>
      <template v-slot:pinming='slotData'>
         {{slotData.data.info}}<span style="color: #0084FF;cursor:pointer" @click="Name(slotData)">查看</span>
      </template>
       <template v-slot:yewuyuan='slotData'>
         {{slotData.data.info}}<span style="color: #0084FF;cursor:pointer" @click="salesman(slotData)">查看</span>
      </template>
      <template v-slot:zhouqi='slotData'>
         {{slotData.data.info}}<span style="color: #0084FF;cursor:pointer" @click="screen(slotData)">自动筛选</span>
      </template>
      <el-table-column
        slot="table_oper"
        align="center"
        fixed="right"
        label="操作"
        width="344"
        :resizable="false"
      >
         <template slot-scoped="scoped">
          <el-button type="text" @click="Viewquote"> 查看运单</el-button>
                <span style="color: #0084FF; margin: 0px 5px">|</span>
                <el-button type="text" @click="adopt= true"> 发送费运单 </el-button>
                <span style="color: #0084FF; margin: 0px 5px">|</span>
                <el-button type="text" @click="reject= true"> 导出excle </el-button>
                <span style="color: #0084FF; margin: 0px 5px">|</span>
                <el-button type="text" @click="Expenseconfirmation"> 查看确认单 </el-button>
        </template>
      </el-table-column>
    </commonTable>
      </div>
    </div>
       <!-- 生成账单 -->
   <el-dialog title="无法生产账单" :visible.sync="Generatebill" width="30%">
               <div class="input" >
               <br><span><i class="el-icon-circle-close"></i>抱歉！运单AS2020121200001、AS2020121200003不属于同一个客户，无法生成账单</span><br>
               </div>
               <span slot="footer" class="Generatebill-footer">
                 <el-button type="primary" @click="Generatebill = false" class='orangeBtn'>确 定</el-button>
               </span>
            </el-dialog>
        <!-- 批量导出Excle -->
   <el-dialog title="批量导出Excle" :visible.sync="Batchexport" width="30%">
               <div class="input" >
               <br><span>您确定批量导出这34笔费用确认单的Excle吗？</span><br>
               </div>
               <span slot="footer" class="Batchexport-footer">
                 <el-button @click="account = false" class='wuBtn'>取 消</el-button>
                 <el-button type="primary" @click="Batchexport = false" class='orangeBtn'>确 定</el-button>
               </span>
            </el-dialog>
             <!-- 批量发送邮件 -->
   <el-dialog title="批量发送邮件" :visible.sync="Bulksendmail" width="30%">
               <div class="input" >
               <br><span>您确定批量发送这34笔确认单的邮件吗？</span><br>
               </div>
               <span slot="footer" class="Bulksendmail-footer">
                 <el-button @click="account = false" class='wuBtn'>取 消</el-button>
                 <el-button type="primary" @click="Bulksendmail = false" class='orangeBtn'>确 定</el-button>
               </span>
            </el-dialog>
             <!-- 批量确认费用 -->
   <el-dialog title="批量确认费用" :visible.sync="confirmation" width="30%">
               <div class="input" >
               <br><span>您确定批量确认这34笔费用确认单的费用吗？</span><br>
               </div>
               <span slot="footer" class="confirmation-footer">
                 <el-button @click="account = false" class='wuBtn'>取 消</el-button>
                 <el-button type="primary" @click="confirmation = false" class='orangeBtn'>确 定</el-button>
               </span>
            </el-dialog>
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

      // 弹框
      Generatebill: false, // 批量停用弹框
      Batchexport: false, // 批量导出Excle
      Bulksendmail: false, // 批量发送邮件
      confirmation: false, // 批量确认费用

      columns: [
        { prop: 'data', label: '预报日期', width: '133', align: 'center' },
        { prop: 'name', label: '客户名称', width: '193', align: 'center', formatter: this.formatter },
        { prop: 'customerCode', label: '客户编号', width: '118', align: 'center', formatter: this.formatters },
        { prop: 'WaybillNo', label: '运单号', width: '139', align: 'center' },
        { prop: 'Shipmentnumber', label: '货件编号', width: '171', align: 'center', type: 'slot', slotName: 'bianhao' },
        { prop: 'shipments', label: '货件件数', width: '84', align: 'center' },
        { prop: 'destination', label: '目的地', width: '70', align: 'center' },
        { prop: 'Confirmstatus', label: '确认状态', width: '127', align: 'center' },
        { prop: 'Registration', label: '登记费用', width: '94', align: 'center', type: 'slot', slotName: 'feiyong' },
        { prop: 'Customeremail', label: '客户邮箱', width: '189', align: 'center', type: 'slot', slotName: 'youxiang' },
        { prop: 'Accountstatus', label: '账户状态', width: '91', align: 'center' },
        { prop: 'accountdate', label: '内账单日', width: '133', align: 'center' },
        { prop: 'Settlementweight', label: '结算重量', width: '103', align: 'center', type: 'slot', slotName: 'jiesuan' },
        { prop: 'channel', label: '渠道', width: '110', align: 'center' },
        { prop: 'Name', label: '品名', width: '103', align: 'center', type: 'slot', slotName: 'pinming' },
        { prop: 'Settlementamount', label: '结算金额', width: '87', align: 'center' },
        { prop: 'Declaredvalue', label: '申报价值', width: '94', align: 'center' },
        { prop: 'publicity', label: '结算公示', width: '241', align: 'center' },
        { prop: 'salesman', label: '业务员', width: '108', align: 'center', type: 'slot', slotName: 'yewuyuan' },
        { prop: 'confirmer', label: '费用确认员', width: '95', align: 'center' },
        { prop: 'Confirmationdate', label: '确认日期', width: '133', align: 'center' },
        { prop: 'Settlementperiod', label: '结算周期', width: '145', align: 'center', type: 'slot', slotName: 'zhouqi' }
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
    Expenseconfirmation () {
      this.$router.push({ name: 'Expenseconfirmation' })
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
/deep/ .el-dialog{
  position: absolute;
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
}
//biankuang
/deep/ .el-dialog__body {
    padding: 20px 25px;
    border-top:1px solid rgba(0, 0, 0, 0.06);
    border-bottom:1px solid rgba(0, 0, 0, 0.06);
}
/deep/ .el-dialog__header {
    padding: 10px 10px ;
}
/deep/ .el-dialog__footer{
  padding: 5px 10px ;
}
.el-icon-circle-close{
  width: 66px;
  height: 58px;
  font-size: 58px;
  color: #FB4702;
}
</style>
