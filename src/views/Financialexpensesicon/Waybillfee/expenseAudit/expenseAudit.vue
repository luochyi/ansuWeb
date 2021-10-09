<template>
  <div>
    <div class='main'>
      <!--  标签页 -->
      <el-row type='flex' justify='flex-start' class='title' align='middle'>
        <span class='text'>报价审核</span>
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
          <el-col :span='6' class='colbox'>
            <el-col :span='6'>
              <span class='text'>目的地</span>
            </el-col>
            <el-col :span='13'>
            <el-input v-model='destination' placeholder='请输入'></el-input>
            </el-col>
          </el-col>
          <el-col :span='6' class='colbox'>
            <el-col :span='7'>
              <span class='text'>目的地分区</span>
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
              <span class='text'>目的地邮编</span>
            </el-col>
             <el-col :span='13'>
                <el-input v-model='zipcode' placeholder='请输入'></el-input>
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
            <el-button class='stopBtn' @click="changes=true">批量审核</el-button>
            <el-button class='stopBtn' @click="changes=true">批量导出Excle</el-button>
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
    <template v-slot:chakan='slotData'>
         {{slotData.data.info}}<span style="color: #0084FF;cursor:pointer" @click="check(slotData)">查看</span>
      </template>
            <template v-slot:leixin='slotData'>
         {{slotData.data.info}}<span style="color: #0084FF;cursor:pointer" @click="details(slotData)">详情</span>
      </template>
      <template v-slot:jianshu='slotData'>
         {{slotData.data.info}}<span style="color: #0084FF;cursor:pointer" @click="list(slotData)">装箱清单</span>
      </template>
      <template v-slot:liyou='slotData'>
         {{slotData.data.info}}<span style="color: #0084FF;cursor:pointer" @click="see(slotData)">查看</span>
      </template>
      <template v-slot:feiyong='slotData'>
         {{slotData.data.info}}<span style="color: #0084FF;cursor:pointer" @click="cost(slotData)">查看</span>
      </template>
      <template v-slot:jiesuan='slotData'>
         {{slotData.data.info}}<span style="color: #0084FF;cursor:pointer" @click="details(slotData)">详情</span>
      </template>
      <template v-slot:neibu='slotData'>
         {{slotData.data.info}}<span style="color: #0084FF;cursor:pointer" @click="remarks(slotData)">查看</span>
      </template>
      <el-table-column
        slot="table_oper"
        align="center"
        fixed="right"
        label="操作"
        width="191"
        :resizable="false"
      >
         <template slot-scoped="scoped">
          <el-button type="text" @click="Viewquote"> 查看报价</el-button>
                <span style="color: #0084FF; margin: 0px 5px">|</span>
                <el-button type="text" @click="adopt= true"> 通过 </el-button>
                <span style="color: #0084FF; margin: 0px 5px">|</span>
                <el-button type="text" @click="reject= true"> 驳回 </el-button>
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
        { prop: 'OrderNo', label: '安速单号', width: '176', align: 'center' },
        { prop: 'name', label: '客户名称', width: '193', align: 'center', formatter: this.formatter },
        { prop: 'customerCode', label: '客户编号', width: '80', align: 'center', formatter: this.formatters },
        { prop: 'status', label: '审核状态', width: '94', align: 'center' },
        { prop: 'salesman', label: '业务员', width: '106', align: 'center', type: 'slot', slotName: 'chakan' },
        { prop: 'Ordertype', label: '订单类型', width: '101', align: 'center', type: 'slot', slotName: 'leixin' },
        { prop: 'number', label: '件数', width: '123', align: 'center', type: 'slot', slotName: 'jianshu' },
        { prop: 'Chargedmagnetic', label: '带电带磁', width: '94', align: 'center' },
        { prop: 'channel', label: '预报渠道', width: '108', align: 'center' },
        { prop: 'shipping', label: '运输方式', width: '80', align: 'center' },
        { prop: 'destination', label: '目的地', width: '66', align: 'center' },
        { prop: 'warehouse', label: '目的仓', width: '94', align: 'center' },
        { prop: 'zipcode', label: '目的地邮编', width: '94', align: 'center' },
        { prop: 'adjustment', label: '调价理由', width: '82', align: 'center', type: 'slot', slotName: 'liyou' },
        { prop: 'surcharge', label: '附加费', width: '115', align: 'center' },
        { prop: 'Basiccost', label: '基础费用', width: '94', align: 'center' },
        { prop: 'Additionalcost', label: '附加费用', width: '94', align: 'center' },
        { prop: 'Totalcost', label: '合计费用', width: '118', align: 'center', type: 'slot', slotName: 'feiyong' },
        { prop: 'Forecasttime', label: '预报时间', width: '182', align: 'center' },
        { prop: 'Customsdeclaration', label: '报关类型', width: '122', align: 'center' },
        { prop: 'clearance', label: '单独清关', width: '115', align: 'center' },
        { prop: 'Settlementweight', label: '结算重', width: '111', align: 'center', type: 'slot', slotName: 'jiesuan' },
        { prop: 'Realweight', label: '实重', width: '70', align: 'center' },
        { prop: 'Squarenumber', label: '方数', width: '70', align: 'center' },
        { prop: 'Volumeweight', label: '材积重', width: '70', align: 'center' },
        { prop: 'comments', label: '客户备注', width: '110', align: 'center' },
        { prop: 'remarks', label: '内部备注', width: '152', align: 'center', type: 'slot', slotName: 'neibu' },
        { prop: 'insured', label: '是否保险', width: '83', align: 'center' },
        { prop: 'Reviewer', label: '审核人', width: '110', align: 'center' }
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
    Viewquote () {
      this.$router.push({ name: 'Viewquote' })
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
</style>
