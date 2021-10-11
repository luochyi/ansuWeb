<template>
  <div>
    <!--  标签页 -->
    <el-row type='flex' justify='flex-start' class='title' align='middle'>
      <span class='text'>目的国管理</span>
    </el-row>
    <!-- 主要内容 -->
    <div class='content'>
      <!-- 搜索栏 -->
      <el-row  class='searchbox1'>
        <!-- 客户名称 -->
        <el-col :span='6' class='colbox'>
        <span class='text'>国家名称</span>
          <el-col :span='15'>
            <el-input v-model='name' placeholder='请输入'></el-input>
          </el-col>
        </el-col>
        <el-col :span='17' class='right'>
          <el-button @click="addCountry" class='orangeBtn long3' > 新增目的国</el-button>
        </el-col>
      </el-row>
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
        align="left"
        fixed="right"
        label="操作"
        width="126"
        :resizable="false"
        >
        <template slot-scope="scope">
          <el-button type="text" @click="toDetail(scope.row.id)"> 编辑</el-button>
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
      name: '',
      activeName: '1', // 标签绑定
      columns: [
        { prop: 'name', label: '目的国', align: 'center' },
        { prop: 'area_code', label: '国家区号', align: 'center', formatter: this.formatter },
        { prop: 'storehouse_count', label: '仓库数量', align: 'center', formatter: this.formatter }
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
    this.getData()
  },
  methods: {
    getData () {
      this.tableData = []
      this.$api.configure.countryLists({ page: this.page.pageNo, limit: this.page.limit }).then(res => {
        console.log(res)
        res.data.list && res.data.list.forEach(ele => {
          let obj = {
            id: ele.id,
            name: ele.name,
            icon: ele.icon,
            area_code: ele.area_code,
            storehouse_count: ele.storehouse_count
          }
          this.tableData.push(obj)
          this.page.total = res.data.total
        })
      })
    },
    addCountry () {
      this.$router.push({ name: 'addCountry' })
    },
    handleSelectionChange (val) {
      console.log(val)
      this.chooseArr = []
      val && val.forEach((item) => {
        this.chooseArr.push(item)
      })
    },
    // 改变页面大小处理
    handleSizeChange (val) {
      this.page.limit = val
      this.getData()
    },
    // 翻页处理
    handleCurrentChange (val) {
      this.page.pageNo = val
      this.getData()
    },
    // 操作按钮列表
    editTableData (row) {}
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
    margin: 17px;
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
    width: 90px;
}
.colbox{
    width: 300px;
}
.colboxa {
width: 200px;
}

</style>
