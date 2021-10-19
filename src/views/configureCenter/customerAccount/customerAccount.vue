<template>
  <div>
    <!--  标签页 -->
    <el-row type='flex' justify='flex-start' class='title' align='middle'>
      <span class='text'>客户账号</span>
  <el-tabs v-model='activeName' type='card' @tab-click='handleClick'>
        <el-tab-pane label='启用' name='1'></el-tab-pane>
        <el-tab-pane label='停用' name='2'></el-tab-pane>
      </el-tabs>
    </el-row>
    <!-- 主要内容 -->
    <div class='content'>
      <!-- 搜索栏 -->
     <div class='content'>
        <el-row class='searchbox1'>
          <el-col :span='8' class='colbox'>
            <el-col :span='7'>
              <span class='text'>客户名称</span>
            </el-col>
            <el-col :span='16'>
              <el-input v-model='input' placeholder='请输入'></el-input>
            </el-col>
          </el-col>
          <el-col :span='6' class='colbox'>
            <el-col :span='8'>
              <span class='text'>客户编号</span>
            </el-col>
            <el-col :span='14'>
              <el-input v-model='customerCode' placeholder='请输入'></el-input>
            </el-col>
          </el-col>
          <el-col :span='8' class='colbox'>
            <el-button class='orangeBtn long1'>查 询</el-button>
            <el-button class='wuBtn long1'>重 置</el-button>
          </el-col>
        </el-row>
     </div>
      <!-- 表格 -->
<div>
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
        width="238"
        :resizable="false"
        >
         <template slot-scoped="scoped">
                <el-button type="text" @click="addAccount"> 编辑详情</el-button>
                <span style="color: #0084FF; margin: 0px 5px">|</span>
                <el-button  type="text" @click="password = true"> 重置密码 </el-button>
                <span style="color: #0084FF; margin: 0px 5px">|</span>
                <el-button v-if="activeName === '1'" type="text" @click="stopAgentis = true"> 停用账户 </el-button>
                <el-button v-else-if="activeName === '2'" type="text" > 启用账户 </el-button>
              </template>
       </el-table-column>
       </commonTable>
    </div>

    </div>
   <!-- 重置密码 -->
   <el-dialog title="生成随机密码" :visible.sync="password" width="30%">
               <div class="input">
               <br><span>随机密码：LDKDLJ3432</span><br>
               </div>
               <span slot="footer" class="password-footer">
                 <el-button type="primary" @click="password = false" class='orangeBtn'>复制密码</el-button>
                 <el-button @click="password = false" class='wuBtn'>取 消</el-button>
               </span>
            </el-dialog>
               <!-- 停用账号 -->
   <el-dialog title="停用账号" :visible.sync="stopAgentis" width="30%">
               <div class="input">
               <br><span><i class="el-icon-circle-check"></i>您是否确认停用客户“深圳沙马家具有限公司”的账号</span><br>
               </div>
               <span slot="footer" class="stopAgent-footer">
                 <el-button @click="stopAgentis = false" class='wuBtn'>取 消</el-button>
                 <el-button type="primary" @click="stopAgentis = false" class='orangeBtn'>确 定</el-button>
               </span>
            </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 输入框
      name: '', // 客户名称
      input: '',
      code: '', // 客户编码
      customerCode: '',

      // 分页
      pageSize: 10,
      currentPage: 1,
      total: 150,
      a: 1,
      b: 9,

      dialogVisible: false, // 对话框可见
      stopAgentis: false, // 停用账号
      password: false, // 重置密码
      chooseAgent: {}, // 选择停用
      activeName: '1', // 标签绑定

      agentName: '',
      agentCode: '',
      columns: [
        { prop: 'name', label: '客户名称', width: '289', align: 'center' },
        { prop: 'code', label: '客户编码', width: '216', align: 'center', formatter: this.formatter },
        { prop: 'account', label: '登录账号', width: '209', align: 'center', formatter: this.formatter },
        { prop: 'status', label: '账户状态', width: '128', align: 'center', formatter: this.formatter }
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
    this.tableData = [
      { date: '2016-05-02', name: '王小虎', number: '上海市普陀区金沙江路 1518 弄', Carsize: '<a>11</a>' }
    ]
    this.page.total = 2
  },
  methods: {
    addAccount () {
      this.$router.push({ name: 'addAccount' })
    },
    handleClick (val) {
      console.log(val)
    },
    stopAgent (val) {
      this.stopAgent = true
      this.stopAgent = '停用代理'
      this.chooseAgent = val
      this.$router.push({
        name: 'stopAgent',
        params: { }
      })
    },
    passwordis (val) {
      this.passwordis = true
      this.passwordis = '重置密码'
      this.chooseAgent = val
      this.$router.push({
        name: 'passwordis',
        params: { }
      })
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
    getData () {
      let params = {
        status: Number(this.activeName),
        page: this.currentPage,
        limit: this.pageSize,
        name: this.agentName,
        code: this.agentCode
      }
      this.$api.agent.settingAgentLists(params).then((res) => {
        console.log(res)
      })
    },
    handleSelectionChange (val) {
      console.log(val)
      this.chooseArr = []
      val && val.forEach((item) => {
        this.chooseArr.push(item)
      })
    },
    // 重新渲染name列
    formatter (row, column, cellValue) {
      return row.name + '测试'
    },
    // 改变页面大小处理
    handleSizeChange (val) {

    },
    // 翻页处理
    handleCurrentChange (val) {
      this.tableData = [
        { date: '2016-05-03', name: '王小虎111', address: '上海市普陀区金沙江路 1518 弄' }
      ]
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
.el-icon-circle-check{
  width: 66px;
  height: 58px;
  font-size: 58px;
  color: #FB4702;
}

</style>
