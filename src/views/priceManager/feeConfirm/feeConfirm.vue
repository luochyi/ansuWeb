<template>
  <div>
    <div class='main'>
      <!--  标签页 -->
      <el-row type='flex' justify='flex-start' class='title' align='middle'>
        <span class='text'>运费确认</span>
        <el-tabs v-model='activeName' type='card' @tab-click='handleClick'>
          <el-tab-pane label='全部' name='0'></el-tab-pane>
          <el-tab-pane label='未确认' name='1'></el-tab-pane>
          <el-tab-pane label='已确认' name='2'></el-tab-pane>
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
                <el-form-item label="结算状态" prop="billStatus">
                  <el-select
                    v-model="searchForm.billStatus"
                    placeholder="请选择"
                    clearable
                    :style="{ width: '60%' }"
                  >
                  <el-option v-for="item in billStatusOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="核销状态" prop="writeOffStatus">
                  <el-select
                    v-model="searchForm.writeOffStatus"
                    placeholder="请选择"
                    clearable
                    :style="{ width: '60%' }"
                  >
                  <el-option v-for="item in writeOffStatusOptions"
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
              <el-button class='batch' @click="affirm(ids)" :disabled='ids.length===0'>批量确认</el-button>
              <el-button class='batch' @click="cancel(ids)" :disabled='ids.length===0'>批量取消确认</el-button>
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
            @handleSelectionChange='handleSelectionChange'
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
                <!-- <el-button type="text" @click="detail(scope.row.id)"> 查看详情</el-button> -->
                <el-button type="text" @click="affirm([scope.row.id])"> 确认</el-button>
                <el-button type="text" @click="cancel([scope.row.id])"> 取消确认</el-button>
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
      activeName: '0',
      page: {
        pageNo: 1,
        limit: 10,
        sizes: [10, 20, 50],
        total: 0
      },
      tableData: [

      ],
      columns: [
        { prop: 'waybill_no', label: '运单号', width: '200', align: 'center' },
        { prop: 'customer_name', label: '客户名称', width: '200', align: 'center' },
        { prop: 'customer_code', label: '客户简称', width: '200', align: 'center' },
        { prop: 'waybill_type', label: '运单类型', align: 'center', width: '200', formatter: this.formatter },
        { prop: 'created_at', width: '200', label: '下单时间', align: 'center', formatter: this.formatter },
        { prop: 'channel_name', label: '渠道名称', width: '200', align: 'center' },
        { prop: 'is_confirm', label: '是否确认', width: '200', align: 'center', formatter: this.formatter },
        { prop: 'is_bill', label: '是否结算', width: '200', align: 'center', formatter: this.formatter },
        { prop: 'write_off_status', label: '核销状态', width: '200', align: 'center', formatter: this.formatter },
        { prop: 'customer_bill_weight', width: '100', label: '结算重', align: 'center' },
        { prop: 'customer_cost_weight', width: '100', label: '计费重', align: 'center' },
        { prop: 'amount', width: '100', label: '金额', align: 'center' },
        { prop: 'salesman_name', width: '100', label: '业务员姓名', align: 'center' },
        { prop: 'confirm_user_name', width: '100', label: '确认人', align: 'center' },
        { prop: 'confirm_at', width: '100', label: '确认时间', align: 'center', formatter: this.formatter }
      ],
      searchForm: {
        forecastNo: '',
        customerName: '',
        customerCode: '',
        waybillNo: '',
        channelName: '',
        type: null,
        hasInvoice: null,
        billStatus: null,
        writeOffStatus: null
      },
      billStatusOptions: [
        {
          label: '未结算',
          value: 1
        },
        {
          label: '已结算',
          value: 2
        }
      ],
      writeOffStatusOptions: [
        {
          label: '未核销',
          value: 1
        },
        {
          label: '部分核销',
          value: 2
        },
        {
          label: '已核销',
          value: 3
        }
      ],
      ids: []
    }
  },
  mounted () {
    // 在页面加载前调用获取列表数据函数
    this.getData()
  },
  methods: {
    getData () {
      // 初始的表格数据清空
      this.tableData = []
      let params = {
        confirmStatus: Number(this.activeName),
        page: this.page.pageNo,
        limit: this.page.limit,
        forecastNo: this.searchForm.forecastNo,
        customerName: this.searchForm.customerName,
        customerCode: this.searchForm.customerCode,
        waybillNo: this.searchForm.waybillNo,
        channelName: this.searchForm.channelName,
        type: this.searchForm.type,
        hasInvoice: this.searchForm.hasInvoice,
        billStatus: this.searchForm.billStatus,
        writeOffStatus: this.searchForm.writeOffStatus
      }
      this.$api.cost.price.confirm.lists(params).then(res => {
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
        case 'waybill_type':
          return row.waybill_type === 1 ? 'FBA运单' : '非FBA运单'
        case 'is_confirm':
          return row.is_confirm === 0 ? '未确认' : '已确认'
        case 'is_bill':
          return row.is_irikura === 0 ? '未结算' : '已结算'
        case 'created_at':
          return this.formatDate(row.created_at, 'yyyy-MM-dd')
        case 'confirm_at':
          return this.formatDate(row.confirm_at, 'yyyy-MM-dd')
        case 'write_off_status':
          return row.write_off_status === 1 ? '未核销' : row.write_off_status === 2 ? '部分核销' : row.write_off_status === 3 ? '核销完成' : ''
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
    },
    handleSelectionChange (val) {
      console.log(val)
      this.ids = []
      val.forEach(ele => {
        this.ids.push(ele.id)
      })
    },
    affirm (ids) {
      this.$api.cost.price.confirm.affirm({ confirmIds: ids }).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg)
          this.getData()
        } else {
          this.$message.console.error(res.msg)
        }
      })
    },
    cancel (ids) {
      this.$api.cost.price.confirm.cancel({ confirmIds: ids }).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg)
          this.getData()
        } else {
          this.$message.console.error(res.msg)
        }
      })
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
