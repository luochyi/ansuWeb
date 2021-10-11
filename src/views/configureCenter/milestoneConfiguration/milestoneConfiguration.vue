<template>
  <div>
  <div class="left" >
      <div class="lefta">
        <el-row type='flex' justify='flex-start' class='title' align='middle'>
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
  </div>
      <!--  标签页 -->
      <div class="right">
      <el-row type='flex' justify='flex-start' class='title' align='middle'>
      <span class='text'>里程碑配置</span>
       <el-tabs v-model='activeName' type='card' @tab-click='handleClick'>
        <el-tab-pane label='港前状态' name='1'></el-tab-pane>
        <el-tab-pane label='港后状态' name='2'></el-tab-pane>
        <el-tab-pane label='派件' name='3'></el-tab-pane>
        <el-tab-pane label='全部' name='4'></el-tab-pane>
      </el-tabs>
     </el-row>
      <!-- 主要内容 -->
     <div class='content'>
      <!-- 搜索栏 -->
        <div class='content'>
        <el-row class='searchbox1'>
          <el-col :span='10' class='colbox'>
            <el-col :span='6'>
              <span class='text'>客户编码</span>
            </el-col>
            <el-col :span='10'>
              <el-input v-model='predictionNo' placeholder='请输入'></el-input>
            </el-col>
          </el-col>
          <el-col :span='4' class='colbox'>
            <el-button class='orangeBtn long1'>查 询</el-button>
          </el-col>
         <el-button @click="status= true" class='whiteBtn'>新建状态 </el-button>
        </el-row>
       </div>
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
        width="112"
        :resizable="false"
        >
        <template slot-scoped="scoped">
          <el-button type="text" @click="modify= true"> 修改</el-button>
                <span style="color: #0084FF; margin: 0px 5px">|</span>
                <el-button type="text" @click="deletea= true"> 删除 </el-button>
        </template>
      </el-table-column>
      </commonTable>
     </div>
      <!-- 新建状态 -->
   <el-dialog title="新建状态" :visible.sync="status" width="30%">
               <div class="input">
               <span>名称<el-input v-model="input" style="width:190px" placeholder="请输入状态名称"></el-input></span>
               <br>
               <br>
               <span>状态<el-select v-model="agentName" size="small" placeholder="港前状态"></el-select></span>
               </div>
               <span slot="footer" class="status-footer">
                 <el-button @click="status = false" class='wuBtn'>取 消</el-button>
                 <el-button type="primary" @click="status = false" class='orangeBtn'>确 定</el-button>
               </span>
            </el-dialog>
                  <!-- 修改 -->
   <el-dialog title="修改状态" :visible.sync="modify" width="30%">
               <div class="input">
               <span>名称<el-input v-model="input" style="width:190px" placeholder="请输入状态名称"></el-input></span>
               <br>
               <br>
               <span>状态<el-select v-model="agentName" size="small" placeholder="港前状态"></el-select></span>
               </div>
               <span slot="footer" class="modify-footer">
                 <el-button @click="modify = false" class='wuBtn'>取 消</el-button>
                 <el-button type="primary" @click="modify = false" class='orangeBtn'>确 定</el-button>
               </span>
            </el-dialog>
             <!-- 删除 -->
   <el-dialog title="删除状态" :visible.sync="deletea" width="30%">
               <div class="input">
               <br><span>你确认删除“港前状态”“以出关”吗？</span><br>
               </div>
               <span slot="footer" class="deletea-footer">
                 <el-button @click="deletea = false" class='wuBtn'>取 消</el-button>
                 <el-button type="primary" @click="deletea = false" class='orangeBtn'>确 定</el-button>
               </span>
            </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dialogVisible: false, // 对话框可见
      deletea: false, // 删除状态
      status: false, // 新建状态
      modify: false, // 修改状态
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
      columns: [
        { prop: 'name', label: '名称', width: '427', align: 'center' },
        { prop: 'state', label: '状态', width: '461', align: 'center', formatter: this.formatter }
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
      { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄', button: '<a>11</a>' }
    ]
    this.page.total = 2
  },
  methods: {
    handleSelectionChange (val) {
      console.log(val)
      this.chooseArr = []
      val && val.forEach((item) => {
        this.chooseArr.push(item)
      })
    },
    handleClick (val) {
      console.log(val)
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
margin: auto 20px;
}
.top{
    margin: 10px auto;
}
.left{
  float: left;
  width: 124px;
  height: 616px;
  background: #FFFFFF;
border-radius: 4px;
border: 1px solid #E8E8E8;
text-align:center;
}

</style>
