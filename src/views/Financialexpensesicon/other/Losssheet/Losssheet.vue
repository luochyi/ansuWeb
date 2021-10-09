<template>
  <div>
    <div class='main'>
      <!--  标签页 -->
      <el-row type='flex' justify='flex-start' class='title' align='middle'>
        <span class='text'>亏损票</span>
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
              <span class='text'>运单号</span>
            </el-col>
            <el-col :span='13'>
              <el-input v-model='waybillNo' placeholder='请输入'></el-input>
            </el-col>
          </el-col>
          <el-col :span='6' class='colbox'>
            <el-col :span='6'>
              <span class='text'>情况登记</span>
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
              <span class='text'>扣毛利状态</span>
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
              <span class='text'>目的地</span>
            </el-col>
            <el-col :span='13'>
              <el-select v-model="valuea" placeholder="请选择">
         <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
         </el-option>
         </el-select>
            </el-col>
          </el-col>
          <el-col :span='6' class='colbox'>
            <el-col :span='6'>
              <span class='text'>渠道</span>
            </el-col>
             <el-col :span='13'>
                <el-input v-model='destination' placeholder='请输入'></el-input>
            </el-col>
          </el-col>
          <el-col :span='6' class='colbox'>
            <el-button class='orangeBtn long1'>查 询</el-button>
            <el-button class='wuBtn long1'>重 置</el-button>
            <el-button class='wuBtn long1'>展开全部</el-button>
          </el-col>
        </el-row>
        <el-divider></el-divider>
         <el-row class='tableBtn'>
             <el-col :span='10' class="left">
               <el-button class='stopBtn' @click="changes=true">批量扣毛利</el-button>
          </el-col>
            <el-col :span='10' class='right'>
              <el-button class='whiteBtn '>操作日志</el-button>
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
        width="101"
        :resizable="false"
      >
         <template slot-scoped="scoped">
            <el-button type="text" @click="password= true"> 查看详情 </el-button>
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
      customerName: '', // 客户名称
      customerCode: '', // 客户编号
      waybillNo: '', // 运单号
      destination: '', // 渠道
      value: '',
      valuea: '',

      columns: [
        { prop: 'WaybillNo', label: '运单号', width: '212', align: 'center' },
        { prop: 'Grossprofit', label: '单票毛利', width: '82', align: 'center' },
        { prop: 'Situation', label: '情况登记', width: '255', align: 'center' },
        { prop: 'deductionstatus', label: '扣毛利状态', width: '142', align: 'center' },
        { prop: 'customer', label: '客户', width: '95', align: 'center' },
        { prop: 'Customercode', label: '客户编码', width: '129', align: 'center' },
        { prop: 'destination', label: '目的地', width: '73', align: 'center' },
        { prop: 'channel', label: '渠道', width: '82', align: 'center' },
        { prop: 'number', label: '件数', width: '255', align: 'center' },
        { prop: 'weight', label: '结算重', width: '142', align: 'center' },
        { prop: 'settlement', label: '代理结算重', width: '95', align: 'center' },
        { prop: 'salesman', label: '业务员', width: '129', align: 'center' },
        { prop: 'Orderdate', label: '下单日期', width: '73', align: 'center' },
        { prop: 'registration', label: '登记日期', width: '129', align: 'center' }
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
      { PaymentNo: 'AS123123423412313', apply: '王小虎', code: '上海市普陀区金沙江路 1518 弄' }
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
