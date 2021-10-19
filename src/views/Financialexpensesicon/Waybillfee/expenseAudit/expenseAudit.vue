<template>
  <div>
    <div class='main'>
      <!--  标签页 -->
      <el-row type='flex' justify='flex-start' class='title' align='middle'>
        <span class='text'>报价审核</span>
      </el-row>
      <!-- 主要内容 -->
      <div class='content'>
        <!-- 组件 -->
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
              width="191"
              :resizable="false"
          >
            <template slot-scope="scoped">
              <el-button type="text" @click="adopt([scoped.row.id])" v-if="scoped.row.audit_status === 1"> 通过</el-button>
              <span style="color: #0084FF; margin: 0px 5px" v-if="scoped.row.audit_status === 1">|</span>
              <el-button type="text" @click="reject= true" v-if="scoped.row.audit_status === 1"> 驳回</el-button>
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
        { prop: 'waybill_no', label: '安速单号', width: '176', align: 'center' },
        { prop: 'customer_name', label: '客户名称', width: '193', align: 'center' },
        { prop: 'customer_code', label: '客户编号', width: '80', align: 'center' },
        { prop: 'audit_status', label: '审核状态', width: '94', align: 'center', formatter: this.formatter },
        { prop: 'waybill_type', label: '运单类型', width: '106', align: 'center', formatter: this.formatter },
        { prop: 'cargoes_num', label: '货件数量', width: '106', align: 'center' },
        { prop: 'remark', label: '备注', width: '106', align: 'center' },
        { prop: 'interior_remark', label: '内部备注', width: '106', align: 'center' }
      ],
      tableData: [],
      page: {
        pageNo: 1,
        limit: 10,
        sizes: [10, 50, 100],
        total: 0
      },
      formData: {
        failReason: ''
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.$api.finance.fare.audit.lists({
        page: this.page.pageNo,
        limit: this.page.limit
      }).then(res => {
        this.tableData = res.data.list
        this.page.total = res.data.total
      })
    },
    // 重新渲染name列
    formatter (row, column, cellValue) {
      switch (column.property) {
        case 'audit_status':
          return row.audit_status === 1 ? '审核中' : row.audit_status === 2 ? '审核通过' : '审核驳回'
        case 'waybill_type':
          return row.waybill_type === 1 ? 'FBA运单' : '非FBA运单'
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
    adopt (auditIds) {
      this.$api.finance.fare.audit.adopt(auditIds).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg) // 成功提示
          this.getData()
        } else {
          this.$message.error(res.msg) // 错误提示
        }
      })
    },
    fail (auditIds) {
      this.$api.finance.fare.audit.fail({
        auditIds: auditIds,
        failReason: this.formData.failReason
      }).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg) // 成功提示
          this.getData()
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
