<template>
  <div>
    <!--  标签页 -->
    <el-row type='flex' justify='flex-start' class='title' align='middle'>
      <span class='text'>仓库操作员</span>
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
                <el-form-item label="姓名" prop="name">
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
                <el-form-item label="职位" prop="position">
                  <el-input
                    v-model="searchForm.position"
                    placeholder="请输入"
                    clearable
                    :style="{ width: '60%' }"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="仓库名" prop="warehouseName">
                  <el-input
                    v-model="searchForm.warehouseName"
                    placeholder="请输入"
                    clearable
                    :style="{ width: '60%' }"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="账号状态" prop="status">
                  <el-select
                    v-model="searchForm.status"
                    placeholder="请输入"
                    clearable
                    :style="{ width: '60%' }"
                  >
                  <el-option v-for="i in statusOptions"
                    :key="i.value"
                    :label="i.label"
                    :value="i.value"
                  >
                  </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="仓库分配状态" prop="warehouseStatus">
                  <el-select
                    v-model="searchForm.warehouseStatus"
                    placeholder="请输入"
                    clearable
                    :style="{ width: '60%' }"
                  >
                  <el-option v-for="i in warehouseStatusOptions"
                    :key="i.value"
                    :label="i.label"
                    :value="i.value"
                  >
                  </el-option>
                  </el-select>
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
<commonTable
      :columns="columns"
      :data="tableData"
      :selection='selection'
      :pager="page"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      >
      <el-table-column
        slot="table_oper"
        align="center"
        fixed="right"
        label="操作"
        width="238"
        :resizable="false"
        >
        <template slot-scope="scope">
          <el-button type="text" @click="responsibleWarehouse(scope.row)"> 负责仓库</el-button>
                <span style="color: #0084FF; margin: 0px 5px" v-show="scope.row.warehouse_type === 2">|</span>
                <el-button type="text" @click="setPrincipal(scope.row.id)" v-show="scope.row.warehouse_type === 2"> 设为负责人 </el-button>
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
      dialogVisible: false, // 对话框可见
      stopAgentis: false,
      activeName: '1', // 标签绑定

      pageSize: 10,
      currentPage: 1,
      total: 0,
      a: 1,
      b: 9,

      agentName: '',
      agentCode: '',
      agentAccount: '',
      columns: [
        { prop: 'name', label: '仓库操作员', width: '210', align: 'center' },
        { prop: 'position_name', label: '职位', width: '191', align: 'center' },
        { prop: 'responsible', label: '负责仓库', width: '222', align: 'center', formatter: this.formatter },
        { prop: 'warehouse', label: '所属仓库', width: '457', align: 'center', formatter: this.formatter },
        { prop: 'person', label: '仓库负责人', width: '101', align: 'center', formatter: this.formatter },
        { prop: 'status', label: '账号状态', align: 'center', formatter: this.formatter }
      ],
      tableData: [],
      page: {
        pageNo: 1,
        limit: 15,
        sizes: [15, 50, 100],
        total: 0
      },
      warehouseStatusOptions: [
        {
          label: '已分配',
          value: 1
        }, {
          label: '未分配',
          value: 2
        }
      ],
      statusOptions: [
        {
          label: '启用',
          value: 1
        },
        {
          label: '停用',
          value: 2
        }
      ],
      searchForm: {
        name: '',
        position: '',
        warehouseName: '',
        status: null,
        warehouseStatus: null
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.$api.configure.warehouse.lists({
        page: this.page.pageNo,
        limit: this.page.limit,
        name: this.searchForm.name,
        position: this.searchForm.position,
        warehouseName: this.searchForm.warehouseName,
        status: this.searchForm.status,
        warehouseStatus: this.searchForm.warehouseStatus
      }).then(res => {
        this.tableData = res.data.list
        this.page.total = res.data.total
      })
    },
    responsibleWarehouse (row) {
      this.$router.push({ name: 'responsibleWarehouse', params: row })
    },
    handleSelectionChange (val) {
      console.log(val)
      this.chooseArr = []
      val && val.forEach((item) => {
        this.chooseArr.push(item)
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
    // 重新渲染name列
    formatter (row, column, cellValue) {
      switch (column.property) {
        case 'responsible':
          return row.warehouse_type === 0 ? '未分配仓库' : '已分配仓库'
        case 'warehouse':
          return row.warehouse_type === 0 ? '——' : row.warehouse_name
        case 'person':
          return row.warehouse_type === 0 ? '——' : row.warehouse_type === 1 ? '仓库负责人' : '普通仓库人员'
        case 'status':
          return row.status === 1 ? '启用' : '停用'
      }
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
    setPrincipal (userId) {
      this.$api.configure.warehouse.setPrincipal({
        userId: userId
      }).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg) // 成功提示
          this.getData()
        } else {
          this.$message.error(res.msg) // 错误提示
        }
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
.elForm{
  text-align: left;
}
.searchBtn{
  position: relative;
  top: 30px;
}
</style>
