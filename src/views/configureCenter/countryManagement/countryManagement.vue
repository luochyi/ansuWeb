<template>
  <div>
    <!--  标签页 -->
    <el-row type="flex" justify="flex-start" class="title" align="middle">
      <span class="text">目的国管理</span>
    </el-row>
    <!-- 主要内容 -->
    <div class="content">
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
          <el-button @click="addCountry" class='orangeBtn long3'> 新增国家</el-button>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <commonTable
        :columns="columns"
        :data="tableData"
        :selection="selection"
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
            <el-button type="text" @click="edit(scope.row)">修改</el-button>
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
      selection: false,
      searchForm: {
        name: ''
      },
      activeName: '1', // 标签绑定
      columns: [
        { prop: 'name', label: '目的国', width: '100', align: 'center' },
        {
          prop: 'area_code',
          label: '国家区号',
          align: 'center',
          formatter: this.formatter
        },
        {
          prop: 'storehouse_count',
          label: '仓库数量',
          align: 'center',
          formatter: this.formatter
        }
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
      this.$api.configure
        .countryLists({
          page: this.page.pageNo,
          limit: this.page.limit,
          name: this.searchForm.name
        })
        .then((res) => {
          console.log(res)
          this.tableData = res.data.list
          this.page.total = res.data.total
          // })
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
    addCountry () {
      this.$router.push({ name: 'addCountry' })
    },
    handleSelectionChange (val) {
      console.log(val)
      this.chooseArr = []
      val &&
        val.forEach((item) => {
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
    editTableData (row) {},
    edit (data) {
      this.$router.push({
        name: 'addCountry',
        params: {
          id: data.id,
          name: data.name,
          icon: data.icon,
          area_code: data.area_code
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .searchbox1 {
  .stopBtn {
    height: 32px;
    line-height: 32px;
    padding: 0px 15px;
    background: #fef4e1;
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
/deep/ .el-dialog {
  position: absolute;
  margin: 0px !important;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .el-dialog__header {
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
  }
}
.title .text {
  width: 250px;
  text-align: left;
  margin: 17px;
}
.title .texta {
  width: 250px;
  text-align: left;
  margin: 32px;
  color: #fb4702;
  font-size: 18px;
  line-height: 25px;
  font-family: PingFangSC-Semibold, PingFang SC;
}
/deep/ .el-dialog {
  text-align: left;
}
//biankuang

/deep/ .input {
  height: 80px;
}
/deep/ .title {
  height: 56px;
  font-size: 16px;
}
.searchbox1 .colbox .text {
  width: 90px;
}
.colbox {
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
