<template>
  <div>
    <div class='main'>
      <!--  标签页 -->
      <el-row type='flex' justify='flex-start' class='title' align='middle'>
        <span class='text'>报价单</span>
        <el-tabs v-model='activeName' type='card' @tab-click='handleClick'>
          <el-tab-pane :label='" 未报价 "+subscript.not_offer' name='2'></el-tab-pane>
          <el-tab-pane :label='" 不可报价 "+subscript.ban_offer' name='1'></el-tab-pane>
          <el-tab-pane :label='" 审核中 "+subscript.audit_ing' name='3'></el-tab-pane>
          <el-tab-pane :label='" 审核驳回 "+subscript.audit_fail' name='5'></el-tab-pane>
          <el-tab-pane label=' 已报价 ' name='4'></el-tab-pane>
          <el-tab-pane label=' 全部 ' name='0'></el-tab-pane>
        </el-tabs>
      </el-row>
      <!-- 主要内容 -->
      <div class='content'>
        <el-row :gutter="15">
          <el-col>
            <el-form
              class="elForm"
              ref="elForm"
              size="small"
              :model="searchForm"
              label-width="93px"
              label-position="top"
            >
              <el-col :span="6">
                <el-form-item label="运单编号" prop="waybillNo">
                  <el-input
                    v-model="searchForm.waybillNo"
                    placeholder="请输入"
                    clearable
                    :style="{ width: '60%' }"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="客户编号" prop="customerCode">
                  <el-input
                    v-model="searchForm.customerCode"
                    placeholder="请输入"
                    clearable
                    :style="{ width: '60%' }"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="客户名称" prop="customerName">
                  <el-input
                    v-model="searchForm.customerName"
                    placeholder="请输入"
                    clearable
                    :style="{ width: '60%' }"
                  >
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item label="渠道名称" prop="channelName">
                  <el-input
                    v-model="searchForm.channelName"
                    placeholder="请输入"
                    clearable
                    :style="{ width: '60%' }"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="类型" prop="type">
                  <el-select
                    v-model="searchForm.type"
                    placeholder="请选择"
                    clearable
                    :style="{ width: '60%' }"
                  >
                  <el-option v-for="item in typeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="制作发票" prop="hasInvoice">
                  <el-select
                    v-model="searchForm.hasInvoice"
                    placeholder="请选择"
                    clearable
                    :style="{ width: '60%' }"
                  >
                  <el-option v-for="item in hasInvoiceOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <!-- <el-form-item size="large"> -->
                  <div class="searchBtn">
                    <el-button class="orangeBtn" @click="search">查询</el-button>
                    <el-button class="whiteBtn" @click="resetForm('elForm')">重置</el-button>
                  </div>
                <!-- </el-form-item> -->
            </el-col>
            </el-form>
          </el-col>

        </el-row>
        <el-divider></el-divider>
        <div class='table'>
          <el-row class='tableBtn'>
            <el-col :span='12' class='left'>
              <!-- <el-button class='batch'></el-button> -->
              <!-- <el-button class='batch'></el-button> -->
            </el-col>
            <el-col :span='20' class='right'>
              <!-- <el-button class='whiteBtn '></el-button> -->
            </el-col>
          </el-row>
          <br>
          <!-- 表格 -->
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
                width="126"
                :resizable="false"
                >
                <template slot-scope="scope">
                <el-button type="text" @click="detail(scope.row.id)"> 查看详情</el-button>
                </template>
            </el-table-column>
        </commonTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      subscript: {
        ban_offer: 0,
        not_offer: 0,
        audit_ing: 0,
        audit_fail: 0
      },
      activeName: '2',
      page: {
        pageNo: 1,
        limit: 10,
        sizes: [10, 20, 50, 100],
        total: 0
      },
      tableData: [

      ],
      columns: [
        { prop: 'waybill_no', label: '运单号', width: '200', align: 'center' },
        { prop: 'customer_name', label: '客户名称', width: '200', align: 'center' },
        { prop: 'customer_code', label: '客户编码', width: '200', align: 'center' },
        { prop: 'type', label: '运单类型', align: 'center', width: '200', formatter: this.formatter },
        { prop: 'channel_name', label: '渠道名称', width: '200', align: 'center' },
        { prop: 'channel_cate', label: '渠道分类', width: '200', align: 'center', formatter: this.formatter },
        { prop: 'has_invoice', label: '是否制作发票', width: '200', align: 'center', formatter: this.formatter },
        { prop: 'is_irikura', label: '是否入仓', width: '100', align: 'center', formatter: this.formatter },
        { prop: 'customer_bill_weight', width: '100', label: '结算重', align: 'center' },
        { prop: 'customer_volume', width: '100', label: '方数', align: 'center', formatter: this.formatter },
        { prop: 'customer_weight', width: '100', label: '重量', align: 'center' },
        { prop: 'customer_volume_weight', width: '100', label: '材积', align: 'center' },
        { prop: 'cost_weight', width: '100', label: '计费重', align: 'center' },
        { prop: 'created_at', width: '200', label: '下单时间', align: 'center', formatter: this.formatter },
        { prop: 'audit_status', width: '100', label: '审核状态', align: 'center', formatter: this.formatter },
        { prop: 'audit_name', width: '100', label: '审核人', align: 'center' },
        { prop: 'amount', width: '100', label: '基础运费', align: 'center' },
        { prop: 'surcharge_amount', width: '100', label: '附加费', align: 'center' },
        { prop: 'other_amount', width: '100', label: '其他费用', align: 'center' },
        { prop: 'total_amount', width: '100', label: '总费用', align: 'center' }
      ],
      searchForm: {
        forecastNo: '',
        customerName: '',
        customerCode: '',
        waybillNo: '',
        channelName: '',
        type: null,
        hasInvoice: null
      },
      typeOptions: [
        {
          label: 'FBA运单',
          value: 1
        },
        {
          label: '非FBA运单',
          value: 2
        }
      ],
      hasInvoiceOptions: [
        {
          label: '未制作',
          value: 0
        },
        {
          label: '已制作',
          value: 1
        }
      ]
    }
  },
  mounted () {
    this.$api.cost.price.offer.subscript().then(res => {
      console.log(res.data) // res是接口返回的结果
      this.subscript = res.data
    })
    // 在页面加载前调用获取列表数据函数
    this.getData()
  },
  methods: {
    getData () {
      // 初始的表格数据清空
      this.tableData = []
      let params = {
        status: Number(this.activeName),
        page: this.page.pageNo,
        limit: this.page.limit,
        forecastNo: this.searchForm.forecastNo,
        customerName: this.searchForm.customerName,
        customerCode: this.searchForm.customerCode,
        waybillNo: this.searchForm.waybillNo,
        channelName: this.searchForm.channelName,
        type: this.searchForm.type,
        hasInvoice: this.searchForm.hasInvoice
      }
      this.$api.cost.price.offer.lists(params).then(res => {
        console.log(res.data) // res是接口返回的结果
        this.tableData = res.data.list
        this.page.total = res.data.total
      })
    },
    handleCurrentChange (val) {
      this.page.pageNo = val
      this.getData()
    },
    handleSizeChange (val) {
      this.page.limit = val
      this.getData()
    },
    formatter (row, column) {
      switch (column.property) {
        case 'type':
          return row.type === 1 ? 'FBA运单' : '非FBA运单'
        case 'channel_cate':
          return row.channel_cate === 1 ? '海运' : row.channel_cate === 2 ? '空运' : row.channel_cate === 3 ? '快递' : row.channel_cate === 4 ? '铁路' : '专车'
        case 'has_invoice':
          return row.has_invoice === 0 ? '未制作' : '已制作'
        case 'is_irikura':
          return row.is_irikura === 0 ? '未入仓' : '已入仓'
        case 'created_at':
          return this.formatDate(row.created_at, 'yyyy-MM-dd')
        case 'audit_status':
          return row.audit_status === 0 ? '未报价' : row.audit_status === 1 ? '审核中' : row.audit_status === 2 ? '审核通过' : row.audit_status === 3 ? '审核驳回' : ''
        case 'customer_volume':
          return (row.customer_volume / 1000000).toFixed(2) + 'm³'
      }
    },
    search () {
      this.page.pageNo = 1
      this.getData()
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.getData()
    },
    detail (id) {
      this.$router.push({ name: 'priceDetail', params: { waybillId: id } })
    },
    handleClick (tab, event) {
      console.log(tab, event)
      this.activeName = tab.name
      this.getData()
    }
  }
}
</script>

<style lang='scss' scoped>

.dra-content{
  text-align: left;
  /deep/.cell{
  display: flex;
  justify-content:space-between;
  line-height: 40px;
}
}
/deep/ .tableBtn{
  .batch{
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
.label{
  font-size: 14px;
  padding: 5px;
  span{
    width: 100px;
  }
  /deep/.el-input__inner{
    width: 200px;
    display: inline;
  }
   .el-input{
    display: inline;
    margin-left: 10px;
  }
}
.elForm{
  text-align: left;
}
.searchBtn{
  position: relative;
  top: 30px;
}
</style>
