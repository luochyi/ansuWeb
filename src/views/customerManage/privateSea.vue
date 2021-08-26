<template>
  <div class="mainbox">
    <!-- 写页面的地方，直接使用elementui组件就可以渲染上去 -->
    {{ msg }}
    <div>
      <!-- 这个是表单组件，只是用于讲解用法，和实际样式不同 -->
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="客户名称">
          <el-input v-model="formInline.user" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="primary" @click="onSubmit">重置</el-button>
          <el-button type="primary" @click="onSubmit">添加客户</el-button>
        </el-form-item>
      </el-form>
      <el-tag color="#FEF4E1">批量转入私海</el-tag>
      <el-tag type="success" color="#FEF4E1">批量指派客户</el-tag>
    </div>
    <div>
      <!-- 这个是表格组件，只是用于讲解用法，和实际样式不同 -->
     <el-table
      border
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="name" label="客户名称" width="218"></el-table-column>
        <el-table-column prop="contacts" label="客户联系人" width="94"></el-table-column>
        <el-table-column prop="number" label="客户联系电话" width="117"></el-table-column>
        <el-table-column prop="address" label="客户地址" width="425"></el-table-column>
        <el-table-column fixed="right" label="操作" width="302">
          <template slot-scope="scope">
            <el-button
              @click="handleClick(scope.row)"
              type="text"  size="small">完善信息&ensp;|&ensp;转回公海&ensp;|&ensp; 指派业务 &ensp;|&ensp;开户</el-button>
          </template>
        </el-table-column>
      </el-table>
       </div>
       <div>
      <!-- 分页 -->
      <el-pagination background layout="total, sizes, prev, pager, next, jumper" :total="150"></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 写数据的地方，用于渲染到页面，可以抽一下午看看vue入门
      msg: '私海客户',
      formInline: {
        user: '',
        region: ''
      },
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  }
}
</script>

<style>
/* 写样式的地方 */
.mainbox{
  width: 1191px;
  height: 854px;
  border:red solid 1px;
  /* border-color: white; */
  background-color: white;
  padding: 1rem;
}
</style>
