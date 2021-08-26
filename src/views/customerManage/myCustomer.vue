<template>
  <div class="mainbox">
    <!-- 写页面的地方，直接使用elementui组件就可以渲染上去 -->
    <div class="Header" >
      {{ msg }}
    </div>
    <div>
      <!-- 这个是表单组件，只是用于讲解用法，和实际样式不同 -->
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
  <el-form-item label="客户名称">
    <el-input v-model="formInline.user" placeholder="请输入"></el-input>
  </el-form-item>
  <el-form-item label="客户编码">
    <el-input v-model="formInline.user" placeholder="请输入"></el-input>
  </el-form-item>
  <el-form-item label="上次上单时间">
    <el-select v-model="formInline.region" placeholder="超过一个月">
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">查询</el-button>
    <el-button type="primary" @click="onSubmit">重置</el-button>
  </el-form-item>
</el-form>
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
    <el-table-column prop="name"  label="客户名称"  width="255"></el-table-column>
    <el-table-column  prop="code" label="客户编码"  width="138"> </el-table-column>
     <el-table-column  prop="contacts" label="客户联系人"  width="111"></el-table-column>
     <el-table-column  prop="number"  label="客户联系电话"  width="137"> </el-table-column>
    <el-table-column  prop="time"  label="上次下单时间"  width="159"></el-table-column>
    <el-table-column  prop="address"  label="未核销金额"  width="119"> </el-table-column>
    <el-table-column  fixed="right"  label="操作"  width="166">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看详情&ensp;|&ensp;指派业务 </el-button>
      </template>
    </el-table-column>
  </el-table>
    </div>
    <div>
      <!-- 分页 -->
      <el-pagination
        background
         layout="total, sizes, prev, pager, next, jumper"
        :total="150">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 写数据的地方，用于渲染到页面，可以抽一下午看看vue入门
      msg: '我的客户',
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
