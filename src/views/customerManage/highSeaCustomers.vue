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

        <div class="table">
          <el-table ref="multipleTable" :data="tableData" border  tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange"
            :header-cell-style="{background: '#F5F5F6'}">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column  prop="name"  label="客户名称"  width="289"> </el-table-column>
            <el-table-column  prop="address"  label="客户地址"  width="707"></el-table-column>
            <el-table-column fixed="right" label="操作" min-width="169">
              <template slot-scoped="scoped">
                <el-button type="text" @click="dialogVisible =true"> 转入私海
                </el-button>
                <span style="color: #0084FF; margin: 0px 5px">|</span>
                <el-button v-if="activeName === '1'" type="text" @click="stopAgentis = true">
                  指派业务
                </el-button>
              </template>
            </el-table-column>
          </el-table>

          <!-- 分页 -->
          <div class='block'>
            <el-pagination
              :current-page.sync='currentPage'
              :pager-count='9'
               :page-size='pageSize'
               :page-sizes='[10, 20, 50, 100]'
              layout='total, sizes, prev, pager, next, jumper'
              :total='150'>
              </el-pagination>
          </div>
        </div>
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
      activeName: '1', // 标签绑定

      pageSize: 10,
      currentPage: 1,
      total: 50,
      a: 1,
      b: 9,

      agentName: '',
      agentCode: '',
      agentAccount: '',
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小花',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  },
  methods: {
    add () {
      this.$router.push({ name: 'addcustomerh' })
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
    }
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

</style>
