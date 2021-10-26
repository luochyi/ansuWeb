<template>
  <div>
    <div class='main'>
      <!--  标签页 -->
      <el-row type='flex' justify='flex-start' class='title' align='middle'>
         <span style="marginLeft:40px">费用登记单</span>
        </el-row>
      <!-- 主要内容 -->
      <div class='content'>
        <el-row class='searchbox1'>
          <el-col :span='6' class='colbox'>
            <el-col :span='6'>
              <span class='text'>运单号</span>
            </el-col>
            <el-col :span='13'>
              <el-input v-model='waybillNo' placeholder='请输入'></el-input>
            </el-col>
          </el-col>
          <el-col :span='6' class='colbox'>
            <el-col :span='7'>
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
              <span class='text'>预报渠道</span>
            </el-col>
            <el-col :span='13'>
              <el-input v-model='predictionChannel' placeholder='请输入'></el-input>
            </el-col>
          </el-col>
        </el-row>
        <!--  -->
        <el-row class='searchbox1'>
          <el-col :span='18' class='colbox'>
          </el-col>
          <el-col :span='6' class='colbox'>
            <el-button class='orangeBtn long1'>查 询</el-button>
            <el-button class='wuBtn long1'>重 置</el-button>
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
              width="152"
              :resizable="false"
          >
            <template slot-scope="scoped">
              <el-button type="text" @click="detailspage(scoped.row)"> {{ scoped.row.audit_status === 0 ? '报价' : scoped.row.audit_status === 1 ? '查看' : scoped.row.audit_status === 2 ? '查看' : '重新报价' }}</el-button>
              <span style="color: #0084FF; margin: 0px 5px">|</span>
              <el-button type="text" @click="waybillInfo(scoped.row)"> 查看运单</el-button>
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
      waybillNo: '', // 运单号
      customerName: '', // 客户名称
      customerCode: '', // 客户编号
      predictionChannel: '', // 预报渠道
      destination: '', // 目的地
      value: '',
      options: '',
      zipcode: '',
      columns: [
        { prop: 'waybill_no', label: '安速单号', width: '176', align: 'center' },
        { prop: 'customer_name', label: '客户名称', width: '193', align: 'center' },
        { prop: 'customer_code', label: '客户编号', width: '80', align: 'center' },
        { prop: 'audit_status', label: '审核状态', width: '94', align: 'center', formatter: this.formatter },
        { prop: 'audit_user_name', label: '审核人', width: '106', align: 'center', formatter: this.formatter },
        { prop: 'type', label: '订单类型', width: '81', align: 'center', formatter: this.formatter },
        { prop: 'cargoes_num', label: '件数', width: '123', align: 'center' },
        { prop: 'channel_name', label: '预报渠道', width: '94', align: 'center' },
        { prop: 'channel_cate', label: '运输方式', width: '80', align: 'center', formatter: this.formatter },
        { prop: 'created_at', label: '下单时间', width: '182', align: 'center', formatter: this.formatter },
        { prop: 'trade_type', label: '报关类型', width: '122', align: 'center', formatter: this.formatter },
        { prop: 'is_separate_customs_clearance', label: '单独清关', width: '115', formatter: this.formatter },
        { prop: 'bill_weight', label: '结算重', width: '111', align: 'center' },
        { prop: 'weight', label: '实重', width: '70', align: 'center' },
        { prop: 'volume', label: '方数', width: '70', align: 'center' },
        { prop: 'volume_weight', label: '材积重', width: '70', align: 'center' },
        { prop: 'remark', label: '客户备注', width: '110', align: 'center' },
        { prop: 'interior_remark', label: '内部备注', width: '152', align: 'center' },
        { prop: 'have_safe', label: '是否保险', width: '83', align: 'center', formatter: this.formatter }
      ],
      tableData: [],
      page: {
        pageNo: 1,
        limit: 10,
        sizes: [15, 50, 100],
        total: 0
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.$api.finance.fare.confirm.lists({
        page: this.page.pageNo,
        limit: this.page.limit
      }).then(res => {
        this.tableData = res.data.list
        this.page.total = res.data.total
      })
    },
    detailspage (row) {
      this.$router.push({ name: 'detailspage', params: { waybillId: row.id } })
    },
    // 重新渲染name列
    formatter (row, column, cellValue) {
      switch (column.property) {
        case 'created_at':
          return this.formatDate(row.created_at, 'yyyy-MM-dd hh:mm')
        case 'audit_status':
          return row.audit_status === 0 ? '未报价' : row.audit_status === 1 ? '审核中' : row.audit_status === 2 ? '审核通过' : '审核驳回'
        case 'audit_user_name':
          return row.audit_status > 1 ? row.audit_user_name : '——'
        case 'type':
          return row.is_bill === 1 ? 'FBA运单' : '非FBA运单'
        case 'channel_cate':
          switch (row.channel_cate) {
            case 1:
              return '海运'
            case 2:
              return '空运'
            case 3:
              return '快递'
            case 4:
              return '铁路'
            case 5:
              return '专车'
          }
          return ''
        case 'trade_type':
          return row.trade_type === 0 ? '——' : row.trade_type === 1 ? '一般贸易报关' : '非一般贸易报关'
        case 'is_separate_customs_clearance':
          return row.is_separate_customs_clearance === 1 ? '单独清关' : '非单独清关'
        case 'have_safe':
          return row.have_safe === 1 ? '购买保险' : '不购买保险'
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
    waybillInfo (row) {
      this.$router.push({ name: 'waybillDetail', params: { waybillId: row.id } })
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
.dra-content{
  width: 770px;
height: 868px;
background: #FFFFFF;
border-radius: 4px;
border: 1px solid #E8E8E8;
}
.biaodan{
  width: 696px;
  height: 285px;
  margin: 20px;
}
.top{
  float: left;
  margin: 20px;
}
.foot{
  float: left;
  margin: 60px 20px;
}
.neibu{
  float: left;
}
.jiesuan{
  margin: auto 20px;
}
.texta{
  width: 223px;
height: 25px;
font-size: 18px;
font-family: PingFangSC-Medium, PingFang SC;
font-weight: 500;
color: #FB4E0C;
line-height: 25px;
float: left;
}

</style>
