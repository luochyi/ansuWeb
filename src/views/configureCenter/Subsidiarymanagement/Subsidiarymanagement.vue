<template>
  <div class="content">
    <div>
    <!--  标签页 -->
    <el-row type='flex' justify='flex-start' class='title' align='middle'>
      <span class='text'>子公司管理</span>
    </el-row>
    <!-- 主要内容 -->
    <div class='content'>
      <!-- 搜索栏 -->
      <el-row  class='searchbox1'>
        <!-- 客户名称 -->
        <el-col :span='6' class='colbox'>
        <span class='text'>公司名称</span>
          <el-col :span='16'>
            <el-input v-model='name' placeholder='请输入'></el-input>
          </el-col>
        </el-col>
        <!--  -->
        <el-col :span='6' class='colboxa justify-center'>
          <el-button class='orangeBtn long1'>查 询</el-button>
          <el-button class='wuBtn long1'>重 置</el-button>
        </el-col>
        <el-col :span='10' class='right'>
          <el-button @click="subsidiaries" class='orangeBtn long3' icon="el-icon-circle-plus-outline"> 新增子公司</el-button>
        </el-col>
      </el-row>
    </div>
    </div>
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
        width="118"
        :resizable="false"
      >
         <template slot-scope="scope">
          <el-button type="text" @click="toDetail(scope.row.id)"> 修改公司信息</el-button>
        </template>
      </el-table-column>
    </commonTable>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      columns: [
        { prop: 'name', label: '公司名称', width: '215', align: 'center' },
        { prop: 'startNo', label: '运单起始号码', width: '151', align: 'center' },
        { prop: 'address', label: '公司地址', align: 'center' }
      ],
      tableData: [],
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
    this.getData()
  },
  methods: {
    // 获取列表数据
    getData () {
      // 初始的表格数据清空
      this.tableData = []
      // limit: this.page.limit, page: this.page.pageNo 页码和页容量
      this.$api.configure.companyLists({ limit: this.page.limit, page: this.page.pageNo }).then(res => {
        console.log(res.data) // res是接口返回的结果
        res.data.list && res.data.list.forEach(ele => {
          let obj = {
            id: ele.id,
            name: ele.name,
            startNo: ele.start_no,
            address: ele.address
          }
          this.tableData.push(obj)
        })
        this.page.total = res.data.total // 数据总量
      })
    },
    // 新建子公司
    subsidiaries () {
      this.$router.push({ name: 'subsidiaries' })
    },
    // 重新渲染name列
    // formatter (row, column, cellValue) {
    // },
    // formatters (row, column, cellValue) {
    // },
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
    editTableData (row) {}
  }
}
</script>

<style lang="scss" scoped>
.adtitile {
  color: #000000a6;
  font-weight: 500;
  font-size: 18px;
  margin-left: -150px;
  margin-bottom: 8px;
}
.elipt {
  width: 287px;
  height: 40px;
  margin: 3px;
  line-height: 40px;
}
.el-input__iconyellow {
  color: #ffbd32ff;
}
</style>
