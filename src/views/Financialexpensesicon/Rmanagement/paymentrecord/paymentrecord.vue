<template>
  <div>
    <div class='main'>
      <!--  标签页 -->
      <el-row type='flex' justify='flex-start' class='title' align='middle'>
        <span class='text'>来款记录</span>
      </el-row>
      <!-- 主要内容 -->
      <div class='content'>
        <el-row class='searchbox1'>
          <el-col :span='6' class='colbox'>
            <el-col :span='6'>
              <span class='text'>来款客户</span>
            </el-col>
            <el-col :span='12'>
              <el-input v-model="search.customerName"></el-input>
            </el-col>
          </el-col>
          <el-col :span='6' class='colbox'>
            <el-button class='orangeBtn long1' @click="getData">查 询</el-button>
            <el-button class='wuBtn long1' @click="searchReset">重 置</el-button>
            <!-- <el-button class='wuBtn long1'>展 开</el-button> -->
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row class='tableBtn'>
          <el-col :span='10' class="left">
            <el-button class='stopBtn' @click="dialogShow=true">批量导入来款</el-button>
          </el-col>
          <el-col :span='10' class='right'>
            <el-button class='whiteBtn' @click="showAdd">新增来款登记</el-button>
            <!-- <el-button class='whiteBtn'>查询条件设置</el-button>
            <el-button class='whiteBtn'>列表显示设置</el-button> -->
          </el-col>
        </el-row>
        <br>
        <!-- 组件 -->
        <commonTable
            :columns="columns"
            :data="tableData"
            :selection="selection"
            :pager="page"
            @handleSizeChange="handleSizeChange"
            @handleCurrentChange="handleCurrentChange"
        >
          <el-table-column
              slot="table_oper"
              align="center"
              fixed="right"
              label="操作"
              width="170"
              :resizable="false"
          >
            <template slot-scope="scoped">
              <!-- <el-button type="text" @click="detailspage"> 修改</el-button> -->
              <!-- <span style="color: #0084FF; margin: 0px 5px">|</span> -->
              <el-button type="text" @click="confirm([scoped.row.id])" v-if="scoped.row.is_confirm===0"> 确认来款</el-button>
              <span style="color: #0084FF; margin: 0px 5px" v-if="scoped.row.is_confirm===0">|</span>
              <el-button type="text" @click="deleted(scoped.row.id)" v-if="scoped.row.is_confirm===0"> 删除</el-button>
            </template>
          </el-table-column>
        </commonTable>
      </div>
    </div>
    <el-dialog
      title="来款登记"
      :visible.sync="dialogVisible"
      width="20%"
      :before-close="handleClose">
      <div class="diaContent">
        <el-form label-position="right" label-width="80px" :model="form">
          <el-form-item label="来款金额">
            <el-input v-model="form.amount"></el-input>
          </el-form-item>
          <el-form-item label="来款渠道">
            <el-input v-model="form.channel"></el-input>
          </el-form-item>
          <el-form-item label="来款时间">
            <el-date-picker
              v-model="form.amountAt"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="来款客户">
            <el-select v-model="form.customerId" filterable placeholder="请选择">
              <el-option
                  v-for="item in customers"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="add">提 交</el-button>
        <!-- <el-button type="primary" @click="editSubmit" v-else>提交修改</el-button> -->
      </span>
    </el-dialog>
    <!-- 导入 -->
    <el-dialog
    style="textAlign:left "
      title="导入来款记录"
      :visible.sync="dialogShow"
      width="30%"
      :before-close="excelClose">
      <div >
        <el-row style="margin:20px">
          <el-upload
          class="upload-demo"
          :headers="uploadhead"
          :action="`${$baseUrl}/file/upload/file`"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :on-success="handleAvatarSuccess"
          name="file"
          multiple
          :limit="1"
          :on-exceed="handleExceed"
          :file-list="fileList">
          <el-button size="mini"  type="primary">上传Excel</el-button>
        </el-upload>
        </el-row>
        <el-row class="diabox2">
          <span @click="download">下载Excel模板</span>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogShow = false">取 消</el-button>
        <el-button type="primary" @click="importOk">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selection: false,
      uploadhead: {
        'Ansuex-Manage-Token': sessionStorage.getItem('token')
      },
      path: '',
      fileList: [],
      templatePath: '',
      dialogVisible: false,
      dialogShow: false,
      id: null,
      form: {
        amount: null,
        channel: '',
        amountAt: '',
        customerId: null
      },
      columns: [
        { prop: 'channel', label: '收款渠道', width: '100', align: 'center' },
        { prop: 'amount', label: '来款金额', width: '117', align: 'center' },
        { prop: 'is_confirm', label: '来款状态', width: '100', align: 'center', formatter: this.formatter },
        { prop: 'customer_name', label: '来款客户', width: '214', align: 'center' },
        { prop: 'customer_code', label: '客户编码', width: '130', align: 'center' },
        { prop: 'user_name', label: '操作人', width: '100', align: 'center' },
        { prop: 'amount_at', label: '来款时间', width: '184', align: 'center', formatter: this.formatter },
        { prop: 'created_at', label: '登记时间', align: 'center', formatter: this.formatter }
      ],
      tableData: [],
      page: {
        pageNo: 1,
        limit: 10,
        sizes: [15, 50, 100],
        total: 0
      },
      customers: [],
      search: {
        customerName: null
      }
    }
  },
  mounted () {
    this.getData()
    this.customerSelect()
    this.getTemplate()
  },
  methods: {
    getTemplate () {
      this.$api.setting.template.lists(2).then(res => {
        if (res.data && res.data.length > 0) {
          this.templatePath = res.data[0].path
        }
      })
    },
    download () {
      // 下载模板
      window.location.href = this.$api.file.cdnPath(this.templatePath)
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleAvatarSuccess (res, file) {
      this.path = res.data.path // 上传成功的回调函数
    },
    excelClose () {
      this.dialogShow = false
    },
    handleClose () {
      this.dialogVisible = false
      this.form = {
        amount: null,
        channel: '',
        amountAt: '',
        customerId: null
      }
    },
    customerSelect () {
      this.$api.customer.customerSelect().then(res => {
        this.customers = res.data
      })
    },
    showAdd () {
      this.dialogVisible = true
    },
    add () {
      this.$api.finance.charge.payment.add({
        amount: Number(this.form.amount),
        channel: this.form.channel,
        amountAt: this.form.amountAt,
        customerId: Number(this.form.customerId)
      }).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg)
          this.getData()
          this.handleClose()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 导入提交
    importOk () {
      // /finance/charge/payment/import
      this.$api.finance.charge.payment.paymentimport({ path: this.path }).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg)
          this.dialogShow = false
          this.getData()
        } else {
          this.$message.error(res.msg)
        }
      })
      this.getData()
    },
    getData () {
      this.$api.finance.charge.payment.lists({
        customerName: this.search.customerName,
        page: this.page.pageNo,
        limit: this.page.limit
      }).then(res => {
        this.tableData = res.data.list
        this.page.total = res.data.total
      })
    },
    searchReset () {
      this.search.customerName = null
    },
    confirm (incomingIds) {
      this.$api.finance.charge.payment.confirm(incomingIds).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg) // 成功提示
          this.getData()
        } else {
          this.$message.error(res.msg) // 错误提示
        }
      })
    },
    deleted (incomingId) {
      this.$api.finance.charge.payment.deleted(incomingId).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg) // 成功提示
          this.getData()
        } else {
          this.$message.error(res.msg) // 错误提示
        }
      })
    },
    detailspage () {
      this.$router.push({ name: 'detailspage' })
    },
    handleClick (val) {
      console.log(val)
    },
    // 重新渲染name列
    formatter (row, column, cellValue) {
      switch (column.property) {
        case 'is_confirm':
          return row.is_confirm === 1 ? '已确认' : '未确认'
        case 'amount_at':
          return this.formatDate(row.amount_at, 'yyyy-MM-dd hh:mm:ss')
        case 'created_at':
          return this.formatDate(row.created_at, 'yyyy-MM-dd hh:mm:ss')
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
    // 操作按钮列表
    editTableData (row) {}
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
/deep/.el-date-editor.el-input, .el-date-editor.el-input__inner{
  width: 200px;
}

.diaContent{
  /deep/.el-input__inner{
  width: 200px;
}
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
.diabox2{
border-top:1px solid #E8EBF2;
padding-top: 20px;
  span{
    color: #0091FF;
    cursor: pointer;
  }
  div{
    color:#FF4D4F;
  }
}
</style>
