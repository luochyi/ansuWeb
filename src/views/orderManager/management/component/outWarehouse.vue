<template>
  <div>
    <el-row class="box">
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
            <el-col :span="6">
              <el-form-item label="问题分类" prop="problemId">
                <el-select
                  v-model="searchForm.problemId"
                  placeholder="请选择"
                  clearable
                  :style="{ width: '60%' }"
                >
                  <el-option v-for="item in problemOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
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
            :disabled='this.waybillIds.length === 0'
            @click="showTransships(waybillIds)"
            size="small"
            >批量设置转单号</el-button
          >
          <el-button
            class="orangeBtn"
            :disabled='this.waybillIds.length === 0'
            @click="showExtracts(waybillIds)"
            size="small"
            >批量设置提单号</el-button
          >
          <el-button
            class="orangeBtn"
            @click="lotSet()"
            :disabled='this.waybillIds.length === 0'
            size="small"
            >批量设置问题件</el-button
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
            width="400"
            :resizable="false"
          >
            <template slot-scope="scope">
              <el-button type="text" @click="detail(scope.row)">
                详情</el-button
              >
              <el-button type="text" @click="shipment(scope.row)">
                出运</el-button
              >
              <el-button type="text" @click="invoice(scope.row)"
                >导出发票</el-button
              >
              <el-button type="text" @click="showTransship(scope.row)"
                >设置转单号</el-button
              >
              <el-button type="text" @click="showExtract(scope.row)"
                >设置提单号</el-button
              >
              <el-button type="text" @click="setProblem(scope.row)"
                >问题件</el-button
              >
            </template>
          </el-table-column>
        </commonTable>
      </div>
    </el-row>

    <el-dialog title="设置转单号" :visible.sync="dialog.transship.visable">
      <el-form :model="dialog.transship.formData">
        <el-form-item label="快递公司" label-width="120px">
          <el-select
            v-model="dialog.transship.formData.transshipId"
            filterable
            placeholder="请选择转单快递公司"
          >
            <el-option
              v-for="item in dialog.transship.options.transships"
              :key="item.id"
              :label="item.code"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="转单号" label-width="120px">
          <el-input
            v-model="dialog.transship.formData.transshipNo"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog.transship.visable = false">取 消</el-button>
        <el-button type="primary" @click="setTransship">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="设置提单号" :visible.sync="dialog.extract.visable">
      <el-form :model="dialog.extract.formData">
        <el-form-item label="提单号" label-width="120px">
          <el-input
            v-model="dialog.extract.formData.extractNo"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog.extract.visable = false">取 消</el-button>
        <el-button type="primary" @click="setExtract">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="setDialog" title="设置问题件"  width="30%">
       选择问题分类
        <el-select  v-model="problemId">
          <el-option v-for="item in problemOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <div slot="footer">
          <el-button @click="setDialog = false">取消</el-button>
          <el-button type="primary" @click="setProblemSubmit()">确定</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      code: '',
      req: {
        waybillIds: []
      },
      setDialog: false,
      problemId: null,
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
        {
          prop: 'transship_code',
          label: '转单快递',
          width: '200',
          align: 'center',
          formatter: this.formatter
        },
        {
          prop: 'transship_no',
          label: '转单号',
          width: '200',
          align: 'center',
          formatter: this.formatter
        },
        {
          prop: 'extract_no',
          label: '提单号',
          width: '200',
          align: 'center',
          formatter: this.formatter
        },
        {
          prop: 'problem_name',
          label: '问题说明',
          width: '200',
          align: 'center'
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
      dialog: {
        transship: {
          visable: false,
          formData: {
            waybillIds: [],
            transshipId: null,
            transshipNo: null
          },
          options: {
            transships: []
          }
        },
        extract: {
          visable: false,
          formData: {
            waybillIds: [],
            extractNo: null
          }
        }
      },
      waybillIds: [],
      table_row: [],
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
        extractNo: '',
        problemId: null
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
      ],
      problemOptions: []
    }
  },
  mounted () {
    // 在页面加载前调用获取列表数据函数
    this.getData()
    this.getTransships()
    this.problemSel()
  },
  methods: {
    // 获取列表数据
    getData () {
      // shipmentLists
      // signLists
      // checkoutLists
      // Ejectlists
      this.$api.Ordermanagement.checkoutLists({
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
    problemSel () {
      this.$api.setting.problem.select().then(res => {
        this.problemOptions = res.data
      })
    },
    // 设置问题件
    setProblem (row) {
      this.setDialog = true
      // this.Id = row.id
      if (row) {
        this.req.waybillIds = [row.id]
      }
    },
    lotSet () {
      if (this.waybillIds.length === 0) {
        this.$message.error('请选择一条运单')
      } else {
        this.setDialog = true
        this.req.waybillIds = this.waybillIds
      }
    },
    setProblemSubmit () {
      this.$api.order.waybill.set({ waybillIds: this.req.waybillIds, problemId: this.problemId }).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg)
          this.setClose()
          this.getData()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    setClose () {
      this.setDialog = false
    },
    search () {
      this.page.pageNo = 1
      this.getData()
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.getData()
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
    detail (data) {
      this.$router.push({ name: 'waybillDetail', params: { id: data.id } })
    },
    // 出运
    shipment (data) {
      this.req.waybillIds.push(data.id)
      this.$confirm('确认出运')
        .then((_) => {
          this.$api.Ordermanagement.checkoutShipment(this.req).then((res) => {
            if (res.code === 0) {
              this.$message.success(res.msg)
              this.getData()
            } else {
              this.$message.error(res.msg)
            }
          })
        })
        .catch((_) => {})
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
        case 'transship_code':
          return row.channel_type === 2
            ? '——'
            : row.transship_id > 0
              ? row.transship_code
              : '——'
        case 'transship_no':
          return row.channel_type === 2
            ? '——'
            : row.transship_id > 0
              ? row.transship_no
              : '——'
        case 'extract_no':
          return row.channel_type === 2
            ? '——'
            : row.extract_no !== ''
              ? row.extract_no
              : '——'
      }
    },
    handleClose () {},
    getTransships () {
      this.$api.setting.transship.select().then((res) => {
        this.dialog.transship.options.transships = res.data
      })
    },
    showTransship (row) {
      this.dialog.transship.formData.waybillIds = [row.id]
      this.dialog.transship.formData.transshipId = row.transship_id
      this.dialog.transship.formData.transshipNo = row.transship_no
      this.dialog.transship.visable = true
    },
    showExtract (row) {
      this.dialog.extract.formData.waybillIds = [row.id]
      this.dialog.extract.formData.extractNo = row.extract_no
      this.dialog.extract.visable = true
    },
    showTransships (waybillIds) {
      if (waybillIds.length === 0) {
        this.$message.error('请选择运单')
        return
      }
      this.dialog.transship.formData.waybillIds = waybillIds
      this.dialog.transship.formData.transshipId = null
      this.dialog.transship.formData.transshipNo = null
      this.dialog.transship.visable = true
    },
    showExtracts (waybillIds) {
      if (waybillIds.length === 0) {
        this.$message.error('请选择运单')
        return
      }
      this.dialog.extract.formData.waybillIds = waybillIds
      this.dialog.extract.formData.extractNo = null
      this.dialog.extract.visable = true
    },
    setTransship () {
      this.$api.order.waybill
        .transship({
          waybillIds: this.dialog.transship.formData.waybillIds,
          transshipId: this.dialog.transship.formData.transshipId,
          transshipNo: this.dialog.transship.formData.transshipNo
        })
        .then((res) => {
          if (res.code === 0) {
            this.$message.success(res.msg)
            this.getData()
            this.dialog.transship.visable = false
          } else {
            this.$message.error(res.msg)
          }
        })
    },
    setExtract () {
      this.$api.order.waybill
        .extract({
          waybillIds: this.dialog.extract.formData.waybillIds,
          extractNo: this.dialog.extract.formData.extractNo
        })
        .then((res) => {
          if (res.code === 0) {
            this.$message.success(res.msg)
            this.getData()
            this.dialog.extract.visable = false
          } else {
            this.$message.error(res.msg)
          }
        })
    },
    handleSelectionChange (val) {
      this.waybillIds = []
      val &&
        val.forEach((item) => {
          this.waybillIds.push(item.id)
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.el-select {
  display: block;
}
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
}
</style>
