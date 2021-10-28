<template>
  <div>
    <!--  标签页 -->
    <el-row type='flex' justify='flex-start' class='title' align='middle'>
      <span class='text'>结算账期</span>
    </el-row>
    <!-- 主要内容 -->
    <div class='content'>
      <!-- 搜索栏 -->
      <el-row  class='searchbox1'>
        <el-col :span='2' class='colboxx justify-center'>
          <el-button @click="Newaccounting" class='orangeBtn long3'> 新增账期</el-button>
        </el-col>
      </el-row>
      <!-- 表格 -->
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
        width="126"
        :resizable="false"
        >
        <template slot-scope="scope">
          <el-button type="text" @click="toDetail(scope.row)"> 修改</el-button>
          <span style="color: #0084FF; margin: 0px 5px">|</span>
            <el-button type="text" @click="delet(scope.row.id)"> 删除</el-button>
        </template>
      </el-table-column>
      </commonTable>
    </div>
    <el-dialog :title="digTitle" :visible.sync="diaShow" :before-close="addClose" width="30%">
      <div class="input">
        <el-row>
          <span>账期名称&nbsp;<el-input
                            v-model="name"
                            style="width: 190px"
                            placeholder="请输入账期名称"
                        ></el-input
                        ></span>
        </el-row>
        <el-row style="marginTop:20px">
          <span>账&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期&nbsp;<el-input
                            v-model="period_Day"
                            style="width: 190px"
                            placeholder="请输入账期"
                        ></el-input
                        ></span>

        </el-row>
      </div>
      <span slot="footer" class="department-footer">
        <el-button @click="addClose" class="wuBtn">取 消</el-button>
        <el-button type="primary" @click="addSubmit()" class="orangeBtn"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dialogVisible: false,
      diaShow: false,
      digTitle: '',
      name: '',
      period_Day: null,
      type: '',
      periodId: null,
      pageSize: 10,
      currentPage: 1,
      total: 0,

      agentName: '', // 代理名称
      agentCode: '', // 代理编码
      agentAccount: '', // 代理账期
      columns: [
        { prop: 'name', label: '账期名称', align: 'center' },
        { prop: 'period', label: '账期', width: '600', align: 'center', formatter: this.formatter },
        { prop: ' type', label: '类型', align: 'center', formatter: this.formatters }
      ],
      tableData: [],
      page: {
        pageNo: 1,
        limit: 10,
        sizes: [1, 5, 10],
        total: 0
      }

    }
  },
  mounted () {
    this.getData()
    console.log(this.$store.state.common.regiondata)
  },
  methods: {
    // 获取表格数据
    getData () {
      this.tableData = []
      let params = {
        page: this.page.pageNo,
        limit: this.page.limit
      }
      this.$api.configure.periodLists(params).then((res) => {
        console.log(res)
        res.data.list && res.data.list.forEach(ele => {
          let obj = {
            id: ele.id,
            name: ele.name,
            period: ele.period,
            type: ele.type
          }
          this.tableData.push(obj)
          this.page.total = res.data.total
        })
      })
    },
    // 新增
    Newaccounting () {
      this.diaShow = true
      this.digTitle = '新增账期'
    },
    // 改变页面大小处理
    handleSizeChange (val) {
      this.page.limit = val
      this.getData()
    },
    addSubmit () {
      if (this.digTitle === '新增账期') {
        let params = {
          name: this.name,
          periodDay: Number(this.period_Day) // warnDay只能为数字
        }
        this.$api.configure.periodAdd(params).then((res) => {
          if (res.code === 0) {
            this.$message.success(res.msg)
            this.getData()
            this.addClose()
          } else {
            this.$message.error(res.msg)
            this.addClose()
          }
        })
      } else if (this.digTitle === '修改账期') {
        let params = {
          periodId: this.periodId,
          name: this.name,
          periodDay: Number(this.period_Day)
        }
        this.$api.configure.periodEdit(params).then((res) => {
          if (res.code === 0) {
            this.$message.success(res.msg)
            this.getData()
            this.addClose()
          } else {
            this.$message.error(res.msg)
            this.addClose()
          }
        })
      }
    },
    // 关闭新增弹窗
    addClose () {
      this.diaShow = false
      // 清空表单
      this.name = null
      this.period_Day = null
    },
    // 修改
    toDetail (data) {
      this.name = data.name
      this.period_Day = data.period
      this.periodId = data.id
      this.diaShow = true
      this.digTitle = '修改账期'
    },
    // 删除
    delet (id) {
      this.$confirm('删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.configure.periodDel({ periodId: id }).then(res => {
          if (res.code === 0) {
            this.$message.success(res.msg)
            this.getData()
          } else {
            this.$message.error(res.msg)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleSelectionChange (val) {
      console.log(val)
      this.chooseArr = []
      val && val.forEach((item) => {
        this.chooseArr.push(item)
      })
    },
    handleClose () {
      this.currencyName = ''
      this.editId = null
      this.dialogVisible = false
    },
    // 翻页处理
    handleCurrentChange (val) {
      this.page.pageNo = val
      this.getData()
    },
    // 重新渲染name列
    // formatter (row, column, cellValue) {
    //   return row.period + '天'
    // },
    // 重新渲染name列
    formatters (row, column, cellValue) {
      return row.type + '月'
    },
    // 操作按钮列表
    editTableData (row) {}
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

}
.title .text{
    width: 250px;
    text-align:left;
    margin: 17px;
}
.title .texta{
    width: 250px;
    text-align:left;
    margin: 32px;
    color:#FB4702 ;
    font-size: 18px;
    line-height: 25px;
    font-family: PingFangSC-Semibold, PingFang SC;
}
/deep/ .el-dialog{
  text-align: left;
}
//biankuang

/deep/ .input{
  height: 80px;
}
/deep/ .title{
 height: 56px;
 font-size: 16px;
}
.searchbox1 .colbox .text {
    width: 90px;
}
.colbox{
    width: 300px;
}
.colboxa {
width: 200px;
}

</style>
