<template>
  <div>
    <div class='main'>
      <!--  标签页 -->
      <el-row type='flex' justify='flex-start' class='title' align='middle'>
        <span class='text'>费用登记</span>
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
            <el-button class='orangeBtn long1'>查 询</el-button>
            <el-button class='wuBtn long1'>重 置</el-button>
            <!-- <el-button class='wuBtn long1'>展开全部</el-button> -->
          </el-col>
        </el-row>
        <el-divider></el-divider>
         <el-row class='searchbox1'>
          <el-col :span='10' class="left">
            <el-button class='stopBtn' @click="Batchregistration">批量登记费用</el-button></el-col>
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
    >
    <!-- slot -->
      <el-table-column
        slot="table_oper"
        align="center"
        fixed="right"
        label="操作"
        width="226"
        :resizable="false"
      >
         <template slot-scope="scoped">
          <el-button type="text" @click="registration(scoped.row)"> 费运登记</el-button>
                <span style="color: #0084FF; margin: 0px 5px">|</span>
                <el-button type="text" @click="adopt= true" > 修改尺寸 </el-button>
                <span style="color: #0084FF; margin: 0px 5px">|</span>
                <el-button type="text" @click="reject= true"> 查看详情 </el-button>
        </template>
      </el-table-column>
    </commonTable>
      </div>
    </div>
     <!-- 修改尺寸抽屉组件 -->
    <commonDrawer :drawerVrisible="drawerVrisible" :drawerTitle="drawerTitle">
       <!-- 内容区域 -->
      <div class="dra-content">
        <div class="adopt">
              <span class='texta'>箱子：FBA1342342525001</span>
              <br>
              <span class='text'>产品：</span>
              <br>
              <span class='text'>保温杯2020款
                <el-button class='whiteBtn '>12件</el-button>
                 <el-button type="text" size="mini" @click="() => change(data)">
                  隐藏详情
                </el-button>
              </span>
        </div>
        <div class="biaodan">
      <el-descriptions class="margin-top"  :column="2" :size="size">
<el-descriptions-item label="产品中文名">保温杯</el-descriptions-item>
    <el-descriptions-item label="产品英文名">vacuum cup</el-descriptions-item>
    <el-descriptions-item label="材质中文名">不锈钢、塑料</el-descriptions-item>
     <el-descriptions-item label="材质英文名">Stainless steel、 plastic</el-descriptions-item>
    <el-descriptions-item label="用途中文名">容器、杯子</el-descriptions-item>
    <el-descriptions-item label="用途英文名">Container、 cup</el-descriptions-item>
    <el-descriptions-item label="海关编码">14234231</el-descriptions-item>
    <el-descriptions-item label="申报价格">30$</el-descriptions-item>
    <el-descriptions-item label="产品品牌">TIGER</el-descriptions-item>
    <el-descriptions-item label="产品型号">ATX660-2020</el-descriptions-item>
    <el-descriptions-item label="产品重量">70KG</el-descriptions-item>
  </el-descriptions>
   <el-descriptions >
    <el-descriptions-item label="亚马逊店铺商店">http://www.amazon.cn/dp/B072MKVS7F/ref=Ip-1488436071-1-1？s=shoes&ie=UTF&&qid=1605232976&sr</el-descriptions-item>
