<template>
  <div>
  <div class="left" >
      <div class="lefta">
            <el-row type='flex' justify='flex-start' class='title' align='middle'>
       <span class='text'>目的国</span>
    </el-row>
      </div>
      <input class="inputa" autocomplete="off" type="text" value="" placeholder="请输入目的国">
     <el-button type="primary"  @click="addFBA2" icon="el-icon-circle-plus-outline" round>新建目的国</el-button>
<br>
<br>
<div class="first">
<span class='text'>美国</span>
<br>
<el-button type="text" @click="Deletedestination= true"> 删除 </el-button>
</div>
<br>
<div class="second">
  <span class='text'>英国</span>
  <br>
  <el-button type="text" @click="Deletedestination= true"> 删除 </el-button>
</div>
<br>
<div class="third">
  <span class='text'>日本</span>
  <br>
  <el-button type="text" @click="Deletedestination= true"> 删除 </el-button>
</div>
  </div>
      <!--  标签页 -->
      <div class="right">
      <el-row type='flex' justify='flex-start' class='title' align='middle'>
      <span class='text'>FBA仓管理</span>
       <el-tabs v-model='activeName' type='card' @tab-click='handleClick'>
        <el-tab-pane label='正常仓库' name='1'></el-tab-pane>
        <el-tab-pane label='不正常仓库' name='2'></el-tab-pane>
      </el-tabs>
     </el-row>
      <!-- 主要内容 -->
     <div class='content'>
      <!-- 搜索栏 -->
        <div class='content'>
        <el-row class='searchbox1'>
          <el-col :span='10' class='colbox'>
            <el-col :span='6'>
              <span class='text'>FBA仓</span>
            </el-col>
            <el-col :span='15'>
              <el-input v-model='predictionNo' placeholder='请输入FBA仓名称/邮编'></el-input>
            </el-col>
          </el-col>
          <el-col :span='4' class='colbox'>
            <el-button class='orangeBtn long1'>查 询</el-button>
            <el-button class='wuBtn long1'>重置</el-button>
          </el-col>
         <el-button @click="addFBA" class='whiteBtn'>新建FBA仓 </el-button>
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
        width="176"
        :resizable="false"
        >
        <template slot-scoped="scoped">
          <el-button type="text" @click="edit= true"> 编辑</el-button>
            <span style="color: #0084FF; margin: 0px 5px">|</span>
           <el-button type="text" @click="modifystate= true"> 修改状态 </el-button>
             <span style="color: #0084FF; margin: 0px 5px">|</span>
           <el-button type="text" @click="deletea= true"> 删除 </el-button>
        </template>
      </el-table-column>
      </commonTable>
     </div>
      <!-- 新建目的国 -->
   <el-dialog title="新建目的国" :visible.sync="country" width="30%" >
               <div class="input">
               <span>目的国名称<el-input v-model="input" style="width:190px" placeholder="请输入目的国名称"></el-input></span>
               <br>
               <br>
               <span>目的国目标<div>
            <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
            </el-upload>
              <el-dialog :visible.sync="dialogVisible">
             <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
            </div></span>
               </div>
               <span slot="footer" class="country-footer">
                 <el-button @click="country = false" class='wuBtn'>取 消</el-button>
                 <el-button type="primary" @click="country = false" class='orangeBtn'>确 定</el-button>
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
             <!-- 删除目的国 -->
   <el-dialog title="删除状态" :visible.sync="Deletedestination" width="30%">
               <div class="input">
               <br><span>你是否确定删除目的地“美国”</span><br>
               </div>
               <span slot="footer" class="Deletedestination-footer">
                 <el-button @click="Deletedestination = false" class='wuBtn'>取 消</el-button>
                 <el-button type="primary" @click="Deletedestination = false" class='orangeBtn'>确 定</el-button>
               </span>
            </el-dialog>
           <!--修改状态 -->
   <el-dialog title="修改状态" :visible.sync="modifystate" width="30%">
               <div class="input">
              <span>您是否将FBA仓“ONTB”修改为不正常状态</span>
               <br><span>请输入原因</span><br>
               <el-input type="textarea" :rows="2" placeholder="请输入不正常原因"  v-model="textarea"></el-input>
               </div>
               <span slot="footer" class="modifystate-footer">
                 <el-button @click="modifystate = false" class='wuBtn'>取 消</el-button>
                 <el-button type="primary" @click="modifystate = false" class='orangeBtn'>确 定</el-button>
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
      modifystate: false, // 无法删除
      Deletedestination: false, // 删除目的国
      country: false, // 新增目的国
      modify: false, // 修改状态
      activeName: '1', // 标签绑定

      textarea: '', // 文本域
      pageSize: 10,
      currentPage: 1,
      total: 150,
      a: 1,
      b: 9,

      input: '',
      agentName: '',
      agentCode: '',
      agentAccount: '',
      predictionNo: '',
      columns: [
        { prop: 'name', label: 'FBA仓库名', width: '112', align: 'center' },
        { prop: 'code', label: 'FBA仓编码', width: '118', align: 'center', formatter: this.formatter },
        { prop: 'address', label: '地址', width: '611', align: 'center', formatter: this.formatter }
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
    addFBA () {
      this.$router.push({ name: 'addFBA' })
    },
    addFBA2 () {
      this.$router.push({ name: 'addFBA2' })
    },
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
width: 960px;
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
  width: 209px;
  height: 616px;
  background: #FFFFFF;
border-radius: 4px;
border: 1px solid #E8E8E8;
text-align:center;
}
.inputa{
  margin: 5px;
  border-radius: 20px;
  height: 30px;
  width: 140px;
border: 2px solid #D9D9D9;
}
.el-button orangeBtn el-button--primary{
  border-radius: 10px;
  height: 40px;
  width: 140px;
}
.el-dialog{
  height: 514px;
  width: 30%;
}
.el-upload{
  width: 114px;
  height: 76px;
}
.first{
  width: 159px;
  height: 67px;
  border: 1px solid #D9D9D9;
margin: 0 auto;
}
.second{
  width: 159px;
  height: 67px;
  border: 1px solid #D9D9D9;
  margin: 0 auto;
}
.third{
  width: 159px;
  height: 67px;
  border: 1px solid #D9D9D9;
  margin: 0 auto;
}
</style>
