<template>
  <div>
    <!--  标签页 -->
    <el-row type="flex" justify="flex-start" class="title" align="middle">
      <span class="text">渠道服务</span>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="启用代理" name="1"></el-tab-pane>
        <el-tab-pane label="停用代理" name="2"></el-tab-pane>
      </el-tabs>
    </el-row>
    <!-- 主要内容 -->
    <div class="content">
      <!-- 搜索栏 -->
      <el-row class="searchbox1">
        <!-- 代理名称 -->
        <el-col :span="6" class="colbox">
          <span class="text">服务名称</span>
          <el-col :span="16">
            <el-input v-model="serviceName" placeholder="请输入"></el-input>
          </el-col>
        </el-col>
        <!--  -->
        <el-col :span="6" class="colbox justify-center">
          <el-button class="orangeBtn long1">查 询</el-button>
          <el-button class="wuBtn long1">重 置</el-button>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <div>
        <el-row
          class="searchbox1"
          type="flex"
          justify="space-between"
          align="middle"
        >
          <el-col :span="12" class="left">
            <el-button class="stopBtn" @click="batchStop">批量停用</el-button>
          </el-col>
          <el-col :span="12" class="right">
            <el-button class="whiteBtn" @click="toAdd">新增渠道服务</el-button>
          </el-col>
        </el-row>
        <commonTable
          :columns="columns"
          :data="tableData"
          :pager="page"
          @handleSizeChange="handleSizeChange"
          @handleCurrentChange="handleCurrentChange"
          @handleSelectionChange="handleSelectionChange"
        >
          <!-- slot -->
          <template v-slot:chakan="slotData">
            {{ slotData.data.info
            }}<span
              style="color: #0084FF; cursor: pointer"
              @click="check(slotData)"
              >查看</span
            >
          </template>
          <!-- 操作 -->
          <el-table-column
            slot="table_oper"
            align="center"
            fixed="right"
            label="操作"
            width="500"
            :resizable="false"
          >
            <template slot-scope="scope">
              <span @click="editZone(scope.row)" class="blue" v-if="fenquzhongliang">修改分区重量<span style="margin:0px 5px 0px">|</span></span>
              <span @click="fqjg(scope.row)" class="blue">分区价格<span style="margin:0px 5px 0px">|</span></span>
              <span @click="additional(scope.row)" class="blue">附加费<span style="margin:0px 5px 0px">|</span></span>
              <span @click="stop(scope.row)" class="blue">停用<span style="margin:0px 5px 0px">|</span></span>
              <span @click="edit(scope.row)" class="blue">修改</span>
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
      activeName: '1', // 标签绑定
      serviceName: null,
      fenquzhongliang: true,
      columns: [
        {
          prop: 'name',
          label: '渠道服务名称',
          width: '400',
          align: 'center'
        },
        // 定义表格列的类型为slot，slot插槽名字为 slotbtn
        {
          prop: 'type',
          label: '渠道分类',
          width: '300',
          align: 'center'
        },
        {
          prop: 'pstype',
          label: '派送类型',
          width: '300',
          align: 'center'
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
  created () {
    this.tableData = [
      {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        info: 'xiaohu'
      },
      {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        info: 'xiaohu'
      }
    ]
    this.page.total = 2
  },
  methods: {
    // 重新渲染name列
    formatter (row, column, cellValue) {
      return row.name + '测试'
    },
    formatters (row, column, cellValue) {
      return row.address + '测试'
    },
    // 改变页面大小处理
    handleSizeChange (val) {
      console.log(val)
    },
    // 翻页处理
    handleCurrentChange (val) {
      this.tableData = [
        {
          date: '2016-05-03',
          name: '王小虎111',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ]
    },
    // checkbox选中获取数据
    handleSelectionChange (val) {
      console.log(val)
    },
    // 查看
    check (val) {
      console.log(val.data)
    },
    // 操作按钮列表
    editTableData (row) {},
    // 关闭抽屉
    addClose () {
      this.drawerVrisible = false
    }
  }
}
</script>
<style lang="scss" scoped>
.blue{
    color: #0084FFFF;
    font-size: 14px;
    cursor: pointer;
}
</style>