</el-descriptions>
        </div>
         <div class="foot">
           <span class='text'>保温杯2019款
                <el-button class='whiteBtn'>10件</el-button>
                 <el-button type="text" size="mini" @click="() => change(data)">
                  查看详情
                </el-button>
              </span>
              <br>
              <span class='text'>保温杯漫威联名版
                <el-button class='whiteBtn '>10件</el-button>
                 <el-button type="text" size="mini" @click="() => change(data)">
                  查看详情
                </el-button>
              </span>
        </div>
      </div>
      <!-- 抽屉底部按钮 -->
      <div slot="footer">
        <button class="btn-orange" @click="submit()">
          <span> <i class="el-icon-circle-check"></i>提交</span>
        </button>
        <button class="btn-gray" @click="addClose">
          <span>取消</span>
        </button>
      </div>
    </commonDrawer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      total: 50, // 数据数量
      pageSize: 10, // 默认当前条数
      currentPage: 1, // 当前页码
      size: 'small',
      activeName: '1',
      waybillNo: '', // 运单号
      customerName: '', // 客户名称
      customerCode: '', // 客户编码
      predictionChannel: '', // 预报渠道
      destination: '', // 目的地
      zipcode: '', // 目的地邮编

      drawerVrisible: false, // 控制抽屉显示隐藏
      drawerTitle: '装箱清单', // 抽屉标题

      columns: [
        { prop: 'waybill_no', label: '运单号', width: '140', align: 'center' },
        { prop: 'customer_name', label: '客户名称', width: '193', align: 'center' },
        { prop: 'customer_code', label: '客户编号', width: '118', align: 'center' },
        { prop: 'type', label: '订单类型', width: '90', align: 'center', formatter: this.formatter },
        { prop: 'status', label: '运单状态', width: '90', align: 'center', formatter: this.formatter },
        { prop: 'cargoes_num', label: '件数', width: '90', align: 'center' },
        { prop: 'channel_name', label: '渠道名称', width: '84', align: 'center' },
        { prop: 'channel_code', label: '渠道编码', width: '109', align: 'center' },
        { prop: 'created_at', label: '下单时间', width: '89', align: 'center', formatter: this.formatter },
        { prop: 'trade_type', label: '贸易类型', width: '84', align: 'center', formatter: this.formatter },
        { prop: 'is_separate_customs_clearance', label: '单独清关', width: '109', align: 'center', formatter: this.formatter },
        { prop: 'bill_weight', label: '客户结算重', width: '107', align: 'center' },
        { prop: 'agent_delivery_bill_weight', label: '代理结算重', width: '82', align: 'center' },
        { prop: 'have_safe', label: '是否投保', width: '137', align: 'center', formatter: this.formatter }
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
      this.$api.finance.fare.waybill.lists({
        page: this.page.pageNo,
        limit: this.page.limit
      }).then(res => {
        this.tableData = res.data.list
        this.page.total = res.data.total
      })
    },
    registration (row) {
      this.$router.push({ name: 'registration', params: row })
    },
    Batchregistration () {
      this.$router.push({ name: 'Batchregistration' })
    },
    handleClick (val) {
      console.log(val)
    },
    // 重新渲染name列
    formatter (row, column, cellValue) {
      switch (column.property) {
        case 'type':
          return row.type === 1 ? 'FBA运单' : '非FBA运单'
        case 'status':
          switch (row.status) {
            case 2:
              return '已入仓'
            case 3:
              return '已出库'
            case 4:
              return '已出仓'
            case 5:
              return '运输'
            case 6:
              return '已签收'
          }
          return ''
        case 'created_at':
          return this.formatDate(row.created_at, 'yyyy-MM-dd hh:mm:ss')
        case 'trade_type':
          return row.created_at === 2 ? '非一般贸易报关' : '一般贸易报关'
        case 'is_separate_customs_clearance':
          return row.is_separate_customs_clearance === 1 ? '单独清关' : '非单独清关'
        case 'have_safe':
          return row.have_safe === 1 ? '投保' : '不投保'
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
    editTableData (row) {},
    // 查看
    check (val) {
      console.log(val.data)
      this.drawerVrisible = true
    },
    // 装箱清单
    list (val) {
      console.log(val.data)
      this.drawerVrisible = true
    },
    // 关闭抽屉
    addClose () {
      this.drawerVrisible = false
    },
    // 返回抽屉
    raturn () {
      this.drawerVrisibla = false
    },
    // 内部备注
    remarks (val) {
      console.log(val.data)
      this.drawerVrisibla = true
    },
    // 结算备注
    details (val) {
      console.log(val.data)
      this.drawerVrisiblb = true
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
</style>
