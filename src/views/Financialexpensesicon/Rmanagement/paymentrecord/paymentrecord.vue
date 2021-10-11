<template>
  <div>
    <div class='main'>
      <!--  标签页 -->
      <el-row type='flex' justify='flex-start' class='title' align='middle'>
        <span class='text'>来款记录</span>
      </el-row>
      <!-- 主要内容 -->
      <div class='content'>
        <el-row class='searchbox1'>
          <el-col :span='6' class='colbox'>
            <el-col :span='6'>
              <span class='text'>来款时间</span>
            </el-col>
            <el-col :span='12'>
             <el-select v-model="value" placeholder="请选择">
         <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
         </el-option>
         </el-select>
            </el-col>
          </el-col>
          <el-col :span='6' class='colbox'>
            <el-col :span='6'>
              <span class='text'>收款账号</span>
            </el-col>
            <el-col :span='13'>
              <el-input v-model='customerName' placeholder='请输入'></el-input>
            </el-col>
          </el-col>
          <el-col :span='6' class='colbox'>
            <el-col :span='6'>
              <span class='text'>来款客户</span>
            </el-col>
            <el-col :span='12'>
              <el-input v-model='customerCode' placeholder='请输入'></el-input>
            </el-col>
          </el-col>
          <el-col :span='6' class='colbox'>
            <el-col :span='4'>
              <span class='text'>客户编码</span>
            </el-col>
            <el-col :span='12'>
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
              <span class='text'>操作人</span>
            </el-col>
            <el-col :span='12'>
            <el-input v-model='destination' placeholder='请输入'></el-input>
            </el-col>
          </el-col>
          <el-col :span='6' class='colbox'>
            <el-col :span='6'>
              <span class='text'>来款状态</span>
            </el-col>
            <el-col :span='13'>
              <el-input v-model='destination' placeholder='请输入'></el-input>
            </el-col>
          </el-col>
          <el-col :span='6' class='colbox'>
            <el-col :span='6'>
              <span class='text'>收款单号</span>
            </el-col>
             <el-col :span='12'>
                 <el-input v-model='customerCode' placeholder='请输入'></el-input>
            </el-col>
          </el-col>
          <el-col :span='6' class='colbox'>
            <el-button class='orangeBtn long1'>查 询</el-button>
            <el-button class='wuBtn long1'>重 置</el-button>
            <el-button class='wuBtn long1'>展 开</el-button>
          </el-col>
        </el-row>
        <el-divider></el-divider>
         <el-row class='tableBtn'>
             <el-col :span='10' class="left">
            <el-button class='stopBtn' @click="changes=true">批量导入来款</el-button>
          </el-col>
            <el-col :span='10' class='right'>
                <el-button class='whiteBtn '>新增来款登记</el-button>
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
        width="170"
        :resizable="false"
      >
         <template slot-scoped="scoped">
          <el-button type="text" @click="detailspage"> 修改</el-button>
                <span style="color: #0084FF; margin: 0px 5px">|</span>
                <el-button type="text" @click="password= true"> 确认来款 </el-button>
                <span style="color: #0084FF; margin: 0px 5px">|</span>
                <el-button type="text" @click="password= true"> 删除 </el-button>
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
        { prop: 'Collectionchannel', label: '收款渠道', width: '95', align: 'center' },
        { prop: 'bankaccount', label: '银行账号', width: '169', align: 'center', formatter: this.formatter },
        { prop: 'balance', label: '来款余额', width: '117', align: 'center', formatter: this.formatters },
        { prop: 'status', label: '来款状态', width: '84', align: 'center' },
        { prop: 'customers', label: '来款客户', width: '214', align: 'center' },
        { prop: 'Customercode', label: '客户编码', width: '84', align: 'center' },
        { prop: 'Operator', label: '操作人', width: '79', align: 'center' },
        { prop: 'Bankreceipt', label: '银行回单', width: '138', align: 'center' },
        { prop: 'Paymenttime', label: '来款时间', width: '184', align: 'center' },
        { prop: 'Registrationtime', label: '登记时间', width: '193', align: 'center' }
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
      { bankaccount: 'AS123123423412313', Operator: '王小虎', Customercode: '上海市普陀区金沙江路 1518 弄', button: '<a>11</a>' }
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
</style>
