<template>
  <div>
    <!--  标签页 -->
    <el-row type='flex' justify='flex-start' class='title' align='middle'>
      <span class='text'>材质分类</span>
    </el-row>
    <!-- 主要内容 -->
    <div class='content'>
      <!-- 搜索栏 -->
      <el-row  class='searchbox1'>
        <el-col :span='2' class='colboxx justify-center'>
          <el-button @click="dialogVisible=true;dialogTitile='新增材质'" class='orangeBtn long3'> 新增材质</el-button>
        </el-col>
      </el-row>
      <!-- 表格 -->
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
        width="126"
        :resizable="false"
        >
        <template slot-scope="scope">
          <!-- <el-button type="text" @click="changeDefault(scope.row.id)"> 设置默认</el-button> -->
          <el-button type="text" @click="edit(scope.row)"> 修改</el-button>
        </template>
      </el-table-column>
      </commonTable>
    </div>
    <el-dialog
      :title="dialogTitile"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      材质名称：
      <el-input v-model="currencyName"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addcurrency">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dialogVisible: false,
      dialogTitile: '',
      currencyName: '',
      editId: null,
      activeName: '1', // 标签绑定
      pageSize: 10,
      currentPage: 1,
      total: 0,

      agentName: '', // 代理名称
      agentCode: '', // 代理编码
      agentAccount: '', // 代理账期
      columns: [
        { prop: 'name', label: '材质名称', align: 'center' }
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
  },
  methods: {
    getData () {
      this.$api.setting.material.lists({ page: this.page.pageNo, limit: this.page.limit }).then((res) => {
        this.tableData = res.data.list
        this.page.total = res.data.total
      })
    },
    // handleSelectionChange (val) {
    //   console.log(val)
    //   this.chooseArr = []
    //   val && val.forEach((item) => {
    //     this.chooseArr.push(item)
    //   })
    // },
    // 改变页面大小处理
    handleSizeChange (val) {
      this.page.limit = val
      this.getData()
    },
    edit (data) {
      this.dialogVisible = true
      this.dialogTitile = '修改名称'
      this.editId = data.id
      this.currencyName = data.name
    },
    addcurrency () {
      if (this.dialogTitile === '新增材质') {
        this.$api.setting.material.add({ name: this.currencyName }).then((res) => {
          if (res.code === 0) {
            this.$message.success(res.msg)
            this.getData()
            this.handleClose()
          } else {
            this.$message.error(res.msg)
          }
        })
      } else if (this.dialogTitile === '修改名称') {
        this.$api.setting.material.edit({ name: this.currencyName, materialCateId: this.editId }).then((res) => {
          if (res.code === 0) {
            this.$message.success(res.msg)
            this.getData()
            this.handleClose()
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    handleClose () {
      this.currencyName = ''
      this.editId = null
      this.dialogVisible = false
    },
    changeDefault (id) {
      this.$api.setting.currency.currencyDefault({ currencyId: id }).then((res) => {
        if (res.code === 0) {
          this.$message.success(res.msg)
          this.getData()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    formatter (row) {
      switch (row.is_default) {
        case 1:
          return '是'
        case 0:
          return '否'
        default:
          break
      }
    },
    // 翻页处理
    handleCurrentChange (val) {
      this.page.pageNo = val
      this.getData()
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
