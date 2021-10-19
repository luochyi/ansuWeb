<template>
  <div>
    <el-row type="flex" justify="flex-start" class="title" align="middle">
      <span class="text">生成应收账单</span>
    </el-row>
    <div class="main">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column width="55">
          <template slot-scope="scoped">
            <el-button type="success" icon="el-icon-check" circle v-if="getAgentAmount(scoped.row) === getAnsuexAmount(scoped.row)"></el-button>
            <el-button type="danger" icon="el-icon-close" circle v-else></el-button>
          </template>
        </el-table-column>
        <el-table-column label="代理结算数据">
          <el-table-column prop="agent_waybill_no" label="代理单号" width="200"></el-table-column>
          <el-table-column prop="weight" label="代理结算重"></el-table-column>
          <el-table-column prop="agent_amount" label="合计费用" :formatter="formatter"></el-table-column>
        </el-table-column>
        <el-table-column label="安速登记数据">
          <el-table-column prop="waybill_no" label="运单号" width="200"></el-table-column>
          <el-table-column prop="agent_bill_weight" label="代理结算重"></el-table-column>
          <el-table-column prop="ansuex_amount" label="合计费用" :formatter="formatter"></el-table-column>
        </el-table-column>
        <el-table-column>
          <el-table-column prop="agent_date" label="日期" width="200"></el-table-column>
          <el-table-column prop="channel_name" label="渠道"></el-table-column>
          <el-table-column prop="country" label="目的地"></el-table-column>
          <el-table-column prop="zip_code" label="邮编"></el-table-column>
          <el-table-column prop="cargo_num" label="货物件数"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scoped">
              <el-button type="text" @click="detail(scoped.row)">费用明细</el-button>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
      <el-button @click="confirm">确认账单</el-button>
    </div>
    <el-dialog
        title="费用明细"
        :visible.sync="dialogVisible">
      <el-table :data="this.detailData.services" style="width: 100%"
                :summary-method="getSummaries"
                show-summary>
        <el-table-column label="代理结算数据">
          <el-table-column prop="agent_waybill_no" label="代理单号" width="200"></el-table-column>
          <el-table-column prop="service_name" label="费用类型"></el-table-column>
          <el-table-column prop="unit_price" label="单价"></el-table-column>
          <el-table-column prop="amount" label="金额"></el-table-column>
        </el-table-column>
      </el-table>
      <el-table :data="this.detailData.ansuex_service" style="width: 100%"
                :summary-method="getSummaries"
                show-summary>
        <el-table-column label="安速结算数据">
          <el-table-column prop="waybill_no" label="代理单号" width="200"></el-table-column>
          <el-table-column prop="name" label="费用类型"></el-table-column>
          <el-table-column prop="price" label="单价"></el-table-column>
          <el-table-column prop="unit" label="单位" :formatter="formatter"></el-table-column>
          <el-table-column prop="bill_amount" label="金额"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scoped">
              <el-button type="text" @click="remove(scoped.$index)">移除费用</el-button>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      baseInfo: {
        agentId: 0,
        path: ''
      },
      tableData: [],
      tableMerge: {
        waybill: {},
        waybillService: {}
      },
      dialogVisible: false,
      detailData: {}
    }
  },
  mounted () {
    this.baseInfo.agentId = this.$route.params.agentId
    this.baseInfo.path = this.$route.params.path
    this.getData()
  },
  methods: {
    getData () {
      this.$api.finance.payabble.agent.amount({
        agentId: this.baseInfo.agentId,
        path: this.baseInfo.path
      }).then(res => {
        if (res.code === 0) {
          this.tableData = res.data
        } else {
          this.$message.error(res.msg) // 错误提示
        }
      })
    },
    // 重新渲染name列
    formatter (row, column, cellValue) {
      switch (column.property) {
        case 'write_off_status':
          return row.write_off_status === 1 ? '未核销' : row.write_off_status === 2 ? '部分核销' : '核销完成'
        case 'unit':
          return row.unit === 1 ? '公斤' : row.unit === 2 ? '票' : row.unit === 3 ? '品名' : '箱子'
        case 'agent_amount':
          return this.getAgentAmount(row)
        case 'ansuex_amount':
          return this.getAnsuexAmount(row)
      }
    },
    getAgentAmount (row) {
      let amount = 0
      if (row.services) {
        row.services.forEach(item => {
          amount += Number(item.amount)
        })
      }
      return amount
    },
    getAnsuexAmount (row) {
      let amount = 0
      if (row.ansuex_service) {
        row.ansuex_service.forEach(item => {
          amount += Number(item.bill_amount)
        })
      }
      return amount
    },
    detail (row) {
      this.detailData = row
      this.dialogVisible = true
    },
    remove (index) {
      this.detailData.ansuex_service.splice(index, 1)
    },
    getSummaries (param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        if (param.data === null) {
          return
        }
        if (column.property === 'bill_amount' || column.property === 'amount') {
          const values = data.map(item => Number(item[column.property]))
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {
                return prev + curr
              } else {
                return prev
              }
            }, 0)
          }
        }
      })
      return sums
    },
    confirm () {
      let costIds = []
      for (const key in this.tableData) {
        let item = this.tableData[key]
        if (this.getAgentAmount(item) === this.getAnsuexAmount(item)) {
          if (item.ansuex_service) {
            item.ansuex_service.forEach(service => {
              costIds.push(service.cost_id)
            })
          }
        } else {
          this.$message.error('账单' + item.agent_waybill_no + '金额错误') // 错误提示
          return
        }
      }
      this.$api.finance.payabble.agent.confirm({
        agentId: this.baseInfo.agentId,
        path: this.baseInfo.path,
        costIds: costIds
      }).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg) // 成功提示
          this.$router.push({ name: 'Payablemanagement' })
        } else {
          this.$message.error(res.msg) // 错误提示
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
/deep/ .title {
  height: 56px;
  font-size: 16px;
}
</style>
