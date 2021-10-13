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
        width="94"
        :resizable="false"
      >
          <template slot-scoped="scoped">
                <el-button  type="text" @click="stopAgent">查看详情</el-button>
              </template>
      </el-table-column>
    </commonTable>
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
      columns: [
        { prop: 'visit_time', label: '拜访时间', width: '218', align: 'center' },
        { prop: 'personnel_name', label: '拜访人', width: '94', align: 'center' },
        { prop: 'accompanies', label: '随行人员', width: '117', align: 'center' },
        { prop: 'record', label: '拜访记录', width: '117', align: 'center' },
        { prop: 'remark', label: '拜访总结', align: 'center' }
      ],
      tableData: [{
        visit_time: 1640072013,
        record: '拜访记录',
        remark: '拜访总结'
      }],
      page: {
        pageNo: 1, // 当前页码
        limit: 10, // 页容量
        sizes: [1, 5, 10],
        total: 0
      }
    }
  },
  mounted () {
    // 在页面加载前调用获取列表数据函数
    // this.getData()
  },
  methods: {
    record () {
      this.$router.push({ name: 'record' })
    },
    stopAgent () {
      this.$router.push({ name: 'stopAgent' })
    },
    // 获取列表数据
    getData () {
      // 初始的表格数据清空
      this.tableData = []
      // limit: this.page.limit, page: this.page.pageNo 页码和页容量
      this.$api.customer.recordLists({ limit: this.page.limit, page: this.page.pageNo, customerId: 1 }).then(res => {
        console.log(res.data) // res是接口返回的结果
        // res.data.list && res.data.list.forEach(ele => {
        //   let obj = {
        //     id: ele.id,
        //     visit_time: ele.visit_time,
        //     personnel_name: ele.personnel_name,
        //     record: ele.record,
        //     accompanies: ele.accompanies,
        //     remark: ele.remark
        //   }
        //   this.tableData.push(obj)
        // })
        this.page.total = res.data.total // 数据总量
      })
    },
    // 改变页面大小处理
    handleSizeChange (val) {
      this.page.limit = val // 设置当前页容量为val
      this.getData() // 重新渲染表格
    },
    // 翻页处理
    handleCurrentChange (val) {
      this.page.pageNo = val // 设置当前页码为val
      this.getData() // 重新渲染表格
    },
    // 操作按钮列表
    editTableData (row) {},
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
