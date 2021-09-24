<template>
  <div>
    <!--  标签页 -->
    <el-row type='flex' justify='flex-start' class='title' align='middle'>
       <span class='text'>业务员账号</span>
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
          <el-col :span='6' class='colbox'>
            <el-col :span='6'>
              <span class='text'>姓名</span>
            </el-col>
            <el-col :span='16'>
              <el-input v-model='predictionNo' placeholder='请输入'></el-input>
            </el-col>
          </el-col>
          <el-col :span='6' class='colbox'>
            <el-col :span='6'>
              <span class='text'>运单号</span>
            </el-col>
           <el-select v-model="value" placeholder="请选择">
         <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
         </el-option>
         </el-select>
          </el-col>
          <el-col :span='6' class='colbox'>
            <el-col :span='6'>
              <span class='text'>角色</span>
            </el-col>
            <el-select v-model="valuea" placeholder="请选择">
         <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
         </el-option>
         </el-select>
          </el-col>
          <el-col :span='6' class='colbox'>
            <el-col :span='8'>
              <span class='text'>员工手机</span>
            </el-col>
            <el-col :span='16'>
              <el-input v-model='customerCode' placeholder='请输入'></el-input>
            </el-col>
          </el-col>
         </el-row>
         <!--  -->
         <el-row class='searchbox1'>
          <el-col :span='6' class='colbox'>
            <el-col :span='6'>
              <span class='text'>开户人</span>
            </el-col>
            <el-col :span='16'>
              <el-input
                v-model='predictionChannel'
                placeholder='请输入'
              ></el-input>
            </el-col>
          </el-col>
          <el-col :span='6' class='colbox'>
            <el-button class='orangeBtn long1'>查 询</el-button>
            <el-button class='wuBtn long1'>重 置</el-button>
          </el-col>
        </el-row>
     </div>
      <!-- 表格 -->
      <div>
        <el-row class='searchbox1' type='flex' justify='space-between' align='middle'>
          <el-col :span='12' class="left">
            <el-button v-if ="activeName === '1'" class='batch' @click=" deactivation = true">批量停用</el-button>
            <el-button v-if ="activeName === '2'" class='batch' @click=" enable">批量启用</el-button>
        </el-col>
        <el-col :span='12' class="right">
          <el-button @click="employeeaccounta" class='orangeBtn long2' icon="el-icon-circle-plus-outline">新建账号</el-button>
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
        width="238"
        :resizable="false"
        >
        <template slot-scope="scope">
          <el-button type="text" @click="toDetail(scope.row.id)"> 编辑</el-button>
                <span style="color: #0084FF; margin: 0px 5px">|</span>
                <el-button type="text" @click="password= true"> 重置密码 </el-button>
                <span style="color: #0084FF; margin: 0px 5px">|</span>
                <el-button v-if ="activeName === '1'" type="text" @click="stopAgentis= true"> 停用账号 </el-button>
                <el-button v-else-if ="activeName === '2'" type="text" > 启用账号 </el-button>
        </template>
      </el-table-column>
      </commonTable>
    </div>
   <!-- 批量停用 -->
   <el-dialog title="批量停用员工账号" :visible.sync="deactivation" width="30%">
               <div class="input" >
               <br><span><i class="el-icon-circle-check"></i>您是否确认停用这32个员工账号</span><br>
               </div>
               <span slot="footer" class="deactivation-footer">
                 <el-button @click="deactivation = false" class='wuBtn'>取 消</el-button>
                 <el-button type="primary" @click="deactivation = false" class='orangeBtn'>确 定</el-button>
               </span>
            </el-dialog>
               <!-- 停用账号 -->
   <el-dialog title="停用员工代理" :visible.sync="stopAgentis" width="30%">
               <div class="input">
               <br><span><i class="el-icon-circle-check"></i>您是否确认停用“张三”的员工账号</span><br>
               </div>
               <span slot="footer" class="stopAgent-footer">
                 <el-button @click="stopAgentis = false" class='wuBtn'>取 消</el-button>
                 <el-button type="primary" @click="stopAgentis = false" class='orangeBtn'>确 定</el-button>
               </span>
            </el-dialog>
               <!-- 重置密码 -->
   <el-dialog title="重置密码" :visible.sync="password" width="30% " >
               <div class="inputa">
               <br><span>输入密码<el-input placeholder="请输入密码" v-model="input" show-password></el-input></span><br>
               <br>
               <span>确认密码
               <el-input placeholder="请输入密码" v-model="input" show-password></el-input></span>
               </div>
               <span slot="footer" class="password-footer">
                 <el-button @click="password = false" class='wuBtn'>取 消</el-button>
                 <el-button type="primary" @click="password = false" class='orangeBtn'>确 定</el-button>
               </span>
            </el-dialog>
               <!-- 批量停用 -->
   <el-dialog title="批量停用员工账号" :visible.sync="account" width="30%">
               <div class="input">
               <br><span>您是否确认停用这32个员工账号</span><br>
               <br>
               <span>业务员&nbsp;<el-select v-model="agentName" size="small" placeholder="请选择业务员"></el-select></span>
               </div>
               <span slot="footer" class="account-footer">
                 <el-button @click="account = false" class='wuBtn'>取 消</el-button>
                 <el-button type="primary" @click="account = false" class='orangeBtn'>确 定</el-button>
               </span>
            </el-dialog>
  </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 输入框
      name: '', // 姓名
      predictionNo: '',
      Waybill: '', // 运单号
      value: '',
      role: '', // 角色
      valuea: '',
      phone: '', // 员工手机
      customerCode: '',
      holder: '', // 开户人
      predictionChannel: '',
      // 弹框
      deactivation: false, // 批量停用弹框
      stopAgentis: false, // 停用账号
      password: false, // 重置密码
      account: false, // 批量停用
      options: '', // 选择框

      chooseAgent: {}, // 选择停用
      activeName: '1', // 标签绑定

      columns: [
        { prop: 'name', label: '姓名', width: '143', align: 'center' },
        { prop: 'department', label: '部门', width: '157', align: 'center', formatter: this.formatter },
        { prop: 'role', label: '角色', width: '158', align: 'center', formatter: this.formatter },
        { prop: 'account', label: '登陆账号', width: '130', align: 'center', formatter: this.formatter },
        { prop: 'phone', label: '员工手机', width: '144', align: 'center', formatter: this.formatter },
        { prop: 'status', label: '账户状态', width: '123', align: 'center', formatter: this.formatter }
      ],
      tableData: [],
      page: {
        pageNo: 1,
        limit: 1,
        sizes: [1, 5, 10],
        total: 0
      }
    }
  },
  mounted () {
    this.tableData = [
      { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄', button: '<a>11</a>' }
    ]
    this.page.total = 2
  },
  methods: {
    employeeaccounta () {
      this.$router.push({ name: 'employeeaccounta' })
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
    formatters (row, column, cellValue) {
      return row.address + '测试'
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
.adtitile {
  color: #000000a6;
  font-weight: 500;
  font-size: 18px;
  margin-left: -150px;
  margin-bottom: 8px;
}
.elipt {
  width: 287px;
  height: 40px;
  margin: 3px;
  line-height: 40px;
}
.el-input__iconyellow {
  color: #ffbd32ff;
}

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
/deep/ .inputa{
  height: 238px;
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
