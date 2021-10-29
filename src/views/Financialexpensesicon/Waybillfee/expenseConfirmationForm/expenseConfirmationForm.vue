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
              <span class='text'>账单号</span>
            </el-col>
            <el-col :span='13'>
              <el-input v-model='search.billNo' placeholder='请输入'></el-input>
            </el-col>
          </el-col>
          <el-col :span='6' class='colbox'>
            <el-col :span='6'>
              <span class='text'>客户名称</span>
            </el-col>
            <el-col :span='13'>
              <el-input v-model='search.customerName' placeholder='请输入'></el-input>
            </el-col>
          </el-col>
          <el-col :span='6' class='colbox'>
            <el-col :span='6'>
              <span class='text'>客户编码</span>
            </el-col>
            <el-col :span='13'>
              <el-input v-model='search.customerCode' placeholder='请输入'></el-input>
            </el-col>
          </el-col>
           <el-col :span='6' class='colbox'>
            <el-button class='orangeBtn long1' @click="getData">查 询</el-button>
            <el-button class='wuBtn long1' @click="searchReset">重 置</el-button>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row class='searchbox1'>
          <el-col :span='10' class="left">
            <el-button class='stopBtn' @click="mulGen(confirmIds)" :disabled="confirmIds.length === 0">生成账单</el-button>
<!--            <el-button class='stopBtn' @click="Batchexport=true">批量导出Excle</el-button>-->
<!--            <el-button class='stopBtn' @click="Bulksendmail=true">批量发送邮件</el-button>-->
            <el-button class='stopBtn' @click="confirmation=true" :disabled="confirmIds.length === 0">批量确认费用</el-button>
          </el-col>
          <el-col :span='12' class='right'>
            <!-- <el-button class='whiteBtn '>查询条件设置</el-button>
            <el-button class='whiteBtn '>列表显示设置</el-button> -->
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
            @handleSelectionChange="handleSelectionChange"
        >
          <el-table-column
              slot="table_oper"
              align="center"
              fixed="right"
              label="操作"
              width="344"
              :resizable="false"
          >
            <template slot-scope="scoped">
              <el-button type="text" @click="Viewquote(scoped.row)"> 查看运单</el-button>
