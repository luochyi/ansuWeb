设备列表<template>
<div id='boxx'>
    <div class="box">
    <!--  top -->
    <el-row type='flex' justify='flex-start' class='title' align='middle'>
      <span class='text'>设备列表</span>
      <el-tabs v-model='activeName' type='card'>
        <el-tab-pane label='使用中' name='1'></el-tab-pane>
        <el-tab-pane label='停用' name='2'></el-tab-pane>
      </el-tabs>
    </el-row>
     <el-row type='flex' justify='flex-start' class='title' align='middle'>
      <span class='texta'>安速观澜仓设配列表</span>
    </el-row>
    </div>
    <div class='content'>
        <el-row class='searchbox1'>
          <el-col :span='8' class='colbox'>
            <el-col :span='7'>
              <span class='text'>设备名称</span>
            </el-col>
            <el-col :span='16'>
              <el-input v-model='predictionNo' placeholder='请输入'></el-input>
            </el-col>
          </el-col>
          <el-col :span='8' class='colbox'>
            <el-button class='orangeBtn long1'>查 询</el-button>
            <el-button class='wuBtn long1'>重 置</el-button>
          </el-col>
          <el-col :span='8' class="left">
          <el-button @click="device" class='orangeBtn long2' icon="el-icon-circle-plus-outline">添加设备</el-button>
        </el-col>
        </el-row>
 <commonTable
      :columns="columns"
      :data="tableData"
      :pager="page"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      >
      <el-table-column
        slot="table_oper"
        fixed="right"
        label="操作"
        width="231"
        :resizable="false"
        >
        <template slot-scope="scope">
          <el-button type="text" @click="toDetail(scope.row.id)"> 修改名称</el-button>
                <span style="color: #0084FF; margin: 0px 5px">|</span>
                <el-button type="text" @click="password= true"> 复制链接 </el-button>
                <span style="color: #0084FF; margin: 0px 5px">|</span>
                <el-button type="text" @click="stopAgentis= true"> 停用设备 </el-button>
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
      chooseAgent: {}, // 选择停用
      activeName: '1', // 标签绑定

      columns: [
        { prop: 'name', label: '设备名称', width: '200', align: 'center' },
        { prop: 'connection', label: '设备连接', width: '700', align: 'center', formatter: this.formatter }
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
    this.tableData = [
      { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄', button: '<a>11</a>' }
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

    },
    // 翻页处理
    handleCurrentChange (val) {
      this.tableData = [
        { date: '2016-05-03', name: '王小虎111', address: '上海市普陀区金沙江路 1518 弄' }
      ]
    },
    // 操作按钮列表
    editTableData (row) {}
  }
}
</script>

<style>
.text{
    width: 100px;
    margin: 17px;
}
#boxx{
width: 1191px;
height: 854px;
background: #FFFFFF;
border-radius: 4px;
border: 1px solid #E8E8E8;
}
.texta{

width: 162px;
height: 30px;
font-size: 18px;
font-family: PingFangSC-Semibold, PingFang SC;
font-weight: 600;
color: #FB4702;
margin: 17px;
}

</style>
