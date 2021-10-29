<template>
  <div>
    <div class='main'>
      <!--  标签页 -->
      <el-row type='flex' justify='flex-start' class='title' align='middle'>
        <span class='text'>应收账单</span>
      </el-row>
      <!-- 主要内容 -->
      <div class='content'>
        <el-row class='searchbox1'>
          <el-col :span='6' class='colbox'>
            <el-col :span='6'>
              <span class='text'>应收账单号</span>
            </el-col>
            <el-col :span='13'>
              <el-input v-model='search.billNo' placeholder='请输入'></el-input>
            </el-col>
          </el-col>
          <el-col :span='6' class='colbox'>
            <el-button class='orangeBtn long1' @click="getData">查 询</el-button>
            <el-button class='wuBtn long1' @click="searchReset">重 置</el-button>
          </el-col>
        </el-row>
<!--        <el-divider></el-divider>-->
<!--        <el-row class='tableBtn'>-->
<!--          <el-col :span='10' class="left">-->
<!--            <el-button class='stopBtn' @click="Batchexport=true">批量导出Excle</el-button>-->
<!--            <el-button class='stopBtn' @click="Bulksendmail=true">批量发送邮件</el-button>-->
<!--            <el-button class='stopBtn' @click="confirmation=true">批量确认费用</el-button>-->
<!--          </el-col>-->
<!--          <el-col :span='10' class='right'>-->
            <!-- <el-button class='whiteBtn '>查询条件设置</el-button>
            <el-button class='whiteBtn '>列表显示设置</el-button> -->
<!--          </el-col>-->
<!--        </el-row>-->
        <br>
        <!-- 组件 -->
        <commonTable
            :columns="columns"
            :data="tableData"
            :pager="page"
            :selection='selection'
            @handleSizeChange="handleSizeChange"
            @handleCurrentChange="handleCurrentChange"
        >
          <template v-slot:youxiang='slotData'>
            {{ slotData.data.info }}<span style="color: #0084FF;cursor:pointer" @click="modify(slotData)">修改</span>
          </template>
          <template v-slot:changgui='slotData'>
            {{ slotData.data.info }}<span style="color: #0084FF;cursor:pointer" @click="details(slotData)">查看详情</span>
          </template>
          <template v-slot:shihou='slotData'>
            {{ slotData.data.info }}<span style="color: #0084FF;cursor:pointer" @click="View(slotData)">查看详情</span>
          </template>
          <template v-slot:yundan='slotData'>
            {{ slotData.data.info }}<span style="color: #0084FF;cursor:pointer" @click="see(slotData)">查看详情</span>
          </template>
          <template v-slot:yewuyuan='slotData'>
            {{ slotData.data.info }}<span style="color: #0084FF;cursor:pointer" @click="check(slotData)">查看</span>
          </template>
          <el-table-column
              slot="table_oper"
              align="center"
              fixed="right"
              label="操作"
              width="242"
              :resizable="false"
          >
            <template slot-scope="scoped">
              <el-button type="text" @click="detailspage(scoped.row)"> 查看详情</el-button>
<!--              <span style="color: #0084FF; margin: 0px 5px">|</span>-->
<!--              <el-button type="text" @click="password= true"> 发送账单</el-button>-->
<!--              <span style="color: #0084FF; margin: 0px 5px">|</span>-->
<!--              <el-button type="text" @click="password= true"> 导出Excle</el-button>-->
            </template>
          </el-table-column>
        </commonTable>

      </div>
    </div>
    <!-- 批量导出Excle -->
    <el-dialog title="批量导出Excle" :visible.sync="Batchexport" width="30%">
      <div class="input">
        <br><span>您确认批量导出这34笔账单的Excle吗？</span><br>
      </div>
      <span slot="footer" class="Batchexport-footer">
                 <el-button class='wuBtn long1'>取消</el-button>
                 <el-button type="primary" @click="Batchexport = false" class='orangeBtn'>确 定</el-button>
               </span>
    </el-dialog>
    <!-- 批量发送邮件 -->
    <el-dialog title="批量发送邮件" :visible.sync="Bulksendmail" width="30%">
      <div class="input">
        <br><span>您确认批量发送这34笔账单的邮件吗？</span><br>
      </div>
      <span slot="footer" class="Bulksendmail-footer">
                 <el-button class='wuBtn long1'>取消</el-button>
                 <el-button type="primary" @click="Bulksendmail = false" class='orangeBtn'>确 定</el-button>
               </span>
    </el-dialog>
    <!-- 批量确认费用 -->
    <el-dialog title="批量确认费用" :visible.sync="confirmation" width="30%">
      <div class="input">
        <br><span>您确认批量确认这34笔账单的费用吗？</span><br>
      </div>
      <span slot="footer" class="confirmation-footer">
                 <el-button class='wuBtn long1'>取消</el-button>
                 <el-button type="primary" @click="confirmation = false" class='orangeBtn'>确 定</el-button>
               </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selection: false,
      total: 0, // 数据数量
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
      Batchexport: false, // 批量导出Excle
      Bulksendmail: false, // 批量发送邮件
      confirmation: false, // 批量确认费用

      columns: [
        { prop: 'bill_no', label: '应收账单号', width: '155', align: 'center' },
        { prop: 'customer_name', label: '客户名称', width: '193', align: 'center' },
        { prop: 'customer_code', label: '客户编号', width: '218', align: 'center' },
        { prop: 'created_at', label: '账单日期', width: '282', align: 'center', formatter: this.formatter },
        { prop: 'wayill_count', label: '运单', width: '220', align: 'center', formatter: this.formatter },
        { prop: 'amount', label: '结算金额', align: 'center', formatter: this.formatter }
      ],
      tableData: [],
      page: {
        pageNo: 1,
        limit: 10,
        sizes: [1, 5, 10],
        total: 0
      },
      search: {
        billNo: null
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.$api.finance.fare.bill.customer.lists({
        billNo: this.search.billNo,
        page: this.page.pageNo,
        limit: this.page.limit
      }).then(res => {
        this.tableData = res.data.list
        this.page.total = res.data.total
      })
    },
    searchReset () {
      this.search.billNo = null
    },
    detailspage (row) {
      this.$router.push({ name: 'expenseConfirmationForm', params: { billNo: row.bill_no } })
    },
    // 重新渲染name列
    formatter (row, column, cellValue) {
      switch (column.property) {
        case 'created_at':
          return this.formatDate(row.created_at, 'yyyy-MM-dd')
        case 'wayill_count':
          return row.wayill_count + '票'
        case 'amount':
          return row.amount + '元'
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
</style>
