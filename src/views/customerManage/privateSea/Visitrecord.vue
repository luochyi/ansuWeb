<template>
  <div>
    <!--  标签页 -->
    <el-row type='flex' justify='flex-start' class='title' align='middle'>
      <span class='text'>拜访记录</span>
    </el-row>
    <el-row type='flex'  class='title' align='middle'>
      <span class='texta' :span='18'>深圳大成亚马逊科技有限公司</span>
    </el-row>
    <!-- 主要内容 -->
    <div class='content'>
      <!-- 搜索栏 -->
      <el-row  class='searchbox1'>
        <!-- 客户名称 -->
        <el-col :span='20' class='colbox'>
          <span class='text'>拜访时间</span>
          <el-date-picker
      v-model="value1"
      type="monthrange"
      range-separator="——"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
    <span class='text'>拜访人</span>
          <el-col :span='16'>
            <el-input v-model='agentName' placeholder='请选择拜访人'></el-input>
          </el-col>
        </el-col>
        <!--  -->
        <el-col :span='6' class='colboxa justify-center'>
          <el-button class='orangeBtn long1'>查 询</el-button>
          <el-button class='wuBtn long1'>重 置</el-button>
        </el-col>
        <el-col :span='12' class='colboxx justify-center'>
          <el-button @click="record" class='orangeBtn long3'>⊕ 新增拜访记录</el-button>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <div>

        <div class="table">
          <el-table ref="multipleTable" :data="tableData" border  tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange"
            :header-cell-style="{background: '#F5F5F6'}">
            <el-table-column type="selection" width="55"></el-table-column>
             <el-table-column prop="name" label="拜访时间" width="221"></el-table-column>
             <el-table-column prop="contacts" label="拜访人" width="86"></el-table-column>
             <el-table-column prop="number" label="随行人员" width="143"></el-table-column>
             <el-table-column prop="address" label="拜访记录" width="323"></el-table-column>
             <el-table-column prop="address" label="拜访总结" width="453"></el-table-column>
            <el-table-column fixed="right" label="操作" min-width="94">
              <template slot-scope="scope">
                <el-button v-if="activeName === '1'" type="text" @click="stopAgent(scope.row)">查看详情</el-button>
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
      changes: false,
      dialogVisible: false,
      informationis: false,
      activeName: '1', // 标签绑定
      pageSize: 10,
      currentPage: 1,
      total: 50,

      agentName: '', // 代理名称
      agentCode: '', // 代理编码
      agentAccount: '', // 代理账期
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
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]

    }
  },
  methods: {
    record () {
      this.$router.push({ name: 'record' })
    },
    Visitrecord () {
      this.$router.push({ name: 'Visitrecord' })
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
  .stopBtn{
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
.title .text{
    width: 250px;
    text-align:left;
    margin: 32px;
}
.title .texta{
    width: 250px;
    text-align:left;
    margin: 32px;
    color:#FB4702 ;
    font-size: 18px;
    line-height: 25px;
    font-family: PingFangSC-Semibold, PingFang SC;
}
/deep/ .el-dialog{
  text-align: left;
}
//biankuang

/deep/ .input{
  height: 80px;
}
/deep/ .title{
 height: 56px;
 font-size: 16px;
}
.searchbox1 .colbox .text {
    width: 150px;
}
.colbox{
    width: 550px;
}
.colboxa {
width: 450px;
flex: right;
}
.colboxx {
width: 200px;
flex: right;
}
</style>
