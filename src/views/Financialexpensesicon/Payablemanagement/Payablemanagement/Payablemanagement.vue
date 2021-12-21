<template>
  <div>
    <div class="main">
      <!--  标签页 -->
      <el-row type="flex" justify="flex-start" class="title" align="middle">
        <span class="text">应付账单</span>
      </el-row>
      <!-- 主要内容 -->
      <div class="content">
        <el-row class="searchbox1">
          <el-col :span="6" class="colbox">
            <el-col :span="6">
              <span class="text">代理名称</span>
            </el-col>
            <el-col :span="13">
              <el-input
                placeholder="请输入"
                v-model="search.agentName"
              ></el-input>
            </el-col>
          </el-col>
          <el-col :span="6" class="colbox">
            <el-button class="orangeBtn long1" @click="getData"
              >查 询</el-button
            >
            <el-button class="wuBtn long1" @click="searchReset"
              >重 置</el-button
            >
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row class="tableBtn">
          <el-col :span="10" class="left">
            <el-button class="stopBtn" @click="importBill"
              >导入对账单</el-button
            >
            <!-- <el-button class='stopBtn' @click="changes=true">批量导出Excle</el-button> -->
            <!--            <el-button class='stopBtn' @click="changes=true">批量申请付款</el-button>-->
          </el-col>
        </el-row>
        <br />
        <!-- 组件 -->
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
            width="214"
            :resizable="false"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="deal(scope.row.id)"
                >处理对账结果</el-button
              >
            </template>
          </el-table-column>
        </commonTable>
      </div>
    </div>
    <el-dialog
      title="上传代理对账单"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <div>
        <el-row>
          <el-col
            >对账代理：
            <el-select
              v-model="formData.agentId"
              filterable
              placeholder="请选择"
            >
              <el-option
                v-for="item in agents"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row style="margin: 20px">
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
            :file-list="fileList"
          >
            <el-button size="mini" type="primary">上传Excel</el-button>
          </el-upload>
        </el-row>
        <el-row class="diabox2">
          <span @click="download">下载对账Excel</span>
          <div>请下载对账专用对Excel</div>
          <div>如用其他Excel会发生对账数据错误</div>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <commonDrawer :drawerVrisible="errorShow" drawerSize='50%' :drawerTitle="drawerTitle">
      <div class="dra-content" v-if="!checkFee">
        <!-- 内容区域 -->
        <el-table :data='errorData' v-if="errorData.length">
          <el-table-column prop="agent_waybill_no" label="代理单号"></el-table-column>
          <el-table-column prop="waybill_no" label="安速单号"></el-table-column>
          <el-table-column prop="error" label="错误说明"></el-table-column>
        </el-table>
        <el-table :data='agentData' v-else>
          <el-table-column prop="agent_waybill_no" label="代理单号" width="120"></el-table-column>
          <el-table-column prop="waybill_no" label="安速单号" width="170"></el-table-column>
          <el-table-column prop="country" label="国家"></el-table-column>
          <el-table-column prop="zip_code" label="邮编"></el-table-column>
          <el-table-column prop="service_name" label="费用类型"></el-table-column>
          <el-table-column prop="cargo_num" label="件数"></el-table-column>
          <el-table-column prop="weight" label="重量"></el-table-column>
          <el-table-column prop="unit_price" label="单价"></el-table-column>
          <el-table-column prop="amount" label="金额"></el-table-column>
          <el-table-column prop="channel_name" label="渠道名称"></el-table-column>
          <el-table-column prop="agent_date" label="日期"></el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="180">
            <template slot-scope="scope">
              <el-button @click="check(scope.row)" type="text" size="small">查看费用</el-button>
              <el-button type="text" @click="addFee()" size="small">追加费用</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-else class="dra-content">11</div>
      <!-- 抽屉底部按钮 -->
      <div slot="footer">
        <!-- <button class="btn-orange" @click="submit()">
          <span> <i class="el-icon-circle-check"></i>提交</span>
        </button> -->
        <button class="btn-gray" @click="errorShow=false" v-if="checkFee===false">
          <span>关闭</span>
        </button>
        <button class="btn-gray" @click="errClose" v-else>
          <span>返回</span>
        </button>
      </div>
    </commonDrawer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      errorShow: false,
      checkFee: false,
      drawerTitle: '代理对账单检查',
      selection: false,
      uploadhead: {
        'Ansuex-Manage-Token': sessionStorage.getItem('token')
      },
      fileList: [],
      errorData: [],
      agentData: [],
      dialogVisible: false,
      columns: [
        { prop: 'payable_no', label: '账单号', width: '180', align: 'center' },
        {
          prop: 'agent_code',
          label: '代理编号',
          width: '200',
          align: 'center'
        },
        {
          prop: 'agent_name',
          label: '代理名称',
          width: '200',
          align: 'center'
        },
        {
          prop: 'created_at',
          label: '对账时间',
          width: '200',
          align: 'center',
          formatter: this.formatter
        },
        {
          prop: 'agent_bill_amount',
          label: '代理收费',
          width: '200',
          align: 'center'
        },
        {
          prop: 'bill_amount',
          label: '系统代理费用',
          width: '193',
          align: 'center'
        },
        {
          prop: 'customer_bill_amount',
          label: '客户费用',
          width: '193',
          align: 'center'
        },
        {
          prop: 'user_name',
          label: '对账人',
          width: '171',
          align: 'center'
        },
        {
          prop: 'status',
          label: '状态',
          width: '171',
          align: 'center',
          formatter: this.formatter
        }
      ],
      tableData: [],
      page: {
        pageNo: 1,
        limit: 10,
        sizes: [1, 5, 10],
        total: 0
      },
      agents: [],
      formData: {
        agentId: null,
        path: ''
      },
      billAgentIds: [],
      templatePath: '',
      search: {
        agentName: null
      }
    }
  },
  mounted () {
    this.getData()
    this.getAgent()
    this.getTemplate()
  },
  methods: {
    // 获取代理
    getAgent () {
      this.$api.agent.select().then((res) => {
        this.agents = res.data
      })
    },
    searchReset () {
      this.search.agentName = null
    },
    getData () {
      this.$api.finance.payabble.agent
        .lists({
          agentName: this.search.agentName,
          page: this.page.pageNo,
          limit: this.page.limit
        })
        .then((res) => {
          this.tableData = res.data.list
          this.page.total = res.data.total
        })
    },
    getTemplate () {
      this.$api.setting.template.lists(1).then((res) => {
        if (res.data && res.data.length > 0) {
          this.templatePath = res.data[0].path
        }
      })
    },
    detailspage () {
      this.$router.push({ name: 'detailspage' })
    },
    download () {
      // 下载模板
      window.location.href = this.$api.file.cdnPath(this.templatePath)
    },
    // 上传成功的回调函数
    handleAvatarSuccess (res, file) {
      this.formData.path = res.data.path
    },
    submit () {
      // this.$router.push({ name: 'createAccountsReceivable', params: this.formData })
      this.$api.finance.payabble.agent.verify(this.formData).then((res) => {
        console.log(res)
        if (res.data.verify_errors.length) {
          this.errorData = res.data.verify_errors
          this.errorShow = true
        } else if (res.data.check_agent_data.length) {
          this.agentData = res.data.check_agent_data
          this.drawerTitle = '已对账运单'
          this.errorShow = true
        } else {
          this.$router.push({
            name: 'generateBill',
            params: {
              formData: this.formData

            }
          })
        }
      })
    },
    addFee () {
      this.$router.push({ name: 'addFee' })
    },
    check (data) {
      this.$api.finance.payabble.agent.diversityLists({})
      this.checkFee = true
    },
    errClose () {},
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleExceed (files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      )
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    importBill () {
      this.dialogVisible = true
    },
    handleClick (val) {
      console.log(val)
    },
    // 重新渲染name列
    formatter (row, column, cellValue) {
      switch (column.property) {
        case 'created_at':
          return this.formatDate(row.created_at, 'yyyy-MM-dd')
        case 'status':
          return row.status === 1
            ? '未处理'
            : row.status === 1
              ? '已处理'
              : '无'
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
    handleClose (done) {
      this.dialogVisible = false
    },
    // 处理对账单
    deal (id) {
      this.$router.push({ name: 'dealDiversity', params: { payableId: id } })
    }
    // audit (billAgentIds) {
    //   this.$api.finance.payabble.agent.audit(billAgentIds).then((res) => {
    //     if (res.code === 0) {
    //       this.$message.success(res.msg) // 成功提示
    //       this.getData()
    //     } else {
    //       this.$message.error(res.msg) // 错误提示
    //     }
    //   })
    // }
  }
}
</script>

<style lang='scss' scoped>
.sub_title {
  margin: 20px;
}
.diabox2 {
  border-top: 1px solid #e8ebf2;
  padding-top: 20px;
  span {
    color: #0091ff;
    cursor: pointer;
  }
  div {
    color: #ff4d4f;
  }
}
/deep/.el-dialog {
  text-align: left;
}
/deep/ .title {
  height: 56px;
  font-size: 16px;
}
/deep/.el-upload {
  width: 61px;
  color: #0091ff;
}
/deep/ .tableBtn {
  .stopBtn {
    height: 32px;
    line-height: 32px;
    padding: 0px 15px;
    background: #fef4e1;
    border-radius: 4px;

    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.65);
  }
}
</style>
