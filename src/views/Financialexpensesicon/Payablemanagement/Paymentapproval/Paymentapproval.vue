<template>
  <div>
    <div class='main'>
      <!--  标签页 -->
      <el-row type='flex' justify='flex-start' class='title' align='middle'>
        <span class='text'>付款审批</span>
      </el-row>
      <!-- 主要内容 -->
      <div class='content'>
        <el-row class='searchbox1'>
          <el-col :span='6' class='colbox'>
            <el-col :span='6'>
              <span class='text'>付款单号</span>
            </el-col>
            <el-col :span='13'>
              <el-input v-model='PaymentNo' placeholder='请输入'></el-input>
            </el-col>
          </el-col>
          <el-col :span='6' class='colbox'>
            <el-col :span='6'>
              <span class='text'>付款金额</span>
            </el-col>
            <el-col :span='13'>
              <el-input v-model='amount' placeholder='请输入'></el-input>
            </el-col>
          </el-col>
          <el-col :span='6' class='colbox'>
            <el-col :span='6'>
              <span class='text'>代理编码</span>
            </el-col>
            <el-col :span='13'>
              <el-input v-model='code' placeholder='请输入'></el-input>
            </el-col>
          </el-col>
          <el-col :span='6' class='colbox'>
            <el-col :span='6'>
              <span class='text'>审核状态</span>
            </el-col>
            <el-col :span='13'>
                <el-input v-model='status' placeholder='请输入'></el-input>
            </el-col>
          </el-col>
        </el-row>
        <!--  -->
        <el-row class='searchbox1'>
          <el-col :span='6' class='colbox'>
            <el-col :span='6'>
              <span class='text'>申请状态</span>
            </el-col>
            <el-col :span='13'>
           <el-select v-model="value" placeholder="请选择">
         <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
         </el-option>
         </el-select>
            </el-col>
          </el-col>
          <el-col :span='17' class='right'>
            <el-button class='orangeBtn long1'>查 询</el-button>
            <el-button class='wuBtn long1'>重 置</el-button>
          </el-col>
        </el-row>
        <el-divider></el-divider>
          <el-row class='tableBtn'>
             <el-col :span='10' class="left">
               <el-button class='stopBtn' @click="changes=true">批量审核</el-button>
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
      @handleSelectionChange="handleSelectionChange"
    >
      <el-table-column
        slot="table_oper"
        align="center"
        fixed="right"
        label="操作"
        width="156"
        :resizable="false"
      >
         <template slot-scope="scoped">
          <el-button type="text" @click="adopt([scoped.row.id])" v-if="scoped.row.audit_status === 1"> 通过</el-button>
          <span style="color: #0084FF; margin: 0px 5px" v-if="scoped.row.audit_status === 1">|</span>
          <el-button type="text" @click="reject([scoped.row.id])" v-if="scoped.row.audit_status === 1"> 驳回</el-button>
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
      columns: [
        { prop: 'pay_no', label: '付款单号', width: '212', align: 'center' },
        { prop: 'amount', label: '申请金额', width: '82', align: 'center' },
        { prop: 'agent_name', label: '代款代理', width: '255', align: 'center' },
        { prop: 'agent_code', label: '代理编码', width: '142', align: 'center' },
        { prop: 'audit_status', label: '审核状态', width: '95', align: 'center', formatter: this.formatter },
        { prop: 'created_at', label: '账单生成日期', width: '129', align: 'center', formatter: this.formatter },
        { prop: 'created_user_name', label: '对账确认人', width: '73', align: 'center' }
      ],
      tableData: [],
      page: {
        pageNo: 1,
        limit: 10,
        sizes: [1, 5, 10],
        total: 0
      },
      billAgentIds: [],
      rejectData: {
        reason: ''
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.$api.finance.payabble.audit.lists({
        page: this.page.pageNo,
        limit: this.page.limit
      }).then(res => {
        this.tableData = res.data.list
        this.page.limit = res.data.total
      })
    },
    detailspage () {
      this.$router.push({ name: 'detailspage' })
    },
    // 重新渲染name列
    formatter (row, column, cellValue) {
      switch (column.property) {
        case 'created_at':
          return this.formatDate(row.created_at, 'yyyy-MM-dd')
        case 'audit_status':
          return row.audit_status === 0 ? '未申请' : row.audit_status === 1 ? '审核中' : row.audit_status === 2 ? '审核通过' : '审核驳回'
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
    // 复选
    handleSelectionChange (val) {
      this.billAgentIds = []
      val && val.forEach((item) => {
        this.billAgentIds.push(item.id)
      })
    },
    adopt (billAgentIds) {
      this.$api.finance.payabble.audit.adopt({
        billAgentIds: billAgentIds
      }).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg) // 成功提示
          this.$router.push({ name: 'Payablemanagement' })
        } else {
          this.$message.error(res.msg) // 错误提示
        }
      })
    },
    reject (billAgentIds) {
      this.$api.finance.payabble.audit.reject({
        billAgentIds: billAgentIds,
        reason: this.rejectData.reason
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
.sub_title{
  margin:20px
}
/deep/ .title {
  height: 56px;
  font-size: 16px;
}
/deep/ .tableBtn{
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
</style>
