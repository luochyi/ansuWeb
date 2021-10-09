<template>
  <div>
    <div class='main'>
      <!--  标签页 -->
      <el-row type='flex' justify='flex-start' class='title' align='middle'>
        <span class='text'>账单核销</span>
      </el-row>
      <!-- 主要内容 -->
      <div class='content'>
        <el-row class='searchbox1'>
          <el-col :span='6' class='colbox'>
            <el-col :span='6'>
              <span class='text'>核销单号</span>
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
              <span class='text'>所属账单</span>
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
              <span class='text'>账单状态</span>
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
              <span class='text'>核销日期</span>
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
              <span class='text'>结算方式</span>
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
            <el-button class='wuBtn long1'>展 开</el-button>
          </el-col>
        </el-row>
        <el-divider></el-divider>
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
        width="87"
        :resizable="false"
      >
         <template slot-scoped="scoped">
          <el-button type="text" @click="detailspage"> 核销详情</el-button>
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
        { prop: 'WriteoffdocNo', label: '核销单号', width: '165', align: 'center' },
        { prop: 'name', label: '客户名称', width: '200', align: 'center', formatter: this.formatter },
        { prop: 'Customernumber', label: '客户编号', width: '87', align: 'center', formatter: this.formatters },
        { prop: 'Affiliatedbill', label: '所属账单', width: '165', align: 'center' },
        { prop: 'Includewaybill', label: '包含运单', width: '89', align: 'center' },
        { prop: 'Writeoffwaybill', label: '核销运单', width: '89', align: 'center' },
        { prop: 'Includingexpenses', label: '包含费用', width: '89', align: 'center' },
        { prop: 'Writeoffexpenses', label: '核销费用', width: '89', align: 'center' },
        { prop: 'Billamount', label: '账单金额', width: '127', align: 'center' },
        { prop: 'Writeoffamount', label: '核销金额', width: '99', align: 'center' },
        { prop: 'Billingstatus', label: '账单状态', width: '99', align: 'center' },
        { prop: 'Writeoffdate', label: '核销日期', width: '127', align: 'center' },
        { prop: 'accountdate', label: '外账单日', width: '127', align: 'center' },
        { prop: 'Settlementmethod', label: '结算方式', width: '85', align: 'center' }
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
