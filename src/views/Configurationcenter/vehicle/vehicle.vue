<template>
  <div>
    <!--  标签页 -->
    <el-row type='flex' justify='flex-start' class='title' align='middle'>
      <span class='text'>车辆管理</span>
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
              <span class='text'>司机名称</span>
            </el-col>
            <el-col :span='16'>
              <el-input v-model='predictionNo' placeholder='请输入'></el-input>
            </el-col>
          </el-col>
          <el-col :span='6' class='colbox'>
            <el-col :span='6'>
              <span class='text'>车牌号</span>
            </el-col>
           <el-select v-model="value" placeholder="请选择">
         <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
         </el-option>
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
        <el-row class='searchbox1' type='flex' justify='space-between' align='middle'>
          <el-col :span='12' class="left">
            <el-button v-if ="activeName === '1'" class='batch' @click=" deactivation = true">批量停用</el-button>
            <el-button v-if ="activeName === '2'" class='batch' @click=" enable">批量启用</el-button>
        </el-col>
        <el-col :span='12' class="right">
          <el-button @click="vehicles" class='orangeBtn long2' icon="el-icon-circle-plus-outline">新建车辆</el-button>
        </el-col>
        </el-row>
        <div class="table">
          <el-table ref="multipleTable" :data="tableData" border  tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange"
            :header-cell-style="{background: '#F5F5F6'}">
             <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column  prop="driver"  label="车辆名称"  width="373"> </el-table-column>
             <el-table-column  prop="position"  label="车牌号"  width="102"> </el-table-column>
             <el-table-column  prop="status"  label="账号状态"  width="122"> </el-table-column>
              <el-table-column  prop="distribution"  label="车载数量"  width="154"> </el-table-column>
               <el-table-column  prop="City"  label="车厢大小（米）"  width="205"> </el-table-column>
            <el-table-column fixed="right" label="操作" min-width="131">
              <template slot-scoped="scoped">
                <el-button type="text" @click="edit"> 编辑</el-button>
                 <span style="color: #0084FF; margin: 0px 5px">|</span>
                <el-button v-if="activeName === '1'" type="text" @click="vehicle = true">停用车辆</el-button>
                <el-button v-if="activeName === '2'" type="text" >启用车辆</el-button>
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
       <!-- 批量停用 -->
   <el-dialog title="批量停用车辆" :visible.sync="deactivation" width="30%">
               <div class="input" >
               <br><span><i class="el-icon-circle-check"></i>您是否确认停用这3辆货车</span><br>
               </div>
               <span slot="footer" class="deactivation-footer">
                 <el-button @click="deactivation = false" class='wuBtn'>取 消</el-button>
                 <el-button type="primary" @click="deactivation = false" class='orangeBtn'>确 定</el-button>
               </span>
            </el-dialog>
   <!-- 停用收货车辆 -->
   <el-dialog title="停用收货车辆" :visible.sync="vehicle" width="30%">
               <div class="input">
                <br><span><i class="el-icon-circle-check"></i>您是否确认停用收货车辆“五菱宏光1号车吗？”</span><br>
               </div>
               <span slot="footer" class="vehicle-footer">
                 <el-button @click="vehicle = false" class='wuBtn'>取 消</el-button>
                 <el-button @click="vehicleis = false" class='orangeBtn'>确 定</el-button>
               </span>
            </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dialogVisible: false, // 对话框可见
      activeName: '1', // 标签绑定

      // 分页
      pageSize: 10,
      currentPage: 1,
      total: 150,
      a: 1,
      b: 9,

      // 弹框
      deactivation: false, // 批量停用
      vehicle: false, // 停用车辆

      agentName: '',
      agentCode: '',
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
      ]
    }
  },
  methods: {
    vehicles () {
      this.$router.push({ name: 'vehicles' })
    },
    handleClick (val) {
      console.log(val)
    },
    click (val) {
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
.el-icon-circle-check{
  width: 66px;
  height: 58px;
  font-size: 58px;
  color: #FB4702;
}
</style>
