<template>
  <div>
    <div class='main'>
      <!--  标签页 -->
      <el-row type='flex' justify='flex-start' class='title' align='middle'>
        <span class='text'>报价单</span>
        <el-tabs v-model='activeName' type='card' @tab-click='handleClick'>
          <el-tab-pane label='未审核' name='1'></el-tab-pane>
          <el-tab-pane label='已审核' name='2'></el-tab-pane>
          <el-tab-pane label='全部' name='3'></el-tab-pane>
        </el-tabs>
      </el-row>
      <!-- 主要内容 -->
      <div class='content'>
        <el-row :gutter="15">
          <el-col :span="20">
            <el-form
              class="elForm"
              ref="elForm"
              size="small"
              :model="searchForm"
              label-width="93px"
              label-position="top"
            >
              <el-col :span="6">
                <el-form-item label="单号" prop="name">
                  <el-input
                    v-model="searchForm.name"
                    placeholder="请输入"
                    clearable
                    :style="{ width: '60%' }"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
            </el-form>
            </el-col>
           <el-col :span="4">
                <!-- <el-form-item size="large"> -->
                  <div class="searchBtn">
                    <el-button class="orangeBtn" @click="search">查询</el-button>
                    <el-button class="whiteBtn" @click="resetForm('elForm')">重置</el-button>
                  </div>
                <!-- </el-form-item> -->
            </el-col>
        </el-row>
        <el-divider></el-divider>
        <div class='table'>
          <el-row class='tableBtn'>
            <el-col :span='12' class='left'>
              <!-- <el-button class='batch'></el-button> -->
              <!-- <el-button class='batch'></el-button> -->
            </el-col>
            <el-col :span='20' class='right'>
              <!-- <el-button class='whiteBtn '></el-button> -->
            </el-col>
          </el-row>
          <br>
          <!-- 表格 -->
          <commonTable
            :columns="columns"
            :data="tableData"
            :pager="page"
            :selection='selection'
            @handleSizeChange="handleSizeChange"
            @handleCurrentChange="handleCurrentChange"
            >
            <el-table-column
                slot="table_oper"
                align="center"
                fixed="right"
                label="操作"
                width="126"
                :resizable="false"
                >
                <template slot-scope="scope">
                <el-button type="text" @click="detai(scope.row.id)"> 查看详情</el-button>
                </template>
            </el-table-column>
        </commonTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeName: '1',
      page: {
        pageNo: 1,
        limit: 10,
        sizes: [1, 5, 10],
        total: 0
      },
      tableData: [

      ],
      columns: [
        { prop: 'name', label: '单号', width: '500', align: 'center' },
        { prop: 'exchange_rate', label: '客户名称', width: '500', align: 'center' },
        { prop: 'is_default', label: '客户编号', align: 'center' },
        { prop: 'is_default', label: '审批状态', align: 'center', formatter: this.formatter },
        { prop: 'is_default', label: '审批人', align: 'center' },
        { prop: 'is_default', label: '订单类型', align: 'center' },
        { prop: 'is_default', label: '预报渠道', align: 'center' },
        { prop: 'is_default', label: '运输方式', align: 'center' },
        { prop: 'is_default', label: '目的地', align: 'center' },
        { prop: 'is_default', label: '下单时间', align: 'center' },
        { prop: 'is_default', label: '结算重', align: 'center' },
        { prop: 'is_default', label: '实重', align: 'center' },
        { prop: 'is_default', label: '方数', align: 'center' },
        { prop: 'is_default', label: '材积重', align: 'center' }
      ],
      searchForm: {
        name: ''
      }
    }
  },
  mounted () {
    // 在页面加载前调用获取列表数据函数
    this.getData()
  },
  methods: {
    getData () {
      // 初始的表格数据清空
      this.tableData = []
      let params = {
        status: Number(this.activeName),
        page: this.page.pageNo,
        limit: this.page.limit
      }
      this.$api.Ordermanagement.forecastLists(params).then(res => {
        console.log(res.data) // res是接口返回的结果
        this.tableData = res.data.list
        this.total = res.data.total
      })
    },
    handleCurrentChange (val) {
      this.page.pageNo = val
      this.getData()
    },
    handleSizeChange (val) {
      this.page.limit = val
      this.getData()
    },
    formatter (row, column) {
      // console.log(row)
      if (row.type === 1) {
        return '计划下单'
      } else if (row.type === 2) {
        return '无计划下单'
      }
    },
    search () {
      this.currentPage = 1
      this.getData()
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.getData()
    },
    detail (id) {
      this.$router.push({ name: 'priceDetail' })
    },
    handleClick (tab, event) {
      console.log(tab, event)
      this.activeName = tab.name
      this.getData()
    },
    handleSelectionChange () {

    }
  }
}
</script>

<style lang='scss' scoped>

.dra-content{
  text-align: left;
  /deep/.cell{
  display: flex;
  justify-content:space-between;
  line-height: 40px;
}
}
/deep/ .tableBtn{
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
.label{
  font-size: 14px;
  padding: 5px;
  span{
    width: 100px;
  }
  /deep/.el-input__inner{
    width: 200px;
    display: inline;
  }
   .el-input{
    display: inline;
    margin-left: 10px;
  }
}
.elForm{
  text-align: left;
}
.searchBtn{
  position: relative;
  top: 30px;
}
</style>
