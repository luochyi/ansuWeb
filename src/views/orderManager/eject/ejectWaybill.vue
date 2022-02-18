<template>
  <div>
    <!--  标签页 -->
    <el-row type='flex' justify='flex-start' class='title' align='middle'>
      <span class='text' style="height:43px;lineHeight:43px">出仓单明细</span>
    </el-row>
    <!-- 主要内容 -->
    <div class='content'>
      <el-row class="info">
        <el-col :span='4' >出仓单号：{{baseInfo.eject_no}}</el-col>
        <el-col :span='4' >出仓日期：{{baseInfo.eject_time}}</el-col>
        <el-col :span='4' >渠道：{{baseInfo.channel_name}}</el-col>
        <el-col :span='4' >代理：{{baseInfo.agent_name}}</el-col>
        <el-col :span='4' ><el-button size="small" class="orangeBtn" @click="back">返回</el-button></el-col>
      </el-row>
      <el-divider></el-divider>
      <!-- 搜索栏 -->
      <el-row class='searchbox1'>
        <!-- 预报单号 -->
        <el-col :span='6' class='colbox'>
          <span class='text'>运单号</span>
          <el-col :span='16'>
            <el-input v-model='msg' placeholder='请输入'>
            </el-input>
          </el-col>
        </el-col>
        <!-- 客户名称 -->
        <el-col :span='6' class='colbox'>
          <span class='text'>出仓单号</span>
          <el-col :span='16'>
            <el-input v-model='msg' placeholder='请输入'>
            </el-input>
          </el-col>
        </el-col>
      </el-row>
      <el-row class='searchbox1'>
          <!-- 目的地 -->
        <el-col :span='6' class='colbox'>
          <span class='text'>目的地</span>
          <el-col :span='16'>
            <el-input v-model='msg' placeholder='请输入'></el-input>
          </el-col>
        </el-col>
        <!-- 订单类型 -->
        <el-col :span='6' class='colbox'>
          <span class='text'>订单类型</span>
          <el-col :span='16'>
            <el-select v-model='msg' placeholder='请输入'></el-select>
          </el-col>
        </el-col>
        <!-- 入仓件数 -->
        <el-col :span='6' class='colbox'>
          <span class='text'>入仓件数</span>
          <el-col :span='16'>
            <el-input v-model='msg' placeholder='请输入'></el-input>
          </el-col>
        </el-col>
        <!--  -->
        <el-col :span='6' class='colbox justify-center'>
          <el-button class='orangeBtn long1'>查 询</el-button>
          <el-button class='wuBtn long1'>重 置</el-button>
        </el-col>
      </el-row>

      <!-- 表格 -->
      <div>
        <el-row class='searchbox1' type='flex' justify='space-between' align='middle' v-if="false">
          <el-col :span='12' class="left" >
            <el-button class='stopBtn'>批量导出Excel</el-button>
          </el-col>
          <!-- <el-col :span='12' class="right">
            <el-button class='whiteBtn' @click="toAdd">新增</el-button>
          </el-col> -->
        </el-row>
        <commonTable
          :columns="columns"
          :data="tableData"
          :pager="page"
          @handleSizeChange="handleSizeChange"
          @handleCurrentChange="handleCurrentChange"
          @handleSelectionChange="handleSelectionChange"
        >
          <!-- 操作
          <el-table-column
            slot="table_oper"
            align="center"
            fixed="right"
            label="操作"
            width="300"
            :resizable="false"
          >
            <template slot-scope="scope">
              <span @click="download(scope.row)" class="blue" v-if="scope.row.has_assign_drivers === 2">下载Excel&nbsp;|&nbsp;</span>
              <span @click="detail(scope.row)" class="blue">运单明细</span>
               <span @click="detail(scope.row)" v-if="scope.row.has_assign_drivers===2" class="blue">&nbsp;|&nbsp;查看送货司机</span>
                <span @click="setDriver(scope.row)" v-else class="blue">&nbsp;|&nbsp;配置司机</span>
            </template>
          </el-table-column> -->
        </commonTable>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      columns: [
        { prop: 'type', label: '运单类型', width: '200', align: 'center', formatter: this.formatter },
        { prop: 'customer_name', label: '客户名称', width: '200', align: 'center' },
        { prop: 'customer_code', label: '客户简称', width: '200', align: 'center' },
        { prop: 'waybill_no', label: '运单号', width: '250', align: 'center' },
        { prop: 'forecast_no', label: '预报单号', width: '250', align: 'center' },
        { prop: 'channel_name', label: '渠道名称', width: '250', align: 'center' },
        { prop: 'has_invoice', label: '是否制作发票', width: '200', align: 'center', formatter: this.formatter },
        { prop: 'irikura_time', label: '入库时间', width: '200', align: 'center', formatter: this.formatter },
        { prop: 'created_at', label: '下单时间', width: '200', align: 'center', formatter: this.formatter },
        { prop: 'remark', label: '客户备注', width: '200', align: 'center' },
        { prop: 'interior_remark', label: '内部备注', width: '200', align: 'center' }
      ],
      tableData: [],
      page: {
        pageNo: 1,
        limit: 10,
        sizes: [10, 20, 50],
        total: 0
      },
      msg: '',
      ejectId: null,
      baseInfo: {
        eject_time: null,
        eject_no: '',
        channel_name: '',
        agent_name: ''
      }
    }
  },
  mounted () {
    if (this.$route.params.id === undefined) {
      this.$router.go(-1)
    }
    let params = this.$route.params
    this.baseInfo.eject_time = params.eject_time
    this.baseInfo.eject_no = params.eject_no
    this.baseInfo.channel_name = params.channel_name
    this.baseInfo.agent_name = params.agent_name
    this.ejectId = params.id
    // 在页面加载前调用获取列表数据函数
    this.getData()
  },
  methods: {
    getData () {
      this.$api.Ordermanagement.ejectWaybill({ limit: this.page.limit, page: this.page.pageNo, ejectId: this.ejectId }).then(res => {
        this.tableData = res.data.list
        this.page.total = res.data.total // 数据总量
      })
    },
    // 改变页面大小处理
    handleSizeChange (val) {
      this.page.limit = val
      this.getData()
    },
    // 翻页处理
    handleCurrentChange (val) {
      this.page.pageNo = val
      this.getData()
    },
    // 重新渲染name列
    formatter (row, column, cellValue) {
      switch (column.property) {
        case 'type':
          return row.type === 1 ? 'FBA运单' : '非FBA运单'
        case 'has_invoice':
          return row.has_invoice === 1 ? '是' : '否'
        case 'irikura_time':
          return this.formatDate(row.irikura_time, 'yyyy-MM-dd hh:mm:ss')
        case 'created_at':
          return this.formatDate(row.created_at, 'yyyy-MM-dd hh:mm:ss')
      }
    },
    handleSelectionChange (val) {},
    back () { this.$router.go(-1) }
  }
}
</script>

<style lang="scss" scoped>
.info{
font-size: 16px;
text-align: left;
color: #333333;
font-weight: 500;
}
</style>
