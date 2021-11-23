<template>
  <div>
    <!--  标签页 -->
    <el-row type='flex' justify='flex-start' class='title' align='middle'>
      <span class='text'>私海客户</span>
    </el-row>
    <!-- 主要内容 -->
    <div class='content'>
      <!-- 搜索栏 -->
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
                <el-form-item label="客户名称" prop="name">
                  <el-input
                    v-model="searchForm.name"
                    placeholder="请输入"
                    clearable
                    :style="{ width: '60%' }"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
             <el-col :span="6">
                <el-form-item label="业务员" prop="salesmanName">
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
      <el-divider></el-divider>
      <!-- 表格 -->
      <div>
        <el-row class='searchbox1' type='flex' justify='space-between' align='middle'>
          <el-col :span='12' class="left">
            <el-button class='stopBtn' @click="changes=true" :disabled='table_row.length===0'>批量转回公海</el-button>
          </el-col>
        </el-row>
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
        width="270"
        :resizable="false"
      >
        <template slot-scope="scope">
                <!-- <el-button type="text" @click="informationis = true"> 修改</el-button> -->
                <!-- <span style="color: #0084FF; margin: 0px 5px">|</span> -->
                <el-button v-if="activeName === '1'" type="text" @click="open(scope.row)">转回公海</el-button>
                <span style="color: #0084FF; margin: 0px 5px">|</span>
                <el-button type="text" class="visi" @click="recordLists(scope.row)"> 拜访记录</el-button>
              </template>
      </el-table-column>
    </commonTable>
      </div>
    </div>
    <!-- 转回公海 -->
    <el-dialog
  title="转回公海"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  <div class="input">
    <br>
  <span>是否将客户{{kehuname}}转回公海客户</span>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false" class='wuBtn'>取 消</el-button>
    <el-button type="primary" @click="toG" class='orangeBtn'>确 定</el-button>
  </span>
</el-dialog>
<!-- 批量转回公海 -->
  <el-dialog title="转回公海" :visible.sync="changes" width="30%" >
  <div class="input">
    <br>
  <span>是否批量将这{{table_row.length}}个客户转入公海客户</span>
  </div>
  <span slot="footer" class="change-footer">
    <el-button @click="changes = false" class='wuBtn'>取 消</el-button>
    <el-button type="primary" @click="allchange" class='orangeBtn'>确 定</el-button>
  </span>
</el-dialog>
<!-- 完善信息 -->
<el-dialog title="完善信息" :visible.sync="informationis" width="30%" height="100px" >
  <div class="input">
               <span>客户联系人&emsp;<el-select v-model="agentName" size="small" placeholder="请选择业务员"></el-select></span><br>
               <br>
               <span>&emsp;联系电话&emsp;<el-select v-model="agentName" size="small" placeholder="请选择业务员"></el-select></span>
               </div>
  <span slot="footer" class="information-footer">
    <el-button @click="informationis = false" class='wuBtn'>取 消</el-button>
    <el-button type="primary" @click="informationis = false" class='orangeBtn'>确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      table_row: [],
      searchForm: {
        salesmanName: '',
        name: ''
      },
      changes: false,
      dialogVisible: false,
      informationis: false,
      activeName: '1', // 标签绑定
      Uid: [],
      kehuname: '',
      agentName: '', // 代理名称
      agentCode: '', // 代理编码
      agentAccount: '', // 代理账期
      name: '',
      columns: [
        { prop: 'name', label: '客户名称', width: '218', align: 'center' },
        { prop: 'contact', label: '客户联系人', width: '94', align: 'center' },
        { prop: 'number', label: '客户联系电话', width: '117', align: 'center' },
        { prop: 'address', label: '客户地址', align: 'center' },
        { prop: 'salesman', label: '业务员', width: '91', align: 'center' }
      ],
      tableData: [],
      page: {
        pageNo: 1, // 当前页码
        limit: 10, // 页容量
        sizes: [1, 5, 10],
        total: 0
      }

    }
  },
  mounted () {
    // 在页面加载前调用获取列表数据函数
    this.getData()
  },
  methods: {
    addcustomerp () {
      this.$router.push({ name: 'addcustomerp' })
    },
    recordLists (data) {
      this.$router.push({ name: 'recordLists', params: { id: data.id, name: data.name } })
    },
    // 获取列表数据
    getData () {
      // 初始的表格数据清空
      this.tableData = []
      // limit: this.page.limit, page: this.page.pageNo 页码和页容量
      this.$api.customer.privateLists({
        limit: this.page.limit,
        page: this.page.pageNo,
        name: this.searchForm.name,
        salesmanName: this.searchForm.salesmanName
      }).then(res => {
        console.log(res.data) // res是接口返回的结果
        res.data.list && res.data.list.forEach(ele => {
          let obj = {
            id: ele.id,
            name: ele.name,
            contact: ele.liaison,
            number: ele.phone,
            address: ele.address
          }
          this.tableData.push(obj)
        })
        this.page.total = res.data.total // 数据总量
      })
    },
    search () {
      this.getData()
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.getData()
    },
    handleSelectionChange (val) {
      val && val.forEach(item => {
        this.table_row.push(item.id)
      })
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
    editTableData (row) {},
    open (data) {
      console.log(data)
      this.Uid = []
      this.Uid.push(data.id)
      this.kehuname = data.name
      this.dialogVisible = true
    },
    handleClose () {
      this.dialogVisible = false
    },
    allchange () {
      this.$api.customer.privatePublic({ customerIds: this.table_row }).then(res => {
        console.log(res)
        if (res.code === 0) {
          this.$message.success(res.msg)
          this.changes = false
          this.getData()
        } else {
          this.$message.success(res.msg)
        }
      })
    },
    toG () {
      // let obj = {
      //   customerIds: this.Uid
      // }
      this.$api.customer.privatePublic({ customerIds: this.Uid }).then(res => {
        console.log(res)
        if (res.code === 0) {
          this.$message.success(res.msg)
          this.dialogVisible = false
          this.getData()
        } else {
          this.$message.success(res.msg)
        }
      })
    }
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
/deep/ .el-dialog{
  text-align: left;
}
//biankuang
/deep/ .el-dialog__body {
    padding: 15px 10px;
    border-top:1px solid rgba(0, 0, 0, 0.06);
    border-bottom:1px solid rgba(0, 0, 0, 0.06);
}
/deep/ .el-dialog__header {
    padding: 10px 10px ;
}
/deep/ .el-dialog__footer{
  padding: 10px 10px ;
}
/deep/ .input{
  height: 80px;
}
/deep/ .title{
 height: 56px;
 font-size: 16px;
}
.elForm{
  text-align: left;
}
.searchBtn{
  position: relative;
  top: 30px;
}
</style>
