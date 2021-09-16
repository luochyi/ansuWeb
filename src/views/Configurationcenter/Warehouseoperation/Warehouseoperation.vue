<template>
  <div>
    <!--  标签页 -->
    <el-row type='flex' justify='flex-start' class='title' align='middle'>
      <span class='text'>仓库操作员</span>
    </el-row>
    <!-- 主要内容 -->
    <div class='content'>
      <!-- 搜索栏 -->
     <div class='content'>
        <el-row class='searchbox1'>
          <el-col :span='10' class='colbox'>
            <el-col :span='4'>
              <span class='text'>操作名称</span>
            </el-col>
            <el-col :span='6'>
              <el-input v-model='predictionNo' placeholder='请输入'></el-input>
            </el-col>
          </el-col>
          <el-col :span='10' class='colbox'>
            <el-col :span='4'>
              <span class='text'>所属仓库</span>
            </el-col>
            <el-col :span='6'>
              <el-input v-model='customerCode' placeholder='请输入'></el-input>
            </el-col>
          </el-col>
            <el-col :span='4'>
              <span class='text'>账号状态</span>
            </el-col>
            <el-col :span='4'>
           <el-select v-model="value" placeholder="请选择">
         <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
         </el-option>
         </el-select>
          </el-col>
          <el-col :span='8' class='colbox'>
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
            <el-table-column  prop="name"  label="仓库操作员"  width="110"> </el-table-column>
             <el-table-column  prop="position"  label="职位"  width="91"> </el-table-column>
               <el-table-column  prop="Responsible"  label="负责仓库"  width="122"> </el-table-column>
               <el-table-column  prop="Warehouse"  label="所属仓库"  width="457"> </el-table-column>
               <el-table-column  prop="person"  label="仓库负责人"  width="101"> </el-table-column>
               <el-table-column  prop="status"  label="账号状态"  width="82"> </el-table-column>
            <el-table-column fixed="right" label="操作" min-width="170">
              <template slot-scoped="scoped">
                <el-button type="text" @click="Responsible "> 负责仓库</el-button>
                <span style="color: #0084FF; margin: 0px 5px">|</span>
                <el-button  type="text" @click="person"> 设为负责人 </el-button>
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
          name: '王小虎',
          Warehouse: '上海市普陀区金沙江路 1518 弄'
        },
        {
          name: '王小虎',
          addrWarehouseess: '上海市普陀区金沙江路 1517 弄'
        },
        {
          name: '王小虎',
          Warehouse: '上海市普陀区金沙江路 1519 弄'
        },
        {
          name: '王小花',
          Warehouse: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  },
  methods: {
    Responsible () {
      this.$router.push({ name: 'Responsible' })
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

</style>
