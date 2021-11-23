<template>
  <div>
    <!--  标签页 -->
    <el-row type='flex' justify='flex-start' class='title' align='middle'>
      <span class='text'>司机管理</span>
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
                <el-form-item label="员工状态" prop="status">
                  <el-select
                    v-model="searchForm.status"
                    placeholder="请输入"
                    clearable
                    :style="{ width: '60%' }"
                  >
                  <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="区域状态" prop="regionStatus">
                  <el-select
                    v-model="searchForm.regionStatus"
                    placeholder="请输入"
                    clearable
                    :style="{ width: '60%' }"
                  >
                  <el-option v-for="item in regionStatusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
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
      <el-divider></el-divider>
      <!-- 表格 -->
      <div>
       <commonTable
      :columns="columns"
      :selection='selection'
      :data="tableData"
      :pager="page"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      >
      <!-- slot -->
      <template v-slot:city='slotData'>
         {{format(slotData.data, 'city')}}
         <!-- <span style="color: #0084FF;cursor:pointer" @click="check(slotData)">查看更多</span> -->
      </template>
      <template v-slot:area='slotData'>
         {{format(slotData.data, 'area')}}
         <!-- <span style="color: #0084FF;cursor:pointer" @click="check(slotData)">查看更多</span> -->
      </template>
            <!-- 操作 -->
      <el-table-column
        slot="table_oper"
        align="center"
        fixed="right"
        label="操作"
        width="84"
        :resizable="false"
        >
        <template slot-scope="scope">
          <el-button type="text" @click="distributionDriver(scope.row)"> 分配区域</el-button>
        </template>
      </el-table-column>
      </commonTable>
      </div>

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
      total: 150,
      a: 1,
      b: 9,

      agentName: '',
      agentCode: '',
      agentAccount: '',
      columns: [
        { prop: 'name', label: '司机', width: '252', align: 'center' },
        { prop: 'position_name', label: '职位', width: '251', align: 'center' },
        { prop: 'distribution', label: '区域分配', align: 'center', formatter: this.formatter },
        { prop: 'city', label: '所属城市', width: '198', align: 'center', type: 'slot', slotName: 'city' },
        { prop: 'area', label: '收货区域', width: '198', align: 'center', type: 'slot', slotName: 'area' },
        { prop: 'status', label: '账号状态', width: '271', align: 'center', formatter: this.formatter }
      ],
      tableData: [],
      page: {
        pageNo: 1,
        limit: 10,
        sizes: [1, 5, 10],
        total: 0
      },
      searchForm: {
        name: '',
        position: '',
        status: null,
        regionStatus: null
      },
      statusOptions: [
        {
          label: '正常',
          value: 1
        },
        {
          label: '停用',
          value: 2
        }
      ],
      regionStatusOptions: [
        {
          label: '已配置',
          value: 1
        },
        {
          label: '未配置',
          value: 2
        }
      ],
      // 选择器
      distribution: '', // 区域分配
      distributionOpts: [{
        id: '选项1',
        name: '已分配区域'
      }, {
        id: '选项2',
        name: '未分配区域'
      }]
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    // 区域分配
    distributionDriver (row) {
      this.$router.push({ name: 'distributionDriver', params: row })
    },
    getData () {
      let params = {
        page: this.page.pageNo,
        limit: this.page.limit,
        name: this.searchForm.name,
        position: this.searchForm.position,
        status: this.searchForm.status,
        regionStatus: this.searchForm.regionStatus
      }
      this.$api.configure.driver.lists(params).then((res) => {
        this.tableData = res.data.list
        this.page.total = res.data.total
      })
    },
    search () {
      this.getData()
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.getData()
    },
    // 重新渲染name列
    formatter (row, column, cellValue) {
      switch (column.property) {
        case 'distribution':
          return row.regions.length > 0 ? '已分配区域' : '未分配区域'
        case 'status':
          return row.status === 1 ? '正常' : '停用'
      }
    },
    format (row, column) {
      let city = []
      let area = []
      switch (column) {
        case 'city':
          row.regions.forEach(item => {
            city.push(item.city_name)
          })
          return city.slice(0, 2).join('、')
        case 'area':
          row.regions.forEach(item => {
            area.push(item.county_name)
          })
          return area.slice(0, 2).join('、')
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
.contenta{
  margin: 10px;

}
.elForm{
  text-align: left;
}
.searchBtn{
  position: relative;
}
</style>
