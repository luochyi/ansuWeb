<template>
  <div>
    <el-row class="box">
      <!-- 签收 -->
      <el-row :gutter="15">
        <!-- <el-col :span="20"> -->
          <el-form
            class="elForm"
            ref="elForm"
            size="small"
            :model="searchForm"
            label-width="93px"
            label-position="top"
          >
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
              <el-form-item label="客户编码" prop="customerCode">
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
              <el-form-item label="业务员姓名" prop="salesmanName">
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
            <!-- <el-col :span="6">
                      <el-form-item label="运单号批量搜索" prop="waybillNo">
                        <el-input
                          v-model="searchForm.waybillNo"
                          placeholder="请输入"
                          clearable
                          :style="{ width: '60%' }"
                        >
                        </el-input>
                      </el-form-item>
                    </el-col> -->
            <el-col :span="6">
              <el-form-item label="运单类型" prop="type">
                <el-select
                  v-model="searchForm.type"
                  placeholder="请选择"
                  clearable
                  :style="{ width: '60%' }"
                >
                  <el-option
                    v-for="item in typeOptions"
                    :label="item.label"
                    :value="item.value"
                    :key="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="是否制作发票" prop="hasInvoice">
                <el-select
                  v-model="searchForm.hasInvoice"
                  placeholder="请选择"
                  clearable
                  :style="{ width: '60%' }"
                >
                  <el-option
                    v-for="item in hasInvoiceOptions"
                    :label="item.label"
                    :value="item.value"
                    :key="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="转单公司" prop="transshipCode">
                <el-input
                  v-model="searchForm.transshipCode"
                  placeholder="请输入"
                  clearable
                  :style="{ width: '60%' }"
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="转单号" prop="transshipNo">
                <el-input
                  v-model="searchForm.transshipNo"
                  placeholder="请输入"
                  clearable
                  :style="{ width: '60%' }"
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="提单号" prop="extractNo">
                <el-input
                  v-model="searchForm.extractNo"
                  placeholder="请输入"
                  clearable
                  :style="{ width: '60%' }"
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
          <el-form-item size="large">
          <div class="searchBtn">
            <el-button class="orangeBtn" @click="search">查询</el-button>
            <el-button class="whiteBtn" @click="resetForm('elForm')"
              >重置</el-button
            >
          </div>
          </el-form-item>
        </el-col>
          </el-form>
      </el-row>
      <el-row class="line"></el-row>
      <el-row
        class="searchbox1"
        type="flex"
        justify="space-between"
        align="middle"
      >
        <el-col :span="14" class="left">
          <!-- <el-button class='stopBtn' @click="Export" size="small">批量导出Excel</el-button> -->
        </el-col>
        <el-col :span="10" class="right"> </el-col>
      </el-row>
      <!-- 表格 -->
      <div class="table">
        <commonTable
          :columns="columns"
          :selection="selection"
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
              <span @click="detail(scope.row)" class="blue">详情</span>
            </template>
          </el-table-column>
        </commonTable>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selection: false,
      code: '',
      req: {
        waybillIds: [],
        channelServiceId: null
      },
      columns: [
        { prop: 'waybill_no', label: '运单号', width: '200', align: 'center' },
        {
          prop: 'forecast_no',
          label: '预报单号',
          width: '200',
          align: 'center'
        },
        {
          prop: 'type',
          label: '运单类型',
          align: 'center',
          width: '200',
          formatter: this.formatter
        },
        {
          prop: 'customer_name',
          label: '客户名称',
          width: '200',
          align: 'center'
        },
        {
          prop: 'customer_code',
          label: '客户编码',
          width: '200',
          align: 'center'
        },
        {
          prop: 'channel_name',
          label: '渠道名称',
          width: '200',
          align: 'center'
        },
        {
          prop: 'has_invoice',
          label: '是否制作发票',
          width: '200',
          align: 'center',
          formatter: this.formatter
        },
        {
          prop: 'irikura_time',
          label: '入库时间',
          width: '200',
          align: 'center',
          formatter: this.formatter
        },
        {
          prop: 'created_at',
          label: '下单时间',
          width: '200',
          align: 'center',
          formatter: this.formatter
        },
        { prop: 'remark', label: '客户备注', width: '200', align: 'center' },
        {
          prop: 'interior_remark',
          label: '内部备注',
          width: '200',
          align: 'center'
        }
      ],
      tableData: [],
      page: {
        limit: 10,
        total: 0,
        sizes: [10, 20, 50, 100],
        pageNo: 1
      },
      searchForm: {
        forecastNo: '',
        customerCode: '',
        customerName: '',
        salesmanName: '',
        waybillNo: '',
        channelName: '',
        type: null,
        hasInvoice: null,
        transshipCode: '',
        transshipNo: '',
        extractNo: ''
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
    // 在页面加载前调用获取列表数据函数
    this.getData()
  },
  methods: {
    // 获取列表数据
    getData () {
      // shipmentLists
      // signLists
      // checkoutLists
      // Ejectlists
      this.$api.Ordermanagement.signLists({
        limit: this.page.limit,
        page: this.page.pageNo,
        forecastNo: this.searchForm.forecastNo,
        customerName: this.searchForm.customerName,
        customerCode: this.searchForm.customerCode,
        salesmanName: this.searchForm.salesmanName,
        waybillNo: this.searchForm.waybillNo,
        type: this.searchForm.type,
        hasInvoice: this.searchForm.hasInvoice,
        channelName: this.searchForm.channelName,
        transshipCode: this.searchForm.transshipCode,
        transshipNo: this.searchForm.transshipNo,
        extractNo: this.searchForm.extractNo
      }).then((res) => {
        this.page.total = res.data.total // 数据总量
        this.tableData = res.data.list
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
    detail (data) {
      this.$router.push({ name: 'waybillDetail', params: { id: data.id } })
    },
    // 页码切换
    handleCurrentChange (val) {
      this.page.pageNo = val
      this.getData()
    },
    // 页容量切换
    handleSizeChange (val) {
      this.page.limit = val
      this.getData()
    },
    // 表格格式化
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
    handleClose () {}
  }
}
</script>
<style lang="scss" scoped>
.line {
  height: 1px;
  background: #e9e9e9;
  margin: 18px 0;
}
.input {
  width: 70%;
  display: flex;
  align-items: center;
}
.box {
  background: #fff;
  padding-top: 14px;
  text-align: left;
}
.item {
  display: flex;
  align-items: center;
}
.item-box {
  text-align: right;
  width: 80px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.65);
}
.unit {
  line-height: 32px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #fe822f;
  margin-right: 10px;
}
.expend {
  font-family: "iconfont" !important;
  line-height: 32px;
  font-size: 14px;
  font-style: normal;
  color: #fe822f;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.elForm {
  text-align: left;
}
.searchBtn {
  position: relative;
  top: 30px;
}
</style>
