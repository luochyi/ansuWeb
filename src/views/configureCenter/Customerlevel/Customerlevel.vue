<template>
  <div>
    <!--  标签页 -->
    <el-row type='flex' justify='flex-start' class='title' align='middle'>
      <span class='text'>客户等级</span>
    </el-row>
    <!-- 主要内容 -->
    <div class='content'>
      <!-- 搜索栏 -->
       <el-row :gutter="15">
        <el-col>
          <el-form
            class="elForm"
            ref="elForm"
            size="small"
            :model="searchForm"
            label-width="93px"
            label-position="top"
          >
             <el-col :span="6">
                <el-form-item label="等级名称" prop="name">
                  <el-input
                    v-model="searchForm.name"
                    placeholder="请输入"
                    clearable
                    :style="{ width: '60%' }"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
             <el-col :span="6">
          <!-- <el-form-item size="large"> -->
          <div class="searchBtn">
            <el-button class="orangeBtn" @click="search">查询</el-button>
            <el-button class="whiteBtn" @click="resetForm('elForm')"
              >重置</el-button
            >
          </div>
          <!-- </el-form-item> -->
        </el-col>
          </el-form>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-divider></el-divider>
      <el-row  class='searchbox1'>
        <el-col :span='2' class='colboxx justify-center'>
          <el-button @click="addCustomerL" class='orangeBtn long3'> 新增客户等级</el-button>
        </el-col>
      </el-row>
      <!-- 表格 -->
   <commonTable
      :columns="columns"
      :data="tableData"
      :selection='selection'
      :pager="page"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      @handleSelectionChange="handleSelectionChange"
      >
      <el-table-column
        slot="table_oper"
        align="center"
        fixed="right"
        label="操作"
        width="125"
        :resizable="false"
        >
        <template slot-scope="scope">
          <el-button type="text" @click="toDetail(scope.row)"> 修改</el-button>
                <span style="color: #0084FF; margin: 0px 5px">|</span>
                <el-button type="text" @click="del(scope.row.id)"> 删除 </el-button>
        </template>
      </el-table-column>
      </commonTable>
    </div>
    <el-dialog :title="digTitle" :visible.sync="diaShow" :before-close="addClose" width="30%">
      <div class="input">
        <el-row>
          <span style="color:red">*</span>
          <span>客户名称&nbsp;<el-input
                            v-model="name"
                            style="width: 190px"
                            placeholder="请输入客户名称"
                        ></el-input
                        ></span>
        </el-row>
        <el-row style="marginTop:20px">
          <span style="color:red">*</span>
          <span>提醒天数&nbsp;<el-input
                            v-model="warn_day"
                            style="width: 190px"
                            placeholder="请输入提醒天数"
                        ></el-input
                        ></span>
        </el-row>
      </div>
      <span slot="footer" class="department-footer">
        <el-button @click="addClose" class="wuBtn">取 消</el-button>
        <el-button type="primary" @click="addSubmit()" class="orangeBtn"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
export default {
  data () {
    return {
      selection: false,
      diaShow: false,
      digTitle: '',
      name: '',
      warn_day: null,
      customerLevelId: null,
      columns: [
        { prop: 'name', label: '客户名称', width: '600', align: 'center' },
        { prop: 'warn_day', label: '提醒天数', align: 'center', formatter: this.formatter }
      ],
      tableData: [],
      page: {
        pageNo: 1,
        limit: 10,
        sizes: [10, 20, 50],
        total: 0
      },
      searchForm: {
        name: ''
      }
    }
  },
  mounted () {
    this.getData()
    console.log(this.$store.state.common.regiondata)
  },
  methods: {
    // 获取表格数据
    getData () {
      this.tableData = []
      let params = {
        page: this.page.pageNo,
        limit: this.page.limit,
        name: this.searchForm.name
      }
      this.$api.configure.customerLevelLists(params).then((res) => {
        console.log(res)
        res.data.list && res.data.list.forEach(ele => {
          let obj = {
            id: ele.id,
            name: ele.name,
            warn_day: ele.warn_day
          }
          this.tableData.push(obj)
          this.page.total = res.data.total
        })
      })
    },
    search () {
      this.page.pageNo = 1
      this.getData()
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.getData()
    },
    // 新增
    addCustomerL () {
      this.diaShow = true
      this.digTitle = '新增等级'
    },
    // 提交
    addSubmit () {
      // 判断调用新增接口还是修改接口
      if (this.digTitle === '新增等级') {
        let params = {
          name: this.name,
          warnDay: Number(this.warn_day) // warnDay只能为数字
        }
        this.$api.configure.customerLevelAdd(params).then(res => {
          if (res.code === 0) {
            this.$message.success(res.msg)
            this.getData() // 重新获取数据
            this.addClose() // 关闭新增框
          } else {
            this.$message.error(res.msg)
            // this.addClose()
          }
        })
      } else if (this.digTitle === '修改客户等级') {
        let params = {
          customerLevelId: this.customerLevelId,
          name: this.name,
          warnDay: Number(this.warn_day)
        }
        this.$api.configure.customerLevelEdit(params).then(res => {
          if (res.code === 0) {
            this.$message.success(res.msg)
            this.getData()
            this.addClose()
          } else {
            this.$message.error(res.msg)
            // this.addClose()
          }
        })
      }
    },
    // 关闭新增弹窗
    addClose () {
      this.diaShow = false
      // 清空表单
      this.name = null
      this.warn_day = null
    },
    // 修改
    toDetail (data) {
      this.name = data.name
      this.warn_day = data.warn_day
      this.customerLevelId = data.id
      this.diaShow = true
      this.digTitle = '修改客户等级'
    },
    // 删除
    del (id) {
      this.$confirm('删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.configure.customerLevelDel({ customerLevelId: id }).then(res => {
          if (res.code === 0) {
            this.$message.success(res.msg)
            this.getData()
          } else {
            this.$message.error(res.msg)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleSelectionChange (val) {
      console.log(val)
      this.chooseArr = []
      val && val.forEach((item) => {
        this.chooseArr.push(item)
      })
    },
    // 重新渲染name列
    formatter (row, column, cellValue) {
      return row.warn_day + '天'
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
.elForm{
  text-align: left;
}
.searchBtn{
  position: relative;
  top: 30px;
}
</style>
