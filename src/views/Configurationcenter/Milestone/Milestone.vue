<template>
  <div>
  <div class="left">
          <el-row type='flex'  class='title' align='middle'>
          <span class='text'>海运里程碑</span>
          </el-row>
         <span class='text'>空运里程碑</span>
         <br><br>
          <span class='text'>快件里程碑</span>
          <br><br>
          <span class='text'>铁路里程碑</span>
          <br><br>
          <span class='text'>专车里程碑</span>

  </div>
      <!--  标签页 -->
      <div class="right">
      <div class="top">
      <el-row type='flex' justify='flex-start' class='title' align='middle'>
      <span class='text'>里程碑配置</span>
       <el-tabs v-model='activeName' type='card'>
        <el-tab-pane label='港前状态' name='1'></el-tab-pane>
        <el-tab-pane label='港后状态' name='2'></el-tab-pane>
        <el-tab-pane label='派件' name='3'></el-tab-pane>
        <el-tab-pane label='全部' name='4'></el-tab-pane>
      </el-tabs>
     </el-row>
      </div>
      <!-- 主要内容 -->
     <div class='content'>
      <!-- 搜索栏 -->
        <div class='content'>
        <el-row class='searchbox1'>
          <el-col :span='14' class='colbox'>
            <el-col :span='4'>
              <span class='text'>客户编码</span>
            </el-col>
            <el-col :span='8'>
              <el-input v-model='predictionNo' placeholder='请输入'></el-input>
            </el-col>
          </el-col>
          <el-col :span='8' class='colbox'>
            <el-button class='orangeBtn long1'>查 询</el-button>
          </el-col>
         <el-button class='wuBtn long1'>新建状态 </el-button>
        </el-row>
       </div>
       <!-- 表格 -->
       <div>
        <div class="table">
          <el-table ref="multipleTable" :data="tableData" border  tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange"
            :header-cell-style="{background: '#F5F5F6'}">
            <el-table-column  prop="name"  label="名称"  width="427"> </el-table-column>
             <el-table-column  prop="name"  label="状态"  width="461"> </el-table-column>
            <el-table-column fixed="right" label="操作" min-width="112">
              <template slot-scoped="scoped">
                <el-button type="text" @click="dialogVisible =true"> 修改</el-button>
                <span style="color: #0084FF; margin: 0px 5px">|</span>
                <el-button  type="text" @click="equipment"> 删除 </el-button>
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
    </div>
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
      predictionNo: '',
      tableData: [
        {
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          name: '王小花',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  },
  methods: {
    equipment () {
      this.$router.push({ name: 'equipment' })
    },
    warehouse () {
      this.$router.push({ name: 'warehouses' })
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
/deep/ .input{
  height: 90px;
}
/deep/ .title{
 height: 56px;
 font-size: 16px;
}
.right{
  float: left;
  width: 1056px;
background: #FFFFFF;
border-radius: 4px;
border: 1px solid #E8E8E8;
}
.left{
  float: left;
  width: 124px;
  height: 616px;
  background: #FFFFFF;
border-radius: 4px;
border: 1px solid #E8E8E8;
}

</style>
