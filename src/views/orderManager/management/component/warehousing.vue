<template>
  <div>
    <el-row class="box">
      <!-- 入仓 -->
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
                <i slot="suffix" class="unit" @click="dialogPL = true" style="cursor:pointer">批量</i>
                            <i slot="suffix" class="expend" @click="dialogPL = true" style="cursor:pointer">&#xe9cc;</i>
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
      <el-row class="line"></el-row>
      <el-row
        class="searchbox1"
        type="flex"
        justify="space-between"
        align="middle"
      >
        <el-col :span="14" class="left">
          <el-button
            class="orangeBtn"
            @click="lotEject"
            :disabled="this.table_row.length === 0"
            size="small"
            >批量出库</el-button
          >
        </el-col>
        <el-col :span="10" class="right"> </el-col>
      </el-row>
      <!-- 表格 -->
      <div class="table">
        <commonTable
          :columns="columns"
          :data="tableData"
          :pager="page"
          @handleSizeChange="handleSizeChange"
          @handleCurrentChange="handleCurrentChange"
          @handleSelectionChange="handleSelectionChange"
        >
          <el-table-column
            slot="table_oper"
            align="center"
            fixed="right"
            label="操作"
            width="250"
            :resizable="false"
          >
            <template slot-scope="scope">
              <el-button type="text" @click="detail(scope.row)">
                详情</el-button
              >
              <el-button type="text" @click="invoice(scope.row)"
                >导出发票</el-button
              >
              <el-button type="text" @click="eject(scope.row)"> 出库</el-button>
            </template>
          </el-table-column>
        </commonTable>
      </div>
    </el-row>
    <commonDrawer
      :drawerVrisible="drawerVrisible"
      @handleClose="addClose"
      :drawerTitle="drawerTitle"
    >
      <div class="dra-content">
        <!-- 内容区域 -->
        <el-row>
          <span
            style="fontsize: 20px; color: #fb4702"
            v-show="req.waybillIds.length === 1"
            >{{ orderCode }}</span
          >
        </el-row>
        <el-row>
          <span style="fontsize: 14px" v-if="req.waybillIds.length === 1"
            >客户名称：{{ userName }}</span
          >
          <span style="fontsize: 14px" v-else
            >批量出库运单数：{{ req.waybillIds.length }}</span
          >
        </el-row>
        <el-divider></el-divider>
        <el-form label-width="80px">
          <el-form-item label="渠道">
            <el-select
              placeholder="请选择渠道"
              v-model="channelId"
              @change="changeChannel"
            >
              <el-option
                v-for="item in channelOption"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="渠道服务">
            <el-select
              placeholder="请选择渠道服务"
              v-model="req.channelServiceId"
            >
              <el-option
                v-for="item in channelServiceOption"
                :key="item.id"
                :label="item.agent_service_name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <!-- 抽屉底部按钮 -->
      <div slot="footer">
        <button class="btn-orange" @click="ejectSubmit()">
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
      drawerVrisible: false,
      table_row: [],
      drawerTitle: '出库',
      code: '',
      userName: '',
      orderCode: '',
      channelId: null,
      channelOption: [],
      channelServiceOption: [],
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
        sizes: [1, 5, 10],
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
    // 在页面加载前调用获取列表数据函数
    this.getData()
    // this.tableData = [{ type: 1, id: 1, waybill_no: '212d12d2d2' }, { type: 2, id: 2, waybill_no: '12d1d12' }]
    this.$api.agent.channelSelect().then((res) => {
      this.channelOption = res.data
    })
  },
  methods: {
    // 获取列表数据
    getData () {
      // shipmentLists
      // signLists
      // checkoutLists
      // Ejectlists
      this.$api.Ordermanagement.irikuraLists({
        limit: this.page.limit,
        page: this.page.pageNo,
        forecastNo: this.searchForm.forecastNo,
        customerName: this.searchForm.customerName,
        customerCode: this.searchForm.customerCode,
        salesmanName: this.searchForm.salesmanName,
        waybillNo: this.searchForm.waybillNo,
        type: this.searchForm.type,
        hasInvoice: this.searchForm.hasInvoice,
        channelName: this.searchForm.channelName
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
    invoice (row) {
      if (row.has_invoice === 0) {
        this.$message.error('该运单还未制作发票')
        return
      }
      this.$api.Ordermanagement.invoiceExport({ waybillId: row.id }).then(
        (res) => {
          this.downloadBlob(res, '发票.xlsx')
        }
      )
    },
    // 出库
    eject (data) {
      this.req.waybillIds.push(data.id)
      this.drawerVrisible = true
      this.userName = data.customer_name
      this.orderCode = data.waybill_no
    },
    ejectSubmit () {
      this.$confirm('确认出库')
        .then((_) => {
          this.$api.Ordermanagement.irikuraEject(this.req).then((res) => {
            if (res.code === 0) {
              this.$message.success(res.msg)
              this.addClose()
              this.getData()
            } else {
              this.$message.error(res.msg)
            }
          })
        })
        .catch((_) => {})
    },
    handleSelectionChange (val) {
      console.log(val)
      this.table_row = []
      val &&
        val.forEach((item) => {
          this.table_row.push(item.id)
        })
      console.log(this.table_row)
    },
    lotEject () {
      this.req.waybillIds = this.table_row
      this.drawerVrisible = true
    },
    changeChannel (val) {
      let channelid = val
      this.$api.agent
        .channelserviceSelect({ channelId: channelid })
        .then((res) => {
          this.channelServiceOption = res.data
        })
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
    addClose () {
      this.drawerVrisible = false
      this.channelId = null
      this.req = {
        waybillIds: [],
        channelServiceId: null
      }
    }
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
.dra-content {
  text-align: left;
  padding-left: 20px;
  padding-top: 20px;
}
.elForm {
  text-align: left;
}
.searchBtn {
  position: relative;
  // top:30px;
}
</style>
