<template>
  <div>
    <div class='main'>
      <!--  标签页 -->
      <el-row type='flex' justify='flex-start' class='title' align='middle'>
        <span class='text'>应付账单</span>
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
              <span class='text'>预报日期</span>
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
              <span class='text'>转单号</span>
            </el-col>
            <el-col :span='13'>
            <el-input v-model='Transfer' placeholder='请输入'></el-input>
            </el-col>
          </el-col>
          <el-col :span='6' class='colbox'>
            <el-col :span='6'>
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
              <span class='text'>目的地</span>
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
               <el-button class='stopBtn' @click="changes=true">导入对账单</el-button>
            <el-button class='stopBtn' @click="changes=true">批量导出Excle</el-button>
            <el-button class='stopBtn' @click="changes=true">批量申请付款</el-button>
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
       <template v-slot:yundanhao='slotData'>
         {{slotData.data.info}}<span style="color: #0084FF;cursor:pointer" @click="see(slotData)">查看</span>
      </template>
       <template v-slot:bianhao='slotData'>
         {{slotData.data.info}}<span style="color: #0084FF;cursor:pointer" @click="check(slotData)">查看</span>
      </template>
      <template v-slot:querendan='slotData'>
         {{slotData.data.info}}<span style="color: #0084FF;cursor:pointer" @click="lookup(slotData)">查看</span>
      </template>
      <template v-slot:changgui='slotData'>
         {{slotData.data.info}}<span style="color: #0084FF;cursor:pointer" @click="waybill(slotData)">查看运单</span>
      </template>
       <template v-slot:shihou='slotData'>
         {{slotData.data.info}}<span style="color: #0084FF;cursor:pointer" @click="details(slotData)">查看详情</span>
      </template>
      <el-table-column
        slot="table_oper"
        align="center"
        fixed="right"
        label="操作"
        width="314"
        :resizable="false"
      >
         <template slot-scoped="scoped">
            <el-button type="text" @click="password= true"> 导出Excle </el-button>
            <span style="color: #0084FF; margin: 0px 5px">|</span>
          <el-button type="text" @click="detailspage"> 撤销确认</el-button>
                <span style="color: #0084FF; margin: 0px 5px">|</span>
                <el-button type="text" @click="password= true"> 申请付款 </el-button>
                <span style="color: #0084FF; margin: 0px 5px">|</span>
               <el-button type="text" @click="password= true"> 查看运单 </el-button>
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
      Transfer: '', // 转单号
      destination: '', // 目的地

      columns: [
        { prop: 'receivableNo', label: '应收账单号', width: '155', align: 'center' },
        { prop: 'name', label: '代理名称', width: '193', align: 'center', formatter: this.formatter },
        { prop: 'number', label: '代理编号', width: '118', align: 'center', formatter: this.formatters },
        { prop: 'Openingbalance', label: '期初余额', width: '83', align: 'center' },
        { prop: 'WaybillNo', label: '运单号', width: '171', align: 'center', type: 'slot', slotName: 'yundanhao' },
        { prop: 'Shipmentnumber', label: '货件编号', width: '171', align: 'center', type: 'slot', slotName: 'bianhao' },
        { prop: 'Settlementperiod', label: '结算周期', width: '220', align: 'center' },
        { prop: 'Reconciliationstatus', label: '对账确认状态', width: '126', align: 'center', type: 'slot', slotName: 'querendan' },
        { prop: 'Conventionalwaybill', label: '常规运单', width: '126', align: 'center', type: 'slot', slotName: 'changgui' },
        { prop: 'Expostwaybill', label: '事后运单', width: '114', align: 'center', type: 'slot', slotName: 'shihou' },
        { prop: 'Settlementamount', label: '结算金额', width: '95', align: 'center' },
        { prop: 'Reconciliation', label: '对账确定员', width: '95', align: 'center' }
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
