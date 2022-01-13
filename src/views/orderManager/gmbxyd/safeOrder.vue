<template>
  <div>
    <!--  标签页 -->
    <el-row type='flex' justify='flex-start' class='title' align='middle'>
      <span class='text' style="height:43px;lineHeight:43px">保单</span>
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
                <el-form-item label="保单号" prop="safeNo">
                  <el-input
                    v-model="searchForm.safeNo"
                    placeholder="请输入"
                    clearable
                    :style="{ width: '60%' }"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
             <el-col :span="6">
                <el-form-item label="预报单号" prop="forecastNo">
                  <el-input
                    v-model="searchForm.forecastNo"
                    placeholder="请输入"
                    clearable
                    :style="{ width: '60%' }"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="客户简称" prop="customerCode">
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
                <el-form-item label="销售姓名" prop="salesmanName">
                  <el-input
                    v-model="searchForm.salesmanName"
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
                <el-form-item label="运单号" prop="waybillNo">
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
                <el-form-item label="运单类型" prop="type">
                  <el-select
                    v-model="searchForm.type"
                    placeholder="请选择"
                    clearable
                    :style="{ width: '60%' }"
                  >
                  <el-option v-for="item in typeOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
             <el-col :span="6">
          <!-- <el-form-item size="large"> -->
          <div class="searchBtn">
            <el-button class="orangeBtn" @click="search">查询</el-button>
            <el-button class="whiteBtn" @click="resetForm('elForm')"
              >重置</el-button
            >
          </div>
          <!-- </el-form-item> -->
        </el-col>
          </el-form>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-divider></el-divider>
      <!-- 表格 -->
      <div>
        <commonTable
        :selection="selection"
          :columns="columns"
          :data="tableData"
          :pager="page"
          @handleSizeChange="handleSizeChange"
          @handleCurrentChange="handleCurrentChange"
        >
        </commonTable>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      selection: false,
      columns: [
        { prop: 'safe_no', label: '保单号', width: '200', align: 'center' },
        { prop: 'waybill_no', label: '运单号', width: '200', align: 'center' },
        { prop: 'type', label: '运单类型', width: '120', align: 'center', formatter: this.formatter },
        { prop: 'safe_amount', label: '保费', width: '120', align: 'center' },
        { prop: 'customer_name', label: '客户名称', width: '200', align: 'center' },
        { prop: 'customer_code', label: '客户简称', width: '200', align: 'center' },
        { prop: 'channel_name', label: '渠道名称', width: '200', align: 'center' },
        { prop: 'channel_cate', label: '渠道类型', width: '120', align: 'center' },
        { prop: 'country_name', label: '目的国', width: '120', align: 'center' },
        { prop: 'cargoes_num', label: '货件数', width: '120', align: 'center' },
        { prop: 'bill_weight', label: '入仓结算重', width: '120', align: 'center' },
        { prop: 'declared_value', label: '申报价值', width: '120', align: 'center' },
        { prop: 'currency_name', label: '申报币种', width: '120', align: 'center' },
        { prop: 'safe_declared_value', label: '投保货值', width: '120', align: 'center' },
        { prop: 'unit_safe_declared_value', label: '每公斤货值', width: '120', align: 'center' },
        { prop: 'created_at', label: '下单时间', width: '200', align: 'center', formatter: this.formatter }
      ],
      tableData: [],
      page: {
        pageNo: 1,
        limit: 10,
        sizes: [10, 20, 50],
        total: 0
      },
      searchForm: {
        safeNo: '',
        forecastNo: '',
        customerCode: '',
        customerName: '',
        salesmanName: '',
        channelName: '',
        waybillNo: '',
        type: null
      },
      typeOptions: [
        {
          label: 'FBA运单',
          value: 1
        }, {
          label: '非FBA运单',
          value: 2
        }
      ]
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$api.order.waybill.safe.order({
        page: this.page.pageNo,
        limit: this.page.limit,
        safeNo: this.searchForm.safeNo,
        forecastNo: this.searchForm.forecastNo,
        customerName: this.searchForm.customerName,
        customerCode: this.searchForm.customerCode,
        salesmanName: this.searchForm.salesmanName,
        channelName: this.searchForm.channelName,
        waybillNo: this.searchForm.waybillNo,
        type: this.searchForm.type
      }).then(res => {
        this.tableData = res.data.list
        this.page.total = res.data.total
      })
    },
    search () {
      this.page.pageNo = 1
      this.getData()
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.getData()
    },
    // 重新渲染name列
    formatter (row, column, cellValue) {
      switch (column.property) {
        case 'type':
          return row.type === 1 ? 'FBA运单' : '非FBA运单'
        case 'created_at':
          return this.formatDate(row.created_at, 'yyyy-MM-dd')
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
    }
  }
}
</script>

<style lang="scss" scoped>
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
.unit{
    line-height: 32px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #FE822F;
    margin-right: 10px;
}
.expend {
  font-family: "iconfont" !important;
  font-size: 14px;
  font-style: normal;
  color: #FE822F;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
/deep/ .el-dialog{
  position: absolute;
  margin: 0px !important;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .el-dialog__header{
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
  }
  .el-dialog__body{
    border-top: 1px solid rgba(0,0,0,0.06);
    border-bottom: 1px solid rgba(0,0,0,0.06);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.65);
  }
}
.elForm{
  text-align: left;
}
.searchBtn{
  position: relative;
  // top: 30px;
}
</style>
