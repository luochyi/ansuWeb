<template>
  <div>
    <!--  标签页 -->
    <el-row type='flex' justify='flex-start' class='title' align='middle'>
      <span class='text'>司机管理</span>
    </el-row>
    <!-- 主要内容 -->
    <div class='content'>
      <!-- 搜索栏 -->
     <div class='contenta'>
        <el-row class='searchbox1'>
          <el-col :span='6' class='colbox'>
            <el-col :span='6'>
              <span class='text'>司机名称</span>
            </el-col>
            <el-col :span='16'>
              <el-input v-model='predictionNo' placeholder='请输入'></el-input>
            </el-col>
          </el-col>
          <el-col :span='6' class='colbox'>
            <el-col :span='6'>
              <span class='text'>区域分配</span>
            </el-col>
           <el-select v-model="distribution"  placeholder="请选择">
         <el-option v-for="item in distributionOpts" :key="item.id" :label="item.name" :value="item.id">
         </el-option>
         </el-select>
          </el-col>
          <el-col :span='6' class='colbox'>
            <el-col :span='6'>
              <span class='text'>账号状态</span>
            </el-col>
            <el-select v-model="status" multiple placeholder="请选择">
         <el-option v-for="item in statusOpts" :key="item.id" :label="item.name" :value="item.id"> </el-option>
         </el-select>
          </el-col>
                   <el-col :span='6' class='colbox'>
            <el-button class='orangeBtn long1'>查 询</el-button>
            <el-button class='wuBtn long1'>重 置</el-button>
          </el-col>
         </el-row>
           </div>
      <!-- 表格 -->
      <div>
        <div class="table">
          <el-table ref="multipleTable" :data="tableData" border  tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange"
            :header-cell-style="{background: '#F5F5F6'}">
            <el-table-column  prop="driver"  label="司机"  width="152"> </el-table-column>
             <el-table-column  prop="position"  label="职位"  width="151"> </el-table-column>
              <el-table-column  prop="distribution"  label="区域分配"  width="183"> </el-table-column>
               <el-table-column  prop="City"  label="所属城市"  width="198"> </el-table-column>
            <el-table-column  prop="area"  label="收货区域"  width="198"></el-table-column>
             <el-table-column  prop="status"  label="账号状态"  width="171"> </el-table-column>
            <el-table-column fixed="right" label="操作" min-width="78">
              <template slot-scoped="scoped">
                <el-button type="text" @click="distributions"> 分配区域</el-button>
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
   <!-- 指派业务 -->
   <el-dialog title="指派业务" :visible.sync="stopAgentis" width="30%">
               <div class="input">
               <br><span>是否将客户“深圳市沙马家居有限公司”指派给业务员</span><br>
               <br>
               <span>业务员&nbsp; <el-select v-model="agentName" size="small" placeholder="请选择业务员"></el-select></span>
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
      dialogVisible: false, // 对话框可见
      stopAgentis: false,
      activeName: '1', // 标签绑定

      pageSize: 10,
      currentPage: 1,
      total: 150,
      a: 1,
      b: 9,

      agentName: '',
      agentCode: '',
      agentAccount: '',
      tableData: [
        {
          driver: '王小虎',
          area: '上海市普陀区金沙江路 1518 弄'
        },
        {
          driver: '王小虎',
          area: '上海市普陀区金沙江路 1517 弄'
        },
        {
          driver: '王小虎',
          area: '上海市普陀区金沙江路 1519 弄'
        },
        {
          driver: '王小花',
          area: '上海市普陀区金沙江路 1516 弄'
        }
      ],
      // 选择器
      distribution: '', // 区域分配
      distributionOpts: [{
        id: '选项1',
        name: '已分配区域'
      }, {
        id: '选项2',
        name: '未分配区域'
      }]
    }
  },
  methods: {
    // 区域分配
    distributions () {
      this.$router.push({ name: 'distributions' })
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
.contenta{
  margin: 10px;
}

</style>
