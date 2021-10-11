<template>
  <div>
    <!--  标签页 -->
    <el-row type='flex' justify='flex-start' class='title' align='middle'>
      <span class='text'>公海客户</span>
    </el-row>
    <!-- 主要内容 -->
    <div class='content'>
      <!-- 搜索栏 -->
      <el-row  class='searchbox1'>
        <!-- 客户名称 -->
        <el-col :span='6' class='colbox'>
          <span class='text'>客户名称</span>
          <el-col :span='16'>
            <el-input v-model='agentName' placeholder='请输入'></el-input>
          </el-col>
        </el-col>
        <!--  -->
        <el-col :span='6' >
          <el-button class='orangeBtn long1'>查 询</el-button>
          <el-button class='wuBtn long1'>重 置</el-button>
        </el-col>
        <el-col :span='12' >
          <el-button @click="add" class='orangeBtn long2'>⊕ 添加客户</el-button>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <div>
        <el-row class='searchbox1' type='flex' justify='space-between' align='middle'>
          <el-col :span='12' class="left">
            <el-button class='batch' @click=" intois =true">批量转入私海</el-button>
            <el-button class='batch' @click="batchStopis = true">批量指派客户</el-button>
          </el-col>
        </el-row>
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
        width="239"
        :resizable="false"
      >
         <template slot-scoped="scoped">
                <el-button type="text" @click="dialogVisible =true"> 转入私海
                </el-button>
                <span style="color: #0084FF; margin: 0px 5px">|</span>
                <el-button v-if="activeName === '1'" type="text" @click="stopAgentis = true">
                  指派业务
                </el-button>
                 <span style="color: #0084FF; margin: 0px 5px">|</span>
                <el-button v-if="activeName === '1'" type="text" @click="Deletecustomer = true">
                  删除客户
                </el-button>
              </template>
      </el-table-column>
    </commonTable>
      </div>

    </div>
   <!-- 转入私海弹窗 -->
            <el-dialog title="转入私海" :visible.sync="dialogVisible " width="30%">
               <div class="input">
               <span>是否将客户“深圳市沙马家居有限公司”转入私海客户</span>
               </div>
               <span slot="footer" class="dialogVisible -footer">
                 <el-button @click="dialogVisible  = false" class='wuBtn'>取 消</el-button>
                 <el-button type="primary" @click="dialogVisible  = false" class='orangeBtn'>确 定</el-button>
               </span>
            </el-dialog>
   <!-- 指派业务 -->
   <el-dialog title="指派业务" :visible.sync="stopAgentis" width="30%">
               <div class="input">
               <br><span>是否将客户“深圳市沙马家居有限公司”指派给业务员</span><br>
               <br>
               <span>业务员&nbsp;    <el-select v-model="agentName" size="small" placeholder="请选择业务员"></el-select></span>
               </div>
               <span slot="footer" class="stopAgent-footer">
                 <el-button @click="stopAgentis = false" class='wuBtn'>取 消</el-button>
                 <el-button type="primary" @click="stopAgentis = false" class='orangeBtn'>确 定</el-button>
               </span>
            </el-dialog>
            <!-- 删除客户 -->
   <el-dialog title="删除客户" :visible.sync="Deletecustomer" width="30%">
               <div class="input">
               <span><i class="el-icon-circle-close"></i>您确认要删除公海客户
                 <br>“深圳雷迈科技有限公司吗？”</span>
               </div>
               <span slot="footer" class="Deletecustomer-footer">
                 <el-button @click="Deletecustomer = false" class='wuBtn'>返回</el-button>
                 <el-button type="primary" @click="Deletecustomer = false" class='orangeBtn'>确认删除</el-button>
               </span>
            </el-dialog>
   <!-- 批量转入私海 -->
     <el-dialog title="转入私海" :visible.sync="intois" width="30%">
               <div class="input">
               <span>是否批量将这34个客户转入私海客户</span>
               </div>
               <span slot="footer" class="into-footer">
                 <el-button @click="intois = false" class='wuBtn'>取 消</el-button>
                 <el-button type="primary" @click="intois = false" class='orangeBtn'>确 定</el-button>
               </span>
            </el-dialog>
            <!-- 批量指派业务 -->
            <el-dialog title="指派业务" :visible.sync="batchStopis" width="30%">
               <div class="input">
               <br><span>是否批量将这34个客户指派给业务员</span><br>
               <br>
               <span>业务员&nbsp;&nbsp;<el-select v-model="agentName" size="small" placeholder="请选择业务员"></el-select></span>
               </div>
               <span slot="footer" class="batchStop-footer">
                 <el-button @click="batchStopis = false" class='wuBtn'>取 消</el-button>
                 <el-button type="primary" @click="batchStopis = false" class='orangeBtn'>确 定</el-button>
               </span>
            </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dialogVisible: false, // 对话框可见
      intois: false,
      stopAgentis: false,
      batchStopis: false,
      Deletecustomer: false,
      activeName: '1', // 标签绑定
      chooseArr: [],
      agentName: '',
      agentCode: '',
      agentAccount: '',
      name: '',
      columns: [
        { prop: 'name', label: '客户名称', width: '218', align: 'center' },
        { prop: 'contact', label: '客户联系人', width: '94', align: 'center' },
        { prop: 'number', label: '客户联系电话', width: '117', align: 'center' },
        { prop: 'address', label: '客户地址', align: 'center' }
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
    // 获取列表数据
    getData () {
      // 初始的表格数据清空
      this.tableData = []
      // limit: this.page.limit, page: this.page.pageNo 页码和页容量
      this.$api.customer.publicLists({ limit: this.page.limit, page: this.page.pageNo, name: '' }).then(res => {
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
    // 添加客户
    add () {
      this.$router.push({ name: 'add' })
    },
    handleClose (done) {
      this.$confirm('确认转入')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    stopAgent (done) {
      this.$confirm('确认转入')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    into (done) {
      this.$confirm('确认转入')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    batchStop (done) {
      this.$confirm('确认转入')
        .then(_ => {
          done()
        })
        .catch(_ => {})
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
<style lang="scss" scoped>
/deep/ .searchbox1{
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
    padding: 10px 15px;
    border-top:1px solid rgba(0, 0, 0, 0.06);
    border-bottom:1px solid rgba(0, 0, 0, 0.06);
}
/deep/ .el-dialog__header {
    padding: 10px 10px ;
}
/deep/ .el-dialog__footer{
  padding: 5px 10px ;
}
/deep/ .input{
  height: 90px;
}
/deep/ .title{
 height: 56px;
 font-size: 16px;
}
.el-icon-circle-close{
 width: 66px;
  height: 58px;
  font-size: 58px;
  color: #FB4702;
}
</style>