<!--              <span style="color: #0084FF; margin: 0px 5px">|</span>-->
<!--              <el-button type="text" @click="adopt= true"> 发送费运单</el-button>-->
<!--              <span style="color: #0084FF; margin: 0px 5px">|</span>-->
<!--              <el-button type="text" @click="reject= true"> 导出excle</el-button>-->
              <span style="color: #0084FF; margin: 0px 5px" v-if="scoped.row.is_confirm === 0">|</span>
              <el-button type="text" @click="confirm([scoped.row.id])" v-if="scoped.row.is_confirm === 0"> 确认费用
              </el-button>
            </template>
          </el-table-column>
        </commonTable>
      </div>
    </div>
    <!-- 生成账单 -->
    <el-dialog title="无法生产账单" :visible.sync="Generatebill" width="30%">
      <div class="input">
        <br><span><i class="el-icon-circle-close"></i>抱歉！运单AS2020121200001、AS2020121200003不属于同一个客户，无法生成账单</span><br>
      </div>
      <span slot="footer" class="Generatebill-footer">
                 <el-button type="primary" @click="Generatebill = false" class='orangeBtn'>确 定</el-button>
               </span>
    </el-dialog>
    <!-- 批量导出Excle -->
    <el-dialog title="批量导出Excle" :visible.sync="Batchexport" width="30%">
      <div class="input">
        <br><span>您确定批量导出这34笔费用确认单的Excle吗？</span><br>
      </div>
      <span slot="footer" class="Batchexport-footer">
       <el-button @click="account = false" class='wuBtn'>取 消</el-button>
       <el-button type="primary" @click="Batchexport = false" class='orangeBtn'>确 定</el-button>
     </span>
    </el-dialog>
    <!-- 批量发送邮件 -->
    <el-dialog title="批量发送邮件" :visible.sync="Bulksendmail" width="30%">
      <div class="input">
        <br><span>您确定批量发送这34笔确认单的邮件吗？</span><br>
      </div>
      <span slot="footer" class="Bulksendmail-footer">
         <el-button @click="account = false" class='wuBtn'>取 消</el-button>
         <el-button type="primary" @click="Bulksendmail = false" class='orangeBtn'>确 定</el-button>
       </span>
    </el-dialog>
    <!-- 批量确认费用 -->
    <el-dialog title="批量确认费用" :visible.sync="confirmation" width="30%">
      <div class="input">
        <br><span>您确定批量确认这{{ confirmIds.length }}笔费用确认单的费用吗？</span><br>
      </div>
      <span slot="footer" class="confirmation-footer">
         <el-button @click="account = false" class='wuBtn'>取 消</el-button>
         <el-button type="primary" @click="confirm(confirmIds)" class='orangeBtn'>确 定</el-button>
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
        { prop: 'created_at', label: '下单日期', width: '133', align: 'center', formatter: this.formatter },
        { prop: 'customer_name', label: '客户名称', width: '193', align: 'center' },
        { prop: 'customer_code', label: '客户编号', width: '118', align: 'center' },
        { prop: 'waybill_no', label: '运单号', width: '139', align: 'center' },
        { prop: 'waybill_type', label: '运单类型', width: '171', align: 'center', formatter: this.formatter },
        { prop: 'is_confirm', label: '确认状态', width: '84', align: 'center', formatter: this.formatter },
        { prop: 'is_bill', label: '账单状态', width: '84', align: 'center', formatter: this.formatter },
        { prop: 'confirm_at', label: '确认时间', width: '84', align: 'center', formatter: this.formatter },
        { prop: 'confirm_user_name', label: '确认人', width: '84', align: 'center', formatter: this.formatter }
      ],
      tableData: [],
      page: {
        pageNo: 1,
        limit: 10,
        sizes: [1, 5, 10],
        total: 0
      },
      confirmIds: [],
      customerIds: [],
      search: {
        billNo: null,
        customerName: null,
        customerCode: null
      }
    }
  },
  mounted () {
    this.search.billNo = this.$route.params.billNo
    this.getData()
  },
  methods: {
    getData () {
      this.$api.finance.fare.confirm.customer.lists({
        billNo: this.search.billNo,
        customerName: this.search.customerName,
        customerCode: this.search.customerCode,
        page: this.page.pageNo,
        limit: this.page.limit
      }).then(res => {
        this.tableData = res.data.list
        this.page.total = res.data.total
      })
    },
    searchReset () {
      this.search.billNo = null
      this.search.customerName = null
      this.search.customerCode = null
    },
    confirm (confirmIds) { // 确认费用单
      this.$api.finance.fare.confirm.customer.confirm({
        confirmIds: confirmIds
      }).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg) // 成功提示
          this.getData()
          this.confirmation = false
        } else {
          this.$message.error(res.msg) // 错误提示
        }
      })
    },
    mulGen (confirmIds) {
      if (this.customerIds.length !== 1) {
        this.$message.error('不属于同一个客户') // 错误提示
      }
      this.gen(this.customerIds[0], confirmIds)
    },
    gen (customerId, confirmIds) { // 生成账单
      this.$api.finance.fare.bill.customer.gen({
        customerId: customerId,
        confirmIds: confirmIds
      }).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg) // 成功提示
          this.getData()
        } else {
          this.$message.error(res.msg) // 错误提示
        }
      })
    },
    Expenseconfirmation () {
      this.$router.push({ name: 'Expenseconfirmation' })
    },
    Viewquote (data) {
      this.$router.push({ name: 'waybillDetail', params: { id: data.waybill_id } })
    },
    // 重新渲染name列
    formatter (row, column, cellValue) {
      switch (column.property) {
        case 'created_at':
          return this.formatDate(row.created_at, 'yyyy-MM-dd')
        case 'waybill_type':
          return row.waybill_type === 1 ? 'FBA运单' : '非FBA运单'
        case 'is_confirm':
          return row.is_confirm === 1 ? '已确认' : '未确认'
        case 'is_bill':
          return row.is_bill === 1 ? '已生成' : '未生成'
        case 'confirm_at':
          return row.is_confirm === 1 ? this.formatDate(row.confirm_at, 'yyyy-MM-dd hh:mm:ss') : '——'
        case 'confirm_user_name':
          return row.is_confirm === 1 ? row.confirm_user_name : '——'
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
      this.confirmIds = []
      this.customerIds = []
      val && val.forEach((item) => {
        this.confirmIds.push(item.id)
        if (this.customerIds.indexOf(item.customer_id) === -1) {
          this.customerIds.push(item.customer_id)
        }
      })
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
